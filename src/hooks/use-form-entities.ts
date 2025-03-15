import { getAllEntities } from "@/api/entity";
import { useQuery } from "@tanstack/react-query";

export const useFormEntities = () =>
  useQuery({
    queryFn: getAllEntities,
    queryKey: ["entities"]
  });
