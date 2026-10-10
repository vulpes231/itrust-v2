import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserInfo } from "../services/user/user";
import { getAccessToken } from "../constants";

const CurrencySign = () => {
  const token = getAccessToken();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  return <div>{user ? user.currency.sign : null}</div>;
};

export default CurrencySign;
