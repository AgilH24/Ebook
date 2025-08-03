const bookList = document.getElementById('bookList');
const books = JSON.parse(localStorage.getItem('books')) || [];

books.forEach(book => {
  const card = document.createElement('div');
  card.className = 'book-card';

  card.innerHTML = `
    <img src="${book.image}" alt="cover">
    <h3>${book.name}</h3>
    <p>Language: ${book.language}</p>
  `;
card.onclick = () => {
  localStorage.setItem('selectedBook', JSON.stringify(book));
  window.location.href = 'reader.html';
};

  bookList.appendChild(card);
});
