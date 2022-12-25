const shortURL = document.querySelector('.shortURL');

shortURL.addEventListener('click', (e) => {
  console.log(e.target.dataset.id);
  if (!e.target.dataset.id) {
    return console.log('error');
  }
  navigator.clipboard
    .writeText(e.target.dataset.id)
    .then(() => console.log('Async: Copying to clipboard was successful!'))
    .catch(() => console.error('Async: Could not copy text: ', err));

  shortURL.textContent = 'Copied!!';
});
