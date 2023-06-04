"use client";

import SingleScanResult from "./single-scan-result";
import { Button } from "@/components/ui/button/button";
import getScanResults from "@/services/getScanResults";
import { useEffect, useState } from "react";
import { z } from "zod";

type MainScanResultsProps = React.ComponentProps<"section"> & {
  slug: string;
};

export const OutputSchema = z.object({
  output: z.string(),
  scanner: z.string(),
  filename: z.string(),
});
export type Output = z.infer<typeof OutputSchema>;

const scanResultSchema = z.object({
  id: z.number(),
  repoId: z.number(),
  scanner: z.string(),
  filename: z.string(),
  output: z.array(OutputSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Define the shape of the entire response data
const scanResultsSchema = z.array(scanResultSchema);

// Use the schema to create a type alias for the data
type ScanResultsData = z.infer<typeof scanResultsSchema>;

const MainScanResults = ({ slug, ...props }: MainScanResultsProps) => {
  const [data, setData] = useState<ScanResultsData>();
  const [selected, setSelected] = useState<number>();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    getScanResults(slug).then(res => {
      console.log("newres:", res);

      // if (res.length !== 0) {
      //   const parsedData = scanResultsSchema.parse(res);
      //   setData(sortByDate(parsedData));

      //   if (sortByDate(parsedData)[0]?.id !== undefined) {
      //     setSelected(sortByDate(parsedData)[0].id);
      //   }
      // } else {
      //   setChecked(true);
      // }
    });
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // const sortByDate = (data: ScanResultsData) =>
  //   data
  //     .sort(({ createdAt: a }, { createdAt: b }) =>
  //       a < b ? -1 : a > b ? 1 : 0
  //     )
  //     .reverse();

  // const formatDate = (input: string) => {
  //   const date = new Date(input);
  //   const formattedDate = date.toLocaleString("en-US", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: false,
  //   });

  //   return formattedDate;
  // };

  // if (checked) return <p>no data</p>;

  // if (!data) return <p>loading...</p>;

  return (
    <div></div>
    // <section className="min-h-screen bg-[#111] py-5" {...props}>
    //   <div className="container grid grid-cols-3 gap-3">
    //     <div className="col-span-1 flex max-w-[250px] flex-col gap-1">
    //       {data.map((item: ScanResultsData[number], index: number) => (
    //         <Button
    //           className="w-full"
    //           key={index}
    //           onClick={() => setSelected(item.id)}
    //         >
    //           {formatDate(item.createdAt)}
    //         </Button>
    //       ))}
    //     </div>
    //     <div className="col-span-2">
    //       {/* @ts-ignore */}
    //       <SingleScanResult param={slug} id={selected} />
    //     </div>
    //   </div>
    // </section>
  );
};

export default MainScanResults;
