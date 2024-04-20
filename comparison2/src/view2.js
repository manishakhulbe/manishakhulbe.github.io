// DATA
import { students } from '../data/digitund_6.js';


const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const blue = 'rgb(102, 204, 255)';


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
    acc[0] += student['pre_fys'];
    acc[1] += student['post_fys'];
    return acc;
  }, [0, 0]);
  const averages = sums.map((value) => Math.round((value / students.length) * 100) / 100);
  averages.forEach((average) => {
    const taskCell = document.createElement('td');
    const square = scoreSquare(average);
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
    nameCell.innerHTML = student.name;
    row.appendChild(nameCell);

    // Tasks
    ['pre_fys', 'post_fys'].forEach((taskName) => {
      const taskCell = document.createElement('td');
      taskCell.appendChild(scoreSquare(student[taskName]));
      row.appendChild(taskCell);
    })

    studentViewTable.appendChild(row);
  });
};


function scoreSquare(score) {
  const scoreSquare = document.createElement('div');
  scoreSquare.classList.add('boxes-graph-cell');
  scoreSquare.classList.add('hovertext');
  scoreSquare.setAttribute(
    'data-hover',
    `Score: ${score}`
  );
  if (score <= .33) {
    scoreSquare.style.backgroundColor = red;
  } else if (score <= .66) {
    scoreSquare.style.backgroundColor = yellow;
  } else {
    scoreSquare.style.backgroundColor = blue;
  }
  return scoreSquare
}