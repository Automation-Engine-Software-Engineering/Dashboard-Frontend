import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQuery = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
export default ReactQuery;
