import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
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
    console.log(data?.output[0].output);
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
      <Tabs defaultValue={data.output[0].filename}>
        <TabsList>
          {data.output.map((item, index: number) => (
            <TabsTrigger key={index} value={item.filename}>
              {item.filename}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.output.map((item, index: number) => (
          <TabsContent key={index} value={item.filename}>
            <div className="rounded-md border-[1px] border-green bg-softBlack p-2">
              {/* <pre>{JSON.stringify(formatJson(data.output))}</pre> */}
              {item.output}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default SingleScanResult;
