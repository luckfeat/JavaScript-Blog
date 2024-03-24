const template = `
      <h1>Recommended Articles <span>AI</span></h1>
      <ul class="recommend">
          <a class="prev" href="javascript:void(0);">이전</a>
          {{#each this}}
              <a href="#/article?category=ai&title={{this.title}}">
                <li>{{this.title}}</li>
                <p>{{this.description}}</p>
                <img width="200" height="200" src="{{this.image}}" alt="{{this.title}}">
                <p>{{this.source.name}}</p>
              </a>
          {{/each}}
          <a class="next" href="javascript:void(0);">이후</a>
     </ul>
`;

export default window.Handlebars.compile(template);
