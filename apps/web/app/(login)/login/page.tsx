"use client";

import H2 from "../../../components/text/H2";
import IconGithub from "../../../public/icons/github";

const Page = () => {
  const signIn = () => {
    window.location.href = "http://localhost:4500/auth/";
  };

  return (
    <section className="flex h-[90vh] items-center justify-center">
      <div className="flex w-[350px] flex-col pb-12">
        <H2 className="text-center" color="white" size="md" fontWeight="medium">
          Login by Byont
        </H2>
        <div className="my-3 h-[1px] w-full bg-white/60"></div>
        <button
          onClick={signIn}
          className="flex h-5 w-full items-center justify-center gap-2 rounded-xl bg-[#24292e] text-16 text-white"
        >
          <span>
            <IconGithub />
          </span>
          Continue with GitHub
        </button>
      </div>
    </section>
  );
};

export default Page;
