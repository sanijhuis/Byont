import fetchWithCredentials from "../utils/fetchWithCredentials";

export default async function getSingleScanResults(slug: string, id: number) {
  console.log(slug);
  const res = await fetchWithCredentials(
    `http://localhost:3000/repo/${slug}/${id}`,
    {
      method: "GET",
    }
  );
  console.log(res);
  const data = await res.json();
  console.log(data, "res");
  return data;
}
