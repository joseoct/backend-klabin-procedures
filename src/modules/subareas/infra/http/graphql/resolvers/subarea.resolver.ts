import CreateSubareaService from '../../../../services/CreateSubareaService';
import Subarea from '../../../typeorm/entities/Subarea';

interface IRequest {
  name: string;
  tag: string;
  sector: string;
  local: string;
  observations: string;
}

const subareaResolver = {
  Mutation: {
    createSubarea: (
      parent: any,
      { name, tag, sector, local, observations }: IRequest,
    ): Promise<Subarea> => {
      console.log(parent);

      const createSubarea = new CreateSubareaService();

      const subarea = createSubarea.execute({
        name,
        tag,
        sector,
        local,
        observations,
      });

      return subarea;
    },
  },
};

export default subareaResolver;
