import cookie from "js-cookie";

const USER_TOKEN_NAME = "user_token";

export const getToken = () => {
  const token = cookie.get(USER_TOKEN_NAME);
  return token ? JSON.parse(token) : null;
};

export const setToken = (token: string) => {
  cookie.set(USER_TOKEN_NAME, JSON.stringify(token), {
    expires: 1 / 24
  });
};

export const logout = () => {
  cookie.remove(USER_TOKEN_NAME);

  window.location.replace("/login");
};
