// DATA
import { students } from '../data/physcompare.js';


window.onload = () => {
  // Means
  const means = students.reduce((acc, student) => {
    [
      'Eeltest',
      'Ülesanne 1',
      'Ülesanne 2',
      'Ülesanne 3',
      'Probleemülesanne',
      'Järeltest',
    ].forEach((key) => {
      acc[key] += parseFloat(student[key])
    })
    return acc
  }, {
    'Eeltest': 0,
    'Ülesanne 1': 0,
    'Ülesanne 2': 0,
    'Ülesanne 3': 0,
    'Probleemülesanne': 0,
    'Järeltest': 0,
  });
  [
    'Eeltest',
    'Ülesanne 1',
    'Ülesanne 2',
    'Ülesanne 3',
    'Probleemülesanne',
    'Järeltest',
  ].forEach((key) => {
    means[key] = Math.round(means[key] / students.length * 10) / 10;
  })

  // Student view graphs
  students.sort((a, b) => a.performance - b.performance);
  const studentViewTable = document.getElementById('student-table');

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
    'Järeltest',
  ].forEach((title) => {
    const titleCell = document.createElement('th');
    titleCell.innerHTML = title;
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
    'Järeltest',
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
      'Järeltest',
    ].forEach((key) => {
      const taskCell = document.createElement('td');
      taskCell.innerHTML = student[key];
      row.appendChild(taskCell);
    })

    studentViewTable.appendChild(row);
  });
};
