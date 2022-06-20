import { readFile } from 'fs/promises';
import Router from '@koa/router';
import petsController from './components/pets/petsController.js';
import { generateJWTToken } from './utils/generateJWTToken.js';
import { authenticate } from './middlewares.js';
const { version } = JSON.parse((await readFile('./package.json')).toString());

const router = Router();

router.get('/healthcheck', (ctx) => {
  ctx.body = { version: version };
});

router.post('/sign-up', (ctx) => {
  const token = generateJWTToken(ctx.request.body.user_id);
  ctx.body = token;
});

router.get('/auth/me', authenticate, (ctx) => {
  ctx.body = ctx.request.jwtPayload.user_id;
});

router.get('/pets/:petId', async (ctx) => {
  const p = await petsController.get(ctx.params.petId);
  ctx.body = p;
});

router.get('/pets/', async (ctx) => {
  const pets = await petsController.list({ size: ctx.query.size });
  ctx.body = pets;
});

router.post('/pets/', async (ctx) => {
  const pet = await petsController.create(ctx.request.body);
  ctx.body = pet;
});

export default router;
