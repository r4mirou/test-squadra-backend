import { Chance } from 'chance';
import { UpdateUserDto } from '../../dto/update-user.dto';

type UpdateMockedUserData = Partial<UpdateUserDto>;

const chance = new Chance();

const updateUserDtoMock = ({
  name = chance.name(),
  email = chance.email(),
  roleId = chance.integer({ min: 1, max: 3 }),
}: UpdateMockedUserData = {}) => {
  const user = {
    name,
    email,
    roleId,
  };

  return user;
};

export default updateUserDtoMock;
