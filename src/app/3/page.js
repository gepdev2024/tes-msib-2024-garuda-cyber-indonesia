"use client";

import { useState } from "react";
import Navbar from "../ui/nav";

const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

const validateCapacities = (capacities) => {
  return capacities.every((cap) => cap > 0 && cap < 50 && isPrime(cap));
};

const minTrucks = (Y, capacities) => {
  const sortedCapacities = [...capacities].sort((a, b) => b - a);

  let total = 0;
  const result = {};
  let remaining = Y;

  for (const cap of sortedCapacities) {
    if (remaining >= cap) {
      result[cap] = Math.floor(remaining / cap);
      total += result[cap];
      remaining -= result[cap] * cap;
    } else {
      result[cap] = 0;
    }
  }

  return `Truck 1 (${capacities[0]} ton) : ${
    result[capacities[0]] || 0
  } pcs , Truck 2 (${capacities[1]} ton) : ${
    result[capacities[1]] || 0
  } pcs, Truck 3 (${capacities[2]} ton) : ${
    result[capacities[2]] || 0
  } pcs, Total trucks: ${total}`;
};

export default function Page3() {
  const [capacity1, setCapacity1] = useState("");
  const [capacity2, setCapacity2] = useState("");
  const [capacity3, setCapacity3] = useState("");
  const [load, setLoad] = useState("");
  const [message, setMessage] = useState("");

  const handleCalculate = () => {
    const capacities = [
      parseInt(capacity1),
      parseInt(capacity2),
      parseInt(capacity3),
    ];

    if (validateCapacities(capacities)) {
      const result = minTrucks(parseInt(load), capacities);
      setMessage(result);
    } else {
      setMessage(
        "Please enter valid prime numbers between 0 and 50 for truck capacities."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
        <h1 className="text-white text-4xl font-bold mb-8">
          Truck Capacity Calculator (ton)
        </h1>
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-80">
          <label htmlFor="load" className="text-gray-700 mb-2">
            Total Load (Y)
          </label>
          <input
            id="load"
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-full text-gray-500"
            required
          />
          <label htmlFor="capacity1" className="text-gray-700 mb-2">
            Truck Capacity 1
          </label>
          <input
            id="capacity1"
            type="number"
            value={capacity1}
            onChange={(e) => setCapacity1(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-full text-gray-500"
            required
          />
          <label htmlFor="capacity2" className="text-gray-700 mb-2">
            Truck Capacity 2
          </label>
          <input
            id="capacity2"
            type="number"
            value={capacity2}
            onChange={(e) => setCapacity2(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-full text-gray-500"
            required
          />
          <label htmlFor="capacity3" className="text-gray-700 mb-2">
            Truck Capacity 3
          </label>
          <input
            id="capacity3"
            type="number"
            value={capacity3}
            onChange={(e) => setCapacity3(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-full text-gray-500"
            required
          />
          <button
            type="button"
            onClick={handleCalculate}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Calculate
          </button>
        </div>
        {message && (
          <div className="mt-6 text-white text-lg font-semibold">
            <p>{message}</p>
          </div>
        )}
      </div>
    </>
  );
}
