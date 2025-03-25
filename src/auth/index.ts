import cookie from "js-cookie";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const setToken = ({
  accessToken,
  refreshToken
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  cookie.set(ACCESS_TOKEN, accessToken);
  cookie.set(REFRESH_TOKEN, refreshToken);
};

export const getToken = () => {
  return {
    accessToken: cookie.get(ACCESS_TOKEN) ?? null,
    refreshToken: cookie.get(REFRESH_TOKEN) ?? null
  };
};

export const logout = () => {
  cookie.remove(ACCESS_TOKEN);
  cookie.remove(REFRESH_TOKEN);

  window.location.replace("/login");
};
