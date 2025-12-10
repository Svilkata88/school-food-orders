

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

function showModal(id, UrlBase) {
    // const baseUrl = window.location.pathname.replace(/\/$/, ''); fixing passing the base url from the server side
    const modal = document.querySelector('.delete-modal');
    const form = document.getElementById('confirm-delete-form');
    form.action = `${UrlBase}/${parseInt(id)}/delete`;
    modal.style.display = 'block';
};

function closeModal() {
    const modal = document.querySelector('.delete-modal');
    modal.style.display = 'none';
};

const searchBar = document.querySelector('.search-bar-container');
// Restore state on page load
const isVisible = localStorage.getItem('searchBarIsVisible') === 'true';
if(searchBar) {
    searchBar.classList.toggle('hidden', !isVisible); 
  }
// Toggle function
function showSearchBar() {
  const isHidden = searchBar.classList.toggle('hidden');
  // Save visible state (true if visible, false if hidden)
  localStorage.setItem('searchBarIsVisible', !isHidden);
}

function goToPage(url) {
  window.location.href = url;
}

async function likeUnlike(restaurantId, btn) {
  const res = await fetch(`/restaurants/${restaurantId}/like`, {
    method: 'POST'
  });
  const data = await res.json();

  if (data.liked) {
    btn.classList.remove('like-btn');
    btn.classList.add('like-btn-liked');
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
  } else {
    btn.classList.remove('like-btn-liked');
    btn.classList.add('like-btn');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  }
};

function showLikedRestaurants() {
  const likedRest = document.querySelector('.liked-restaurants-container');
  const isHidden = likedRest.classList.toggle('hidden');
};

const profilePicInput = document.getElementById('upload-profile-pic');
if(profilePicInput) {
  profilePicInput.addEventListener('change', () => {
  profilePicInput.closest('form').submit();
  console.log('Profile pic changed!')
});
}


const input =  document.querySelector('input[type="file"]');
const img = document.querySelector('.restaurant-pic-wrapper img');
if (input && img) {
  input.addEventListener('change', (e) => {

    const newImage = e.target.files[0];
    if (!newImage) return;

    img.src = URL.createObjectURL(newImage);
  });
}