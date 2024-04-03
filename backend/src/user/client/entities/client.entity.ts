import { User } from "src/user/user";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Client extends User {
    @PrimaryColumn()
    courriel: string;

    @Column()
    estInscrit: boolean;
}
