import { getSession } from "@/auth/session";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession
  });
};
