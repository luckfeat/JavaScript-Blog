import Router from '../core/router';
import Home from './Home';
import Feed from './Feed';

export default new Router({
  '': Home,
  '#/': Home,
  '#/feed': Feed,
});
