"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock authentication — à remplacer par un vrai appel API
    await new Promise((res) => setTimeout(res, 800));

    if (email === "admin@classhub.cm" && password === "admin123") {
      localStorage.setItem("classhub_user", JSON.stringify({ role: "admin", name: "Admin", email }));
      router.push("/admin");
    } else if (email && password.length >= 6) {
      localStorage.setItem("classhub_user", JSON.stringify({ role: "student", name: "AYI Kane", email }));
      router.push("/dashboard");
    } else {
      setError("Email ou mot de passe incorrect.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "'Outfit', sans-serif" }}>
      {/* Panneau gauche */}
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
        {/* Pattern de fond */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            background: "repeating-linear-gradient(45deg, #F8F7F3 0, #F8F7F3 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#F8F7F3",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: 1,
          }}
        >
          Class<em style={{ fontStyle: "italic", color: "#5C5B58" }}>Hub</em>
        </div>
        {/* Citation */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem",
              fontStyle: "italic",
              color: "#F8F7F3",
              lineHeight: 1.5,
              marginBottom: "0.8rem",
            }}
          >
            "L'éducation est l'arme la plus puissante pour changer le monde."
          </blockquote>
          <cite
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "#555",
            }}
          >
            — Nelson Mandela
          </cite>
        </div>
      </div>

      {/* Panneau droit */}
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
          {/* Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "#9A9893",
              marginBottom: "1.2rem",
            }}
          >
            <span style={{ width: "20px", height: "1px", background: "#9A9893", display: "inline-block" }} />
            Accès
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
          <p style={{ fontSize: "0.88rem", color: "#9A9893", marginBottom: "2rem", lineHeight: 1.6 }}>
            Accédez à votre espace ClassHub et reprenez là où vous vous êtes arrêté.
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: "1.3rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase" as const,
                  color: "#5C5B58",
                  marginBottom: "0.5rem",
                }}
              >
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@example.com"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  color: "#080808",
                  background: "#F8F7F3",
                  border: "1.5px solid #D4D3CF",
                  borderRadius: "3px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box" as const,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#080808")}
                onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
              />
            </div>

            {/* Mot de passe */}
            <div style={{ marginBottom: "1.3rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase" as const,
                    color: "#5C5B58",
                  }}
                >
                  Mot de passe
                </label>
                <a
                  href="#"
                  style={{ fontSize: "0.75rem", color: "#5C5B58", textDecoration: "underline" }}
                >
                  Oublié ?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  color: "#080808",
                  background: "#F8F7F3",
                  border: "1.5px solid #D4D3CF",
                  borderRadius: "3px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box" as const,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#080808")}
                onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
              />
            </div>

            {/* Rester connecté */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.4rem" }}>
              <div
                onClick={() => setRememberMe(!rememberMe)}
                style={{
                  width: "16px",
                  height: "16px",
                  border: "1.5px solid #D4D3CF",
                  borderRadius: "2px",
                  background: rememberMe ? "#080808" : "transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
              >
                {rememberMe && <span style={{ color: "#F8F7F3", fontSize: "0.6rem" }}>✓</span>}
              </div>
              <span style={{ fontSize: "0.8rem", color: "#5C5B58" }}>Rester connecté</span>
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
                {error}
              </div>
            )}

            {/* Bouton connexion */}
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
                textTransform: "uppercase" as const,
                background: loading ? "#555" : "#080808",
                color: "#F8F7F3",
                border: "none",
                borderRadius: "2px",
                cursor: loading ? "default" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Séparateur */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.2rem 0", fontSize: "0.75rem", color: "#9A9893" }}>
            <span style={{ flex: 1, height: "1px", background: "#D4D3CF", display: "block" }} />
            ou
            <span style={{ flex: 1, height: "1px", background: "#D4D3CF", display: "block" }} />
          </div>

          {/* Bouton Google */}
          <button
            style={{
              width: "100%",
              padding: "0.85rem",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
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
          <p style={{ fontSize: "0.82rem", color: "#5C5B58", textAlign: "center" as const, marginTop: "1.5rem" }}>
            Pas encore de compte ?{" "}
            <Link href="/register" style={{ color: "#080808", fontWeight: 600, textDecoration: "underline" }}>
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
