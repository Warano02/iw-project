// src/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────
type Role = "student" | "teacher";

interface LoginFormProps {
  role: Role;
}

// ── Config par rôle ────────────────────────────────────
const ROLE_CONFIG = {
  student: {
    label: "Étudiant",
    redirectPath: "/user",
    registerPath: "/auth/signup",
    quote: "L'éducation est l'arme la plus puissante pour changer le monde.",
    quoteAuthor: "Nelson Mandela",
    accentColor: "#1A7A42",
    mockEmail: "student@classhub.cm",
    panelTag: "Espace Étudiant",
    description: "Accédez à vos cours, suivez votre progression et rejoignez vos sessions.",
  },
  teacher: {
    label: "Enseignant",
    redirectPath: "/admin",
    registerPath: "/auth/signup/admin",
    quote: "Enseigner, c'est apprendre deux fois.",
    quoteAuthor: "Joseph Joubert",
    accentColor: "#2A52A0",
    mockEmail: "teacher@classhub.cm",
    panelTag: "Espace Enseignant",
    description: "Gérez vos cours, suivez vos étudiants et animez vos sessions virtuelles.",
  },
} as const;

// ── Composant principal ────────────────────────────────
export default function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const config = ROLE_CONFIG[role];

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  // ── Soumission du formulaire ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simule un appel API (à remplacer par fetch vers /api/auth/login)
    await new Promise((res) => setTimeout(res, 900));

    if (!email || password.length < 6) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    // Sauvegarde de la session simulée
    localStorage.setItem(
      "classhub_user",
      JSON.stringify({ role, name: role === "student" ? "AYI Kane" : "Prof. Kamga", email })
    );

    router.push(config.redirectPath);
    setLoading(false);
  };

  // ── Styles réutilisables (cohérents avec le projet) ──
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    color: "#080808",
    background: "#F8F7F3",
    border: "1.5px solid #D4D3CF",
    borderRadius: "3px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#5C5B58",
    marginBottom: "0.5rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* ════════════════════════════════
          PANNEAU GAUCHE — Identité visuelle
      ════════════════════════════════ */}
      <div
        style={{
          background: "#080808",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Motif de fond */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            background:
              "repeating-linear-gradient(45deg,#F8F7F3 0,#F8F7F3 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Cercle décoratif */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#F8F7F3",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Class<em style={{ fontStyle: "italic", color: "#555" }}>Hub</em>
          </div>

          {/* Badge rôle */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "2px",
              padding: "0.3rem 0.8rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#777",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: config.accentColor,
                display: "inline-block",
              }}
            />
            {config.panelTag}
          </div>
        </div>

        {/* Stats plateforme */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.8rem",
              marginBottom: "2.5rem",
            }}
          >
            {[
              { value: "1 200+", label: "Étudiants" },
              { value: "48", label: "Cours" },
              { value: "96%", label: "Satisfaction" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: "0.9rem",
                  border: "1px solid #1E1E1C",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#F8F7F3",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#444",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: "0.2rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Citation */}
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              fontStyle: "italic",
              color: "#F8F7F3",
              lineHeight: 1.5,
              marginBottom: "0.8rem",
            }}
          >
            "{config.quote}"
          </blockquote>
          <cite
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#555",
            }}
          >
            — {config.quoteAuthor}
          </cite>
        </div>
      </div>

      {/* ════════════════════════════════
          PANNEAU DROIT — Formulaire
      ════════════════════════════════ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
          background: "#F8F7F3",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* Sélecteur de rôle (switcher entre les deux pages) */}
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              background: "#ECECEA",
              padding: "0.3rem",
              borderRadius: "4px",
              marginBottom: "1.8rem",
            }}
          >
            {(["student", "teacher"] as Role[]).map((r) => (
              <Link
                key={r}
                href={`/auth/login/${r}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "0.45rem",
                  borderRadius: "3px",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: role === r ? "#080808" : "transparent",
                  color: role === r ? "#F8F7F3" : "#9A9893",
                }}
              >
                {r === "student" ? "🎓 Étudiant" : "📖 Enseignant"}
              </Link>
            ))}
          </div>

          {/* Label page */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#9A9893",
              marginBottom: "1.2rem",
            }}
          >
            <span
              style={{ width: "20px", height: "1px", background: "#9A9893", display: "inline-block" }}
            />
            Accès {config.label}
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
              color: "#080808",
            }}
          >
            Connexion
          </h1>
          <p
            style={{
              fontSize: "0.88rem",
              color: "#9A9893",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            {config.description}
          </p>

          {/* ── Formulaire ── */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: "1.3rem" }}>
              <label style={labelStyle}>Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={config.mockEmail}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#080808")}
                onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
              />
            </div>

            {/* Mot de passe */}
            <div style={{ marginBottom: "1.3rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <label style={{ ...labelStyle, marginBottom: 0 }}>Mot de passe</label>
                <a href="#" style={{ fontSize: "0.75rem", color: "#5C5B58", textDecoration: "underline" }}>
                  Oublié ?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ ...inputStyle, paddingRight: "2.8rem" }}
                  onFocus={(e) => (e.target.style.borderColor = "#080808")}
                  onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
                />
                {/* Bouton afficher/masquer mot de passe */}
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute",
                    right: "0.8rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9A9893",
                    fontSize: "0.85rem",
                    padding: 0,
                  }}
                >
                  {showPwd ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Rester connecté */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1.4rem",
                cursor: "pointer",
              }}
              onClick={() => setRemember(!remember)}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "1.5px solid #D4D3CF",
                  borderRadius: "2px",
                  background: remember ? "#080808" : "transparent",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
              >
                {remember && <span style={{ color: "#F8F7F3", fontSize: "0.6rem" }}>✓</span>}
              </div>
              <span style={{ fontSize: "0.8rem", color: "#5C5B58", userSelect: "none" }}>
                Rester connecté
              </span>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div
                style={{
                  background: "#FEF0F0",
                  border: "1px solid #E04040",
                  borderRadius: "3px",
                  padding: "0.7rem 1rem",
                  fontSize: "0.82rem",
                  color: "#E04040",
                  marginBottom: "1rem",
                }}
              >
                ⚠ {error}
              </div>
            )}

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.85rem",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: loading ? "#555" : "#080808",
                color: "#F8F7F3",
                border: "none",
                borderRadius: "2px",
                cursor: loading ? "default" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Connexion en cours..." : `Se connecter — ${config.label}`}
            </button>
          </form>

          {/* Séparateur */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "1.2rem 0",
              fontSize: "0.75rem",
              color: "#9A9893",
            }}
          >
            <span style={{ flex: 1, height: "1px", background: "#D4D3CF", display: "block" }} />
            ou
            <span style={{ flex: 1, height: "1px", background: "#D4D3CF", display: "block" }} />
          </div>

          {/* Google */}
          <button
            style={{
              width: "100%",
              padding: "0.85rem",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "transparent",
              color: "#080808",
              border: "1.5px solid #D4D3CF",
              borderRadius: "2px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.7rem",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#080808")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D4D3CF")}
          >
            🔵 Continuer avec Google
          </button>

          {/* Lien inscription */}
          <p
            style={{
              fontSize: "0.82rem",
              color: "#5C5B58",
              textAlign: "center",
              marginTop: "1.5rem",
            }}
          >
            Pas encore de compte ?{" "}
            <Link
              href={config.registerPath}
              style={{ color: "#080808", fontWeight: 600, textDecoration: "underline" }}
            >
              S'inscrire gratuitement →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
