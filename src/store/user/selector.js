export const selectToken = (state) => {
  console.log("user state", state);
  return state.token;
};

export const selectUser = (state) => {
  console.log("user state", state);
  return state.id;
};
