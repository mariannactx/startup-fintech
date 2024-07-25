import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('users')
export class UserEntity implements User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ default: 'common' })
  type: UserTypes;

  @Column('decimal', {
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  balance: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
