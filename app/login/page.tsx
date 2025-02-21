"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      showNotification(result.error, "error");
    } else {
      showNotification("Login successful!", "success");
      router.push("/");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-[500px] px-3 py-2 border rounded-xl"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-[500px] px-3 py-2 border rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-[500px] bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-600">
          Login
        </button>
        <p className="text-center mt-4">
          Don&apos;t have an account? &nbsp;
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
