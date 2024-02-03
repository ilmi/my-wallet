"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export const Item = ({ item }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState();
  const [activity, setActivity] = useState(item.activity);
  const [amount, setAmount] = useState(item.amount);
  const [status, setStatus] = useState(item.status);

  async function handleDelete() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/kd7RYJX2bPIj", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([item._id]),
    });
    const data = await res.json();

    router.refresh();
  }

  async function handleUpdate() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/kd7RYJX2bPIj", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: item._id,
        activity,
        amount,
        status,
        total: item.total - item.amount,
      }),
    });
    const data = await res.json();

    router.refresh();
    setEditMode(false);
  }

  if (editMode) {
    return (
      <tr>
        <td>
          <input
            className="input input-xs input-secondary input-bordered w-fit max-w-xs"
            placeholder="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </td>
        <td>
          <input
            className="input input-xs input-secondary input-bordered w-fit max-w-xs"
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </td>
        <td className="">
          <select
            className="select select-secondary select-bordered select-xs w-fit max-w-xs"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled value={""}></option>
            <option value={"Withdraw"}>Withdraw</option>
            <option value={"Income"}>Income</option>
          </select>
        </td>
        <td>
          <button
            className="btn btn-xs btn-outline btn-primary"
            onClick={handleUpdate}
          >
            Save
          </button>
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{item.activity}</td>
      <td>
        {item.status === "Withdraw" ? -`${item.amount}` : `${item.amount}`}
      </td>
      <td>
        {item.status === "Income" ? (
          <div className="badge badge-success badge-outline">Income</div>
        ) : (
          <div className="badge badge-warning badge-outline">Withdraw</div>
        )}
      </td>
      <td className=" flex items-center space-x-2">
        <button
          className="btn btn-xs btn-outline btn-info"
          onClick={() => setEditMode(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          Edit
        </button>
        <button
          className="btn btn-xs btn-outline btn-error"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete
        </button>
      </td>
    </tr>
  );
};
