import { getAllEntities } from "@/api/entitiy";
import { useQuery } from "@tanstack/react-query";

export const useFormEntities = () =>
  useQuery({
    queryFn: getAllEntities,
    queryKey: ["entities"]
  });
