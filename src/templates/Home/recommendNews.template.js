const articles = `
          {{#each this}}
              <a href="#/article?category=ai&title={{this.title}}">
                <li>{{this.title}}</li>
                <p>{{this.description}}</p>
                <img width="200" height="200" src="{{this.image}}" alt="{{this.title}}">
                <p>{{this.source.name}}</p>
              </a>
          {{/each}}
`;

export default window.Handlebars.compile(articles);
