const { getExamples } = require('./exampleInfo');
const { getTypeDefs } = require('./typeDefInfo');
const { getMethods } = require('./methodInfo');
const { getConstants } = require('./constantInfo');

exports.getApiDoc = (name, sdk) => {
  const api = sdk[name];

  if (!api) {
    throw new Error(`API \`${name}\` does not exist in the SDK`);
  }

  const properties = Object.getOwnPropertyNames(api).map((key) => api[key]);

  return {
    name,
    usage: `import { ${name} } from 'nr1'`,
    constants: getConstants(name, sdk),
    description: api.__docs__.text,
    examples: getExamples(name, sdk),
    methods: getMethods(name, sdk),
    typeDefs: getTypeDefs(properties, sdk),
  };
};
