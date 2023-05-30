"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { use, useEffect } from "react";

const SingleScanResultMythril = ({ item }: any) => {
  function formatJson(errorString: any) {
    let sanitizedJsonString = errorString;
    if (sanitizedJsonString?.startsWith("~")) {
      sanitizedJsonString = sanitizedJsonString.substring(1);
    }
    const json = JSON.parse(sanitizedJsonString);

    console.log(json);

    return json;
  }

  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <div>
      {item.output && Object.keys(item.output).length > 0 ? (
        <Accordion type="single" collapsible>
          {formatJson(item.output).success ? (
            formatJson(item.output).issues.map((issue: any, index: number) => (
              <AccordionItem
                className="rounded-md bg-white px-1"
                key={index}
                value={index.toString()}
              >
                <AccordionTrigger className="flex flex-row">
                  <span className="flex w-1/2">Line: {issue.lineno}</span>
                  <span className="flex w-1/2">Severity: {issue.severity}</span>
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
            ))
          ) : (
            <div>
              <p className="text-15 text-white">
                {formatJson(item.output).error}
              </p>
            </div>
          )}
        </Accordion>
      ) : (
        <div className="text-16 font-semibold text-white">No issues found.</div>
      )}
    </div>
  );
};

export default SingleScanResultMythril;
