const template = `
  <div class="trend__carousel-wrap">
    <ul class="trend__carousel">
      {{#each this.gridType}}
      <li>
        {{#if this.vertical}}
        <div class="trend__grid {{this.type}}">
            {{#each this.articles}}
              {{#if @first}}
              <div class="trend__article-wrap trend__article-wrap--type1">
                <a class="trend__article" href="#/article?title={{this.title}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__description">{{this.description}}</span>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
              {{else}}
                {{#if (equalTo @index 1)}}
                <div class="trend__article-wrap trend__article-wrap--type2">
                <a class="trend__article" href="#/article?title={{this.title}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
                {{else}}
                <div class="trend__article-wrap trend__article-wrap--type3">
                <a class="trend__article" href="#/article?title={{this.title}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
                {{/if}}
              {{/if}}
            {{/each}}
        </div>
        {{else}}
          {{#if this.horizontal}}
          <div class="trend__grid {{this.type}}">
            {{#each this.articles}}
              {{#if @first}}
              <div class="trend__article-wrap trend__article-wrap--type1">
                <a class="trend__article" href="#/article?title={{this.title}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
              {{else}}
                {{#if (equalTo @index 1)}}
                <div class="trend__article-wrap trend__article-wrap--type2">
                <a class="trend__article" href="#/article?title={{this.id}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
                {{else}}
                  {{#if (equalTo @index 2)}}
                  <div class="trend__article-wrap trend__article-wrap--type3">
                <a class="trend__article" href="#/article?title={{this.title}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
                  {{else}}
                  <div class="trend__article-wrap trend__article-wrap--type4">
                <a class="trend__article" href="#/article?title={{this.title}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
                  {{/if}}
                {{/if}}
              {{/if}}
            {{/each}}
        </div>
          {{else}}
            {{#if this.four}}
            <div class="trend__grid {{this.type}}">
              {{#each this.articles}}
              <div class="trend__article-wrap">
                <a class="trend__article" href="#/article?title={{this.title}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
              {{/each}}
            </div>
            {{else}}
            <div class="trend__grid {{this.type}}">
              {{#each this.articles}}
              <div class="trend__article-wrap">
                <a class="trend__article" href="#/article?title={{this.title}}">
                  <img class="trend__img" src="{{this.image}}" alt="{{this.title}}">
                  <div class="trend__info-wrap">
                    <div class="trend__info">
                      <strong class="trend__title">{{stripQuote this.title}}</strong>
                      <span class="trend__description">{{this.description}}</span>
                      <span class="trend__source"><span class="trend__by">by</span>{{this.source.name}}</span>
                    </div>
                  </div>
                  <div class="trend__mask"></div>
                </a>
              </div>
              {{/each}}
            </div>
            {{/if}}
          {{/if}}
        {{/if}}
      </li>
      {{/each}}
    </ul>
  </div>
  <div class="trend__button">
    <a class="trend__prev" href="">
    
    </a>
    <a class="trend__next" href="">
      <span></span>
    </a>
  </div>
  <div class="trend__pagination">
    {{#each this.gridPagination}}
    <a class="trend__pagination-page" href=""><span class="trend__pagination-number trend__pagination-number--active">0{{this}}</span></a>
    {{/each}}
  </div>
`;

export default window.Handlebars.compile(template);
