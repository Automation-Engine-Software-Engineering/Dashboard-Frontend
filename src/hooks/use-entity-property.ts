import { getEntityProperties } from "@/api/property";
import { useQuery } from "@tanstack/react-query";

export const useEntityProperties = (entityId: string | number) =>
  useQuery({
    queryFn: () => getEntityProperties(entityId),
    queryKey: ["properties", `entity-${entityId}`]
  });
