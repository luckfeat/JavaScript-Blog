const template = `
  <h3 class="keyword__title">KEYWORD NEWS</h3>
  <p class="keyword__description">News categorized by popular keywords.</p>
  <div class="keyword__list-wrap">
    <div class="keyword__list">
      <a class="keyword__item" href="#/keyword?category=ai"><span>AI</span></a>
      <a class="keyword__item" href="#/keyword?category=business"><span>Business</span></a>
      <a class="keyword__item" href="#/keyword?category=crypto"><span>Crypto Currency</span></a>
      <a class="keyword__item" href="#/keyword?category=elon"><span>Elon Musk</span></a>
      <a class="keyword__item" href="#/keyword?category=entertainment"><span>K-POP & Entertainment</span></a>
      <a class="keyword__item" href="#/keyword?category=general"><span>General / Lifestyle</span></a>
      <a class="keyword__item" href="#/keyword?category=health"><span>Health & Beauty</span></a>
      <a class="keyword__item" href="#/keyword?category=hiphop"><span>Hip Hop</span></a>
      <a class="keyword__item" href="#/keyword?category=korea"><span>South Korea</span></a>
      <a class="keyword__item" href="#/keyword?category=meta"><span>Meta</span></a>
      <a class="keyword__item" href="#/keyword?category=nation"><span>Nation</span></a>
      <a class="keyword__item" href="#/keyword?category=nft"><span>NFT</span></a>
      <a class="keyword__item" href="#/keyword?category=programming"><span>Software Engineer / Programming</span></a>
      <a class="keyword__item" href="#/keyword?category=science"><span>Science</span></a>
      <a class="keyword__item" href="#/keyword?category=sports"><span>Global Sports</span></a>
      <a class="keyword__item" href="#/keyword?category=technology"><span>Technology</span></a>
      <a class="keyword__item" href="#/keyword?category=world"><span>Global News</span></a>
      <a class="keyword__item" href="#/keyword?category=youtube"><span>Youtube</span></a>
      <a class="keyword__item" href="#/keyword?category=blockchain"><span>Block Chain</span></a>
      <a class="keyword__item" href="#/keyword?category=apple"><span>Apple</span></a>
      <a class="keyword__item" href="#/keyword?category=stock"><span>Stock</span></a>
      <a class="keyword__item" href="#/keyword?category=meta"><span>Facebook</span></a>
      <a class="keyword__item" href="#/keyword?category=fashion"><span>Fashion</span></a>
      <a class="keyword__item" href="#/keyword?category=microsoft"><span>Microsoft</span></a>
    </div>
  </div>
`;

export default window.Handlebars.compile(template);
