import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../constants";
import { getUserInfo } from "../services/user/user";
import { useEffect, useState } from "react";

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

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export { useProfile, useDebounce };
