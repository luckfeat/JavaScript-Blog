const articles = `
  {{#each this}}
  <li>
    <a href="#/article?category=ai&title={{this.title}}">
      <div class="recommend__image">
        <img src="{{this.image}}" alt="{{this.title}}">
      </div>
      <strong class="recommend__subject">{{this.title}}</strong>
      <p class="recommend__content">{{this.description}}</p>
      <span class="recommend__source"><span class="recommend__by">by</span>&nbsp{{this.source.name}}</span>  
    </a>
  </li>
  {{/each}}
`;

export default window.Handlebars.compile(articles);
