const ChatgptScanResult = ({ data }: any) => {
  const sections = data.split("\n\n");
  const slitherErrors = sections[1];
  const mythrilIssues = sections[2];

  return (
    <div className="scan-result flex flex-col gap-2">
      <h2 className="text-20 text-white">Scan Result</h2>

      {slitherErrors !== "" && (
        <div className="mythril-issues">
          <h3 className="text-18 font-medium text-white">Slither Errors</h3>
          <p className="text-16 text-white">{slitherErrors}</p>
        </div>
      )}
      {mythrilIssues !== "" && (
        <div className="mythril-issues">
          <h3 className="text-18 font-medium text-white">Mythril Issues</h3>
          <p className="text-16 text-white">{mythrilIssues}</p>
        </div>
      )}
    </div>
  );
};

export default ChatgptScanResult;
