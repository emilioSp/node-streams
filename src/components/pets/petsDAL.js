import database, { getColumnsForInsert, removeUndefinedFilters } from '../../database.js';
import Pet from './Pet.js';

const fromDBRow = (row) => {
  const pet = new Pet();

  pet.id = row.id;
  pet.name = row.name;
  pet.age = row.age;
  pet.size = row.size;

  return pet;
};

const get = async (petId) => {
  // TODO: manage db error
  const [rows] = await database.execute(`SELECT * FROM pets WHERE id = :petId`, { petId });
  const pet = fromDBRow(rows[0]);
  return pet;
};

const list = async ({ size }) => {
  const query = removeUndefinedFilters(
    `
    SELECT * 
    FROM pets
    WHERE 1
    AND size = :size`,
    { size }
  );

  const [rows] = await database.execute(query, { size });
  const pets = rows.map((r) => fromDBRow(r));
  return pets;
};

const create = async ({ name, age, size }) => {
  const columns = getColumnsForInsert({ name, age, size });
  const [{ insertId }] = await database.execute(`INSERT INTO pets (${columns.join(',')}) VALUES (${columns.map((c) => `:${c}`).join(',')})`, {
    name,
    age,
    size,
  });
  const pet = get(insertId);
  return pet;
};

const petsDAL = {
  get,
  list,
  create,
};

export default petsDAL;
