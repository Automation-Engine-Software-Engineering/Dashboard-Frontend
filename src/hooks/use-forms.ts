import { getAllForms } from "@/api/form";
import { useQuery } from "@tanstack/react-query";

export const useForms = () =>
  useQuery({
    queryFn: getAllForms,
    queryKey: ["forms"]
  });
