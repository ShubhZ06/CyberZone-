import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back, Cyber Warrior"
      subtitle="Access your training modules and continue your cybersecurity journey"
    >
      <LoginForm />
    </AuthLayout>
  )
}
