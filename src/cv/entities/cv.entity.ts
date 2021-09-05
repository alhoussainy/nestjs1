import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cv')
export class CvEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string


    path: string

    @ManyToOne(type => UserEntity,
        (user) => user.cvs, { cascade: ["insert", "update", "remove"] })
    user: UserEntity

    @CreateDateColumn({
        update: false
    })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

}
