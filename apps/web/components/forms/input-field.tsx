"use client";

import Paragraph from "../text/paragraph";
import { ToastAction } from "../ui/toaster/toast";
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
import { useState } from "react";
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
  const [scanResult, setScanResult] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(); // Assign type to useForm

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
        console.log(text);
        if (text) {
          try {
            const json = JSON.parse(text);
            setScanResult(json);
            setLoading(false);
            toast({
              title: "The scan has been completed.",
              description:
                "Your smart contract has been scanned for vulnerabilities.",
            });
          } catch (error) {
            FetchErrrorMessage();
            setLoading(false);
            console.error("Failed to parse JSON", error);
          }
        } else {
          FetchErrrorMessage();
          setLoading(false);
          console.log("Empty response");
        }
      }
    } catch (error) {
      FetchErrrorMessage();
      setLoading(false);
      console.error("Failed to upload file", error);
    }
  };

  return (
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
  );
};

export default InputFile;
