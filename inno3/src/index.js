// DATA
import {students} from '../data/digitund_6.js';

const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const blue = 'rgb(102, 204, 255)';

window.onload = () => {
  // Performance graph
  const graphOverview = document.getElementById('graph-overview');
  students.sort((a, b) => a.performance - b.performance);
  students.forEach((student) => {
    const studentCell = document.createElement('div');
    studentCell.classList.add('boxes-graph-cell');
    studentCell.classList.add('hovertext');
    studentCell.setAttribute(
      'data-hover',
      `${student.name}: ${student.performance}`
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
    graphOverview.appendChild(studentCell);
  });
};
