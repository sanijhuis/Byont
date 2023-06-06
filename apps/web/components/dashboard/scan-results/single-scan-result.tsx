import ChatgptScanResult from "./chatgpt-scan-result";
import MythrilScanResult from "./mythril-scan-result";
import SlitherScanResult from "./slither-scan-result";
import LoadingIcon from "@/components/animations/loading-icon";
import MintNFTComponent from "@/components/nft/mint-nft";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { Button } from "@/components/ui/button/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { cn } from "@/lib/merge-tailwind";
import getSingleScanResults from "@/services/getSingleScanResults";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import * as React from "react";
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

const sortScanner = [
  {
    value: "slither",
    label: "Slither",
  },
  {
    value: "mythril",
    label: "Mythril",
  },
  {
    value: "chatgpt",
    label: "ChatGPT",
  },
] as const;

const SingleScanResult = ({ id, param, ...props }: SingleScanResultsProps) => {
  const [data, setData] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>("mythril");

  const [nameOutput, setNameOutput] = useState<string | undefined>();
  const [jsonOutput, setJsonOutput] = useState<any | undefined>();
  const [date, setDate] = useState<any | undefined>();
  const [level, setLevel] = useState<any | undefined>();

  useEffect(() => {
    console.log(param, id);
    getSingleScanResults(param, id).then(res => {
      console.log(res);
      setData(res);
      setNameOutput(res.scanOutputItems[0].filename),
        setJsonOutput(res.scanOutputItems[0].mythril);

      let date = new Date(res.createdAt);
      let options: any = {
        timeZone: "Europe/Amsterdam",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };
      let formatter = new Intl.DateTimeFormat("en-US", options);
      setDate(formatter.format(date));

      const issues = res.scanOutputItems[0].mythril?.issues;
      if (
        res.scanOutputItems[0].mythril?.success &&
        res.scanOutputItems[0].mythril?.error === null &&
        issues?.length === 0
      ) {
        setLevel("High");
      } else if (!res.scanOutputItems[0].mythril?.success) {
        setLevel("Low");
      } else {
        if (issues?.length > 1) {
          setLevel("High");
        } else if (issues?.length >= 2) {
          setLevel("Medium");
        } else {
          setLevel("Low");
        }
      }
    });
  }, [id]);

  if (!data) return <LoadingIcon />;

  if (!data.scanOutputItems.length) return;

  console.log(data);
  console.log(nameOutput);
  console.log(jsonOutput);

  return (
    <section {...props}>
      <Tabs defaultValue={data.scanOutputItems[0].filename}>
        <div className="flex flex-wrap">
          <TabsList className="col-span-2">
            {data.scanOutputItems.map((item: any, index: number) => (
              <TabsTrigger
                key={index}
                value={item.filename}
                onClick={() => {
                  setNameOutput(item.filename);
                  setJsonOutput(item.mythril);
                  const issues = item.mythril?.issues;

                  if (
                    item.mythril?.success &&
                    item.mythril?.error === null &&
                    issues?.length === 0
                  ) {
                    setLevel("High");
                  } else if (!item.mythril?.success) {
                    setLevel("Low");
                  } else {
                    if (issues?.length > 1) {
                      setLevel("High");
                    } else if (issues?.length >= 2) {
                      setLevel("Medium");
                    } else {
                      setLevel("Low");
                    }
                  }
                }}
              >
                {item.filename}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-2 flex w-full items-center">
            <MintNFTComponent
              nameOutput={nameOutput}
              jsonOutput={jsonOutput}
              date={date}
              level={level}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="col-span-1  w-[250px] justify-between bg-white"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  defaultValue={value}
                >
                  {value
                    ? sortScanner.find(item => item.value === value)?.label
                    : "Select scanner..."}
                  <ChevronsUpDown className="opacity-50 ml-2 h-2 w-2 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput placeholder="Search scanner..." />
                  <CommandEmpty>No scanner found.</CommandEmpty>
                  <CommandGroup>
                    {sortScanner.map(item => (
                      <CommandItem
                        key={item.value}
                        onSelect={currentValue => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            "ml-auto mr-2 h-2 w-2",
                            value === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div></div>
        {data.scanOutputItems.map((item: any, index: number) => (
          <TabsContent key={index} value={item.filename}>
            <div className="flex flex-col gap-2 rounded-md border-[1px] border-green bg-black p-2">
              {value === "mythril" ? (
                <>
                  {/* @ts-ignore */}
                  <MythrilScanResult data={item.mythril} />
                </>
              ) : value === "slither" ? (
                <>
                  {/* @ts-ignore */}
                  <SlitherScanResult data={item.slither} />
                </>
              ) : (
                <>
                  <ChatgptScanResult data={item.chatgpt} />
                </>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default SingleScanResult;
