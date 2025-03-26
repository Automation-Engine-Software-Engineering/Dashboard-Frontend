import { getProfile } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
    refetchOnMount: true
  });
};
