
export const login = async (
  username: string,
  password: string
): Promise<boolean> => {
  const validUsername = "admin";
  const validPassword = "molinopadel360";

  return username === validUsername && password === validPassword;
};
