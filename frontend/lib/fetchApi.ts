import qs from "qs";

export async function fetchApi(path: string, query: Record<string, any> = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  
  const url = new URL(path, baseUrl);

  url.search = qs.stringify(query);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }

  const data = await res.json();
  console.log(data);

  return data;
}
