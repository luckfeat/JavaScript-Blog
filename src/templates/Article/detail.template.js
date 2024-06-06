const template = `
  <header class="detail-header">
    <div class="detail-header__top">
      <div class="detail-header__inner">
        <div class="detail-header__inner-left">
          <h1>
            <!--          here-->
          </h1>
        </div>
      </div>     
    </div>
    <div class="detail-header__scroll"></div>
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
        {{#each this.keywords}}
          <li>{{this}}</li>
        {{/each}}
        {{#unless this.keywords}}
          <li>article</li>
          <li>trend</li>
          <li>upcoming</li>
        {{/unless}}
      </ul>
    </div>
    <div class="article__source">
      <div class="article__source-inner">
        <strong class="article__source-name">{{this.source.name}}</strong>
        <p class="article__source-description">{{this.description}}</p>
        <a class="article__source-url">{{this.source.url}}</a>
      </div>
    </div>
  </main>
  <div class="article__footer">
    <div class="article__footer-banner"></div>
    <div class="article__footer-controller">
      <a class="article__prev" href="">
        <span>previous article</span>
        <strong>{{this.prev.title}}</strong>
      </a>
      <a class="article__next" href="">
        <span>next article</span>
        <strong>{{this.next.title}}</strong>
      </a>
    </div>
  </div>
`;

export default window.Handlebars.compile(template);
