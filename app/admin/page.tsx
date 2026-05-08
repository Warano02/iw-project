"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_USERS = [
  { initials: "AK", name: "AYI Kane Mvogo", email: "ayi.kane@univ-ndere.cm", role: "Étudiant", date: "12 Avr 2026", status: "active" },
  { initials: "MB", name: "Mbida Bertrand", email: "mbida.b@univ-ndere.cm", role: "Étudiant", date: "11 Avr 2026", status: "active" },
  { initials: "PK", name: "Prof. Kamga", email: "kamga@univ-ndere.cm", role: "Enseignant", date: "10 Avr 2026", status: "active" },
  { initials: "NF", name: "Nguena Fanta", email: "nguena.f@email.com", role: "Étudiant", date: "09 Avr 2026", status: "pending" },
];

const CHART_DATA = [
  { day: "Lun", height: 40 },
  { day: "Mar", height: 65 },
  { day: "Mer", height: 50 },
  { day: "Jeu", height: 80 },
  { day: "Ven", height: 55 },
  { day: "Sam", height: 35 },
  { day: "Dim", height: 45 },
];

const SIDEBAR_ITEMS = [
  { icon: "⊞", label: "Vue d'ensemble", active: true, section: null },
  { icon: null, label: "Gestion", section: true },
  { icon: "👥", label: "Utilisateurs", badge: "1 248" },
  { icon: "📚", label: "Cours", badge: "48" },
  { icon: "📝", label: "Soumissions", badge: "12" },
  { icon: "🎥", label: "Salles" },
  { icon: null, label: "Système", section: true },
  { icon: "📊", label: "Rapports" },
  { icon: "🗂️", label: "Catégories" },
  { icon: "⚙️", label: "Paramètres" },
  { icon: "📋", label: "Logs" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7F3", fontFamily: "'Outfit', sans-serif", paddingTop: "64px" }}>
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
            color: "#080808",
          }}
        >
          Class<em style={{ fontStyle: "italic", color: "#9A9893" }}>Hub</em>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#9A9893",
            }}
          >
            Administration
          </span>
          <Link
            href="/dashboard"
            style={{
              padding: "0.55rem 1.3rem",
              fontSize: "0.78rem",
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
        </div>
      </nav>

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
            }}
          >
            Class<em style={{ fontStyle: "italic", color: "#555" }}>Hub</em>
          </div>

          {SIDEBAR_ITEMS.map((item, i) => {
            if (item.section) {
              return (
                <div
                  key={i}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#333",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    padding: "0.9rem 1.4rem 0.4rem",
                  }}
                >
                  {item.label}
                </div>
              );
            }
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "0.65rem 1.4rem",
                  fontSize: "0.82rem",
                  color: item.active ? "#F8F7F3" : "#555",
                  background: item.active ? "#161614" : "transparent",
                  cursor: "pointer",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                <span style={{ fontSize: "0.95rem", width: "18px", textAlign: "center" as const }}>{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: "#252523",
                      color: "#888",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "3px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </aside>

        {/* Contenu principal */}
        <main style={{ marginLeft: "240px", padding: "2rem 2.5rem" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "2rem",
              paddingBottom: "1.4rem",
              borderBottom: "1px solid #D4D3CF",
            }}
          >
            <div>
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
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ width: "20px", height: "1px", background: "#9A9893", display: "inline-block" }} />
                Administration
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#080808",
                }}
              >
                Vue d'ensemble
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#9A9893",
                }}
              >
                Jeu 16 Avr 2026
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#080808",
                  color: "#F8F7F3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                AD
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { value: "1 248", label: "Étudiants", change: "↑ +47 ce mois", warn: false },
              { value: "48", label: "Cours actifs", change: "↑ +4 nouveaux", warn: false },
              { value: "99.1%", label: "Uptime", change: "→ Stable", warn: false },
              { value: "1.8s", label: "Temps moyen", change: "↓ Optimisé", warn: false },
            ].map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  background: "#F8F7F3",
                  border: "1px solid #D4D3CF",
                  borderRadius: "6px",
                  padding: "1.2rem 1.4rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#080808",
                    lineHeight: 1,
                  }}
                >
                  {kpi.value}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#9A9893",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.08em",
                    marginTop: "0.3rem",
                  }}
                >
                  {kpi.label}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#2DA05A",
                    marginTop: "0.5rem",
                  }}
                >
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>

          {/* Graphique + Activité */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem", marginBottom: "1.5rem" }}>
            {/* Graphique inscriptions */}
            <div style={{ background: "#F8F7F3", border: "1px solid #D4D3CF", borderRadius: "6px", padding: "1.4rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#080808",
                  }}
                >
                  Inscriptions — 7 derniers jours
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem",
                    color: "#9A9893",
                  }}
                >
                  Total : +47
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: "100px" }}>
                {CHART_DATA.map((bar) => (
                  <div
                    key={bar.day}
                    style={{
                      display: "flex",
                      flexDirection: "column" as const,
                      alignItems: "center",
                      gap: "0.4rem",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        background: "#080808",
                        borderRadius: "2px 2px 0 0",
                        width: "100%",
                        height: `${bar.height}px`,
                        transition: "height 0.5s ease",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        color: "#9A9893",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {bar.day}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activité récente */}
            <div style={{ background: "#F8F7F3", border: "1px solid #D4D3CF", borderRadius: "6px", padding: "1.4rem" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#080808",
                  marginBottom: "1rem",
                }}
              >
                Activité récente
              </div>
              {[
                { text: "Nouveau cours soumis pour validation — \"Réseaux\"", time: "Il y a 5 min", read: false },
                { text: "15 nouvelles inscriptions aujourd'hui", time: "Il y a 1h", read: false },
                { text: "Salle virtuelle terminée — INF325 (42 participants)", time: "Il y a 2h", read: true },
                { text: "Backup base de données effectué avec succès", time: "00:00", read: true },
              ].map((notif, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.9rem",
                    padding: "0.9rem 0",
                    borderBottom: i < 3 ? "1px solid #ECECEA" : "none",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: notif.read ? "#D4D3CF" : "#080808",
                      flexShrink: 0,
                      marginTop: "0.35rem",
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "0.84rem", color: "#5C5B58", lineHeight: 1.5 }}>{notif.text}</div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.62rem",
                        color: "#9A9893",
                        marginTop: "0.25rem",
                      }}
                    >
                      {notif.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tableau utilisateurs */}
          <div style={{ background: "#F8F7F3", border: "1px solid #D4D3CF", borderRadius: "6px", padding: "1.4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#080808",
                }}
              >
                Derniers utilisateurs inscrits
              </div>
              <button
                style={{
                  padding: "0.35rem 0.8rem",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  background: "transparent",
                  color: "#080808",
                  border: "1.5px solid #D4D3CF",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                Gérer tout
              </button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: "0.85rem" }}>
              <thead>
                <tr>
                  {["Utilisateur", "Email", "Rôle", "Inscription", "Statut", "Actions"].map((th) => (
                    <th
                      key={th}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase" as const,
                        color: "#9A9893",
                        padding: "0.7rem 1rem",
                        borderBottom: "2px solid #D4D3CF",
                        textAlign: "left" as const,
                        fontWeight: 400,
                      }}
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_USERS.map((user) => (
                  <tr
                    key={user.email}
                    style={{ transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#ECECEA")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "0.8rem 1rem", borderBottom: "1px solid #ECECEA" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "#080808",
                            color: "#F8F7F3",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}
                        >
                          {user.initials}
                        </div>
                        <strong style={{ color: "#080808" }}>{user.name}</strong>
                      </div>
                    </td>
                    <td style={{ padding: "0.8rem 1rem", borderBottom: "1px solid #ECECEA", fontSize: "0.82rem", color: "#9A9893" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "0.8rem 1rem", borderBottom: "1px solid #ECECEA" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.2rem 0.7rem",
                          borderRadius: "2px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.65rem",
                          textTransform: "uppercase" as const,
                          background: user.role === "Enseignant" ? "#FEF3E2" : "#E6F4EC",
                          color: user.role === "Enseignant" ? "#9A5A10" : "#1A7A42",
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "0.8rem 1rem",
                        borderBottom: "1px solid #ECECEA",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        color: "#5C5B58",
                      }}
                    >
                      {user.date}
                    </td>
                    <td style={{ padding: "0.8rem 1rem", borderBottom: "1px solid #ECECEA" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.2rem 0.7rem",
                          borderRadius: "2px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.65rem",
                          textTransform: "uppercase" as const,
                          background: user.status === "active" ? "#080808" : "#FEF3E2",
                          color: user.status === "active" ? "#F8F7F3" : "#9A5A10",
                        }}
                      >
                        {user.status === "active" ? "Actif" : "En attente"}
                      </span>
                    </td>
                    <td style={{ padding: "0.8rem 1rem", borderBottom: "1px solid #ECECEA" }}>
                      <button
                        style={{
                          padding: "0.25rem 0.6rem",
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase" as const,
                          background: user.status === "pending" ? "#080808" : "transparent",
                          color: user.status === "pending" ? "#F8F7F3" : "#080808",
                          border: "1.5px solid #D4D3CF",
                          borderRadius: "2px",
                          cursor: "pointer",
                        }}
                      >
                        {user.status === "pending" ? "Valider" : "Voir"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
