"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data des leçons — à remplacer par un vrai fetch API
const MOCK_LESSONS = [
  { id: "1", num: "01", icon: "🎬", title: "Introduction aux tris", duration: "12 min", done: true, type: "video" },
  { id: "2", num: "02", icon: "🎬", title: "Tri par fusion", duration: "15 min", done: true, type: "video" },
  { id: "3", num: "03", icon: "🎬", title: "Tri rapide (Quick Sort)", duration: "18 min", done: false, type: "video", active: true },
  { id: "4", num: "04", icon: "📄", title: "Tri par tas", duration: "14 min", done: false, type: "pdf" },
  { id: "5", num: "05", icon: "📝", title: "Quiz — Module 3", duration: "10 min", done: false, type: "quiz" },
];

const MOCK_COURSE = {
  title: "Algorithmes & Structures de Données",
  module: "Module 3 — Tris avancés",
  teacher: "Prof. Nganou",
  progress: 58,
};

export default function LessonPage() {
  const params = useParams();
  const lessonId = params?.id as string;
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);

  const currentLesson = MOCK_LESSONS.find((l) => l.id === lessonId) ?? MOCK_LESSONS[2];
  const currentIndex = MOCK_LESSONS.findIndex((l) => l.id === currentLesson.id);
  const nextLesson = MOCK_LESSONS[currentIndex + 1];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F7F3",
        fontFamily: "'Outfit', sans-serif",
        paddingTop: "64px",
      }}
    >
      {/* Top Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.1rem 2.5rem",
          background: "rgba(248,247,243,0.93)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #D4D3CF",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#080808",
          }}
        >
          Class<em style={{ fontStyle: "italic", color: "#9A9893" }}>Hub</em>
        </div>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <Link
            href="/dashboard"
            style={{
              padding: "0.55rem 1.3rem",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: "2px",
              background: "transparent",
              color: "#080808",
              border: "1.5px solid #D4D3CF",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Layout principal : sidebar + contenu */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "calc(100vh - 64px)" }}>
        {/* Sidebar */}
        <aside
          style={{
            background: "#080808",
            padding: "1.6rem 0",
            position: "fixed" as const,
            top: "64px",
            left: 0,
            bottom: 0,
            width: "240px",
            overflowY: "auto" as const,
            zIndex: 100,
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#F8F7F3",
              padding: "0 1.4rem 1.4rem",
              borderBottom: "1px solid #1E1E1C",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Class<em style={{ fontStyle: "italic", color: "#555" }}>Hub</em>
          </div>

          {[
            { icon: "⊞", label: "Tableau de bord", href: "/dashboard" },
            { icon: "📚", label: "Mes cours", href: "/courses", active: true },
            { icon: "📝", label: "Évaluations", href: "/quiz" },
            { icon: "💬", label: "Messages", href: "/messages" },
            { icon: "🎥", label: "Salles virtuelles", href: "/rooms" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.65rem 1.4rem",
                fontSize: "0.82rem",
                color: item.active ? "#F8F7F3" : "#555",
                background: item.active ? "#161614" : "transparent",
                textDecoration: "none",
                transition: "color 0.2s, background 0.2s",
              }}
            >
              <span style={{ fontSize: "0.95rem", width: "18px", textAlign: "center" as const }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </aside>

        {/* Contenu principal */}
        <main style={{ marginLeft: "240px", padding: "1.5rem 2rem", background: "#F8F7F3" }}>
          {/* Fil d'Ariane */}
          <div style={{ marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link
              href="/courses"
              style={{
                padding: "0.3rem 0.7rem",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                background: "transparent",
                color: "#080808",
                border: "1.5px solid #D4D3CF",
                borderRadius: "2px",
                textDecoration: "none",
              }}
            >
              ← Retour
            </Link>
            <span style={{ fontSize: "0.78rem", color: "#9A9893" }}>
              {MOCK_COURSE.title} / {MOCK_COURSE.module} / {currentLesson.title}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem" }}>
            {/* Colonne principale */}
            <div>
              {/* Lecteur vidéo */}
              <div
                style={{
                  background: "#080808",
                  borderRadius: "8px",
                  aspectRatio: "16/9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.2rem",
                  position: "relative" as const,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <div
                  style={{
                    position: "absolute" as const,
                    inset: 0,
                    background: "linear-gradient(135deg, #0A0A0A, #1A1A18)",
                  }}
                />
                {/* Bouton Play/Pause */}
                <div style={{ position: "relative" as const, zIndex: 1, textAlign: "center" as const }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(248,247,243,0.15)",
                      border: "2px solid rgba(248,247,243,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                      transition: "background 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{isPlaying ? "⏸" : "▶"}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.1rem",
                      color: "#F8F7F3",
                    }}
                  >
                    {currentLesson.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      color: "#555",
                      marginTop: "0.4rem",
                    }}
                  >
                    Durée : {currentLesson.duration}
                  </div>
                </div>

                {/* Barre de contrôle */}
                <div
                  style={{
                    position: "absolute" as const,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "0.8rem 1rem",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Barre de progression */}
                  <div
                    style={{
                      height: "3px",
                      background: "#333",
                      borderRadius: "2px",
                      marginBottom: "0.5rem",
                      cursor: "pointer",
                      position: "relative" as const,
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = ((e.clientX - rect.left) / rect.width) * 100;
                      setVideoProgress(Math.round(pct));
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${videoProgress}%`,
                        background: "#F8F7F3",
                        borderRadius: "2px",
                        transition: "width 0.1s",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                      <span
                        style={{ color: "#F8F7F3", fontSize: "1rem", cursor: "pointer" }}
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? "⏸" : "▶"}
                      </span>
                      <span style={{ color: "#F8F7F3", fontSize: "1rem" }}>🔊</span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.65rem",
                          color: "#888",
                        }}
                      >
                        {Math.round((videoProgress / 100) * 18)}:
                        {String(Math.round(((videoProgress / 100) * 18 * 60) % 60)).padStart(2, "0")} / 18:00
                      </span>
                    </div>
                    <span style={{ color: "#F8F7F3", fontSize: "1rem", cursor: "pointer" }}>⛶</span>
                  </div>
                </div>
              </div>

              {/* Infos leçon */}
              <div
                style={{
                  background: "#F8F7F3",
                  border: "1px solid #D4D3CF",
                  borderRadius: "6px",
                  padding: "1.4rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: "0.7rem",
                    color: "#080808",
                  }}
                >
                  Leçon {currentLesson.num} — {currentLesson.title}
                </h2>
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem", alignItems: "center" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.2rem 0.7rem",
                      borderRadius: "2px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                      background: "#080808",
                      color: "#F8F7F3",
                    }}
                  >
                    Vidéo
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.2rem 0.7rem",
                      borderRadius: "2px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                      background: "#E6F4EC",
                      color: "#1A7A42",
                    }}
                  >
                    Module 3
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#9A9893",
                    }}
                  >
                    ⏱ {currentLesson.duration}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "#5C5B58",
                    lineHeight: 1.75,
                    marginBottom: "1rem",
                  }}
                >
                  Le tri rapide est un algorithme de tri efficace basé sur la stratégie diviser pour régner. Il
                  sélectionne un élément pivot et partitionne le tableau en deux sous-tableaux selon si les éléments
                  sont inférieurs ou supérieurs au pivot.
                </p>
                <div
                  style={{
                    background: "#ECECEA",
                    borderRadius: "4px",
                    padding: "1rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.8rem",
                    color: "#2A2A28",
                    lineHeight: 1.8,
                  }}
                >
                  <span style={{ color: "#9A9893" }}>// Complexité temporelle</span>
                  <br />
                  Meilleur cas : <strong>O(n log n)</strong>
                  <br />
                  Cas moyen &nbsp;&nbsp;: <strong>O(n log n)</strong>
                  <br />
                  Pire cas &nbsp;&nbsp;&nbsp;&nbsp;: <strong>O(n²)</strong>
                </div>
              </div>
            </div>

            {/* Sidebar droite — liste des leçons */}
            <div>
              <div
                style={{
                  background: "#F8F7F3",
                  border: "1px solid #D4D3CF",
                  borderRadius: "6px",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#080808" }}>Contenu du cours</div>
                  <div style={{ width: "80px", height: "4px", background: "#ECECEA", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${MOCK_COURSE.progress}%`, background: "#080808" }} />
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    color: "#9A9893",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    marginBottom: "0.8rem",
                  }}
                >
                  {MOCK_COURSE.module}
                </div>

                {MOCK_LESSONS.map((lesson) => {
                  const isActive = lesson.id === currentLesson.id;
                  return (
                    <Link
                      key={lesson.id}
                      href={`/lesson/${lesson.id}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.7rem",
                        padding: "0.9rem 0.8rem",
                        border: `1px solid ${isActive ? "#080808" : "#D4D3CF"}`,
                        borderRadius: "4px",
                        marginBottom: "0.5rem",
                        background: isActive ? "#ECECEA" : "transparent",
                        textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.7rem",
                          color: isActive ? "#080808" : "#9A9893",
                          fontWeight: isActive ? 600 : 400,
                          width: "24px",
                          textAlign: "center" as const,
                        }}
                      >
                        {lesson.num}
                      </div>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          background: isActive ? "#080808" : "#ECECEA",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.9rem",
                          flexShrink: 0,
                        }}
                      >
                        {lesson.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: isActive ? 600 : 400,
                            color: "#080808",
                          }}
                        >
                          {lesson.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.62rem",
                            color: "#9A9893",
                          }}
                        >
                          {lesson.duration}
                        </div>
                      </div>
                      {/* Indicateur état */}
                      {lesson.done ? (
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: "#080808",
                            border: "1.5px solid #080808",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.65rem",
                            color: "#F8F7F3",
                          }}
                        >
                          ✓
                        </div>
                      ) : isActive ? (
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#080808",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: "1.5px solid #D4D3CF",
                          }}
                        />
                      )}
                    </Link>
                  );
                })}

                {nextLesson && (
                  <Link
                    href={`/lesson/${nextLesson.id}`}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: "0.8rem",
                      padding: "0.6rem",
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                      background: "#080808",
                      color: "#F8F7F3",
                      border: "none",
                      borderRadius: "2px",
                      textAlign: "center" as const,
                      textDecoration: "none",
                    }}
                  >
                    Leçon suivante →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
