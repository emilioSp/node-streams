import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
import logger from '../logger.js';
import APIError from '../APIError.js';

const ajv = new Ajv({ removeAdditional: true });
ajv.addKeyword('example');

export const validateInput = (jsonSchema, data) => {
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  if (!valid) {
    const output = betterAjvErrors(jsonSchema, data, validate.errors, { format: 'js' });
    const errorMessages = output.map((e) => e.error).join(', ');
    logger.error(errorMessages);
    throw new APIError({ message: errorMessages, http_code: 400 });
  }
};
