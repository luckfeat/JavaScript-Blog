import Router from './routes';

// eslint-disable-next-line no-undef
Handlebars.registerHelper('equalTo', (a, b) => a === b);
// eslint-disable-next-line no-undef
Handlebars.registerHelper('stripQuote', str => {
  const startsWithQuote = str.startsWith("'") || str.startsWith('"');
  const endsWithQuote = str.endsWith("'") || str.endsWith('"');

  if (startsWithQuote && endsWithQuote) {
    const midContent = str.substring(1, str.length - 1);
    if (!midContent.includes("'") && !midContent.includes('"')) {
      return midContent;
    }
  }

  return str;
});
// eslint-disable-next-line no-undef
Handlebars.registerHelper('stripDate', dateString => {
  const date = new Date(dateString); // 날짜 문자열을 Date 객체로 변환
  const options = { month: 'short', day: 'numeric', year: 'numeric' }; // 날짜 포맷 옵션

  // 지정된 포맷으로 날짜 문자열을 반환하고 쉼표를 점으로 변경
  return date.toLocaleDateString('en-US', options).replace(',', '.');
});

Router.listen();
