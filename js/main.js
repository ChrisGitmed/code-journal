var avatarUrlInput = document.querySelector('#avatar-URL');
var avatarImage = document.querySelector('img');
var form = document.querySelector('form');

function changePicture(event) {
  avatarImage.src = event.target.value;
}

function submitValues(event) {

}

avatarUrlInput.addEventListener('input', changePicture);
form.addEventListener('submit', submitValues);
