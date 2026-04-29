// app/auth/login/teacher/page.tsx
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Connexion Enseignant — ClassHub",
  description: "Accédez à votre espace enseignant ClassHub",
};

export default function TeacherLoginPage() {
  return <LoginForm role="teacher" />;
}
