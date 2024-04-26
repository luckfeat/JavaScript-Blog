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
              <span class="detail-header__icon"></span>
            </a>
            <a class="detail-header__like" href="">
              <span class="detail-header__icon"></span>
            </a>
            <a class="detail-header__comment" href="">
              <span class="detail-header__icon"></span>
            </a>
            <a class="detail-header__share" href="">
              <span class="detail-header__icon"></span>
            </a>
          </div>
        </div>
      </div>     
    </div>
  </header>
  <main>
    <div class="article__cover">
      <div class="article__cover-item">
        <div class="article__image" style="background-image:url({{this.image}})">
          <div class="article__cover-title">
            <h1>{{stripQuote this.title}}</h1>
          </div>
          <div class="article__cover-info">
            <span class="article__by">by</span>
            <span class="article__author">{{this.source.name}}</span>
            <span class="article__dot"></span>
            <span class="article__date">{{stripDate this.publishedAt}}</span>
          </div>
        </div>
        <div class="article__cover-inner"></div>
      </div>
    </div>
    <div class="article__body">
      <div class="article__text">
        {{#each this.content}}
          <h4>
            <span class="article__sentence">{{this}}</span>
          </h4>
        {{/each}}
      </div>
    </div>
    <div class="article__info-keyword">
      <ul>
        <li></li>
      </ul>
    </div>
  </main>
  <div class="article__footer">
    <a class="article__prev" href="">
      <span>previous article</span>
      <strong></strong>
    </a>
    <a class="article__next" href="">
      <span>next article</span>
      <strong></strong>
    </a>
  </div>
`;

export default window.Handlebars.compile(template);
