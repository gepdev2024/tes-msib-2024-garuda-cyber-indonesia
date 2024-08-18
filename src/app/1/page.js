"use client";

import { useState } from "react";
import Navbar from "../ui/nav";

export default function No1() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  function maxProduct(nums) {
    if (nums.length < 2) {
      return "Minimum of 2 elements required";
    }

    let max1 = Math.max(nums[0], nums[1]);
    let max2 = Math.min(nums[0], nums[1]);
    let min1 = Math.min(nums[0], nums[1]);
    let min2 = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
      const num = nums[i];
      if (num > max1) {
        max2 = max1;
        max1 = num;
      } else if (num > max2) {
        max2 = num;
      }

      if (num < min1) {
        min2 = min1;
        min1 = num;
      } else if (num < min2) {
        min2 = num;
      }
    }
    return Math.max(max1 * max2, min1 * min2);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const nums = input.split(",").map((num) => parseFloat(num.trim()));
    const product = maxProduct(nums);
    setResult(product);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
        <h1 className="text-white text-4xl font-bold mb-8">
          Maximum Product Calculator
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label htmlFor="numbers" className="text-white text-lg mb-4">
            Enter numbers separated by commas:
          </label>
          <input
            id="numbers"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-gray-300 rounded-lg py-2 px-4 mb-4 w-80 text-gray-500"
            placeholder="e.g., 1, -3, 20, 5, -20"
          />
          <button
            type="submit"
            className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Calculate
          </button>
        </form>
        <div className="mt-3 text-white text-lg font-semibold text-center">
          <p>Maximum Product:</p>
          {result !== null && <p>{result}</p>}
        </div>
      </div>
    </>
  );
}
