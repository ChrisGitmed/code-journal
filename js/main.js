var avatarUrlInput = document.querySelector('#avatar-URL');
var avatarImage = document.querySelector('img');
var form = document.querySelector('form');

function changePicture(event) {
  avatarImage.src = event.target.value;
}

function submitValues(event) {
  data.profile.avatarUrl = form.elements.avatarUrl.value;
  data.profile.username = form.elements.username.value;
  data.profile.fullName = form.elements.fullName.value;
  data.profile.location = form.elements.location.value;
  data.profile.bio = form.elements.bio.value;
  form.elements.avatarUrl.value = '';
  form.elements.username.value = '';
  form.elements.fullName.value = '';
  form.elements.location.value = '';
  form.elements.bio.value = '';
  event.preventDefault();
}

avatarUrlInput.addEventListener('input', changePicture);
form.addEventListener('submit', submitValues);
