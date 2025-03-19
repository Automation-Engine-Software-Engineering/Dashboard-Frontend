import { getAllEntities } from "@/api/entity";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useFormEntities = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  return useQuery({
    queryFn: () => getAllEntities({ page, size }),
    queryKey: ["entities", { page, size }],
    refetchOnMount: true
  });
};
