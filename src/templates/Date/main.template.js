const template = `
   <ul>
          {{#each this.dateNews}}
              <a href="#/article?title={{this.title}}&date={{../date}}">
                <li>{{this.title}}</li>
                <p>{{this.description}}</p>
                <img width="200" height="200" src="{{this.image}}" alt="{{this.title}}">
                <p>{{this.source.name}}</p>
              </a>
          {{/each}}
     </ul>
`;

export default window.Handlebars.compile(template);
