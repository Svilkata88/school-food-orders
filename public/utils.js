function addMenuRow() {
    const fieldsContainer = document.getElementById('additional-fields-container');

    // wrapper div for new input
    const divWrapper = document.createElement('div');
    divWrapper.className = 'form-menu-day';

    // label
    const label = document.createElement('label');
    label.innerText = 'day ';

    // input
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'days[]';
    input.required = true;

    // append them together
    divWrapper.append(label, input);
    fieldsContainer.appendChild(divWrapper);
}
