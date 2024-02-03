"use client";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";

export const CreateItem = () => {
  const router = useRouter();
  const [createMode, setCreateMode] = useState();
  const [activity, setActivity] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");

  async function handleCreate() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/kd7RYJX2bPIj", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ activity, amount, status, total: 0 }]),
    });

    router.refresh();
    setCreateMode(false);
  }

  function handleCancel() {
    setActivity("");
    setAmount(0);
    setStatus("");
    setCreateMode(false);
  }
  if (createMode) {
    return (
      <main className="border-dashed border-2 border-gray-300 rounded-md p-3">
        <div className="flex items-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
          <h5 className="text-sm font-semibold ml-2">Add Activity</h5>
        </div>
        <div className="space-y-2">
          <input
            className="input input-xs input-secondary input-bordered w-full"
            placeholder="activity"
            onChange={(e) => setActivity(e.target.value)}
          />
          <input
            className="input input-xs input-secondary input-bordered w-full"
            type="number"
            placeholder="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="select select-secondary select-bordered select-xs w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled value={status}></option>
            <option value={"Withdraw"}>Withdraw</option>
            <option value={"Income"}>Income</option>
          </select>

          <button
            className="btn btn-xs btn-outline btn-success mr-2"
            onClick={handleCreate}
          >
            Add
          </button>
          <button
            className="btn btn-xs btn-outline btn-ghost"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </main>
    );
  }
  return (
    <div>
      <button
        className="btn btn-sm btn-accent"
        onClick={() => setCreateMode(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Add
      </button>
    </div>
  );
};
