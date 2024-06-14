import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    positionId: number

    @Column()
    positionName: string

    @ManyToOne(() => Employee, (employee) => employee.id, {onDelete: 'CASCADE'})
    parent: Employee

    @OneToMany(() => Employee, (employee) => employee.parent, {cascade: true})
    child: Employee[]
}

