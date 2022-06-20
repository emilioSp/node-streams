import combine from 'swagger-combine';

const flatAllOfSchema = (schema) =>
  schema.allOf
    .map((o) => o)
    .reduce((acc, value) => {
      acc = {
        ...acc,
        ...Object.entries(value.properties).reduce((acc, [key, v]) => {
          acc[key] = v;
          return acc;
        }, acc),
      };
      return acc;
    }, {});

const responseBuilder = async ({ schemaName, object }) => {
  const docSchema = await combine(`./docs/schemas/${schemaName}`, { format: 'yml' });
  const schemaOutput = docSchema.allOf ? flatAllOfSchema(docSchema) : docSchema.properties;

  const apiObject = Object.keys(schemaOutput).reduce((acc, value) => {
    acc[value] = object[value];
    return acc;
  }, {});

  return apiObject;
};

export default responseBuilder;
