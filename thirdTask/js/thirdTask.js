// Отримання посилання на елементи DOM
const countryInput = document.getElementById('country-input');
const resultsContainer = document.getElementById('results');
const selectedCountSpan = document.getElementById('selected-count');

// Змінна для зберігання стану вибраних чекбоксів
let selectedCheckboxes = [];

// Функція для отримання даних про університети
function getUniversities(country) {
  const apiUrl = `https://universities.hipolabs.com/search?country=${country}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      showResults(data);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Функція для показу результатів пошуку
function showResults(universities) {
  resultsContainer.innerHTML = ''; // Очищення контейнера результатів

  if (universities.length === 0) {
    resultsContainer.textContent = 'No results found.';
    return;
  }

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Додавання заголовків таблиці
  const tableHeaders = ['#', 'Name', 'Country', 'Web Page', 'Select'];
  const headerRow = document.createElement('tr');

  tableHeaders.forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Додавання рядків з даними університетів
  universities.forEach((university, index) => {
    const row = document.createElement('tr');

    const indexCell = document.createElement('td');
    indexCell.textContent = index + 1;
    row.appendChild(indexCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = university.name;
    row.appendChild(nameCell);

    const countryCell = document.createElement('td');
    countryCell.textContent = university.country;
    row.appendChild(countryCell);

    const webPageCell = document.createElement('td');
    const webPageLink = document.createElement('a');
    webPageLink.textContent = 'Visit';
    webPageLink.href = university.web_pages[0];
    webPageCell.appendChild(webPageLink);
    row.appendChild(webPageCell);

    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selectedCheckboxes.push(university.name);
      } else {
        const index = selectedCheckboxes.indexOf(university.name);
        if (index !== -1) {
          selectedCheckboxes.splice(index, 1);
        }
      }
      selectedCountSpan.textContent = selectedCheckboxes.length;
    });
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  resultsContainer.appendChild(table);
}

// Функція для обробки події натискання кнопки "Submit"
function searchUniversities() {
  const country = countryInput.value.trim();
  if (country === '') {
    alert('Please enter a country.');
    return;
  }

  getUniversities(country);
}

// Функція для обробки події натискання кнопки "Reset"
function resetForm() {
  countryInput.value = '';
  resultsContainer.innerHTML = '';
  selectedCheckboxes = [];
  selectedCountSpan.textContent = '0';
}

// Додавання обробників подій до кнопок
document.getElementById('submit-button').addEventListener('click', searchUniversities);
document.getElementById('reset-button').addEventListener('click', resetForm);

