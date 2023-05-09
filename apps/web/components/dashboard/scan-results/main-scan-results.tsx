"use client";

import SingleScanResult from "./single-scan-result";
import { Button } from "@/components/ui/button/button";
import getScanResults from "@/services/getScanResults";
import { useEffect, useState } from "react";
import { z } from "zod";

type MainScanResultsProps = React.ComponentProps<"section"> & {
  slug: string;
};

const scanResultSchema = z.object({
  id: z.number(),
  repoId: z.number(),
  scanner: z.string(),
  filename: z.string(),
  output: z.string(),
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

  useEffect(() => {
    getScanResults(slug).then(res => {
      const parsedData = scanResultsSchema.parse(res);
      setData(parsedData);
    });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const formatDate = (input: string) => {
    const date = new Date(input);
    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    return formattedDate;
  };

  if (!data) return <p>loading...</p>;

  return (
    <section className="py-5" {...props}>
      <div className="container grid grid-cols-3 gap-3">
        <div className="col-span-1 flex max-w-[250px] flex-col gap-1">
          {data.map((item: ScanResultsData[number], index: number) => (
            <Button
              className="w-full"
              key={index}
              onClick={() => setSelected(item.id)}
            >
              {formatDate(item.createdAt)}
            </Button>
          ))}
        </div>
        <div className="col-span-2">
          {/* @ts-ignore */}
          <SingleScanResult id={selected} />
        </div>
      </div>
    </section>
  );
};

export default MainScanResults;
