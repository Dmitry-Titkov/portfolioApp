export const selectAppLoading = (state) => state.appState.loading;
export const selectMessage = (state) => state.appState.message;
export const selectArtworks = (reduxState) => {
  return reduxState.art;
};
