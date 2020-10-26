var avatarUrlInput = document.querySelector('#avatar-URL');
var avatarImage = document.querySelector('img');

function changePicture(event) {
  avatarImage.src = event.target.value;
}

avatarUrlInput.addEventListener('input', changePicture);
