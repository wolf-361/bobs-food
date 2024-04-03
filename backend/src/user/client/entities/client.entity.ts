import { User } from "src/user/user";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Client extends User {
    @PrimaryColumn()
    courriel: string;

    @Column()
    estInscrit: boolean;

    @Column({ nullable: true })
    titulaireCarteCredit: string;

    @Column({ nullable: true })
    numeroCarteCredit: string;

    @Column({ nullable: true })
    dateExpirationCarteCredit: string;

    @Column({ nullable: true })
    cvcCarteCredit: string;
}
