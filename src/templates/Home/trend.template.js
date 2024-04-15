const template = `
  <div class="trend__carousel-wrap">
    <ul class="trend__carousel">
      {{#each this}}
      <li>
        <div class="trend__grid {{this.type}}">
            {{#each this.articles}}
            <div class="trend__article">
              <a href="#/article?title={{this.title}}">
                <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                <div class="trend__info-wrap">
                  <div class="trend__info">
                    <strong class="trend__title">{{this.title}}</strong>
                    <span class="trend__description">{{this.description}}</span>
                    <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                  </div>
                  <div class='trend__align'></div>
                </div>
                <div class="trend__mask"></div>
              </a>
            </div>
            {{/each}}
        </div>
      </li>
      {{/each}}
      <li></li>
    </ul>
  </div>
`;

export default window.Handlebars.compile(template);

/*
 * if (type)
 * each
 * if (index1)
 * if (index2)
 * if (index3)
 * end
 * */
