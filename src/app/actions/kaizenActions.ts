"use server";

import { getToken } from "next-auth/jwt";
import { getTokenWorkaround } from "./authActions";

export async function getKaizenEntries() {
  const token = await getTokenWorkaround();
  const res = await fetch("http://localhost:5000/api/kaizen");
  if (!res.ok) {
    throw new Error("Failed to fetch kaizen entries");
  }
  return await res.json();
}

export async function updateKaizenEntry(id: string) {
  const data = { id: id };
  const res = await fetch(`http://localhost:5000/api/kaizen/${id}`, {
    method: "PUT",
    headers: {},
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update kaizen entry");
  }
  return await res.json();
}
