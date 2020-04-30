import { uuid } from 'uuidv4';

interface Subarea {
  id: string;
  name?: string;
  tag: string;
  sector: string;
  local: string;
  observations: string;
}

class Subarea {
  constructor({ local, observations, sector, tag, name }: Omit<Subarea, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.tag = tag;
    this.local = local;
    this.sector = sector;
    this.observations = observations;
  }
}

export default Subarea;
