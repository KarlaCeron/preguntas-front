const API_URL = "http://localhost:4000";

export async function pingServer() {
  const res = await fetch(API_URL);
  return res.text();
}