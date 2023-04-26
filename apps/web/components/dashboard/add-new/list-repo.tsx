"use client";

import getData from "../../../services/getAllRepo";
import fetchWithCredentials from "../../../utils/fetchWithCredentials";
import ButtonActivate from "../../button/button-activate";
import Paragraph from "../../text/paragraph";
import CardOutline from "../../ui/card/card-outline";
import { useEffect, useState } from "react";

const ListRepo = () => {
  const [data, setData] = useState<string[]>();
  useEffect(() => {
    getData().then(res => {
      setData(res);
      console.log(res, "res");
    });
  }, []);

  const activateWebHookGithub = async (repo: string) => {
    console.log(repo);
    const res = await fetchWithCredentials("http://localhost:3000/webhook", {
      method: "POST",
      body: repo,
    });
    const data = await res.json();
    console.log(data, "res");
    return data;
  };

  return (
    <section className="flex flex-col gap-1">
      {data?.map((item: string, index: number) => (
        <CardOutline key={index}>
          <div className="flex flex-row items-center justify-between px-1 py-[5px]">
            <Paragraph
              className="flex items-center"
              color="white"
              size="md"
              fontWeight="medium"
            >
              {item}
            </Paragraph>

            <ButtonActivate onClick={() => activateWebHookGithub(item)} />
          </div>
        </CardOutline>
      ))}
    </section>
  );
};

export default ListRepo;
