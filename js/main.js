var $avatarUrlInput = document.querySelector('#avatar-URL');
var $avatarImage = document.querySelector('img');
var $form = document.querySelector('form');
var $viewList = document.querySelectorAll('main > div');
var $profileDiv = document.querySelector('div[data-view="profile"]');

function changePicture(event) {
  $avatarImage.src = event.target.value;
}

function submitValues(event) {
  event.preventDefault();
  data.profile.avatarUrl = $form.elements.avatarUrl.value;
  data.profile.username = $form.elements.username.value;
  data.profile.fullName = $form.elements.fullName.value;
  data.profile.location = $form.elements.location.value;
  data.profile.bio = $form.elements.bio.value;
  $form.reset();
  $avatarImage.src = 'images/placeholder-image-square.jpg';
  viewSwapper('profile');
}

function setItemsInStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', dataJSON);
}

function getProfileDataInDOM(data) {
  var $newProfile = document.createElement('div');

  var $newHeader = document.createElement('h1');
  $newHeader.setAttribute('class', 'column-full');
  $newHeader.textContent = data.profile.fullName;
  $newProfile.appendChild($newHeader);

  var $newRow = document.createElement('div');
  $newRow.setAttribute('class', 'row');
  $newProfile.appendChild($newRow);

  var $newImage = document.createElement('img');
  $newImage.setAttribute('src', data.profile.avatarUrl);
  $newImage.setAttribute('class', 'column-half contain padding-bottom');
  $newImage.setAttribute('alt', 'Profile picture');
  $newRow.appendChild($newImage);

  var $newColumn = document.createElement('div');
  $newColumn.setAttribute('class', 'column-half flex-column');
  $newRow.appendChild($newColumn);

  var $newUsernameSection = document.createElement('div');
  $newUsernameSection.setAttribute('class', 'padding-bottom row align-center');
  $newColumn.appendChild($newUsernameSection);

  var $usernameIcon = document.createElement('i');
  $usernameIcon.setAttribute('class', 'fas fa-user');
  $newUsernameSection.appendChild($usernameIcon);

  var $usernameText = document.createElement('p');
  $usernameText.textContent = data.profile.username;
  $newUsernameSection.appendChild($usernameText);

  var $newLocationSection = document.createElement('div');
  $newLocationSection.setAttribute('class', 'padding-bottom row align-center');
  $newColumn.appendChild($newLocationSection);

  var $locationIcon = document.createElement('i');
  $locationIcon.setAttribute('class', 'fas fa-map-marker-alt');
  $newLocationSection.appendChild($locationIcon);

  var $locationText = document.createElement('p');
  $locationText.textContent = data.profile.location;
  $newLocationSection.appendChild($locationText);

  var $bioText = document.createElement('p');
  $bioText.textContent = data.profile.bio;
  $newColumn.appendChild($bioText);
  return $newProfile;
}

function viewSwapper(dataView) {
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') !== dataView) {
      $viewList[i].className = 'hidden';
    } else {
      $viewList[i].className = '';
    }
  }
  data.view = dataView;
  if (data.view === 'profile') {
    $profileDiv.innerHTML = '';
    $profileDiv.appendChild(getProfileDataInDOM(data));
  }
  if (data.view === 'edit-profile') {
    $avatarImage.src = data.profile.avatarUrl;
    $form.elements.avatarUrl.value = data.profile.avatarUrl;
    $form.elements.username.value = data.profile.username;
    $form.elements.fullName.value = data.profile.fullName;
    $form.elements.bio.value = data.profile.bio;
  }

}

function checkLoaded(event) {
  var previousProfile = localStorage.getItem('code-journal');
  if (previousProfile !== null) {
    data = JSON.parse(previousProfile);
  }
  if (data.profile.username === '') {
    viewSwapper('edit-profile');
  } else {
    viewSwapper(data.view);
  }
}

$avatarUrlInput.addEventListener('input', changePicture);
$form.addEventListener('submit', submitValues);
window.addEventListener('beforeunload', setItemsInStorage);
document.addEventListener('DOMContentLoaded', checkLoaded);
