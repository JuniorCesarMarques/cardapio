"use client";

import { signIn } from "@/lib/auth"; // importado do seu NextAuth()
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {

  const [showPassword, setShowPassword] = useState<boolean>(false);

    
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      redirect: true, // ou false, se quiser redirecionar manualmente
      email,
      password,
    });
  }

  return (
    <form className="space-y-4" action={handleLogin}>
      <Input
        name="email"
        placeholder="Email"
        type="email"
        required
        autoComplete="email"
      />
      <Input
        name="password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        required
        autoComplete="current-password"
      />
      <span onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOff /> : <Eye />}
      </span>
      <Button className="w-full" type="submit">
        Entrar
      </Button>
    </form>
  );
}
