"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      showNotification("Registration successful! Please log in.", "success");

      router.push("/login");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Registration failed",
        "error",
      );
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-bold">Register</h1>
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
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="w-[500px] px-3 py-2 border rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-[500px] bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-600">
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
