const template = `
      <ul class="trend__list">
          {{#each this}}
          <li class="trend__item">
              <a href="#/article?title={{this.title}}">
                <p class="trend__title">{{this.title}}</p>
                <p class="trend__description">{{this.description}}</p>
                <img class="trend__img" width="200" height="200" src="{{this.image}}" alt="{{this.title}}">
                <p class="trend__source">{{this.source.name}}</p>
              </a>
          </li>
          {{/each}}
     </ul>
`;

export default window.Handlebars.compile(template);
