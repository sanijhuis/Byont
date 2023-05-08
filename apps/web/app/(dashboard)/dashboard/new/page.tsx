import ListRepo from "../../../../components/dashboard/add-new/list-repo";
import H2 from "../../../../components/text/H2";
import Paragraph from "../../../../components/text/paragraph";

const Page = async () => {
  return (
    <section className="bg-[#111] py-12">
      <div className="container pb-3">
        <H2 color="white" size="sm" fontWeight="medium">
          Activate scan for your repo
        </H2>
        <Paragraph
          className="pt-2 opacity-80"
          color="white"
          size="md"
          fontWeight="medium"
        >
          Activate your repo to start scanning for vulnerabilities.
        </Paragraph>
      </div>
      <div className="container grid grid-cols-3">
        <div className="col-span-2 flex flex-col gap-1 rounded-md border-[1px] border-green/20 bg-black p-4">
          <h3 className="text-25 font-medium text-white">
            Activate for scanner
          </h3>
          <ListRepo />
        </div>
      </div>
    </section>
  );
};

export default Page;
