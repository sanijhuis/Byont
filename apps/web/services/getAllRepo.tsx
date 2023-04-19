export default async function getData() {
  const res = await fetch("http://localhost:3000/github/repos", {
    method: "GET",
    // credentials: "include",
    next: { revalidate: 3600 },
    cache: "no-store",
  });

  return res.json();
}
