export const createUserAdapter = (user) => ({
  name: user.data.userData.name,
  token: user.data.token,
  email: user.data.userData.email,
  confirmed: user.data.userData.confirmed,
});
