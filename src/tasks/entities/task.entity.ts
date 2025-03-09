import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusType } from "../enums/status-type.enum";
import { PriorityType } from "../enums/priority-type.enum";
import { Comment } from "src/comments/entities/comment.entity";
import { Expose } from "class-transformer";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('increment')
    task_id: number;

    @OneToMany(() => Comment, (comment) => comment.task)
    comments: Comment[];

    @ManyToOne(() => User, (user) => user.user_id, {
        onDelete: 'CASCADE',
        eager: true,
      })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    title: string;

    @Column({
        type: "text",
        nullable: false,
    })
    description: string;

    @Column({
        type: "enum",
        enum: StatusType,
        default: StatusType.PENDING,
        nullable: false,
    })
    status: StatusType;

    @Column({
        type: "enum",
        enum: PriorityType,
        default: PriorityType.LOW,
        nullable: false,
    })
    priority: PriorityType;

    @Column({
        type: "date",
        nullable: false
    })
    due_date: Date;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}
