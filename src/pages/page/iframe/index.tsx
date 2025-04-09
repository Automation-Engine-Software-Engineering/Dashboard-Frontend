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
        className="h-[calc(100vh-120px)] border-0"
        sandbox="allow-scripts allow-forms allow-same-origin"
      ></iframe>
    </Box>
  );
};
export default Iframe;
