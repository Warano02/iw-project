"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm",
});

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = "login" | "register";

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  password: string;
  confirmPassword: string;
  role: "student" | "teacher";
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Login state
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  // Register state
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Identifiants invalides");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l'inscription");
      setMode("login");
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        display: "flex",
        fontFamily: "var(--font-dm), sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Background decorations ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.28; }
        }
        .auth-card   { animation: fadeUp .55s ease both; }
        .tab-active  { transition: all .3s ease; }
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
          transition: border-color .25s, box-shadow .25s;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.3); }
        .input-field:focus {
          border-color: #e05a8a;
          box-shadow: 0 0 0 3px rgba(224,90,138,0.15);
        }
        .btn-primary {
          width: 100%;
          background: linear-gradient(135deg, #e05a8a, #c0365e);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 13px;
          font-family: var(--font-dm), sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: .5px;
          cursor: pointer;
          transition: opacity .2s, transform .15s;
        }
        .btn-primary:hover:not(:disabled) { opacity: .88; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: .5; cursor: not-allowed; }
        .select-field {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 16px;
          color: #fff;
          font-family: var(--font-dm), sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color .25s;
          appearance: none;
        }
        .select-field:focus { border-color: #e05a8a; }
        .select-field option { background: #1a1a1a; }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          animation: pulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .label-text {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
          letter-spacing: .6px;
          text-transform: uppercase;
        }
        .pw-wrapper { position: relative; }
        .pw-toggle {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.4); padding: 0; font-size: 18px;
          transition: color .2s;
        }
        .pw-toggle:hover { color: #e05a8a; }
        .error-box {
          background: rgba(224,90,138,0.12);
          border: 1px solid rgba(224,90,138,0.35);
          border-radius: 8px;
          padding: 10px 14px;
          color: #f08aaa;
          font-size: 13px;
          animation: slideIn .3s ease both;
        }
        .side-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 64px 56px;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .side-panel { display: none !important; }
          .auth-wrapper { justify-content: center !important; }
          .form-side { max-width: 480px !important; width: 100% !important; }
        }
      `}</style>

      {/* Ambient orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: "#e05a8a", top: -150, left: -150, opacity: 0.12 }} />
      <div className="orb" style={{ width: 350, height: 350, background: "#9b3060", bottom: -100, right: 200, opacity: 0.10, animationDelay: "3s" }} />

      {/* ── Layout ── */}
      <div
        className="auth-wrapper"
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left – Branding panel */}
        <div
          className="side-panel"
          style={{
            width: "45%",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "linear-gradient(160deg, rgba(224,90,138,0.08) 0%, transparent 60%)",
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: "linear-gradient(135deg,#e05a8a,#9b3060)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 700, color: "#fff",
                fontFamily: "var(--font-playfair)",
              }}>C</div>
              <span style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: ".5px",
              }}>Classroom of Elite</span>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(36px, 3.5vw, 52px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: 24,
          }}>
            Apprenez.<br />
            <span style={{ color: "#e05a8a" }}>Progressez.</span><br />
            Excellez.
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 360,
            marginBottom: 48,
          }}>
            Rejoignez la plateforme e-learning dédiée à l'excellence académique. Accédez à vos cours, soumettez vos travaux et suivez votre progression.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 40 }}>
            {[
              { val: "500+", label: "Étudiants" },
              { val: "48", label: "Cours actifs" },
              { val: "98%", label: "Satisfaction" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: 28, fontWeight: 700, color: "#e05a8a",
                }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Decorative line */}
          <div style={{
            position: "absolute", bottom: 0, left: 56,
            width: 1, height: "30%",
            background: "linear-gradient(to bottom, #e05a8a, transparent)",
          }} />
        </div>

        {/* Right – Form panel */}
        <div
          className="form-side"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
          }}
        >
          <div
            className="auth-card"
            style={{
              width: "100%",
              maxWidth: 440,
            }}
          >
            {/* Tabs */}
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: 4,
              marginBottom: 36,
            }}>
              {(["login", "register"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className="tab-active"
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: 9,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-dm), sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    background: mode === m
                      ? "linear-gradient(135deg,#e05a8a,#c0365e)"
                      : "transparent",
                    color: mode === m ? "#fff" : "rgba(255,255,255,0.4)",
                    letterSpacing: ".3px",
                  }}
                >
                  {m === "login" ? "Connexion" : "Inscription"}
                </button>
              ))}
            </div>

            {/* Title */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: 28, fontWeight: 700, color: "#fff",
                marginBottom: 6,
              }}>
                {mode === "login" ? "Bon retour 👋" : "Créer un compte"}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
                {mode === "login"
                  ? "Connectez-vous à votre espace Classroom of Elite"
                  : "Rejoignez la communauté et commencez à apprendre"}
              </p>
            </div>

            {/* Error */}
            {error && <div className="error-box" style={{ marginBottom: 20 }}>⚠ {error}</div>}

            {/* ── LOGIN FORM ── */}
            {mode === "login" && (
              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label className="label-text">Adresse e-mail</label>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="vous@exemple.com"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label-text">Mot de passe</label>
                  <div className="pw-wrapper">
                    <input
                      className="input-field"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      style={{ paddingRight: 44 }}
                    />
                    <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: "right", marginTop: -8 }}>
                  <a href="/forgot-password" style={{ color: "#e05a8a", fontSize: 13, textDecoration: "none" }}>
                    Mot de passe oublié ?
                  </a>
                </div>

                <button className="btn-primary" type="submit" disabled={isLoading} style={{ marginTop: 4 }}>
                  {isLoading ? "Connexion en cours…" : "Se connecter →"}
                </button>
              </form>
            )}

            {/* ── REGISTER FORM ── */}
            {mode === "register" && (
              <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="label-text">Prénom</label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Prénom"
                      required
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Nom</label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Nom"
                      required
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label-text">Adresse e-mail</label>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="vous@exemple.com"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="label-text">Matricule</label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="L3-2024-XXX"
                      required
                      value={registerForm.studentId}
                      onChange={(e) => setRegisterForm({ ...registerForm, studentId: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label-text">Rôle</label>
                    <div style={{ position: "relative" }}>
                      <select
                        className="select-field"
                        value={registerForm.role}
                        onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value as any })}
                      >
                        <option value="student">Étudiant</option>
                        <option value="teacher">Enseignant</option>
                      </select>
                      <span style={{
                        position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                        color: "rgba(255,255,255,0.4)", pointerEvents: "none", fontSize: 12,
                      }}>▾</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="label-text">Mot de passe</label>
                  <div className="pw-wrapper">
                    <input
                      className="input-field"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 caractères"
                      required
                      minLength={8}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      style={{ paddingRight: 44 }}
                    />
                    <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="label-text">Confirmer le mot de passe</label>
                  <div className="pw-wrapper">
                    <input
                      className="input-field"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Répétez le mot de passe"
                      required
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      style={{ paddingRight: 44 }}
                    />
                    <button type="button" className="pw-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <button className="btn-primary" type="submit" disabled={isLoading} style={{ marginTop: 4 }}>
                  {isLoading ? "Création du compte…" : "Créer mon compte →"}
                </button>
              </form>
            )}

            {/* Footer */}
            <p style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.25)",
              fontSize: 12,
              marginTop: 32,
            }}>
              © 2024 Classroom of Elite — Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

