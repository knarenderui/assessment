import WeatherSagas from "./Weather";
import DashboardSagas from "./Dashboard";
import ApiErrors from "./ApiErrors";

export default [...ApiErrors, ...WeatherSagas, ...DashboardSagas];
