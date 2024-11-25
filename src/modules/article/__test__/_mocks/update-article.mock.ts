import { Chance } from 'chance';
import { UpdateArticleDto } from '../../dto/update-article.dto';

type UpdateMockedArticleData = Partial<UpdateArticleDto>;

const chance = new Chance();

const updateArticleDtoMock = ({
  title = chance.string({ length: 50 }),
  content = chance.string({ length: 100 }),
  userId = chance.integer({ min: 1, max: 100 }),
}: UpdateMockedArticleData = {}) => {
  const article = {
    title,
    content,
    userId,
  };

  return article;
};

export default updateArticleDtoMock;
