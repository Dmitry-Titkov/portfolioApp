import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";
import { AsyncStorage } from "react-native";

// const initialState = async () => {
//   try {
//     return {
//       token: await AsyncStorage.getItem("_token"),
//       id: await AsyncStorage.getItem("_id"),
//     };
//   } catch (error) {
//     // Error retrieving data
//     console.log(error.message);
//   }
// };

export default function (state, action) {
  if (state === undefined) {
    state = { token: null, id: null };
  }
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };

    case LOG_OUT:
      return { token: null, id: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
