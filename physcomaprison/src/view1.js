// DATA
import { students } from '../data/physcompare.js';
let means;


window.onload = () => {
  // Means, mapping
  means = students.reduce((acc, student) => {
    [
      'Eeltest',
      'Ülesanne 1',
      'Ülesanne 2',
      'Ülesanne 3',
      'Probleemülesanne',
      'Probleemülesanne grupis',
      'Kas parandas oma probleemülesannet?',
      'Probleemülesanne peale parandamist',
      'Järeltest',
      'Vastused (sõnade arv)',
      "Pingutus (%)",
      'Valdkonna Teadmised (%)',
    ].forEach((key) => {
      acc[key] += parseFloat(student[key])
    })
    student['Kas parandas oma probleemülesannet?'] = student['Kas parandas oma probleemülesannet?'] == '1' ? '✓' : '';
    return acc
  }, {
    'Eeltest': 0,
    'Ülesanne 1': 0,
    'Ülesanne 2': 0,
    'Ülesanne 3': 0,
    'Probleemülesanne': 0,
    'Probleemülesanne grupis': 0,
    'Kas parandas oma probleemülesannet?': 0,
    'Probleemülesanne peale parandamist': 0,
    'Järeltest': 0,
    'Vastused (sõnade arv)': 0,
    "Pingutus (%)": 0,
    'Valdkonna Teadmised (%)': 0,
  });
  [
    'Eeltest',
    'Ülesanne 1',
    'Ülesanne 2',
    'Ülesanne 3',
    'Probleemülesanne',
    'Probleemülesanne grupis',
    'Kas parandas oma probleemülesannet?',
    'Probleemülesanne peale parandamist',
    'Järeltest',
    'Vastused (sõnade arv)',
    "Pingutus (%)",
    'Valdkonna Teadmised (%)',
  ].forEach((key) => {
    means[key] = Math.round(means[key] / students.length * 10) / 10;
  })
  means['Kas parandas oma probleemülesannet?'] = '';

  fillTable(means, 'Valdikonna Teadmised (%)', 'asc');
};

function fillTable(sortBy, sortOrder) {
  sortStudents(sortBy, sortOrder);

  // Student view graphs
  const studentViewTable = document.getElementById('student-table');
  studentViewTable.innerHTML = '';

  // Header
  const rowHeader = document.createElement('tr');
  rowHeader.classList.add('text-primary');
  [
    'ID',
    'Eeltest',
    'Ülesanne 1',
    'Ülesanne 2',
    'Ülesanne 3',
    'Probleemülesanne',
    'Probleemülesanne grupis',
    'Kas parandas oma probleemülesannet?',
    'Probleemülesanne peale parandamist',
    'Järeltest',
    'Vastused (sõnade arv)',
    "Pingutus (%)",
    'Valdkonna Teadmised (%)',
  ].forEach((title) => {
    const titleCell = document.createElement('th');
    titleCell.innerHTML = title;
    titleCell.onclick = function () { fillTable(title, sortBy == title ? (sortOrder == 'asc' ? 'desc' : 'asc') : 'asc') };
    rowHeader.appendChild(titleCell);
  })
  studentViewTable.appendChild(rowHeader);

  // Means
  const row = document.createElement('tr');
  const nameCell = document.createElement('th');
  nameCell.innerHTML = 'Keskmine';
  row.appendChild(nameCell);
  [
    'Eeltest',
    'Ülesanne 1',
    'Ülesanne 2',
    'Ülesanne 3',
    'Probleemülesanne',
    'Probleemülesanne grupis',
    'Kas parandas oma probleemülesannet?',
    'Probleemülesanne peale parandamist',
    'Järeltest',
    'Vastused (sõnade arv)',
    "Pingutus (%)",
    'Valdkonna Teadmised (%)',
  ].forEach((title) => {
    const titleCell = document.createElement('th');
    titleCell.innerHTML = means[title];
    row.appendChild(titleCell);
  })
  row.style.fontStyle = 'italic';
  studentViewTable.appendChild(row);

  // Students
  students.forEach((student) => {
    // Row
    const row = document.createElement('tr');
    // Cols
    [
      'ID',
      'Eeltest',
      'Ülesanne 1',
      'Ülesanne 2',
      'Ülesanne 3',
      'Probleemülesanne',
      'Probleemülesanne grupis',
      'Kas parandas oma probleemülesannet?',
      'Probleemülesanne peale parandamist',
      'Järeltest',
      'Vastused (sõnade arv)',
      "Pingutus (%)",
      'Valdkonna Teadmised (%)',
    ].forEach((key) => {
      const taskCell = document.createElement('td');
      taskCell.innerHTML = student[key];
      row.appendChild(taskCell);
    })

    studentViewTable.appendChild(row);
  });
}

function sortStudents(sortBy, sortOrder) {
  switch (sortBy) {
    case 'Kas parandas oma probleemülesannet?':
      students.sort((a, b) => {
        if (sortOrder == 'asc') {
          return a[sortBy] > b[sortBy];
        } else {
          return b[sortBy] > a[sortBy];
        }
      });
      break;
    default:
      students.sort((a, b) => {
        if (sortOrder == 'asc') {
          return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        } else {
          return parseFloat(b[sortBy]) - parseFloat(a[sortBy]);
        }
      });
  }
}