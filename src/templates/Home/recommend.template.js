const template = `
      <h3 class="recommend__title"></h3>
      <p class="recommend__description">
        <span></span>
      </p>
      <div class="recommend__carousel-wrap">
          <ul class="recommend__carousel">
             {{#each this}}
                <li>
                 <a href="#/article?category=ai&title={{this.title}}">
                    <div class="recommend__image">
                      <img src="{{this.image}}" alt="{{this.title}}">
                    </div>
                    <strong class="recommend__subject">{{stripQuote this.title}}</strong>
                    <p class="recommend__content">{{this.description}}</p>
                    <span class="recommend__source"><span class="recommend__by">by</span>&nbsp{{this.source.name}}</span>  
                  </a>
               </li>
            {{/each}}
          </ul>
     </div>
<!--     <div class="recommend__button">-->
<!--      <a class="prev" href="javascript:void(0);">이전</a>-->
<!--      <a class="next">이후</a>-->
<!--    </div>-->
     
`;

export default window.Handlebars.compile(template);
