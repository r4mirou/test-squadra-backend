import { Chance } from 'chance';
import { CreateUserDto } from '../../dto/create-user.dto';

type CreateMockedUserData = Partial<CreateUserDto>;

const chance = new Chance();

const createUserDtoMock = ({
  name = chance.name(),
  email = chance.email(),
  password = chance.string({ length: 8 }),
  roleId = chance.integer({ min: 1, max: 3 }),
}: CreateMockedUserData = {}) => {
  const user = {
    name,
    email,
    password,
    roleId,
  };

  return user;
};

export default createUserDtoMock;
