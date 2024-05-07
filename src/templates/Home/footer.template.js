const template = `
    <div class="footer__inner">
      <div class="footer__info">
        <div class="footer__quotation">
<!--          <span class="footer__logo"></span>-->
          <p class="footer__slogan">
            There are far, far better things ahead 
            <br>
            than any we leave behind.
          </p>
          <p class="footer__writer">C.S.Lewis</p>
        </div>  
        <ul class="footer__service">
          <li><a>News</a></li>
          <li><a>Sources</a></li>
          <li><a>Project</a></li>
          <li><a>Inquiry</a></li>
          <li><a>Help Center</a></li>
        </ul>
        <ul class="footer__policy">
          <li><a>Policy</a></li>
          <li><a>History</a></li>
          <li><a>Managers</a></li>
          <li><a class="footer__policy footer__policy--bold">Important</a></li>
<!--          <li><a>청소년 보호정책</a></li>-->
<!--          <li><a>운영정책</a></li>-->
        </ul>
        <ul class="footer__sns">
          <li><a>Announcement</a></li>
          <li><a>Official Channel</a></li>
          <li><a>Instagram</a></li>
          <li><a>Facebook</a></li>
        </ul>
      </div>
      <div class="footer__corp">
        <small class="footer__copyright">
          <div class="footer__corp-link">© Jihun Corp.</div>
          <div class="footer__corp-info">
            <ul>
              <li>Manager : Jihun Lee |&nbsp;</li>
<!--              <li>사업자등록번호 : |&nbsp;</li>-->
<!--              <li>통신판매업신고번호 : |&nbsp;</li>-->
              <li>Address : Seochojungang-ro, Seocho-gu, Seoul, Republic of Korea |&nbsp;</li>
<!--              <li>Host : (주)이지훈 |&nbsp;</li>-->
              <li>Mobile : 0000-0000</li>
              <li>Email : luckfeat@gmail.com</li>
            </ul>
          </div>
        </small>      
        <ul class="footer__download">
          <li><a href=""><span class="footer__android"></span></a></li>
          <li><a href=""><span class="footer__apple"></span></a></li>
        </ul>
      </div>
    </div>
`;

export default window.Handlebars.compile(template);
