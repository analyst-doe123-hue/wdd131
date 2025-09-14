// references to input, button, and list
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// temporary test code to see how list items are created
button.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = input.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        li.append(deleteButton);
        list.append(li);

        // clear input after adding
        input.value = '';
        input.focus();

        // delete functionality
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
        });
    }
});
