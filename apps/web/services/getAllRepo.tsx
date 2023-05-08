import fetchWithCredentials from "../utils/fetchWithCredentials";

export default async function getData() {
  const res = await fetchWithCredentials("http://localhost:3000/github/repos", {
    method: "GET",
  });

  const data = await res.json();
  console.log(data, "res");
  return data;
}
