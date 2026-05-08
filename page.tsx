"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "student",
    password: "",
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.acceptTerms) {
      setError("Veuillez accepter les conditions d'utilisation.");
      return;
    }
    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 900));

    // Mock : enregistrement et redirection
    localStorage.setItem(
      "classhub_user",
      JSON.stringify({ role: form.role, name: `${form.firstName} ${form.lastName}`, email: form.email })
    );
    router.push(form.role === "admin" ? "/admin" : "/dashboard");
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    color: "#080808",
    background: "#F8F7F3",
    border: "1.5px solid #D4D3CF",
    borderRadius: "3px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    color: "#5C5B58",
    marginBottom: "0.5rem",
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "'Outfit', sans-serif" }}>
      {/* Panneau gauche */}
      <div
        style={{
          background: "#0F0F0D",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            background: "repeating-linear-gradient(45deg, #F8F7F3 0, #F8F7F3 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
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
          Class<em style={{ fontStyle: "italic", color: "#555" }}>Hub</em>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#333",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              marginBottom: "1.5rem",
            }}
          >
            Ce que vous obtenez
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.9rem" }}>
            {[
              "Accès à tous les cours disponibles",
              "Tableau de bord personnalisé",
              "Salles virtuelles en direct",
              "Certificats de complétion",
              "Messagerie intégrée",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#252523",
                    border: "1px solid #333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    color: "#F8F7F3",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <span style={{ fontSize: "0.85rem", color: "#888" }}>{item}</span>
              </div>
            ))}
          </div>
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
          overflowY: "auto" as const,
        }}
      >
        <div style={{ width: "100%", maxWidth: "440px" }}>
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
            Inscription
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
            Créer un compte
          </h1>
          <p style={{ fontSize: "0.88rem", color: "#9A9893", marginBottom: "2rem", lineHeight: 1.6 }}>
            Rejoignez ClassHub gratuitement et accédez à votre espace d'apprentissage.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Prénom / Nom */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.3rem" }}>
              <div>
                <label style={labelStyle}>Prénom</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="AYI"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#080808")}
                  onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
                />
              </div>
              <div>
                <label style={labelStyle}>Nom</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Kane"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#080808")}
                  onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.3rem" }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="vous@example.com"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#080808")}
                onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
              />
            </div>

            {/* Rôle */}
            <div style={{ marginBottom: "1.3rem" }}>
              <label style={labelStyle}>Rôle</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  appearance: "none" as const,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A9893' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#080808")}
                onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
              >
                <option value="student">Étudiant</option>
                <option value="teacher">Enseignant</option>
              </select>
            </div>

            {/* Mot de passe */}
            <div style={{ marginBottom: "1.3rem" }}>
              <label style={labelStyle}>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 caractères"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#080808")}
                onBlur={(e) => (e.target.style.borderColor = "#D4D3CF")}
              />
            </div>

            {/* Conditions */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "1.4rem" }}>
              <div
                onClick={() => setForm((p) => ({ ...p, acceptTerms: !p.acceptTerms }))}
                style={{
                  width: "16px",
                  height: "16px",
                  border: "1.5px solid #D4D3CF",
                  borderRadius: "2px",
                  background: form.acceptTerms ? "#080808" : "transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginTop: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {form.acceptTerms && <span style={{ color: "#F8F7F3", fontSize: "0.6rem" }}>✓</span>}
              </div>
              <span style={{ fontSize: "0.78rem", color: "#5C5B58", lineHeight: 1.5 }}>
                J'accepte les{" "}
                <a href="#" style={{ color: "#080808", textDecoration: "underline" }}>conditions d'utilisation</a>{" "}
                et la{" "}
                <a href="#" style={{ color: "#080808", textDecoration: "underline" }}>politique de confidentialité</a>.
              </span>
            </div>

            {/* Erreur */}
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

            {/* Bouton */}
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
              }}
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
            </button>
          </form>

          <p style={{ fontSize: "0.82rem", color: "#5C5B58", textAlign: "center" as const, marginTop: "1.5rem" }}>
            Déjà un compte ?{" "}
            <Link href="/login" style={{ color: "#080808", fontWeight: 600, textDecoration: "underline" }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
