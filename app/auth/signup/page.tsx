import { SignupForm } from "@/components/auth/signup-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function SignupPage() {
  return (
    <AuthLayout title="Join the CyberZone" subtitle="Begin your journey to becoming a cybersecurity expert">
      <SignupForm />
    </AuthLayout>
  )
}
