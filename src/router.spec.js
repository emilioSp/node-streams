import { readFile } from 'fs/promises';
import supertest from 'supertest';
import database from './database.js';
import { server } from './index.js';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));

describe('router', () => {
  let request;
  beforeEach(() => {
    request = supertest.agent(server);
  });

  afterAll(() => {
    server.close();
    database.end();
  });

  it('should return alive', async () => {
    const response = await request.get('/healthcheck');
    expect(response.body.version).toStrictEqual(packageJson.version);
  });

  /*
  it('should create a pet', async () => {
    const response = await request.post('/pets/').set('Content-Type', 'application/json').send({
      name: 'Emilio',
      age: 14,
    });
    expect(response.body.id).toEqual(expect.any(Number));
    expect(response.body.name).toStrictEqual('Emilio');
    expect(response.body.age).toStrictEqual(14);
    expect(response.body.size).toStrictEqual(null);
  });
   */
});
