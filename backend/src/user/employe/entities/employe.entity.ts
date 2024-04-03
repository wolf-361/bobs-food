import { User } from "src/user/user";
import { EmployeType } from "./employeType";
import { Column, Entity } from "typeorm";

@Entity()
export class Employe extends User {
    @Column({type: "enum", enum: EmployeType, default: EmployeType.EMPLOYE})
    type: EmployeType;
}
