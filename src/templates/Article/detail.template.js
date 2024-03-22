const template = `
  <h1>{{this.title}}</h1>
  <p>{{this.description}}</p>
  <p>{{this.publishedAt}}</p>
  <p>{{this.content}}</p>
  <img width="200" height="200" src="{{this.image}}" alt="{{this.title}}">
  <p>{{this.source.name}}</p>
  <a>{{this.url}}</a>  
`;

export default window.Handlebars.compile(template);
