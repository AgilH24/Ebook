const form = document.getElementById('bookForm');
const list = document.getElementById('bookList');
const imageFileInput = document.getElementById('bookImageFile');
const preview = document.getElementById('preview');

let base64Image = '';
let books = JSON.parse(localStorage.getItem('books')) || [];
let dictionary = JSON.parse(localStorage.getItem('dictionary')) || {};


// Sayfa yüklendiğinde kitapları listele
window.addEventListener('DOMContentLoaded', () => {
  books.forEach(renderBook);
});

// Dosya seçildiğinde base64'e çevir ve önizle
imageFileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    base64Image = e.target.result;
    preview.src = base64Image;
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('bookName').value;
  const language = document.getElementById('bookLanguage').value;
  const image = base64Image || document.getElementById('bookImage').value;
  const content = document.getElementById('bookContent').value;

  const newBook = { name, language, image, content };
  books.push(newBook);

  // 🔽 KELİME SÖZLÜĞÜNE EKLEME BURAYA EKLENECEK
  const words = content
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '') // noktalama temizle
    .split(/\s+/) // boşluklara göre ayır
    .filter(Boolean); // boş elemanları çıkar

  let dictionary = JSON.parse(localStorage.getItem('dictionary')) || {};
  let addedWords = 0;
  words.forEach(word => {
    if (!(word in dictionary)) {
      dictionary[word] = true;
      addedWords++;
    }
  });
  if (addedWords > 0) {
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
    console.log(`${addedWords} yeni kelime sözlüğe eklendi.`);
  }

  // Kitabı kaydet ve göster
  localStorage.setItem('books', JSON.stringify(books));
  renderBook(newBook);
  form.reset();
});


// Kitapları listeleyen fonksiyon
function renderBook(book) {
  const bookItem = document.createElement('li');
  bookItem.innerHTML = `
    <strong>${book.name}</strong> (${book.language})<br>
    <img src="${book.image}" width="100" alt="Kitap görseli"><br>
    <small>${book.content.slice(0, 60)}...</small>
  `;
  list.appendChild(bookItem);
}
