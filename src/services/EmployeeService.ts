import { MoreThan } from 'typeorm';
import typeORM from '../db/typeORM';
import { Employee } from '../entity/Employee';


export default class EmployeeService {
    private readonly employeeRepo = typeORM.getRepository(Employee);

    constructor() {}

    async get(positionId: number) {
        const employees = await this.employeeRepo.find({
            where: {
                positionId: MoreThan(positionId)
            },
            order: {
                positionId: "ASC"
            }
        });


        // Make the tree
        let i = employees.length - 1;
        for(; i >= 0; i--) {
            if(employees[0].positionId == employees[i].positionId) break;

            for(let j = i - 1; j >= 0; j--) {
                if(employees[i].parentId == employees[j].id) {
                    if(Array.isArray(employees[j].child)) {
                        employees[j].child.push(employees[i])
                    }
                    else {
                        employees[j].child = [employees[i]]
                    }
                }
            }
        }

        return employees.splice(0, i + 1);
    }
}
