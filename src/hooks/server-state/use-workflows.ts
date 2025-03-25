import { getAllWorkflows } from "@/api/workflow";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useWorkflows = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  return useQuery({
    queryFn: () => getAllWorkflows({ page, size }),
    queryKey: ["workflows", { page, size }],
    refetchOnMount: true
  });
};
