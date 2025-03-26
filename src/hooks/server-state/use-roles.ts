import { getAllRole } from "@/api/role";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useRoles = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  return useQuery({
    queryKey: ["roles"],
    queryFn: () => getAllRole({ page, size })
  });
};
