import { Expose } from "class-transformer";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    @Expose()
    comment_id: number;

    @ManyToOne(() => Task, (task) => task.task_id, {
        onDelete: 'CASCADE',
        eager: true,
      })
    @JoinColumn({ name: 'task_id' })
    @Expose()
    task: Task;

    @ManyToOne(() => User, (user) => user.user_id, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    @Expose()
    user: User;

    @Column({
        type: "text",
        nullable: false,
    })
    @Expose()
    comment: string;

    @Expose()
    @CreateDateColumn()
    created_at: Date;
    
    @Expose()
    @UpdateDateColumn()
    updated_at: Date;
}
