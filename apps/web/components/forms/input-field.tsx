"use client";

import InViewFadeIn from "../animations/inview-fade-in";
import MythrilScanResult from "../dashboard/scan-results/mythril-scan-result";
import SlitherScanResultSingle from "../dashboard/scan-results/slither-scan-result-single";
import { toast } from "../ui/toaster/use-toast";
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
import { cn } from "@/lib/merge-tailwind";
import fetchWithCredentials from "@/utils/fetchWithCredentials";
import { Loader2 } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const sortScanner = [
  {
    value: "slither",
    label: "Slither",
  },
  {
    value: "mythril",
    label: "Mythril",
  },
] as const;

type FormData = {
  file: FileList;
};

const InputFile = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>();
  const [scanResult, setScanResult] = useState<any>();
  const [data, setData] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  console.log(value);

  const FetchErrrorMessage = () => {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const file = data.file[0];
      const formData = new FormData();
      formData.append("file", file);

      const slitherUrl = "http://localhost:3000/file/uploadSlither";
      const mythrilUrl = "http://localhost:3000/file/uploadMythril";

      const url = value === "slither" ? slitherUrl : mythrilUrl;

      const res = await fetchWithCredentials(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        FetchErrrorMessage();
        throw new Error(`HTTP error! status: ${res.status}`);
      } else {
        const text = await res.text();
        if (value === "slither") {
          setLoading(false);
          setData(JSON.parse(text));
          console.log(JSON.parse(text));
        } else {
          setLoading(false);
          let parsedJson = JSON.parse(text);

          let innerJsonString = parsedJson.data.substring(1);
          let innerJson = JSON.parse(innerJsonString);
          setData(innerJson);
          console.log(innerJson);
        }
      }
    } catch (error) {
      FetchErrrorMessage();
      setLoading(false);
      console.error("Failed to upload file", error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="container flex flex-col items-center">
        <InViewFadeIn delay={1.2} time={1}>
          <div className="rounded-xl border-[1px] border-white/20 bg-black px-3 py-4 md:min-w-[402px]">
            <h3 className="mb-2 text-center text-20 font-medium uppercase text-white">
              scan a smart contract
            </h3>
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between bg-white"
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
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                            setData(undefined);
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

              {value && (
                <>
                  <div className="my-3 h-[1px] w-full bg-white/40"></div>
                  <label className=" block" htmlFor="">
                    <input
                      className="text-sm file:text-sm block w-full
      text-slate-500 file:mr-4 file:rounded-xl
      file:border-0 file:bg-white
      file:px-3 file:py-[10px]
      file:font-semibold file:text-black
      hover:file:opacity-80
    "
                      type="file"
                      placeholder="Add a smart contract"
                      accept=".sol"
                      {...register("file", {})}
                    />
                  </label>

                  <button
                    className="mx-auto mt-3 h-5 w-full rounded-xl bg-white px-2 text-black transition-all hover:opacity-80"
                    type="submit"
                  >
                    {loading ? (
                      <Loader2 className="mx-auto h-2 w-2 animate-spin" />
                    ) : (
                      "Check my smart contract"
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </InViewFadeIn>
      </div>
      {data && (
        <section className="mx-10 mt-4 flex flex-col gap-2 rounded-md border-[1px] border-green bg-black p-2">
          {!data && loading && (
            <div className="flex flex-col items-center">
              <Loader2 className="mx-auto h-2 w-2 animate-spin" />
              <h4 className="text-16 text-white">Loading...</h4>
            </div>
          )}

          {data && value === "slither" && (
            <SlitherScanResultSingle data={data.data} />
          )}
          {data && value === "mythril" && <MythrilScanResult data={data} />}
        </section>
      )}
    </>
  );
};

export default InputFile;
