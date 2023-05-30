"use client";

import LoadingIcon from "../animations/loading-icon";
import CardRepo from "./card-repo";
import getData from "@/services/getAllRepo";
import { useState, useEffect } from "react";

type Repo = {
  name: string;
  owner: string;
  hasWebhook: boolean;
};

interface Props {
  grid: boolean;
}

const ListRepoActive = ({ grid }: Props): JSX.Element => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    getData().then((res: Repo[]) => {
      console.log(res);
      const filteredRepos = res.filter((repo: Repo) => repo.hasWebhook);
      setRepos(filteredRepos);
      console.log(repos);
    });
  }, []);

  useEffect(() => {
    console.log(repos);
  }, [repos]);

  if (!repos.length)
    return (
      <div className="col-span-3 h-[80vh]">
        <LoadingIcon />
      </div>
    );

  return (
    <>
      {repos.map((repo: Repo, index: number) => (
        <CardRepo
          owner={repo.owner}
          key={index}
          title={repo.name}
          grid={grid}
        />
      ))}
    </>
  );
};

export default ListRepoActive;
