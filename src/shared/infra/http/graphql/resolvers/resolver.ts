import CreateSubareaService from '../../../../../modules/subareas/services/CreateSubareaService';
import Subarea from '../../../../../models/Subarea';

interface Request {
  name: string;
  tag: string;
  sector: string;
  local: string;
  observations: string;
}

const resolver = {
  Mutation: {
    createSubarea: (
      _,
      { name, tag, sector, local, observations }: Request,
    ): Promise<Subarea> => {
      const createSubarea = new CreateSubareaService();

      return createSubarea.execute({ name, tag, sector, local, observations });
    },
  },
};

export default resolver;
