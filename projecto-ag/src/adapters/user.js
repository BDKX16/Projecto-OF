export const createUserAdapter = (user) => ({
  name: user.data.name,
  token: user.data.token,
  email: user.data.email,
});
