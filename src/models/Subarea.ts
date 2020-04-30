import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Procedure from './Procedure';

@Entity('subareas')
class Subarea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name?: string;

  @Column()
  tag: string;

  @Column()
  sector: string;

  @Column()
  local: string;

  @Column()
  observations: string;

  @OneToMany(() => Procedure, procedure => procedure.subarea)
  procedures: Procedure[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subarea;
