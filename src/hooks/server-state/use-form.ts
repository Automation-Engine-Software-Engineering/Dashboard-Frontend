import { getForm } from "@/api/form";
import { useQuery } from "@tanstack/react-query";

export const useForm = (id: string | number) =>
  useQuery({
    queryFn: () => getForm(id),
    queryKey: ["forms", `form-${id}`]
  });
