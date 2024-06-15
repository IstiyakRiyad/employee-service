import typeORM from '../typeORM';
import { Employee } from '../../entity/Employee';


const seedEmployeeList = [
    { id: 1, name: 'Alice', positionId: 1, positionName: 'CEO', parentId: null },
    { id: 2, name: 'Bob', positionId: 2, positionName: 'Engineering Manager', parentId: 1 },
    { id: 3, name: 'Charlie', positionId: 2, positionName: 'Engineering Manager', parentId: 1 },
    { id: 4, name: 'David', positionId: 3, positionName: 'Senior Software Engineer', parentId: 2 },
    { id: 5, name: 'Emma', positionId: 3, positionName: 'Senior Software Engineer', parentId: 3 },
    { id: 6, name: 'Jon', positionId: 3, positionName: 'Senior Software Engineer', parentId: 3 },
    { id: 7, name: 'Frank', positionId: 4, positionName: 'Software Engineer', parentId: 5 },
    { id: 8, name: 'Grace', positionId: 4, positionName: 'Software Engineer', parentId: 4 },
    { id: 9, name: 'Hannah', positionId: 5, positionName: 'Junior Software Engineer', parentId: 7 },
    { id: 10, name: 'Ian', positionId: 5, positionName: 'Junior Software Engineer', parentId: 7 },
]

async function setup() {
    try {
        await typeORM.initialize();

        const employeeRepo = typeORM.getRepository(Employee);

        const seedsEmployes = employeeRepo.create(seedEmployeeList);

        await employeeRepo.save(seedsEmployes)
        console.log('\x1b[32m%s\x1b[0m', `Data seeded to the database`);

        await typeORM.destroy();
    }
    catch(error) {
        console.log(error);
        await typeORM.destroy();
    }
}

setup().then();

