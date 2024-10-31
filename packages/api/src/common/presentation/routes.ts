import AuthRoute from "../../features/auth";
import FileRoute from "../../features/files";
import HealthRoute from "../../features/health";
import UserRoute from "../../features/user";
import LinkRoute from "../../features/links";

export const routes = [HealthRoute, AuthRoute, FileRoute, LinkRoute, UserRoute];
