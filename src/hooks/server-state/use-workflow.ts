import { getWorkflow } from "@/api/workflow";
import { useQuery } from "@tanstack/react-query";

export const useWorkflow = (id: string | number) =>
  useQuery({
    queryFn: () => getWorkflow(+id),
    queryKey: ["workflows", `workflow-${id}`],
    refetchOnWindowFocus: false
  });
