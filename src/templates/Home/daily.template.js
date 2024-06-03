const template = `
    <div class="daily__wrap">
      <h3 class="daily__title">DAILY ARTICLES</h3>
      <p class="daily__description">Don't skip a day on global news.</p>
      <div class="daily__week">
        <ul>
          <li>
<!--            <a class="daily__pagination" href="#/date?date={{this.monday}}">Mon</a>-->
            <a class="daily__pagination monday">Mon</a>
          </li>
          <li>
<!--            <a class="daily__pagination tuesday" href="#/date?date={{this.tuesday}}">Tue</a>-->
            <a class="daily__pagination tuesday">Tue</a>
          </li>
          <li>
<!--            <a class="daily__pagination wednesday" href="#/date?date={{this.wednesday}}">Wed</a>-->
            <a class="daily__pagination wednesday">Wed</a>
          </li>
          <li>
<!--            <a class="daily__pagination thursday" href="#/date?date={{this.thursday}}">Thu</a>-->
            <a class="daily__pagination thursday">Thu</a>
          </li>
          <li>
<!--             <a class="daily__pagination friday" href="#/date?date={{this.friday}}">Fri</a>-->
             <a class="daily__pagination friday">Fri</a>
          </li>
          <li>
<!--            <a class="daily__pagination saturday" href="#/date?date={{this.saturday}}">Sat</a>-->
            <a class="daily__pagination saturday">Sat</a>
          </li>
          <li>
<!--            <a class="daily__pagination sunday" href="#/date?date={{this.sunday}}">Sun</a>-->
            <a class="daily__pagination sunday">Sun</a>
          </li>
        </ul>
      </div>
      <div>
<!--        <div class="daily__sort">-->
<!--          <div class="daily__filter">-->
<!--            <a href="">최신순</a>-->
<!--            <a href="">응원순</a>-->
<!--            <a href="">라이킷순</a>-->
<!--          </div>-->
<!--        </div>-->
        {{#each this.newsArray}}
          <ul class="daily__news {{this.day}}">
            {{#each this}}
              {{#each this}}
                <li class="daily__item">
                  <a class="daily__link" href="#/article?date={{this.publishedAt}}&title={{this.id}}">
                    <div class="daily__article-text">
<!--                      <span class="daily__article-date">{{stripDate this.publishedAt}}</span>-->
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
        </ul>
        {{/each}}
      </div>
<!--      <a class="daily__all" href="">All<span></span></a>-->
    </div>
`;

export default window.Handlebars.compile(template);
