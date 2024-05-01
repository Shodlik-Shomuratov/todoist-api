import express from "express";
const app = express();

import appSetup from "./startup/init";
import securitySetup from "./startup/security";
import routerSetup from "./startup/router";

appSetup(app);
securitySetup(app);
routerSetup(app);
