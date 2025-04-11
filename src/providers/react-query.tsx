import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQuery = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
export default ReactQuery;
