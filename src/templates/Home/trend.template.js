const template = `
  <div class="trend__carousel-wrap">
    <ul class="trend__carousel">
      <li>
        <div>
          {{#each this}}
            <div class="trend__item">
              <a href="#/article?title={{this.title}}">
                <img class="trend__img" width="200" height="200" src="{{this.image}}" alt="{{this.title}}">
                <div class="trend__info-wrap">
                  <div class="trend__info">
                    <strong class="trend__title">{{this.title}}</strong>
                    <span class="trend__description">{{this.description}}</span>
                    <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                  </div>
                </div>
              </a>
            </div>
          {{/each}}
        </div>
      </li>
      <li></li>
    </ul>
  </div>
 
`;

export default window.Handlebars.compile(template);
