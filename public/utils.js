function addMenuRow() {
    const fieldsContainer = document.getElementById('additional-fields-container');

    // wrapper div for new input
    const divWrapper = document.createElement('div');
    divWrapper.className = 'form-menu-day';

    // label
    const label = document.createElement('label');
    // label.innerText = 'day ';

    // input
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'days[]';
    input.required = true;

    // append them together
    divWrapper.append(label, input);
    fieldsContainer.appendChild(divWrapper);
}

function showModal(id, deleteUrlBase) {
    // const baseUrl = window.location.pathname.replace(/\/$/, ''); fixing passing the base url from the server side
    const modal = document.querySelector('.delete-modal');
    const form = document.getElementById('confirm-delete-form');
    form.action = `${deleteUrlBase}/${parseInt(id)}/delete`;
    modal.style.display = 'block';
};

function closeModal() {
    const modal = document.querySelector('.delete-modal');
    modal.style.display = 'none';
};

const searchBar = document.querySelector('.search-bar-container');
// Restore state on page load
const isVisible = localStorage.getItem('searchBarIsVisible') === 'true';
searchBar.classList.toggle('hidden', !isVisible); // add the class if not visible
// Toggle function
function showSearchBar() {
    const isHidden = searchBar.classList.toggle('hidden');
    console.log('local storage value:', localStorage.getItem('searchBarIsVisible'));
    // Save visible state (true if visible, false if hidden)
    localStorage.setItem('searchBarIsVisible', !isHidden);
    
}




