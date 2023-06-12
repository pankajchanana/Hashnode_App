export const getSecretKey = () => {
  const secretKey = sessionStorage.getItem("secret_key")
    ? sessionStorage.getItem("secret_key")
    : localStorage.getItem("secret_key");
    return secretKey;
};
