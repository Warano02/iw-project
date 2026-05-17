import LoginForm from "@/components/auth/LoginForm"
import { Input } from "@/components/ui/input"

export const metadata={
    title:"Connexion Student"
}
function LoginStudent() {
  return (
        <main className="p-40">
          <LoginForm />
        </main>
        
  )
}

export default LoginStudent