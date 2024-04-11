const template = `
    <div class="header__top">
      <div class="header__navigation">
        <div class="header__inner">
          <div>
            <button></button>
            <h1>
              <a class="header__logo" href=""></a>
            </h1>
          </div>
          <div></div>
          <div></div>
        </div>     
      </div>
    </div>
    <div class="header__intro">
      <h3 class="header__title">작품이 되는 이야기, 블로그스토리<span></span></h3>
      <p class="header__description">
          <span>블로그스토리에 담긴 아름다운 작품을 감상해보세요.<br></span>
          <span>그리고 다시 꺼내 보세요.<br></span>
          <span>서랍 속 간직하고 있는 글과 감성을.<br></span>
      </p>
      <ul class="header__notice">
        <li></li>
        <li></li>
      </ul>
    </div>
`;

export default window.Handlebars.compile(template);
