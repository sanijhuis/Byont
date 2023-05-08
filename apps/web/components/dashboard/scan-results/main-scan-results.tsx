"use client";

import getScanResults from "@/services/getScanResults";
import { useEffect, useState } from "react";

type MainScanResultsProps = React.ComponentProps<"section"> & {
  slug: string;
};

const MainScanResults = ({ slug, ...props }: MainScanResultsProps) => {
  //   const [data, setData] = useState<>([]);

  useEffect(() => {
    getScanResults(slug).then(res => {
      //   setData(res);
      //   console.log(data);
    });
  }, []);

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  return (
    <section {...props}>
      <div className="container grid grid-cols-3 gap-3">
        <div className="col-span-1"></div>
        <div className="col-span-2"></div>
      </div>
    </section>
  );
};

export default MainScanResults;
