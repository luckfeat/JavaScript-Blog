import Router from '../core/router';
import Home from './Home';
import Keyword from './Keyword';
import Article from './Article';
import Date from './Date';

export default new Router({
  '': Home,
  '#/': Home,
  '#/article': Article,
  '#/keyword': Keyword,
  '#/date': Date,
});
