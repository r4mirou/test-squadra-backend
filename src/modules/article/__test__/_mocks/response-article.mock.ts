import { Chance } from 'chance';
import { ResponseArticleDto } from '../../dto/response-article.dto';

type ResponseMockedArticleData = Partial<ResponseArticleDto>;

const chance = new Chance();

const responseArticleDtoMock = ({
  id = chance.integer({ min: 1, max: 100 }),
  title = chance.string({ length: 50 }),
  content = chance.string({ length: 100 }),
  userId = chance.integer({ min: 1, max: 100 }),
}: ResponseMockedArticleData = {}) => {
  const article = {
    id,
    title,
    content,
    userId,
  };

  return article;
};

export default responseArticleDtoMock;
