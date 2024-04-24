import Router from './routes';

Handlebars.registerHelper('equalTo', (a, b) => a === b);
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

Router.listen();
