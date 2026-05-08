"use client";

import "./login-animations.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ── Types ──────────────────────────────────────────────
type Role = "student" | "teacher";

interface LoginFormProps {
  role: Role;
}

// ── Icônes SVG style Iconer.app (outline) ─────────────
// Pour les intégrer depuis iconer.app : iconer.app > chercher "eye" > copier le SVG
// Ici on les inline directement pour éviter les dépendances externes
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20" height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20" height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ── Icône Google SVG ───────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ── Config par rôle ────────────────────────────────────
const ROLE_CONFIG = {
  student: {
    label: "Étudiant",
    redirectPath: "/user",
    registerPath: "/auth/signup",
    quote: "L'éducation est l'arme la plus puissante pour changer le monde.",
    quoteAuthor: "Nelson Mandela",
    panelTag: "Espace Étudiant",
    description: "Accédez à vos cours, suivez votre progression et rejoignez vos sessions en direct.",
    mockEmail: "etudiant@coe.cm",
    stats: [
      { value: "1 200+", label: "Étudiants actifs" },
      { value: "48", label: "Cours disponibles" },
      { value: "98%", label: "Satisfaction" },
    ],
  },
  teacher: {
    label: "Enseignant",
    redirectPath: "/admin",
    registerPath: "/auth/signup/admin",
    quote: "Enseigner, c'est apprendre deux fois.",
    quoteAuthor: "Joseph Joubert",
    panelTag: "Espace Enseignant",
    description: "Gérez vos cours, suivez vos étudiants et animez vos sessions virtuelles en temps réel.",
    mockEmail: "professeur@coe.cm",
    stats: [
      { value: "320+", label: "Enseignants" },
      { value: "48", label: "Cours actifs" },
      { value: "4.9★", label: "Note moyenne" },
    ],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((res) => setTimeout(res, 900));

    if (!email || password.length < 6) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    localStorage.setItem(
      "classhub_user",
      JSON.stringify({
        role,
        name: role === "student" ? "vlad" : "Prof. Kamga",
        email,
      })
    );
    router.push(config.redirectPath);
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans">

      {/* ════════════════════════════════
          PANNEAU GAUCHE — Image plein écran
      ════════════════════════════════ */}
      <div className="relative hidden lg:flex flex-col overflow-hidden">

        {/* ── Image de fond plein panneau ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/auth/teacher.jpg"
            alt="Classrom-of-Elite"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Overlay dégradé : transparent en haut, sombre en bas */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(251,113,133,0.4) 0%, rgba(244,63,94,0.2) 35%, rgba(136,19,55,0.80) 85%, rgba(76,5,25,0.95) 100%)",
            }}
          />
        </div>

        {/* ── Cercles décoratifs ── */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/15"
            style={{ animation: "spinSlow 25s linear infinite" }}
          />
          <div
            className="absolute top-20 right-20 w-40 h-40 rounded-full border border-white/10"
            style={{ animation: "spinSlow 18s linear infinite reverse" }}
          />
          <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-white/30" />
          <div className="absolute top-1/2 right-14 w-1.5 h-1.5 rounded-full bg-rose-200/40" />
          <div className="absolute top-2/3 left-20 w-1 h-1 rounded-full bg-white/20" />
        </div>

        {/* ── Logo + badge — en haut ── */}
        <div className="relative z-20 p-10">
          <div className="text-3xl font-bold tracking-tight font-serif text-white drop-shadow-lg">
            Classroom-of-<em className="not-italic text-rose-200">Elite</em>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-widest uppercase font-mono bg-white/15 backdrop-blur-sm border border-white/25 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-200 animate-pulse" />
            {config.panelTag}
          </div>
        </div>

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── Bande stats glassmorphism ── */}
        <div className="relative z-20 mx-8 mb-5">
          <div
            className="flex items-center justify-between px-6 py-4 rounded-2xl backdrop-blur-md border border-white/20"
            style={{
              background: "rgba(255,255,255,0.12)",
              animation: "floatUp 4s ease-in-out infinite alternate",
            }}
          >
            {config.stats.map((stat, i) => (
              <div key={i} className="text-center flex-1">
                <div className="text-2xl font-bold font-serif text-white drop-shadow-sm">
                  {stat.value}
                </div>
                <div className="text-xs tracking-wider uppercase font-mono text-rose-100 mt-0.5">
                  {stat.label}
                </div>
                {i < config.stats.length - 1 && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-px h-8 bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Citation ── */}
        <div className="relative z-20 mx-8 mb-10 pl-5 border-l-4 border-rose-300/70">
          <blockquote className="text-base italic leading-relaxed font-serif text-white/90">
            "{config.quote}"
          </blockquote>
          <cite className="mt-2 block text-xs tracking-widest uppercase not-italic font-mono text-rose-200">
            — {config.quoteAuthor}
          </cite>
        </div>
      </div>

      {/* ════════════════════════════════
          PANNEAU DROIT — Formulaire
      ════════════════════════════════ */}
      <div className="flex items-center justify-center px-6 py-12 bg-stone-50 min-h-screen">
        <div className="w-full max-w-md">

          {/* Logo mobile uniquement */}
          <div className="lg:hidden text-2xl font-bold font-serif text-rose-400 mb-8 text-center">
            Classroom-of-<em className="not-italic text-rose-300">Elite</em>
          </div>

          {/* Switcher */}
          <div className="flex gap-1 p-1.5 rounded-xl mb-8 bg-rose-100 shadow-inner">
            {(["student", "teacher"] as Role[]).map((r) => (
              <Link
                key={r}
                href={`/auth/login/${r}`}
                className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 no-underline"
                style={{
                  background: role === r ? "#f43f5e" : "transparent",
                  color: role === r ? "#fff" : "#be123c",
                  boxShadow: role === r ? "0 2px 10px rgba(244,63,94,0.35)" : "none",
                }}
              >
                {r === "student" ? "🎓 Étudiant" : "📖 Enseignant"}
              </Link>
            ))}
          </div>

          {/* Label */}
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-3 font-mono text-rose-300">
            <span className="w-6 h-px bg-rose-300" />
            Accès {config.label}
            <span className="w-6 h-px bg-rose-300" />
          </div>

          {/* Titre */}
          <h1 className="text-5xl font-bold tracking-tight mb-2 font-serif text-rose-500">
            Connexion
          </h1>
          <p className="text-sm mb-8 leading-relaxed text-rose-400/80">
            {config.description}
          </p>

          {/* ── Formulaire ── */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-rose-500">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={config.mockEmail}
                required
                className="w-full px-4 py-3.5 text-sm rounded-xl border-2 border-rose-100 bg-white text-rose-800 placeholder-rose-300 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all duration-200"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold tracking-widest uppercase text-rose-500">
                  Mot de passe
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-rose-300 hover:text-rose-500 transition-colors underline underline-offset-2"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-4 pr-12 py-3.5 text-sm rounded-xl border-2 border-rose-100 bg-white text-rose-800 placeholder-rose-300 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all duration-200"
                />
                {/*
                  Icônes œil — style Iconer.app (SVG outline inline)
                  
                */}
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300 hover:text-rose-500 transition-colors duration-200 p-1"
                  aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPwd ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Rester connecté */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none group"
              onClick={() => setRemember(!remember)}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 ${
                  remember
                    ? "bg-rose-400 border-rose-400 shadow-md shadow-rose-200"
                    : "bg-white border-rose-200 group-hover:border-rose-300"
                }`}
              >
                {remember && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-sm text-rose-400 group-hover:text-rose-500 transition-colors">
                Rester connecté pendant 30 jours
              </span>
            </div>

            {/* Erreur */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-red-50 border border-red-200 text-red-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-300 text-white shadow-lg ${
                loading
                  ? "bg-rose-300 cursor-default shadow-none"
                  : "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 hover:shadow-rose-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                `Se connecter — ${config.label}`
              )}
            </button>
          </form>

          {/* Séparateur */}
          <div className="flex items-center gap-3 my-6 text-xs text-rose-300">
            <span className="flex-1 h-px bg-rose-100" />
            <span className="font-medium tracking-widest uppercase">ou continuer avec</span>
            <span className="flex-1 h-px bg-rose-100" />
          </div>

          {/* Google */}
          <button
            className="w-full py-3.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-200 bg-white border-2 border-rose-100 text-rose-600 hover:border-rose-300 hover:bg-rose-50 hover:shadow-md cursor-pointer"
          >
            <GoogleIcon />
            Continuer avec Google
          </button>

          {/* Lien inscription */}
          <p className="text-sm text-center mt-8 text-rose-400">
            Pas encore de compte ?{" "}
            <Link
              href={config.registerPath}
              className="font-bold text-rose-500 hover:text-rose-600 transition-colors underline underline-offset-2"
            >
              S'inscrire gratuitement →
            </Link>
          </p>

          {/* Footer discret */}
          <p className="text-xs text-center mt-5 text-rose-200/80">
            En vous connectant, vous acceptez nos{" "}
            <a href="#" className="underline hover:text-rose-400 transition-colors">CGU</a>
            {" "}et notre{" "}
            <a href="#" className="underline hover:text-rose-400 transition-colors">Politique de confidentialité</a>.
          </p>
        </div>
      </div>

    </div>
  );
}