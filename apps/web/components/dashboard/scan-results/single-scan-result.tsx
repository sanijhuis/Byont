type SingleScanResultsProps = React.ComponentProps<"section"> & {
  id: number;
};

const SingleScanResult = ({ id, ...props }: SingleScanResultsProps) => {
  return <section {...props}></section>;
};

export default SingleScanResult;
