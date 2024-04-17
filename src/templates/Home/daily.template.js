const template = `
    <div class="daily__wrap">
      <h3 class="daily__title">요일별 연재</h3>
      <p class="daily__description">블로그북 오리지널 연재를 만나 보세요.</p>
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
        <div class="daily__sort"></div>
        <ul class="daily__news">
          {{#each this.newsArray}}
            {{#each this}}
              {{#each this}}
                <li>
                  <a href="">
                    <div class="daily__text">
                      <span>{{this.publishedAt}}</span>
                      <span>
                        <strong>{{this.title}}</strong>
                      </span>
                      <div>
                        <span>
                          <span>by</span>
                          {{this.source.name}}
                        </span>
                      </div>
                    </div>
                    <div class="daily__image">
                      <img src="{{this.image}}" alt="">
                    </div>
                  </a>
                </li>
              {{/each}}
            {{/each}}
          {{/each}}
        </ul>
      </div>
      <a href=""></a>
    </div>
`;

export default window.Handlebars.compile(template);
