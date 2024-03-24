const template = `
    <ul class="daily">
      <a href="#/date?date={{this.monday}}"><li>월</li></a>
      <a href="#/date?date={{this.tuesday}}"><li>화</li></a>
      <a href="#/date?date={{this.wednesday}}"><li>수</li></a>
      <a href="#/date?date={{this.thursday}}"><li>목</li></a>
      <a href="#/date?date={{this.friday}}"><li>금</li></a>
      <a href="#/date?date={{this.saturday}}"><li>토</li></a>
      <a href="#/date?date={{this.sunday}}"><li>일</li></a>
    </ul>
`;

export default window.Handlebars.compile(template);
