export default {
    render
};

function render(items) {
    const list = document.createElement('ul');

    items.forEach(item => {
        const listItem = document.createElement('li');

        listItem.insertAdjacentHTML('beforeend', `
            <span>${item.stationName}:</span>
            <span>locks: ${item.availability.locks}</span>
            <span>bikes: ${item.availability.bikes}</span>
        `);

        list.appendChild(listItem);
    });

    return list;
}
