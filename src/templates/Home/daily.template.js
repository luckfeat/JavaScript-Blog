const template = `
    <div class="daily__wrap">
      <h3 class="daily__title">DAILY ARTICLES</h3>
      <p class="daily__description">Don't Skip A Day On Global News</p>
      <div class="daily__week">
        <ul>
          <li>
            <a href="#/date?date={{this.monday}}">월</a>
          </li>
          <li>
            <a href="#/date?date={{this.tuesday}}">화</a>
          </li>
          <li>
            <a href="#/date?date={{this.wednesday}}">수</a>
          </li>
          <li>
            <a href="#/date?date={{this.thursday}}">목</a>
          </li>
          <li>
             <a href="#/date?date={{this.friday}}">금</a>
          </li>
          <li>
            <a href="#/date?date={{this.saturday}}">토</a>
          </li>
          <li>
            <a href="#/date?date={{this.sunday}}">일</a>
          </li>
        </ul>
      </div>
      <div>
        <div class="daily__sort">
          <div class="daily__filter">
            <a href="">최신순</a>
            <a href="">응원순</a>
            <a href="">라이킷순</a>
          </div>
        </div>
        <ul class="daily__news">
          {{#each this.newsArray}}
            {{#each this}}
              {{#each this}}
                <li class="daily__item">
                  <a class="daily__link" href="#/article?date={{this.publishedAt}}&title={{this.id}}">
                    <div class="daily__article-text">
                      <span class="daily__article-date">{{this.publishedAt}}</span>
                      <span class="daily__article-title">
                        <strong>{{stripQuote this.title}}</strong>
                        <span class="daily__article-new"></span>
                      </span>
                      <div class="daily__article-info">
                        <span>
                          <span class="daily__article-by">by</span>
                          {{this.source.name}}
                        </span>
                      </div>
                    </div>
                    <div class="daily__article-image">
                      <img src="{{this.image}}" alt="">
                    </div>
                  </a>
                </li>
              {{/each}}
            {{/each}}
          {{/each}}
        </ul>
      </div>
<!--      <a class="daily__all" href="">All<span></span></a>-->
    </div>
`;

export default window.Handlebars.compile(template);
