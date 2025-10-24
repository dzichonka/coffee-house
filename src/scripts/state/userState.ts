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
    return state.token || sessionStorage.getItem("token");
  }

  function isLoggedIn() {
    return !!getToken();
  }

  return {
    getToken,
    setToken,
    isLoggedIn,
  };
}
