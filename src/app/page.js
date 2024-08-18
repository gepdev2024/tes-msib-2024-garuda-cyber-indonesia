import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <h1 className="text-white text-4xl font-bold mb-8">
          TES MSIB 2024 GARUDA CYBER INDONESIA
        </h1>
        <div className="border-[3px] border-solid border-white rounded p-5">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">Pertanyaan</h2>
          <div className="flex space-x-4">
            <Link href="/1">
              <button className="bg-white text-gray-800 font-semibold py-3 px-10 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                1
              </button>
            </Link>
            <Link href="/2">
              <button className="bg-white text-gray-800 font-semibold py-3 px-10 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                2
              </button>
            </Link>
            <Link href="/3">
              <button className="bg-white text-gray-800 font-semibold py-3 px-10 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                3
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
