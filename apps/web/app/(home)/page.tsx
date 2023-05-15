"use client";

import AnimatedTextWord from "@/components/animations/AnimatedText";
import InViewFadeIn from "@/components/animations/inview-fade-in";
import ButtonAnimation from "@/components/button/button-animation";
import H1 from "@/components/text/H1";
import Paragraph from "@/components/text/paragraph";
import imageMytrh from "@/public/scanners/mythril.png";
import Image from "next/image";

const Page = () => {
  return (
    <section className="flex h-screen">
      <div className="container my-auto flex flex-col">
        <H1 className="mx-auto  max-w-[1200px] text-black">
          <AnimatedTextWord
            text="Develop. Check. Ship."
            className="mr-[10px] md:mr-1"
            darkWords={[true, false, false]}
            marginView="-15% 0% -15% 0%"
            loadingHeight="h-[80px]"
          />
        </H1>
        <div className="mx-auto">
          <InViewFadeIn delay={1} time={1}>
            <Paragraph
              size="lg"
              color="white"
              fontWeight="normal"
              className="opacity-70 mx-auto mt-2 max-w-[700px] text-center"
            >
              We are a team of developers who are passionate about building
              applications that are easy to use and solve security problems.
            </Paragraph>
            <ButtonAnimation
              className="mx-auto mt-3"
              url="/login"
              color="secondary"
            >
              Get Started
            </ButtonAnimation>
          </InViewFadeIn>
          <div className="item-center mt-10 flex w-full flex-col items-center pt-5">
            <InViewFadeIn delay={1.5} time={1}>
              <Paragraph
                size="sm"
                color="white"
                fontWeight="normal"
                className="mx-auto mt-1  text-center uppercase opacity-60"
              >
                The scanner that we use
              </Paragraph>
              <Image
                className="opacity-70 mx-auto brightness-0 invert"
                src={imageMytrh}
                width={150}
                height={150}
                alt={""}
              />
            </InViewFadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
