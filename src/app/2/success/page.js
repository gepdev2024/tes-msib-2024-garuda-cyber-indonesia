"use client";

import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; // Import the back arrow icon
import { useRouter } from "next/navigation";
import Navbar from "@/app/ui/nav";

export default function SuccessPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsers();
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  if (error) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
        <h1 className="text-white text-4xl font-bold mb-8">Error</h1>
        <p className="text-white text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <button
        onClick={handleBackClick}
        className="absolute top-5 right-5 mb-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        <ArrowLeftIcon className="h-5 w-5 inline-block mr-2" />
        Back
      </button>
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
        {users.length === 0 ? (
          <h1 className="text-white text-4xl font-bold mb-8">No Users Found</h1>
        ) : (
          <>
            <h1 className="text-white text-4xl font-bold mb-8">All Users</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-4xl">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-gray-700">Username</th>
                    <th className="border px-4 py-2 text-gray-700">
                      Referral Code
                    </th>
                    <th className="border px-4 py-2 text-gray-700">
                      Referred By
                    </th>
                    <th className="border px-4 py-2 text-gray-700">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.username}>
                      <td className="border px-4 py-2 text-gray-700">
                        {user.username}
                      </td>
                      <td className="border px-4 py-2 text-gray-700">
                        {user.referral_code}
                      </td>
                      <td className="border px-4 py-2 text-gray-700">
                        {user.referred_by || "null"}
                      </td>
                      <td className="border px-4 py-2 text-gray-700">
                        {user.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
