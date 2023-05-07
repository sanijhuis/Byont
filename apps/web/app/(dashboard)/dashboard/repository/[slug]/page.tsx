import MainScanResults from "@/components/dashboard/scan-results/main-scan-results";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <MainScanResults slug={params.slug} />;
};

export default Page;
