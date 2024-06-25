import { defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'changelog',
  title: 'Changelog Entry',
  description:
    'A changelog entry for the site, listing changes made in a version.',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    },
    {
      name: 'changes',
      title: 'Changes',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
});
