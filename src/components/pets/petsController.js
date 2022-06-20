import combine from 'swagger-combine';
import logger from '../../logger.js';
import { validateInput } from '../../utils/validator.js';
import responseBuilder from '../../utils/responseBuilder.js';
import petsService from './petsService.js';

const get = async (petId) => {
  logger.info('petsController:get', petId);

  const pet = await petsService.get(petId);
  return pet;

  // output like openapi specs
};

const list = async ({ size }) => {
  const pets = await petsService.list({ size });
  return pets;
};

const create = async ({ name, age, size }) => {
  logger.info('petsController:create', { name, age, size });
  const {
    components: {
      schemas: { petPreview: petSchemaInput },
    },
  } = await combine('./docs/openapi.yml', { format: 'yml' });

  validateInput(petSchemaInput, { name, age, size });

  const pet = await petsService.create({ name, age, size });
  const petAPIObject = await responseBuilder({
    schemaName: 'pet.yml',
    object: pet,
  });
  return petAPIObject;
};

const petsController = {
  get,
  list,
  create,
};

export default petsController;
