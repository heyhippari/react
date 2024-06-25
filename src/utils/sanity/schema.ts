import { type SchemaTypeDefinition } from 'sanity';
import changelogType from './types/changelogType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [changelogType],
};
