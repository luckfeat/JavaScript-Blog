const template = `
    <h3>Main</h3>
    <ul class="carousel">
        {{#each articles}}
            <li>{{this}}</li>
        {{/each}}
    </ul>
`;

export default window.Handlebars.compile(template);
