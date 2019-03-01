import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../dashboard.actions";

/*
  1. The weather service requires us to make a search by lat/lng to find its
  weather ID.
  2. We then use that weather ID to get the weather.

  This process is pretty well defined here with a saga.

  call invokes a method
  put dispatches an action
  takeEvery watches actions and executes a function

  Also -- the `*` in function is important; turns it into a "generator"

*/

function* fetchDashboardData() {
  const { error, data } = yield call(API.getDashboardData);
  if (error) {
    console.log({ error });
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  yield put({ type: actions.DASHBOARD_DATA_RECEIVED, data: data });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_DASHBOARD, fetchDashboardData),
  ]);
}

export default [watchAppLoad];
