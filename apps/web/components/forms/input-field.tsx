"use client";

import Paragraph from "../text/paragraph";
import fetchWithCredentials from "@/utils/fetchWithCredentials";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const InputFile = () => {
  const [scanner, setScanner] = useState("");
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setScanner(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);
    if (scanner === "Slither") {
      const res = await fetchWithCredentials(
        "http://localhost:3000/file/uploadSlither",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    } else {
        const text = await res.text();
        console.log(text);
        if (text) {
          console.log(text);
        } else {
            console.log("Empty response");
        }
    }
    } else {
      const res = await fetchWithCredentials(
        "http://localhost:3000/file/uploadMythril",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    } else {
        const text = await res.text();
        console.log(text);
        if (text) {
            const json = JSON.parse(text);
            console.log(json);
        } else {
            console.log("Empty response");
        }
    }
    }
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Paragraph size="md" color="white" fontWeight="normal">
        Select scanner
      </Paragraph>
      <select className="my-3 rounded-md px-3 py-1" onChange={handleChange}>
        <option value="Mythril">Mythril</option>
        <option value="Slither">Slither</option>
      </select>
      <label className="block" htmlFor="">
        <input
          className="text-sm file:text-sm block w-full
      text-slate-500 file:mr-4 file:rounded-full
      file:border-0 file:bg-violet-50
      file:px-3 file:py-1
      file:font-semibold file:text-black
      hover:file:bg-violet-100
    "
          type="file"
          placeholder="Add a smart contract"
          accept=".sol"
          {...register("file", {})}
        />
      </label>

      <button
        className="mx-auto mt-3 h-5 rounded-2xl bg-white px-2 text-black transition-all hover:opacity-60"
        type="submit"
      >
        Check my smart contract
      </button>
    </form>
  );
};

export default InputFile;
