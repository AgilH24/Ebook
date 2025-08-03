const dictionary = JSON.parse(localStorage.getItem('dictionary')) || {};
const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
const wordInfo = document.getElementById('wordInfo');
const textContent = document.getElementById('textContent');
const pageIndicator = document.getElementById('pageIndicator');
const closeSidebar = document.getElementById('closeSidebar');

let currentPage = 0;
const wordsPerPage = 100;
document.querySelector('header .logo').addEventListener('click', () => {
  window.location.href = 'index.html';
});


if (!selectedBook) {
  textContent.textContent = "Kitap bulunamadı.";
} else {
  const words = selectedBook.content.split(/\s+/);

  function renderPage() {
    const pageWords = words.slice(currentPage * wordsPerPage, (currentPage + 1) * wordsPerPage);
    textContent.innerHTML = pageWords.map(word => `<span class="word">${word}</span>`).join(' ');
    pageIndicator.textContent = `Sayfa ${currentPage + 1} / ${Math.ceil(words.length / wordsPerPage)}`;
  }

  document.getElementById('prevPage').onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      renderPage();
    }
  };

  document.getElementById('nextPage').onclick = () => {
    if ((currentPage + 1) * wordsPerPage < words.length) {
      currentPage++;
      renderPage();
    }
  };

  textContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('word')) {
      let rawWord = e.target.textContent.toLowerCase();
      let cleanedWord = rawWord.replace(/^[^a-zA-Zа-яА-ЯёЁ0-9]+|[^a-zA-Zа-яА-ЯёЁ0-9]+$/g, '');

      let info = dictionary[cleanedWord];
      if (!info) {
        dictionary[cleanedWord] = {
          base: cleanedWord,
          translation: '',
          type: '',
          tense: '',
          person: '',
          structure: '',
          example: ''
        };
        localStorage.setItem('dictionary', JSON.stringify(dictionary));
        info = dictionary[cleanedWord];
      }

      wordInfo.innerHTML = `
        <button class="close-btn" id="closeSidebar">×</button>
        <h3>${cleanedWord}</h3>
        <p><strong>Base:</strong> ${info.base || ""}</p>
        <p><strong>Translation:</strong> ${info.translation || ""}</p>
        ${info.type ? `<p><strong>Type:</strong> ${info.type}</p>` : ""}
        ${info.tense ? `<p><strong>Tense:</strong> ${info.tense}</p>` : ""}
        ${info.person ? `<p><strong>Person:</strong> ${info.person}</p>` : ""}
        ${info.structure ? `<p><strong>Structure:</strong> ${info.structure}</p>` : ""}
        ${info.example ? `<p><em>${info.example}</em></p>` : ""}
      `;

      // Yeniden kapatma butonunu yakala (çünkü HTML değişti)
      // Kelimeye tıklanınca sidebar'ı aç ve kapatma butonunu göster
      if (!document.getElementById('closeSidebar')) {
        const closeBtn = document.createElement('button');
        closeBtn.id = 'closeSidebar';
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        wordInfo.prepend(closeBtn);
      }
      document.getElementById('closeSidebar').onclick = () => {
        wordInfo.classList.remove('active');
      };


      wordInfo.classList.add('active');
    }
  });

  // İlk render
  renderPage();
}

// Paneli kapatma (ilk yüklemede kapatma butonu varsa)
if (closeSidebar) {
  closeSidebar.onclick = () => {
    wordInfo.classList.remove('active');
  };
}
