const template = `
    <div class="footer__inner">
      <div class="footer__info">
        <div class="footer__quotation">
          <span class="footer__logo"></span>
          <p class="footer__slogan">
            "You can make anything"
            <br>
            "by writing."
          </p>
          <p class="footer__writer">C.S.Lewis</p>>
        </div>  
        <ul class="footer__service">
          <li><a>블로그 이용안내</a></li>
          <li><a>작가신청</a></li>
          <li><a>작가 지원 프로젝트</a></li>
          <li><a>제휴제안</a></li>
          <li><a>고객센터</a></li>
        </ul>
        <ul class="footer__policy">
          <li><a>이용약관</a></li>
          <li><a>이전 이용약관</a></li>
          <li><a>카카오 유료서비스 이용약관</a></li>
          <li><a class="footer__policy footer__policy--bold">카카오 개인정보 처리방침</a></li>
          <li><a>청소년 보호정책</a></li>
          <li><a>운영정책</a></li>
        </ul>
        <ul class="footer__sns">
          <li><a>브런치스토리 공지사항</a></li>
          <li><a>공식 카카오톡 채널</a></li>
          <li><a>공식 인스타그램</a></li>
          <li><a>공식 페이스북</a></li>
        </ul>
      </div>
      <div class="footer__corp"></div>
    </div>
`;

export default window.Handlebars.compile(template);
