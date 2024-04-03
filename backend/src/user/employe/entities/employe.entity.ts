import { User } from "src/user/user";
import { EmployeType } from "./employeType";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Employe extends User {
    @PrimaryColumn()
    employeId: string;

    @Column({type: "enum", enum: EmployeType, default: EmployeType.EMPLOYE})
    type: EmployeType;
}
