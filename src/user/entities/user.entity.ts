import { CvEntity } from "src/cv/entities/cv.entity";
import { userRoleEnum } from "src/enums/user.role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string

    @Column()
    salt: string

    @Column({
        type: 'enum',
        enum: userRoleEnum,
        default: userRoleEnum.USER
    })
    role: string

    @Column()
    password: string

    @OneToMany(type => CvEntity,
        (cvs) => cvs.user, { cascade: ["insert", "update"] })
    cvs: CvEntity[]

    @CreateDateColumn({
        update: false
    })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

}
