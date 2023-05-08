"use client";

import getData from "../../../services/getAllRepo";
import fetchWithCredentials from "../../../utils/fetchWithCredentials";
import ButtonActivate from "../../button/button-activate";
import Paragraph from "../../text/paragraph";
import CardOutline from "../../ui/card/card-outline";
import { useToast } from "@/components/ui/toaster/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Repo = {
  name: string;
  hasWebhook: boolean;
};

const ListRepo = (): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const [repoNameVar, setRepoNameVar] = useState<string>("");
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    getData().then((res: Repo[]) => {
      const filteredRepos = res.filter((repo: Repo) => !repo.hasWebhook);
      setRepos(filteredRepos);
    });
  }, []);

  const activateWebHookGithub = async (repoName: string): Promise<boolean> => {
    setRepoNameVar(repoName);
    const res = await fetchWithCredentials(
      "http://localhost:3000/github/add-webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoName }),
      }
    );
    const data = await res.json();
    console.log(data.message);
    if (data.message === "Webhook created successfully") {
      toast({
        title: "you have activated your repository for scans.",
        description:
          "Your repository is now being scanned for vulnerabilities in your smart contract.",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction altText="Try again">
            <button
              onClick={async () => {
                await activateWebHookGithub(repoNameVar);
              }}
            >
              Try again
            </button>
          </ToastAction>
        ),
      });
    }

    return data.message === "Webhook created successfully";
  };

  return (
    <section className="flex flex-col gap-1">
      {repos.map((repo: Repo, index: number) => (
        <CardOutline key={index}>
          <div className="flex flex-row items-center justify-between px-1 py-[5px]">
            <Paragraph
              className="flex items-center"
              color="white"
              size="md"
              fontWeight="medium"
            >
              {repo.name}
            </Paragraph>
            <ButtonActivate onClick={() => activateWebHookGithub(repo.name)} />
          </div>
        </CardOutline>
      ))}
    </section>
  );
};

export default ListRepo;
