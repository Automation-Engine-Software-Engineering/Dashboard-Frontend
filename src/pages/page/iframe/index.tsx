import { useSearchParams } from "react-router-dom";

import Box from "@/components/ui/box";

const Iframe = () => {
  const [searchParams] = useSearchParams();

  return (
    <Box>
      <iframe
        src={searchParams.get("url") || ""}
        title="Safe Iframe"
        width="100%"
        height="600px"
        className="border-0"
        sandbox="allow-scripts allow-forms allow-same-origin"
      ></iframe>
    </Box>
  );
};
export default Iframe;
