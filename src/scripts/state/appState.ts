type AppState = {
  token: string | null;
};

const state: AppState = {
  token: null,
};

export function useAppState() {
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
