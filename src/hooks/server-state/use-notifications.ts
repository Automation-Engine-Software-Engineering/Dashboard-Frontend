import { getAllNotifications } from "@/api/notification";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  return useQuery({
    queryFn: () => getAllNotifications(),
    queryKey: ["notifications"],
    refetchOnMount: true
  });
};
