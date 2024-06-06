const template = `
  <div class="keyword-header">
    <div class="keyword-header__category">{{category}}</div>
  </div>
  <div class="keyword__contents">
    <div class="keyword__contents-wrap">
      <ul class="keyword__list">   
        {{#each keywordNews}}
        <li>
          <a href="#/article?&category={{../category}}&title={{this.title}}">
            <div class="keyword__article">
              <strong>{{this.title}}</strong>
              <p class="keyword__article-description">{{this.description}}</p>
              <div class="keyword__details">
                <span>{{stripDate this.publishedAt}}</span>
                <span class="keyword__dot"></span>
                <span>by {{this.source.name}}</span>
              </div>
            </div>
            <div class="keyword__thumb">
              <img width="200" height="200" src="{{this.image}}" alt="{{this.title}}">
            </div>
          </a>
        </li>
        {{/each}}
      </ul>
    </div>
  </div>
`;

export default window.Handlebars.compile(template);
