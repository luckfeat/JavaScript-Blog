import Router from '../core/router';
import Home from './Home';
import Feed from './Feed';

// export default new Router([
//   { path: '', component: Home },
//   { path: '#/feed', component: Feed },
// ]);

export default new Router({ Home, Feed });
