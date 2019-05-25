import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

const baseUrl = "https://api.github.com/search/";
// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  const url = action.name.url
  const fullName = action.name.name
  console.log("action2 --->", url,fullName);
  try {
    const response = yield axios.get(`${baseUrl}${url}?q=${fullName}`)
    const data = response.data.items;

    // dispatch a success action to the store with the new data
    yield put({ type: "API_CALL_SUCCESS", data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}

// function that returns api response
// function fetchData(url,fullName) {
//   console.log("action2 --->",url, fullName)
//   return axios({
//     method: "get",
//     url: `https://api.github.com/search/${url}?q=${fullName}`
//   });
//}
