import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

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
