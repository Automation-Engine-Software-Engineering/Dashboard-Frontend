import { getAllForms } from "@/api/form";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useForms = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  return useQuery({
    queryFn: () => getAllForms({ page, size }),
    queryKey: ["forms", { page, size }],
    refetchOnMount: true
  });
};
