// DATA
import {students} from '../data/digitund_6.js';

const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const blue = 'rgb(102, 204, 255)';

window.onload = () => {
  // Student view graphs
  students.sort((a, b) => a.performance - b.performance);
  const studentViewTable = document.getElementById('student-table');
  students.forEach((student) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.innerHTML = student.name;
    row.appendChild(nameCell);

    const timeCell = document.createElement('td');
    timeCell.innerHTML = student.time;
    row.appendChild(timeCell);

    const tasksCell = document.createElement('td');
    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('boxes-graph');

    for (let i = 1; i <= 5; i++) {
      const task = `task${i}`;
      const studentCell = document.createElement('div');
      studentCell.classList.add('boxes-graph-cell');
      studentCell.classList.add('hovertext');
      studentCell.setAttribute(
        'data-hover',
        `Task ${i}: ${student[task]} attempt${student[task] == 1 ? '' : 's'}`
      );
      switch (student[task]) {
        case 1:
          studentCell.style.backgroundColor = blue;
          break;
        case 2:
          studentCell.style.backgroundColor = yellow;
          break;
        default:
          studentCell.style.backgroundColor = red;
      }
      tasksContainer.appendChild(studentCell);
    }
    tasksCell.appendChild(tasksContainer);
    row.appendChild(tasksCell);

    const performanceCell = document.createElement('td');
    const studentCell = document.createElement('div');

    studentCell.classList.add('boxes-graph-cell');
    studentCell.classList.add('hovertext');
    studentCell.setAttribute(
      'data-hover',
      `Performance score: ${student.performance}`
    );
    switch (student.performance) {
      case 5:
      case 6:
        studentCell.style.backgroundColor = blue;
        break;
      case 3:
      case 4:
        studentCell.style.backgroundColor = yellow;
        break;
      default:
        studentCell.style.backgroundColor = red;
    }
    performanceCell.appendChild(studentCell);
    row.appendChild(performanceCell);

    studentViewTable.appendChild(row);
  });
};
