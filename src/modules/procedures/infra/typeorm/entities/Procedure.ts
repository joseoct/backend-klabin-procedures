import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

import Subarea from '@modules/subareas/infra/typeorm/entities/Subarea';

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

  @Column()
  procedure_image: string;

  @ManyToOne(() => Subarea, subarea => subarea.procedures, { eager: true })
  @JoinColumn({ name: 'subarea_id' })
  subarea: Subarea;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'procedure_image_url' })
  getAvatarUrl(): string {
    return `http://localhost:3333/files/${this.procedure_image}`;
  }
}

export default Procedure;
