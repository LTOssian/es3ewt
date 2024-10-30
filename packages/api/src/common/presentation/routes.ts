import AuthRoute from "../../features/auth";
import HealthRoute from "../../features/health";
import { GetHealthRoute } from "../../features/health/getHealth/get-health.route";

export const routes = [HealthRoute, AuthRoute];
