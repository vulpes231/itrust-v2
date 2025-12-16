import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../constants";
import { getUserInfo } from "../services/user/user";

const useProfile = () => {
  const token = getAccessToken();

  const {
    data: userProfile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
    retry: 1,
  });

  return {
    userProfile,
    loading: isLoading,
    token: token,
  };
};

export { useProfile };
