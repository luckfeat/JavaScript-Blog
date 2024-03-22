const template = `
  <table>
    <table class="keywords">
    <tr>
      <td><a href="#/keyword?category=ai">AI</a></td>
      <td><a href="#/keyword?category=business">Business</a></td>
      <td><a href="#/keyword?category=crypto">Crypto</a></td>
      <td><a href="#/keyword?category=elon">Elon</a></td>
      <td><a href="#/keyword?category=entertainment">Entertainment</a></td>
      <td><a href="#/keyword?category=general">General</a></td>
    </tr>
    <tr>
        <td><a href="#/keyword?category=health">Health</a></td>
        <td><a href="#/keyword?category=hiphop">Hiphop</a></td>
        <td><a href="#/keyword?category=korea">Korea</a></td>
        <td><a href="#/keyword?category=meta">Meta</a></td>
        <td><a href="#/keyword?category=nation">Nation</a></td>
        <td><a href="#/keyword?category=nft">NFT</a></td>
    </tr>
    <tr>
        <td><a href="#/keyword?category=programming">Programming</a></td>
        <td><a href="#/keyword?category=science">Science</a></td>
        <td><a href="#/keyword?category=sports">Sports</a></td>
        <td><a href="#/keyword?category=technology">Technology</a></td>
        <td><a href="#/keyword?category=world">World</a></td>
        <td><a href="#/keyword?category=youtube">Youtube</a></td>
    </tr>
  </table>
</table>
`;

export default window.Handlebars.compile(template);
