import { Request, Response, NextFunction } from "express";
import EmployeeService from "../services/EmployeeService";

// Interfaces
import SuccessResponse from "../interfaces/SuccessResponse";
import { PositionId } from "../validators/PositionId";

const employeeService = new EmployeeService();

export class EmployeeController {

    constructor() {}

    static async get(req: Request<{}, {}, {}, PositionId>, res: Response<SuccessResponse>, next: NextFunction) {
        try {
            const id = req.query.position_id || 1;

            const employee = await employeeService.get(id);
            
            return res.json({
                message: 'Employee hierarchy by position',
                data: employee
            });
        }
        catch(error) {
            next(error);
        }
    }
}
