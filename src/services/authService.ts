type User = {
  username: string;
  password: string;
};

export const login = async (username: string, password: string): Promise<boolean> => {
  const response = await fetch('/mock/users.json');
  const users: User[] = await response.json();

  return users.some(user => user.username === username && user.password === password);
};
