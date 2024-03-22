import Router from '../core/router';
import Home from './Home';
import Keyword from './Keyword';
import Article from './Article';

export default new Router({
  '': Home,
  '#/': Home,
  '#/article': Article,
  '#/keyword': Keyword,
});
