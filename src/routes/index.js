import Router from '../core/router';
import Home from './Home';
import Write from './Write';

export default new Router({
  '': Home,
  '#/': Home,
  '#/write': Write,
});
