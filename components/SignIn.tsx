"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { signIn } from "next-auth/react"; // Import direto do next-auth/react

import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // impede redirect automático
    });

    console.log("RES", res);

    if (!res?.error) {
      router.push("/"); // redireciona manualmente
    } else {
      setError("Credenciais inválidas.");
    }

    setLoading(false);
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <Input
        name="email"
        placeholder="Email"
        type="email"
        required
        autoComplete="email"
      />
      <div className="group flex items-center border border-gray-300 rounded-2xl focus-within:border-2 focus-within:border-primary">
        <Input
          name="password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          required
          autoComplete="current-password"
          className="border-none outline-none ring-0 focus:outline-none focus:ring-0"
        />
        <span
          className="px-2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </span>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
