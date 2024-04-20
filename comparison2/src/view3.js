// DATA
import {students} from '../data/digitund_6.js';

const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const blue = 'rgb(102, 204, 255)';


window.onload = () => {
  // Tasks graphs
  ['useful_desc', 'phys_approach', 'spec_phys_app', 'logical_prog'].forEach((task) => {
    const taskGraph = document.getElementById(`graph-${task}`);
    students.forEach((student) => {
      const studentCell = document.createElement('div');
      studentCell.classList.add('boxes-graph-cell');
      studentCell.classList.add('hovertext');
      studentCell.setAttribute(
        'data-hover',
        `Student ${student.name}'s score: ${student[task]}`
      );

      if (student[task] <= 2) {
        studentCell.style.backgroundColor = red;
      } else if (student[task] <= 3) {
        studentCell.style.backgroundColor = yellow;
      } else {
        studentCell.style.backgroundColor = blue;
      }

      taskGraph.appendChild(studentCell);
    });
  });
};
