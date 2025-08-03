const select = document.getElementById('bookSelect');
const form = document.getElementById('editForm');
const nameInput = document.getElementById('editName');
const langInput = document.getElementById('editLanguage');
const imgInput = document.getElementById('editImage');
const contentArea = document.getElementById('editContent');

let books = JSON.parse(localStorage.getItem('books')) || [];
let currentIndex = null;

// Dropdown'u doldur
books.forEach((book, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = book.name;
  select.appendChild(option);
});

select.addEventListener('change', () => {
  const i = select.value;
  if (i === '') {
    form.style.display = 'none';
    return;
  }

  const book = books[i];
  currentIndex = i;

  nameInput.value = book.name;
  langInput.value = book.language;
  imgInput.value = book.image;
  contentArea.value = book.content;

  form.style.display = 'block';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  books[currentIndex] = {
    name: nameInput.value,
    language: langInput.value,
    image: imgInput.value,
    content: contentArea.value
  };

  localStorage.setItem('books', JSON.stringify(books));
  alert("Kitap başarıyla güncellendi!");
});
