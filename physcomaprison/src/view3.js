// DATA
import { students } from '../data/physcompare.js';


const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const blue = 'rgb(102, 204, 255)';

const scores = {
  'Pre-test': {
    'yellow': 33,
    'blue': 66,
  },
  'Post-test': {
    'yellow': 33,
    'blue': 66,
  },
  'Mean 1, 2, and 3 task score': {
    'yellow': 33,
    'blue': 66,
  },
  'Complex Task': {
    'yellow': 33,
    'blue': 66,
  },
}


window.onload = () => {
  const studentViewTable = document.getElementById('student-table');

  const studentsData = students.map((student) => {
    return {
      'ID': student.ID,
      'Pre-test': parseFloat(student['Pre-test']),
      'Post-test': parseFloat(student['Post-test']),
      'Mean 1, 2, and 3 task score': (parseFloat(student['Task 1']) + parseFloat(student['Task 2']) + parseFloat(student['Task 3'])) / 3.0,
      'Post-test change from pre-test': parseFloat(student['Post-test']) - parseFloat(student['Pre-test']),
      'Complex Task': parseFloat(student['Complex Task']),
      'Complex Task Made Correction (1-Y, 0-N)': student['Complex Task Made Correction (1-Y, 0-N)'] == '1' ? 'Yes' : 'No',
    };
  });
  console.log(studentsData);

  // Header
  const rowHeader = document.createElement('tr');
  rowHeader.classList.add('text-primary');
  [
    'ID',
    'Pre-test',
    'Post-test',
    'Mean 1, 2, and 3 task score',
    'Complex Task',
    'Post-test change from pre-test',
    'Complex Task Made Correction',
  ].forEach((title) => {
    const titleCell = document.createElement('th');
    titleCell.innerHTML = title;
    rowHeader.appendChild(titleCell);
  })
  studentViewTable.appendChild(rowHeader);


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
      'Pre-test',
      'Post-test',
      'Mean 1, 2, and 3 task score',
      'Complex Task',
    ].forEach((taskName) => {
      const taskCell = document.createElement('td');
      taskCell.appendChild(scoreSquare(student[taskName], scores[taskName]));
      row.appendChild(taskCell);
    });

    // Other cells
    [
      'Post-test change from pre-test',
      'Complex Task Made Correction (1-Y, 0-N)',
    ].forEach((taskName) => {
      const taskCell = document.createElement('td');
      taskCell.innerHTML = student[taskName];
      row.appendChild(taskCell);
    })

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
  if (score <= limits.yellow) {
    scoreSquare.style.backgroundColor = red;
  } else if (score <= limits.blue) {
    scoreSquare.style.backgroundColor = yellow;
  } else {
    scoreSquare.style.backgroundColor = blue;
  }
  return scoreSquare
}