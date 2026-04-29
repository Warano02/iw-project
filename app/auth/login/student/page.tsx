// app/auth/login/student/page.tsx
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Connexion Étudiant — ClassHub",
  description: "Accédez à votre espace étudiant ClassHub",
};

export default function StudentLoginPage() {
  return <LoginForm role="student" />;
}
