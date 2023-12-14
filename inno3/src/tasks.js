// DATA
import {students} from '../data/digitund_6.js';

const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const blue = 'rgb(102, 204, 255)';

window.onload = () => {
  // Tasks graphs
  students.sort((a, b) => a.performance - b.performance);
  for (let i = 1; i <= 5; i++) {
    const task = `task${i}`;
    const taskGraph = document.getElementById(`graph-${task}-attempts`);
    students.forEach((student) => {
      const studentCell = document.createElement('div');
      studentCell.classList.add('boxes-graph-cell');
      studentCell.classList.add('hovertext');
      studentCell.setAttribute(
        'data-hover',
        `${student.name}: ${student[task]} attempt${
          student[task] == 1 ? '' : 's'
        }`
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
      taskGraph.appendChild(studentCell);
    });
  }
};
