"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../ui/nav";
import Link from "next/link";

export default function Page2() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 5) {
      setMessage("Password must be at least 5 characters long.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, referralCode }),
      });

      const result = await res.json();
      setMessage(result.message || result.error);

      if (res.ok) {
        router.push("/2/success");
      }
    } catch (error) {
      setMessage("An error occurred while registering the user.");
    }
  };

  return (
    <>
      <Navbar />
      <Link href="/2/success">
        <button className="absolute top-5 right-5 mb-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
          See All Users First!
        </button>
      </Link>
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
        <h1 className="text-white text-4xl font-bold mb-8">Register</h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
        >
          <label htmlFor="username" className="text-gray-700 mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-80 text-gray-500"
            required
          />
          <label htmlFor="password" className="text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-80 text-gray-500"
            required
          />
          <label htmlFor="confirmPassword" className="text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-80 text-gray-500"
            required
          />
          <label htmlFor="referralCode" className="text-gray-700 mb-2">
            Referral Code (Optional)
          </label>
          <input
            id="referralCode"
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-80 text-gray-500"
          />
          <button
            type="submit"
            className="bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
        </form>
        {message && (
          <div className="mt-6 text-white text-lg font-semibold">
            <p>{message}</p>
          </div>
        )}
      </div>
    </>
  );
}
