import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";

const SlitherScanResult = ({ data }: any) => {
  console.log("test:", data);

  if (
    data !== null &&
    !data.success &&
    data.error !== null &&
    typeof data.error === "string"
  ) {
    return <h4 className="text-16 text-white">{data.error}</h4>;
  }

  if (data !== null && data.detectors?.length) {
    return (
      <>
        <>
          <Accordion type="single" collapsible>
            {data.detectors.map((issue: any, index: number) => (
              <AccordionItem
                className="mb-[15px] rounded-md bg-white px-1"
                key={index}
                value={index.toString()}
              >
                <AccordionTrigger className="flex flex-row">
                  <span className="flex w-1/2">Check: {issue.check}</span>
                  <span className="flex w-1/2">Level: {issue.confidence}</span>
                </AccordionTrigger>
                <AccordionContent>
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
                  {issue.description && (
                    <>
                      <p className="pb-[5px] text-15 font-semibold text-black">
                        Markdown
                      </p>
                      <p className="pr-2 text-14 font-normal text-black">
                        {issue.markdown}
                      </p>
                      {issue.elements.length && (
                        <div className="my-[15px] h-[1px] w-full bg-black"></div>
                      )}
                    </>
                  )}

                  {issue.elements.length && (
                    <>
                      <p className="pb-[5px] text-15 font-semibold text-black">
                        Featured elements
                      </p>
                      {issue.elements.map((element: any, index: number) => (
                        <div
                          className="my-3 first-of-type:mt-0 last-of-type:mb-0"
                          key={index}
                        >
                          <p className="flex pr-2 text-14 font-normal text-black">
                            <span className="flex w-[125px] font-medium">
                              Name:
                            </span>
                            {element.name}
                          </p>
                          <p className="flex pr-2 text-14 font-normal text-black">
                            <span className="flex w-[125px] font-medium">
                              Line:
                            </span>
                            {element.source_mapping.start}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      </>
    );
  }

  return (
    <div>
      <h4 className="text-16 text-white">
        The scan is failed, get a look to the scans from mythril
      </h4>
    </div>
  );
};

export default SlitherScanResult;
