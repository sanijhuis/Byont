import fetchWithCredentials from "../utils/fetchWithCredentials";

export default async function getScanResults(slug: string) {
  console.log(slug);
  const res = await fetchWithCredentials(`http://localhost:3000/repo/${slug}`, {
    method: "GET",
  });
  console.log(res);
  const data = await res.json();
  console.log(data, "res");
  return data;
}
