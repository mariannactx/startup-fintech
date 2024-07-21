import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'common' })
  type: UserTypes;

  @Column('decimal', {
    precision: 8,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  balance: number;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
