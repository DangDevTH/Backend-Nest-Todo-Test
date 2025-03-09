import { Exclude, Expose } from "class-transformer";
import { Comment } from "src/comments/entities/comment.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    @Expose()
    user_id: number;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @Expose()
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
    })
    username: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        unique: true,
    })
    @Expose()
    email: string;

    @Exclude()
    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
        select: false,
    })
    password: string;

    @Expose()
    @CreateDateColumn()
    created_at: Date;
    
    @Expose()
    @UpdateDateColumn()
    updated_at: Date;
}
