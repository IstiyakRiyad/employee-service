import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm"

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

    @Column("int", { nullable: true})
    parentId: number | null;

    @ManyToOne(() => Employee, (employee) => employee.id, {onDelete: 'CASCADE'})
    @JoinColumn({ name: "parentId"})
    parent: Employee

    @OneToMany(() => Employee, (employee) => employee.parent, {cascade: true})
    child: Employee[]
}

