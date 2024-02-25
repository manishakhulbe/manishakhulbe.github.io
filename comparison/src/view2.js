// DATA
import {students} from '../data/digitund_6.js';

const red = 'rgb(255, 83, 26)';
const yellow = 'rgb(255, 204, 102)';
const blue = 'rgb(102, 204, 255)';

const levels = {
  knowledge: {
    green: .6,
    yellow: .4,
  },
  pss: {
    green: .5,
    yellow: .3,
  }
};

window.onload = () => {
  // Tasks graphs
  ['knowledge', 'pss'].forEach((task) => {
    const taskGraph = document.getElementById(`graph-${task}`);
    students.forEach((student) => {
      const studentCell = document.createElement('div');
      studentCell.classList.add('boxes-graph-cell');
      studentCell.classList.add('hovertext');
      studentCell.setAttribute(
        'data-hover',
        `Student ${student.name}'s score: ${student[task]}`
      );

      if (student[task] <= levels[task].yellow) {
        studentCell.style.backgroundColor = red;
      } else if (student[task] <= levels[task].green) {
        studentCell.style.backgroundColor = yellow;
      } else {
        studentCell.style.backgroundColor = blue;
      }

      taskGraph.appendChild(studentCell);
    });
  });
};
