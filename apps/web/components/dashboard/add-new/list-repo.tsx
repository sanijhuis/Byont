"use client";

import getData from "../../../services/getAllRepo";
import fetchWithCredentials from "../../../utils/fetchWithCredentials";
import ButtonActivate from "../../button/button-activate";
import Paragraph from "../../text/paragraph";
import CardOutline from "../../ui/card/card-outline";
import { useEffect, useState } from "react";

const ListRepo = () => {
  const [repos, setRepos] = useState<
    Array<{ name: string; hasWebhook: boolean }>
  >([]);
  const [hiddenRepos, setHiddenRepos] = useState<Set<string>>(new Set());
  useEffect(() => {
    getData().then(res => {
      setRepos(res);
    });
  }, []);

  const activateWebHookGithub = async (repo: string) => {
    const res = await fetchWithCredentials(
      "http://localhost:3000/github/add-webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoName: repo }),
      }
    );
    const data = await res.json();
    if (data.message === "Webhook created successfully") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className="flex flex-col gap-1">
      {repos?.map(
        (item: { name: string; hasWebhook: boolean }, index: number) => (
          <CardOutline key={index}>
            <div className="flex flex-row items-center justify-between px-1 py-[5px]">
              <Paragraph
                className="flex items-center"
                color="white"
                size="md"
                fontWeight="medium"
              >
                {item.name}
              </Paragraph>

              {!item.hasWebhook && !hiddenRepos.has(item.name) && (
                <ButtonActivate
                  onClick={async () => {
                    const success = await activateWebHookGithub(item.name);
                    if (success) {
                      setHiddenRepos(prev => new Set([...prev, item.name]));
                    }
                  }}
                />
              )}
            </div>
          </CardOutline>
        )
      )}
    </section>
  );
};

export default ListRepo;
