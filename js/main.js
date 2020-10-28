var $avatarUrlInput = document.querySelector('#avatar-URL');
var $avatarImage = document.querySelector('#avatar-image');
var $photoUrlInput = document.querySelector('#image-URL');
var $photo = document.querySelector('#photo');
var $form = document.querySelector('#profile-form');
var $journalForm = document.querySelector('#journal-form');
var $viewList = document.querySelectorAll('main > div');
var $profileDiv = document.querySelector('div[data-view="profile"]');

function changeAvatarImage(event) {
  $avatarImage.src = event.target.value;
}

function submitProfileValues(event) {
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
  $bioText.setAttribute('class', 'padding-bottom');
  $bioText.textContent = data.profile.bio;
  $newColumn.appendChild($bioText);

  var $editSection = document.createElement('div');
  $editSection.setAttribute('class', 'row justify-center');
  $newColumn.appendChild($editSection);

  var $editButton = document.createElement('a');
  $editButton.setAttribute('href', '#');
  $editButton.setAttribute('data-view', 'edit-profile');
  $editButton.setAttribute('class', 'link-button');
  $editButton.textContent = 'EDIT';
  $editSection.appendChild($editButton);
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
    if (data.profile.avatarUrl !== '') {
      $avatarImage.src = data.profile.avatarUrl;
    } else {
      $avatarImage.src = 'images/placeholder-image-square.jpg';
    }
    $form.elements.avatarUrl.value = data.profile.avatarUrl;
    $form.elements.username.value = data.profile.username;
    $form.elements.fullName.value = data.profile.fullName;
    $form.elements.location.value = data.profile.location;
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

function linkHandler(event) {
  if (event.target.tagName === 'A') {
    if (data.profile.username !== '') {
      viewSwapper(event.target.getAttribute('data-view'));
    }
  }
}

function changePhoto(event) {
  $photo.src = event.target.value;
}

function submitJournalValues(event) {
  event.preventDefault();
  var newJournalEntry = {};

  newJournalEntry.imageUrl = $journalForm.elements.imageUrl.value;
  newJournalEntry.title = $journalForm.elements.title.value;
  newJournalEntry.notes = $journalForm.elements.notes.value;
  data.entries.push(newJournalEntry);
  $photo.src = 'images/placeholder-image-square.jpg';
}

$avatarUrlInput.addEventListener('input', changeAvatarImage);
$form.addEventListener('submit', submitProfileValues);
window.addEventListener('beforeunload', setItemsInStorage);
document.addEventListener('DOMContentLoaded', checkLoaded);
document.addEventListener('click', linkHandler);
$photoUrlInput.addEventListener('input', changePhoto);
$journalForm.addEventListener('submit', submitJournalValues);
