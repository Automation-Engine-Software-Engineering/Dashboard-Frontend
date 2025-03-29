import { getAllMenuItems } from "@/api/menu";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useMenuItems = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  return useQuery({
    queryFn: () => getAllMenuItems({ page, size }),
    queryKey: ["menu-items", { page, size }],
    refetchOnMount: true
  });
};
