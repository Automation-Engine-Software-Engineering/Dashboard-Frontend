import cookie from "js-cookie";

const USER_SESSION_NAME = "user_session";
const USER_TOKEN_NAME = "user_token";

export const getToken = () => {
  const token = cookie.get(USER_TOKEN_NAME);
  return token ? token : null;
};

export const getSession = () => {
  const session = cookie.get(USER_SESSION_NAME);
  return session ? JSON.parse(session) : null;
};

export const setSession = (data: any) => {
  cookie.set(USER_SESSION_NAME, JSON.stringify(data), {
    expires: 1 / 24
  });
};

export const setToken = (token: string) => {
  cookie.set(USER_TOKEN_NAME, JSON.stringify(token), {
    expires: 1 / 24
  });
};

export const logout = () => {
  cookie.remove(USER_SESSION_NAME);
  cookie.remove(USER_TOKEN_NAME);

  window.location.replace("/login");
};
