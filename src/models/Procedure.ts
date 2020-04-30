import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Subarea from './Subarea';

@Entity('procedures')
class Procedure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column()
  description: string;

  @Column()
  font: string;

  @Column()
  local: string;

  @Column()
  observations: string;

  @Column()
  tag: string;

  @Column()
  subarea_id: string;

  @ManyToOne(() => Subarea, subarea => subarea.procedures, { eager: true })
  @JoinColumn({ name: 'subarea_id' })
  subarea: Subarea;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Procedure;
