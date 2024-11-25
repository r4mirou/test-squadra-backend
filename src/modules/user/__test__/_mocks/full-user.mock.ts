import { Chance } from 'chance';

const chance = new Chance();

export const fullUserQueryResultDataMock = () => ({
  role: {
    name: chance.string({ length: 8 }),
    rolePermissions: [
      {
        permission: {
          name: chance.string({ length: 8 }),
        },
      },
      {
        permission: {
          name: chance.string({ length: 8 }),
        },
      },
    ],
  },
  name: chance.name(),
  id: chance.integer({ min: 1, max: 100 }),
  email: chance.email(),
  password: chance.string({ length: 8 }),
  roleId: chance.integer({ min: 1, max: 100 }),
});
