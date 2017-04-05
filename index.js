import styles from './main.scss';

// TODO add support for multiple html files
require(`./index.html`);

// reload HTML files
if (module.hot) {
    module.hot.accept("./index.html", () => {
        const contents = require('./index.html');

        console.log('reloading index.html', contents, arguments);

        document.body.innerHTML = contents;

        return false;
    });
}
