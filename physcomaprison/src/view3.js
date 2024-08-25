// DATA
import { students } from '../data/physcompare.js';


const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const green = 'rgb(89, 201, 119)';

const scores = {
  'Valdkonna Teadmised (%)': {
    'yellow': 40,
    'green': 65,
  },
}


window.onload = () => {
  // Means
  const means = students.reduce((acc, student) => {
    [
      'Valdkonna Teadmised (%)',
    ].forEach((key) => {
      acc[key] += parseFloat(student[key])
    })
    return acc
  }, {
    'Valdkonna Teadmised (%)': 0,
  });
  [
    'Valdkonna Teadmised (%)',
  ].forEach((key) => {
    means[key] = Math.round(means[key] / students.length * 10) / 10;
  })



  const studentViewTable = document.getElementById('student-table');

  const studentsData = students.map((student) => {
    return {
      'ID': student.ID,
      'Valdkonna Teadmised (%)': parseFloat(student['Valdkonna Teadmised (%)']),
    };
  });
  console.log(studentsData);

  // Header
  const rowHeader = document.createElement('tr');
  rowHeader.classList.add('text-primary');
  [
    'ID',
    'Valdkonna Teadmised (%)',
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
    'Valdkonna Teadmised (%)',
  ].forEach((title) => {
    const titleCell = document.createElement('th');
    titleCell.appendChild(scoreSquare(means[title], scores[title]));
    row.appendChild(titleCell);
  })
  row.style.fontStyle = 'italic';
  studentViewTable.appendChild(row);

  // Students
  studentsData.forEach((student) => {

    // Row
    const row = document.createElement('tr');

    // Name cell
    const nameCell = document.createElement('td');
    nameCell.innerHTML = student.ID;
    row.appendChild(nameCell);

    // Color-coded cells
    [
      'Valdkonna Teadmised (%)',
    ].forEach((taskName) => {
      const taskCell = document.createElement('td');
      taskCell.appendChild(scoreSquare(student[taskName], scores[taskName]));
      row.appendChild(taskCell);
    });

    studentViewTable.appendChild(row);
  });
};


function scoreSquare(score, limits) {
  const scoreSquare = document.createElement('div');
  scoreSquare.classList.add('boxes-graph-cell');
  scoreSquare.classList.add('hovertext');
  scoreSquare.setAttribute(
    'data-hover',
    `Score: ${score}`
  );
  if (score < limits.yellow) {
    scoreSquare.style.backgroundColor = red;
  } else if (score < limits.green) {
    scoreSquare.style.backgroundColor = yellow;
  } else {
    scoreSquare.style.backgroundColor = green;
  }
  return scoreSquare
}