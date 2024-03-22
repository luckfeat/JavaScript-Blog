const template = `
    <ul class="daily">
      
      <a href="#/article?date={{this}}"><li>월</li></a>
      <a><li>화</li></a>
      <a><li>수</li></a>
      <a><li>목</li></a>
      <a><li>금</li></a>
      <a><li>토</li></a>
      <a><li>일</li></a>
    </ul>
`;

export default window.Handlebars.compile(template);
