import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
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

  function formatJson(errorString: any) {
    let sanitizedJsonString = errorString;
    if (sanitizedJsonString?.startsWith("~")) {
      sanitizedJsonString = sanitizedJsonString.substring(1);
    }
    const json = JSON.parse(sanitizedJsonString);

    console.log(json);

    return json;
  }
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
            <div className="flex flex-col gap-2 rounded-md border-[1px] border-green bg-softBlack p-2">
              {item.output && Object.keys(item.output).length > 0 ? (
                <Accordion type="single" collapsible>
                  {formatJson(item.output).success ? (
                    formatJson(item.output).issues.map(
                      (issue: any, index: number) => (
                        <AccordionItem
                          className="rounded-md bg-white px-1"
                          key={index}
                          value={index.toString()}
                        >
                          <AccordionTrigger className="flex flex-row">
                            <span className="flex w-1/2">
                              Line: {issue.lineno}
                            </span>
                            <span className="flex w-1/2">
                              Severity: {issue.severity}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            {issue.title && (
                              <>
                                <p className="pb-[5px] text-15 font-semibold text-black">
                                  Title
                                </p>
                                <p className="pr-2 text-14 font-normal text-black">
                                  {issue.title}
                                </p>
                                <div className="my-[15px] h-[1px] w-full bg-black"></div>
                              </>
                            )}
                            {issue.description && (
                              <>
                                <p className="pb-[5px] text-15 font-semibold text-black">
                                  Description
                                </p>
                                <p className="pr-2 text-14 font-normal text-black">
                                  {issue.description}
                                </p>
                                <div className="my-[15px] h-[1px] w-full bg-black"></div>
                              </>
                            )}

                            {issue.code && (
                              <>
                                <p className="pb-[5px] text-15 font-semibold text-black">
                                  Code
                                </p>
                                <p className="text-14 font-normal text-black">
                                  {issue.code}
                                </p>
                                <div className="my-[15px] h-[1px] w-full bg-black"></div>
                              </>
                            )}

                            {issue.function && (
                              <>
                                <p className="pb-[5px] text-15 font-semibold text-black">
                                  Function
                                </p>
                                <p className="text-14 font-normal text-black">
                                  {issue.function}
                                </p>
                              </>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )
                  ) : (
                    <div>
                      <p className="text-15 text-white">
                        {formatJson(item.output).error}
                      </p>
                    </div>
                  )}
                </Accordion>
              ) : (
                <div className="text-16 font-semibold text-white">
                  No issues found.
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default SingleScanResult;
