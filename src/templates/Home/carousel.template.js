const template = `
      <ul class="carousel">
          {{#each this}}
              <li>{{this.title}}</li>
              <p>{{this.description}}</p>
              <img width="200" height="200" src="{{this.image}}" alt="{{this.title}}">
              <p>{{this.source.name}}</p>
          {{/each}}
     </ul>
`;

export default window.Handlebars.compile(template);
