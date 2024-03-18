import Router from '../core/router';
import Home from './Home';
import Write from './Write';
import Article from './Article';

export default new Router({
  '': Home,
  '#/': Home,
  '#/write': Write,
  '#/article': Article,
});
