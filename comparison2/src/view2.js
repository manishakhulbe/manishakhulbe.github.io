// DATA
import { students } from '../data/digitund_6.js';


const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const blue = 'rgb(102, 204, 255)';

const scores = {
  'pre_fys': {
    'yellow': .33,
    'blue': .66,
  },
  'post_fys': {
    'yellow': .33,
    'blue': .66,
  },
  'comp_task': {
    'yellow': 1,
    'blue': 2,
  },
  'task1': {
    'yellow': .4,
    'blue': .7,
  },
  'task2': {
    'yellow': 1,
    'blue': 2.1,
  },
  'task3': {
    'yellow': 2,
    'blue': 3,
  },
}


window.onload = () => {
  // Student view graphs
  students.sort((a, b) => a.performance - b.performance);
  const studentViewTable = document.getElementById('student-table');

  // Mean
  // Row
  const row = document.createElement('tr');

  // Name cell
  const nameCell = document.createElement('td');
  nameCell.innerHTML = 'Average';
  nameCell.style.fontWeight = 'bold';
  row.appendChild(nameCell);
  const sums = students.reduce((acc, student) => {
    acc[0].average += student['pre_fys'];
    acc[1].average += student['task1'];
    acc[2].average += student['task2'];
    acc[3].average += student['task3'];
    acc[4].average += student['comp_task'];
    acc[5].average += student['post_fys'];
    return acc;
  }, [
    { 'name': 'pre_fys', 'average': 0 },
    { 'name': 'task1', 'average': 0 },
    { 'name': 'task2', 'average': 0 },
    { 'name': 'task3', 'average': 0 },
    { 'name': 'comp_task', 'average': 0 },
    { 'name': 'post_fys', 'average': 0 }
  ]);
  const averages = sums.map((value) => {
    value.average = Math.round((value.average / students.length) * 100) / 100
    return value
  });
  averages.forEach((entry) => {
    const taskCell = document.createElement('td');
    const square = scoreSquare(entry.average, scores[entry.name]);
    square.style.borderRadius = '50%';
    taskCell.appendChild(square);
    row.appendChild(taskCell);
  })
  studentViewTable.appendChild(row);

  // Students
  students.forEach((student) => {

    // Row
    const row = document.createElement('tr');

    // Name cell
    const nameCell = document.createElement('td');
    nameCell.innerHTML = `Student ${student.name}`;
    nameCell.classList.add('hovertext');
    nameCell.setAttribute(
      'data-hover',
      `Docktor’s score for understanding a problem is ${student.pss}`
    );
    row.appendChild(nameCell);

    // Tasks
    ['pre_fys', 'task1', 'task2', 'task3', 'comp_task', 'post_fys'].forEach((taskName) => {
      const taskCell = document.createElement('td');
      taskCell.appendChild(scoreSquare(student[taskName], scores[taskName]));
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