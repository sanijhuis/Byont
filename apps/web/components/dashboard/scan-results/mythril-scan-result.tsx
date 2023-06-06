"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { useState } from "react";

const MythrilScanResult = ({ data }: any) => {
  const [dataScan, setDataScan] = useState<any>(data);

  console.log(dataScan);

  console.log(dataScan.issues.length === 0);

  if (
    dataScan.success &&
    dataScan.error === null &&
    dataScan.issues.length === 0
  ) {
    return <h4 className="text-16 text-white">There are no errors</h4>;
  }

  if (!dataScan.success && dataScan.error !== null && !dataScan.issues.length) {
    return <h4 className="text-16 text-white">{dataScan.error}</h4>;
  }

  if (dataScan.success && dataScan.issues.length !== 0) {
    return (
      <>
        <Accordion type="single" collapsible>
          {dataScan.issues.map((issue: any, index: number) => (
            <AccordionItem
              className="rounded-md bg-white px-1"
              key={index}
              value={index.toString()}
            >
              <AccordionTrigger className="flex flex-row">
                <span className="flex w-1/2">Line: {issue.lineno}</span>
                <span className="flex w-1/2">Level: {issue.severity}</span>
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
          ))}
        </Accordion>
      </>
    );
  }

  return <div>The scan is failed</div>;
};

export default MythrilScanResult;
