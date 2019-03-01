import * as actions from "../dashboard.actions";

const initialState = {
  loading: false,
  timestamp: "",
  metric: "",
  latitude: "",
  longitude: "",
  accuracy: "",
  data: {}
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const dashboardDataReceived = (state, action) => {
  const { data } = action;
  if (!data["data"]) return state;
  const dashboard = data.data[0];
  const { timestamp, metric, latitude, longitude, accuracy } = dashboard;

  return {
    ...state,
    loading: false,
    timestamp,
    latitude,
    longitude,
    accuracy,
    metric,
    data: action.data
  };
};

const handlers = {
  [actions.FETCH_DASHBOARD]: startLoading,
  [actions.DASHBOARD_DATA_RECEIVED]: dashboardDataReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
