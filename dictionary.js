let dictionary = JSON.parse(localStorage.getItem('dictionary') || '{}');

  const list = document.getElementById('dictionaryList');
  const bulkPanel = document.getElementById('bulkPanel');
  const bulkInput = document.getElementById('bulkInput');
  const bulkStatus = document.getElementById('bulkStatus');

  function renderList(words) {
    list.innerHTML = '';
    words.forEach(({ word, entry }) => {
      const li = document.createElement('li');
      li.textContent = `${word}`;
      if (entry.translation && entry.translation.trim() !== '') {
        li.textContent += ` → ${entry.translation}`;
      }
      list.appendChild(li);
    });
  }

  

  function showWordsWithTranslation() {
    const filtered = [];
    for (const word in dictionary) {
      const entry = dictionary[word];
      if (entry.translation && entry.translation.trim() !== '') {
        filtered.push({ word, entry });
      }
    }
    renderList(filtered);
  }

  function showWordsWithoutTranslation() {
    const filtered = [];
    for (const word in dictionary) {
      const entry = dictionary[word];
      if (!entry.translation || entry.translation.trim() === '') {
        filtered.push({ word, entry });
      }
    }
    renderList(filtered);
  }

  function copyWordsWithoutTranslation() {
    const missing = [];
    for (const word in dictionary) {
      const entry = dictionary[word];
      if (!entry.translation || entry.translation.trim() === '') {
        missing.push({ word });
      }
    }
    const textToCopy = JSON.stringify(missing, null, 2);
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Eksik kelimeler panoya kopyalandı.");
    });
  }

  function showBulkPanel() {
    bulkStatus.textContent = '';
    bulkPanel.style.display = 'block';
    bulkInput.value = '';
    bulkInput.focus();
  }

  function hideBulkPanel() {
    bulkPanel.style.display = 'none';
    bulkStatus.textContent = '';
  }

  function saveBulkTranslations() {
    let newData;
    try {
      newData = JSON.parse(bulkInput.value);
    } catch (e) {
      bulkStatus.textContent = '❌ JSON format hatası!';
      return;
    }

    let addedCount = 0;
    for (const w in newData) {
      const lowerW = w.toLowerCase();
      dictionary[lowerW] = { ...dictionary[lowerW], ...newData[w] };
      addedCount++;
    }

    localStorage.setItem('dictionary', JSON.stringify(dictionary));
    bulkStatus.textContent = `✅ ${addedCount} kelime güncellendi.`;
    hideBulkPanel();
    showWordsWithoutTranslation();
  }

  window.onload = () => {
    showWordsWithoutTranslation();
  };