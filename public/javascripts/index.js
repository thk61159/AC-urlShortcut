//copy function
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
//input validation
const urlInput = document.querySelector('.urlInput');

urlInput.addEventListener('input', (e) => {
  let url = e.target.value;

  if (!isValidUrl(url)) {
    urlInput.classList.add('text-primary');
    urlInput.classList.remove('text-success');
  } else {
    urlInput.classList.add('text-success');
    urlInput.classList.remove('text-primary');
  }
  console.log(urlInput);
});

//我不會RegExp這個是網路上找到的
function isValidUrl(urlString) {
  let urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // validate fragment locator
  return urlPattern.test(urlString);
}
//url validation
if (urlInput.matches('.wrongUrl')) {
  urlInput.classList.add('text-primary');
  urlInput.classList.remove('text-success');
}
