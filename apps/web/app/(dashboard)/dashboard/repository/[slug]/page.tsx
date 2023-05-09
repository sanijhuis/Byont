import MainScanResults from "@/components/dashboard/scan-results/main-scan-results";
import { error } from "console";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  console.log(params.slug);
  {
    /* @ts-ignore */
  }
  return <MainScanResults slug={params.slug} />;
};

export default Page;
