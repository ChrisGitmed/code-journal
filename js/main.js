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

  var $usernameText = document.createElement('p');
  $usernameText.setAttribute('class', 'padding-bottom');
  $usernameText.textContent = data.profile.username;
  $newColumn.appendChild($usernameText);

  var $locationText = document.createElement('p');
  $locationText.setAttribute('class', 'padding-bottom');
  $locationText.textContent = data.profile.location;
  $newColumn.appendChild($locationText);

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
}
viewSwapper('profile');

$avatarUrlInput.addEventListener('input', changePicture);
$form.addEventListener('submit', submitValues);
window.addEventListener('beforeunload', setItemsInStorage);
