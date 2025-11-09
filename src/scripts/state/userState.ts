import { logoutUser } from "../api/auth";

type UserState = {
  token: string | null;
};

const state: UserState = {
  token: null,
};

export function useUserState() {
  function setToken(value: string | null) {
    state.token = value;
    if (value) sessionStorage.setItem("token", value);
    else sessionStorage.removeItem("token");
  }

  function getToken() {
    if (!(state.token || sessionStorage.getItem("token"))) logoutUser();
    return state.token || sessionStorage.getItem("token");
  }

  function isLoggedIn() {
    return !!getToken();
  }

  function clearToken() {
    state.token = null;
    sessionStorage.removeItem("token");
  }

  return {
    getToken,
    setToken,
    isLoggedIn,
    clearToken,
  };
}
