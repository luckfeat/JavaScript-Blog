const template = `
<!--    <div class="header__top">-->
<!--      <div class="header__navigation">-->
<!--        <div class="header__inner">-->
<!--          <div class="header__inner-left">-->
<!--            <button></button>-->
<!--            <h1>-->
<!--              <a class="header__logo" href=""></a>-->
<!--            </h1>-->
<!--          </div>-->
<!--          <div class="header__inner-right">-->
<!--            <div>-->
<!--              <form action=""></form>-->
<!--              <button type="button"></button>-->
<!--            </div>  -->
<!--          </div>-->
<!--          <div class="header__inner-right">-->
<!--            <a href="">시작하기</a>-->
<!--          </div>-->
<!--        </div>     -->
<!--      </div>-->
<!--    </div>-->
    <div class="header__intro">
<!--      <h3 class="header__title">작품이 되는 이야기, 블로그스토리<span></span></h3>-->
      <h3 class="header__title">Stay ahead, Stay informed and Stay global</h3>
      <p class="header__description">
          <span>Your trusted news source.<br></span>
      </p>
      <ul class="header__notice">
        <li></li>
        <li></li>
      </ul>
    </div>
`;

export default window.Handlebars.compile(template);
