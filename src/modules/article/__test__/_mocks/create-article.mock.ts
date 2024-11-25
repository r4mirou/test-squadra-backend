import { Chance } from 'chance';
import { CreateArticleDto } from '../../dto/create-article.dto';

type CreateMockedArticleData = Partial<CreateArticleDto>;

const chance = new Chance();

const createArticleDtoMock = ({
  title = chance.string({ length: 50 }),
  content = chance.string({ length: 100 }),
  userId = chance.integer({ min: 1, max: 100 }),
}: CreateMockedArticleData = {}) => {
  const article = {
    title,
    content,
    userId,
  };

  return article;
};

export default createArticleDtoMock;
