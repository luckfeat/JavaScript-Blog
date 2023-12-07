const template = `
   <input class='title' value={{message}} placeholder={{message}}></input>
`;

export default window.Handlebars.compile(template);
