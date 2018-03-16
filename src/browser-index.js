import view from './view';

fetch('http://localhost:8080/bikesnstuff', {mode: 'cors'})
    .then(response => response.json())
    .then(items => {
        const list = view.render(items);

        document.body.appendChild(list);
    })
    .catch(err => console.error(err));
