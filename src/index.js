import Router from './routes';

// eslint-disable-next-line no-undef
Handlebars.registerHelper('equalTo', (a, b) => a === b);

/* Router[routes] 생성 -> 초기 화면 -> eventListener -> 콜백 실행 */
Router.listen();
