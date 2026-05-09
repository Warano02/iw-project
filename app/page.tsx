

"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm",
});

// ─── Types ────────────────────────────────────────────────────────────────────
interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  maxScore: number;
  description: string;
  status: "pending" | "submitted" | "graded" | "late";
  grade?: number;
  feedback?: string;
}

// ─── Mock data (à remplacer par un fetch API) ─────────────────────────────────
const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: "a1",
    title: "TP1 — Triggers & Index MySQL",
    course: "Bases de Données Avancées",
    dueDate: "2024-12-20",
    maxScore: 20,
    description:
      "Créer les triggers et index nécessaires sur la base de données fournie. Rendre un fichier SQL commenté + rapport PDF.",
    status: "pending",
  },
  {
    id: "a2",
    title: "Devoir de Probabilités — Loi normale",
    course: "Probabilités & Statistiques",
    dueDate: "2024-12-18",
    maxScore: 20,
    description:
      "Résoudre les exercices 3, 5 et 7 du poly. Justifier chaque étape de calcul.",
    status: "submitted",
  },
  {
    id: "a3",
    title: "Rapport OS — Processus & Threads",
    course: "Systèmes d'Exploitation",
    dueDate: "2024-12-10",
    maxScore: 20,
    description:
      "Rédiger un rapport de 10 pages sur la gestion des processus sous Linux.",
    status: "graded",
    grade: 17,
    feedback:
      "Excellent travail, très bonne maîtrise des concepts. La partie sur les threads POSIX est particulièrement bien développée.",
  },
  {
    id: "a4",
    title: "Mini-projet RO — Simplexe",
    course: "Recherche Opérationnelle",
    dueDate: "2024-12-05",
    maxScore: 20,
    description: "Implémenter l'algorithme du Simplexe en Python et tester sur 3 problèmes donnés.",
    status: "late",
  },
];

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:   { label: "À rendre",  color: "#f0a050", bg: "rgba(240,160,80,0.12)"  },
  submitted: { label: "Rendu",     color: "#50c0a0", bg: "rgba(80,192,160,0.12)"  },
  graded:    { label: "Noté",      color: "#e05a8a", bg: "rgba(224,90,138,0.12)"  },
  late:      { label: "En retard", color: "#e05050", bg: "rgba(224,80,80,0.12)"   },
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AssignmentPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [assignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [selected, setSelected] = useState<Assignment | null>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filter, setFilter] = useState<"all" | Assignment["status"]>("all");

  // ─── File drop ──────────────────────────────────────────────────────────────
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || files.length === 0) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("assignmentId", selected.id);
      formData.append("comment", comment);
      files.forEach((f) => formData.append("files", f));
      await fetch("/api/assignments/submit", { method: "POST", body: formData });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelected(null);
        setFiles([]);
        setComment("");
      }, 2500);
    } catch {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered =
    filter === "all" ? assignments : assignments.filter((a) => a.status === filter);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const isOverdue = (d: string) => new Date(d) < new Date();

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        fontFamily: "var(--font-dm), sans-serif",
        color: "#fff",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(20px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes successPop {
          0%   { transform:scale(.85); opacity:0; }
          60%  { transform:scale(1.06); }
          100% { transform:scale(1); opacity:1; }
        }
        .page-in   { animation: fadeUp .5s ease both; }
        .panel-in  { animation: slideRight .4s ease both; }
        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px;
          cursor: pointer;
          transition: border-color .25s, background .25s, transform .2s;
        }
        .card:hover {
          border-color: rgba(224,90,138,0.4);
          background: rgba(224,90,138,0.05);
          transform: translateY(-2px);
        }
        .card.active {
          border-color: #e05a8a;
          background: rgba(224,90,138,0.08);
        }
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 16px;
          color: #fff;
          font-family: var(--font-dm), sans-serif;
          font-size: 14px;
          outline: none;
          resize: vertical;
          min-height: 90px;
          transition: border-color .25s, box-shadow .25s;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .input-field:focus {
          border-color: #e05a8a;
          box-shadow: 0 0 0 3px rgba(224,90,138,0.12);
        }
        .btn-primary {
          background: linear-gradient(135deg, #e05a8a, #c0365e);
          color: #fff; border: none; border-radius: 10px;
          padding: 13px 28px;
          font-family: var(--font-dm), sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: .4px;
          cursor: pointer;
          transition: opacity .2s, transform .15s;
        }
        .btn-primary:hover:not(:disabled) { opacity: .88; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: .45; cursor: not-allowed; }
        .drop-zone {
          border: 2px dashed rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          cursor: pointer;
          transition: border-color .25s, background .25s;
        }
        .drop-zone.dragging {
          border-color: #e05a8a;
          background: rgba(224,90,138,0.07);
        }
        .drop-zone:hover { border-color: rgba(224,90,138,0.4); }
        .filter-btn {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.4);
          font-family: var(--font-dm), sans-serif;
          font-size: 13px; font-weight: 500;
          cursor: pointer;
          transition: all .2s;
        }
        .filter-btn.active, .filter-btn:hover {
          background: rgba(224,90,138,0.15);
          border-color: #e05a8a;
          color: #e05a8a;
        }
        .success-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; backdrop-filter: blur(8px);
        }
        .success-card {
          background: #111;
          border: 1px solid rgba(224,90,138,0.35);
          border-radius: 20px;
          padding: 48px 56px;
          text-align: center;
          animation: successPop .4s ease both;
        }
        .nav-link {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          font-size: 14px;
          transition: color .2s;
        }
        .nav-link:hover { color: #e05a8a; }
        .orb {
          position: fixed; border-radius: 50%;
          filter: blur(100px); pointer-events: none; z-index: 0;
        }
      `}</style>

      {/* Ambient orbs */}
      <div className="orb" style={{ width: 400, height: 400, background: "#e05a8a", top: -100, right: -100, opacity: 0.07 }} />
      <div className="orb" style={{ width: 300, height: 300, background: "#9b3060", bottom: -80, left: -80, opacity: 0.06 }} />

      {/* ── Navbar ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 32px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: "linear-gradient(135deg,#e05a8a,#9b3060)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-playfair)", fontWeight: 700, fontSize: 16, color: "#fff",
          }}>C</div>
          <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: 16, color: "#fff" }}>
            Classroom of Elite
          </span>
        </div>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/courses" className="nav-link">Cours</a>
          <span style={{ color: "#e05a8a", fontSize: 14, fontWeight: 600 }}>Assignments</span>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg,#e05a8a,#9b3060)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
          }}>S</div>
        </div>
      </nav>

      {/* ── Page layout ── */}
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "36px 32px",
        display: "flex",
        gap: 28,
        alignItems: "flex-start",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── Left – Assignment list ── */}
        <div className="page-in" style={{ width: selected ? "40%" : "100%", transition: "width .35s ease", flexShrink: 0 }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 6,
            }}>
              Mes Assignments
            </h1>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
              {assignments.filter((a) => a.status === "pending").length} devoir(s) en attente de rendu
            </p>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {(["all", "pending", "submitted", "graded", "late"] as const).map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "Tous" : STATUS_CONFIG[f].label}
                <span style={{ marginLeft: 6, opacity: .6 }}>
                  {f === "all"
                    ? assignments.length
                    : assignments.filter((a) => a.status === f).length}
                </span>
              </button>
            ))}
          </div>

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map((a) => {
              const s = STATUS_CONFIG[a.status];
              const overdue = a.status === "pending" && isOverdue(a.dueDate);
              return (
                <div
                  key={a.id}
                  className={`card ${selected?.id === a.id ? "active" : ""}`}
                  onClick={() => setSelected(selected?.id === a.id ? null : a)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ flex: 1, paddingRight: 12 }}>
                      <p style={{ fontSize: 11, color: "#e05a8a", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 5 }}>
                        {a.course}
                      </p>
                      <h3 style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: 17, fontWeight: 600, color: "#fff", lineHeight: 1.3,
                      }}>{a.title}</h3>
                    </div>
                    <span style={{
                      padding: "4px 12px", borderRadius: 20,
                      fontSize: 12, fontWeight: 600,
                      color: s.color, background: s.bg,
                      whiteSpace: "nowrap", flexShrink: 0,
                    }}>{s.label}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontSize: 13,
                      color: overdue ? "#e05050" : "rgba(255,255,255,0.35)",
                    }}>
                      {overdue ? "⚠ " : "📅 "}
                      Échéance : {formatDate(a.dueDate)}
                    </span>
                    {a.status === "graded" && a.grade !== undefined && (
                      <span style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: 18, fontWeight: 700, color: "#e05a8a",
                      }}>
                        {a.grade}<span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>/{a.maxScore}</span>
                      </span>
                    )}
                    {a.status !== "graded" && (
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
                        /{a.maxScore} pts
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{
                textAlign: "center", padding: "60px 20px",
                color: "rgba(255,255,255,0.2)", fontSize: 15,
              }}>
                Aucun devoir dans cette catégorie.
              </div>
            )}
          </div>
        </div>

        {/* ── Right – Detail / Submit panel ── */}
        {selected && (
          <div
            className="panel-in"
            style={{
              flex: 1,
              position: "sticky",
              top: 80,
            }}
          >
            {/* Detail card */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 28,
              marginBottom: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <p style={{ fontSize: 11, color: "#e05a8a", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6 }}>
                    {selected.course}
                  </p>
                  <h2 style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 22, fontWeight: 700, color: "#fff",
                  }}>{selected.title}</h2>
                </div>
                <button
                  onClick={() => { setSelected(null); setFiles([]); setComment(""); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.3)", fontSize: 20, padding: "4px 8px",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#e05a8a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >✕</button>
              </div>

              <p style={{
                color: "rgba(255,255,255,0.55)", fontSize: 14,
                lineHeight: 1.75, marginBottom: 20,
              }}>{selected.description}</p>

              <div style={{
                display: "flex", gap: 20,
                padding: "14px 0",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>Échéance</div>
                  <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{formatDate(selected.dueDate)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>Barème</div>
                  <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{selected.maxScore} points</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>Statut</div>
                  <div style={{ fontSize: 14, color: STATUS_CONFIG[selected.status].color, fontWeight: 600 }}>
                    {STATUS_CONFIG[selected.status].label}
                  </div>
                </div>
              </div>

              {/* Feedback (if graded) */}
              {selected.status === "graded" && selected.feedback && (
                <div style={{
                  marginTop: 18,
                  background: "rgba(224,90,138,0.07)",
                  border: "1px solid rgba(224,90,138,0.2)",
                  borderRadius: 10, padding: "14px 18px",
                }}>
                  <div style={{ fontSize: 11, color: "#e05a8a", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".6px" }}>
                    Commentaire du correcteur
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7 }}>
                    {selected.feedback}
                  </p>
                  <div style={{
                    marginTop: 12, textAlign: "right",
                    fontFamily: "var(--font-playfair)", fontSize: 28, fontWeight: 700, color: "#e05a8a",
                  }}>
                    {selected.grade}<span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }}>/{selected.maxScore}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submission form – only for pending / late */}
            {(selected.status === "pending" || selected.status === "late") && (
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 28,
              }}>
                <h3 style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 20,
                }}>Soumettre mon travail</h3>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {/* Drop zone */}
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".6px" }}>
                      Fichiers à remettre
                    </label>
                    <div
                      className={`drop-zone ${dragging ? "dragging" : ""}`}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div style={{ fontSize: 28, marginBottom: 10 }}>📁</div>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 4 }}>
                        Glissez vos fichiers ici ou <span style={{ color: "#e05a8a" }}>cliquez pour parcourir</span>
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
                        PDF, Word, ZIP, images — max 20 MB par fichier
                      </p>
                      <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={handleFileChange} />
                    </div>
                  </div>

                  {/* File list */}
                  {files.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {files.map((f, i) => (
                        <div key={i} style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 8, padding: "10px 14px",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 18 }}>📄</span>
                            <div>
                              <p style={{ fontSize: 13, color: "#fff", marginBottom: 1 }}>{f.name}</p>
                              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                                {(f.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            style={{
                              background: "none", border: "none", cursor: "pointer",
                              color: "rgba(255,255,255,0.3)", fontSize: 16, transition: "color .2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#e05a8a")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                          >✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment */}
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".6px" }}>
                      Commentaire (optionnel)
                    </label>
                    <textarea
                      className="input-field"
                      placeholder="Ajoutez un message pour votre enseignant…"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn-primary"
                    type="submit"
                    disabled={isSubmitting || files.length === 0}
                    style={{ alignSelf: "flex-end" }}
                  >
                    {isSubmitting ? "Envoi en cours…" : "Remettre le devoir →"}
                  </button>
                </form>
              </div>
            )}

            {/* Already submitted info */}
            {selected.status === "submitted" && (
              <div style={{
                background: "rgba(80,192,160,0.06)",
                border: "1px solid rgba(80,192,160,0.2)",
                borderRadius: 14, padding: "24px 28px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
                <p style={{ color: "#50c0a0", fontWeight: 600, marginBottom: 6 }}>Devoir remis avec succès</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
                  Votre travail a été transmis et est en attente de correction.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Success overlay ── */}
      {success && (
        <div className="success-overlay">
          <div className="success-card">
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h3 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 10,
            }}>Devoir remis !</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>
              Votre travail a bien été transmis à votre enseignant.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
