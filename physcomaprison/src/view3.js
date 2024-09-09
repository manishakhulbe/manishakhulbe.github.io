// DATA
import { students } from '../data/physcompare.js';
let means;

const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const green = 'rgb(89, 201, 119)';

const scores = {
  'Valdkonna Teadmised (%)': {
    'yellow': 40,
    'green': 65,
  },
  'Pingutus (%)': {
    'yellow': 3.0,
    'green': 4.0,
  },
  'Probleemülesanne': {
    'yellow': 34,
    'green': 68,
  },
}


window.onload = () => {
  // Means
  means = students.reduce((acc, student) => {
    [
      'Valdkonna Teadmised (%)',
      'Pingutus (%)',
      'Probleemülesanne',
    ].forEach((key) => {
      acc[key] += parseFloat(student[key])
    })
    return acc
  }, {
    'Valdkonna Teadmised (%)': 0,
    'Pingutus (%)': 0,
    'Probleemülesanne': 0,
  });
  [
    'Valdkonna Teadmised (%)',
    'Pingutus (%)',
    'Probleemülesanne',
  ].forEach((key) => {
    means[key] = Math.round(means[key] / students.length * 10) / 10;
  })

  fillTable('Valdkonna Teadmised (%)', 'asc');
};

function fillTable(sortBy, sortOrder) {
  sortStudents(sortBy, sortOrder);

  const studentViewTable = document.getElementById('student-table');
  studentViewTable.innerHTML = '';


  // Header
  const rowHeader = document.createElement('tr');
  rowHeader.classList.add('text-primary');
  [
    {
      'content': 'ID',
      'value': 'ID',
    }, {
      'content': 'Kui tugevad erialateadmised on õpilastel?',
      'value': 'Valdkonna Teadmised (%)',
      'hower': 'Eeltesti, Ülesannete 1, 2 ja 3 kombineeritud skoor. Ülesannetel on erinev kaal.',
    }, {
      'content': 'Kui paljud õpilased tunnevad, et nad pingutavad?',
      'value': 'Pingutus (%)',
      'hower': 'Õpilaste enda hinnang oma pingutusele (5punktine Likert skaala - 1- Ei pingutanud üldse, ... , 5 - Pingutasin väga).',
    }, {
      'content': 'Kui hästi lahendavad õpilased keerulisemaid ülesandeid?',
      'value': 'Probleemülesanne',
      'hower': 'Probleemülesande lahendamise võime.',
    },
  ].forEach((title) => {
    const titleCell = document.createElement('th');
    titleCell.innerHTML = title['content'];
    const value = title['value'];
    titleCell.onclick = function () { fillTable(value, sortBy == value ? (sortOrder == 'asc' ? 'desc' : 'asc') : 'asc') };
    if (title['hower']) {
      titleCell.classList.add('hovertext');
      titleCell.setAttribute(
        'data-hover',
        title['hower']
      )
    }
    rowHeader.appendChild(titleCell);
  })
  studentViewTable.appendChild(rowHeader);

  // Means
  const row = document.createElement('tr');
  const nameCell = document.createElement('th');
  nameCell.innerHTML = 'Keskmine';
  row.appendChild(nameCell);
  [
    'Valdkonna Teadmised (%)',
    'Pingutus (%)',
    'Probleemülesanne',
  ].forEach((title) => {
    const titleCell = document.createElement('th');
    titleCell.appendChild(scoreSquare(means[title], scores[title]));
    row.appendChild(titleCell);
  })
  row.style.fontStyle = 'italic';
  studentViewTable.appendChild(row);

  // Students
  students.forEach((student) => {

    // Row
    const row = document.createElement('tr');

    // Name cell
    const nameCell = document.createElement('td');
    nameCell.innerHTML = student.ID;
    row.appendChild(nameCell);

    // Color-coded cells
    [
      'Valdkonna Teadmised (%)',
      'Pingutus (%)',
      'Probleemülesanne',
    ].forEach((taskName) => {
      const taskCell = document.createElement('td');
      taskCell.appendChild(scoreSquare(student[taskName], scores[taskName]));
      row.appendChild(taskCell);
    });

    studentViewTable.appendChild(row);
  });
}


function scoreSquare(score, limits) {
  const scoreSquare = document.createElement('div');
  scoreSquare.classList.add('boxes-graph-cell');
  scoreSquare.classList.add('hovertext');
  scoreSquare.setAttribute(
    'data-hover',
    `Score: ${score}`
  );
  const scoreValue = parseFloat(score)
  if (scoreValue < limits.yellow) {
    scoreSquare.style.backgroundColor = red;
  } else if (scoreValue < limits.green) {
    scoreSquare.style.backgroundColor = yellow;
  } else {
    scoreSquare.style.backgroundColor = green;
  }
  return scoreSquare
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