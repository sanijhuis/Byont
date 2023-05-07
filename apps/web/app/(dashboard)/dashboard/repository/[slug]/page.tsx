interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <p className="text-white">{params.slug}</p>;
};

export default Page;
