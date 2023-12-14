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

    const tasksCell = document.createElement('td');
    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('boxes-graph');

    for (let i = 1; i <= 5; i++) {
      let taskName = "";
      switch (i) {
        case 1:
          taskName = "Description";
          break;
        case 2:
          taskName = "Physics approach";
          break;
        case 3:
          taskName = "Physics application";
          break;
        case 4:
          taskName = "Mathematical procedures";
          break;
        case 5:
          taskName = "Logical progression";
      }
      const task = `task${i}`;
      const studentCell = document.createElement('div');
      studentCell.classList.add('boxes-graph-cell');
      studentCell.classList.add('hovertext');
      studentCell.setAttribute(
        'data-hover',
        `${taskName}: ${student[task]}`
      );
      switch (student[task]) {
        case 3:
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

    studentViewTable.appendChild(row);
  });
};
