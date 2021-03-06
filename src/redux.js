/* === ACTIONS === */

//action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

/* 
//action creators
function apiCallRequest() {
  return { type: API_CALL_REQUEST };
}

function apiCallSuccess(data) {
  return { type: API_CALL_SUCCESS, data };
}

function apiCallFailure(error) {
  return { type: API_CALL_FAILURE, error };
}

 */

/* === REDUCER === */
 
const initialState = {
  fetching: false,
  data: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
      break;
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, data: action.data };
      break;
    case API_CALL_FAILURE:
      return { ...state, fetching: false, data: null, error: action.error };
      break;
    default:
      return state;
  }
}
