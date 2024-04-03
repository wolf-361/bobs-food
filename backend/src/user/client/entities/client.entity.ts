import { User } from "src/user/user";
import { Column, Entity } from "typeorm";

@Entity()
export class Client extends User {
    @Column()
    estInscrit: boolean;
}
