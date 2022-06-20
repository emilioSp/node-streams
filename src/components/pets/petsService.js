import petsDAL from './petsDAL.js';

const get = async (petId) => {
  const pet = await petsDAL.get(petId);
  return pet;
};

const list = async ({ size }) => {
  const pets = await petsDAL.list({ size });
  return pets;
};

const create = async ({ name, age, size }) => {
  const pet = await petsDAL.create({ name, age, size });
  return pet;
};

const petsService = {
  get,
  list,
  create,
};

export default petsService;
