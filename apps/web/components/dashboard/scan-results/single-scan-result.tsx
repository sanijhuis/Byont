import getSingleScanResults from "@/services/getSingleScanResults";
import { useEffect, useState } from "react";
import { z } from "zod";

type SingleScanResultsProps = React.ComponentProps<"section"> & {
  id: number;
  param: string;
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

// Use the schema to create a type alias for the data
type ScanResultsData = z.infer<typeof scanResultSchema>;

const SingleScanResult = ({ id, param, ...props }: SingleScanResultsProps) => {
  const [data, setData] = useState<ScanResultsData>();

  useEffect(() => {
    getSingleScanResults(param, id).then(res => {
      console.log(res);
      const parsedData = scanResultSchema.parse(res);
      setData(parsedData);
    });
  }, [id]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  //   function formatJson(errorString: any) {
  //     let sanitizedJsonString = errorString;
  //     if (sanitizedJsonString.startsWith("~")) {
  //       sanitizedJsonString = sanitizedJsonString.substring(1);
  //     }
  //     const json = JSON.parse(sanitizedJsonString);

  //     console.log(json);

  //     return json;
  //   }
  if (!data) return <p>loading...</p>;

  return (
    <section {...props}>
      <div className="border-[1px] border-green bg-softBlack p-2">
        {/* <pre>{JSON.stringify(formatJson(data.output))}</pre> */}
      </div>
    </section>
  );
};

export default SingleScanResult;
