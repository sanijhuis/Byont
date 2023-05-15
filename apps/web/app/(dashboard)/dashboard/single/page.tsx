"use client"
import React from 'react'
import InViewFadeIn from "@/components/animations/inview-fade-in";
import InputFile from '@/components/forms/input-field';
import Paragraph from '@/components/text/paragraph';
import AnimatedTextWord from '@/components/animations/AnimatedText';
import H2 from '@/components/text/H2';
import SingleFileResult from '@/components/dashboard/scan-results/single-file-result';
function fileOnly() {
    return (
        <section className="bg-[#111] pb-12">
          <div className="container pb-6 pt-10">
          <div className="flex flex-col items-center">
          <H2
            className="text-center"
            color="white"
            size="lg"
            fontWeight="medium"
          >
            <AnimatedTextWord
              text="Is your Smart Contract secure?"
              className="mr-[10px] md:mr-1"
              darkWords={[false, false, false, false, true]}
              marginView="-15% 0% -15% 0%"
              loadingHeight="h-[80px]"
            />
          </H2>
          <InViewFadeIn delay={1} time={1}>
            <Paragraph
              size="lg"
              color="white"
              fontWeight="normal"
              className="mx-auto mt-2 max-w-[700px] text-center opacity-60">              
              We have made a tool that can help you to check your smart
              contract. Our goal is to make it easy to use and solve security
              problems.
            </Paragraph>
          </InViewFadeIn>
        </div>
              
          </div>
          <div className="container flex flex-col items-center">
            <InViewFadeIn delay={1.2} time={1}>
              <div className="rounded-xl border-[1px] border-white/20 bg-black px-3 py-4">
                <h3 className="mb-3 text-center text-20 font-medium uppercase text-white">
                  Add a smart contract
                </h3>
                <InputFile />
              </div>
            </InViewFadeIn>
            <SingleFileResult output={"test"} />
            </div>

            
        </section>
        
      );
}

export default fileOnly