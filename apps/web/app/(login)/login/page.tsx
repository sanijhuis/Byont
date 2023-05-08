"use client";

import H2 from "../../../components/text/H2";
import IconGithub from "../../../public/icons/github";
import { ToastAction } from "@/components/ui/toaster/toast";
import { useToast } from "@/components/ui/toaster/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const signIn = async () => {
    setLoading(true);
    try {
      window.location.href = "http://localhost:3000/auth/login";
    } catch (error) {
      setLoading(false);
      await toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <section className="flex h-[90vh] items-center justify-center">
      <div className="flex w-[350px] flex-col pb-12">
        <H2 className="text-center" color="white" size="md" fontWeight="medium">
          Login by Byont
        </H2>
        <div className="my-3 h-[1px] w-full bg-white/60"></div>
        <button
          disabled={loading}
          onClick={signIn}
          className="flex h-5 w-full items-center justify-center gap-2 rounded-xl bg-[#24292e] text-16 text-white"
        >
          <span>
            {loading ? (
              <Loader2 className="h-2 w-2 animate-spin" />
            ) : (
              <IconGithub />
            )}
          </span>
          Continue with GitHub
        </button>
      </div>
    </section>
  );
};

export default Page;
