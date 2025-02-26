
const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const currenType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'bi bi-filter-square-fill',
            asc: 'bi bi-sort-up',
            desc: 'bi bi-sort-down',
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[currenType];
        const type = types[currenType];

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

        const ouput =  `<a href="${href}"> <span class="${icon}"></span> </a>`;
        return new Handlebars.SafeString(ouput);
    }
}