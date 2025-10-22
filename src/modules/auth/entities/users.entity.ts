import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { GroupManagerEntity } from "./group-manager.entity";
import { UserStoresEntity } from "./user-stores.entity";

@Entity('NhanVien2')
export class UsersEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { unique: true })
    code: string;

    @Column("nvarchar")
    name: string;

    @Column("varchar")
    password: string;

    @Column("varchar")
    pin: string;

    @Column("varchar")
    sale: string;

    @Column("varchar", {name: "group_id"})
    groupId: string;

    @Column("date")
    birthday: Date;

    @Column("int")
    gender: number;

    @Column("int", {name: "trangthai"})
    status: number;

    @Column("bit",{name:"is_locked"})
    isLocked: boolean;

    @Column("bit",{name:"is_login"})
    isLogin: boolean;

    @Column("bit",{name:"active"})
    active: boolean;

    @OneToMany(()=> GroupManagerEntity, (t) => t.manager)
    groupMangers: GroupManagerEntity[];

    @OneToMany(()=> UserStoresEntity, (t) => t.manager)
    userStores: UserStoresEntity[];

}