export const isLoggedIn = () => {
  const leadAcessToken = localStorage.getItem("lead_access_token");
  if (!leadAcessToken) {
    return false;
  } else {
    return true;
  }
};
