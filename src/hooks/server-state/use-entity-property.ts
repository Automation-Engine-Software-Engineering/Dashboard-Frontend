import { getEntityProperties } from "@/api/property";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useEntityProperties = (entityId: string | number) => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  return useQuery({
    queryFn: () => getEntityProperties(entityId, { page, size }),
    queryKey: ["properties", `entity-${entityId}`, { page, size }]
  });
};
