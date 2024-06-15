import { Router } from "express";

import { EmployeeController } from "./controllers/EmployeeController";
import { AuthController } from "./controllers/AuthController";
import { checkAuth } from "./middleware/checkAuth";
import { requestValidator } from "./middleware/requestValidator";
import { PositionId } from "./validators/PositionId";
import { AuthLogin } from "./validators/Auth";

const router = Router();

router.post("/auth/login", 
    requestValidator({body: AuthLogin}), 
    AuthController.login
);


router.get("/employee", 
    requestValidator({query: PositionId}), 
    EmployeeController.get
);

router.get("/employee/protected", 
    checkAuth(), 
    requestValidator({query: PositionId}), 
    EmployeeController.get
);


export default router;

