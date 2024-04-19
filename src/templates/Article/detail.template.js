const template = `
  <header class="detail-header">
    <div class="detail-header__top">
      <div class="detail-header__inner">
        <div class="detail-header__inner-left">
          <button></button>
          <h1>
            <a class="detail-header__logo" href=""></a>
          </h1>
        </div>
        <div class="detail-header__inner-right">
          <button type="button"></button>
          <div class="detail-header__button-wrap">
            <a class="detail-header__donation" href="">
              <span></span>
            </a>
            <a class="detail-header__like" href="">
              <span></span>
            </a>
            <a class="detail-header__comment" href="">
              <span></span>
            </a>
            <a class="detail-header__share" href="">
              <span></span>
            </a>
          </div>
        </div>
      </div>     
    </div>
  </header>
  <div class="article__body">
    <div class="article__text">
      {{#each this.content}}
        <h4>
          <span class="article__sentence">{{this}}</span>
        </h4>
      {{/each}}
    </div>
  </div>
`;

export default window.Handlebars.compile(template);
