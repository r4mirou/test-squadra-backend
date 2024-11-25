import { Chance } from 'chance';
import { ResponseUserDto } from '../../dto/response-user.dto';

type ResponseMockedUserData = Partial<ResponseUserDto>;

const chance = new Chance();

const responseUserDtoMock = ({
  id = chance.integer({ min: 1, max: 100 }),
  name = chance.name(),
  email = chance.email(),
  roleId = chance.integer({ min: 1, max: 100 }),
}: ResponseMockedUserData = {}) => {
  const user = {
    id,
    name,
    email,
    roleId,
  };

  return user;
};

export default responseUserDtoMock;
