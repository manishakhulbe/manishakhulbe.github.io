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
    switch (student.name) {
      case 3:
        nameCell.style.textDecoration = 'underline';
        row.onclick = () => {
          openModal(`Student ${student.name}`, "▪ Task 1, 2, and 3: Encourage the student to assist peers.<br>▪ Complex task: Ask them to prepare a short presentation of their problem solution to share with others.");
        };
        break;
      case 4:
        nameCell.style.textDecoration = 'underline';
        row.onclick = () => {
          openModal(`Student ${student.name}`, "▪ Task 1, 2, and 3: Ask a follow-up question of a core concept<br>▪ Complex task: Encourage the student to assist peers.");
        };
        break;
      case 5:
        nameCell.style.textDecoration = 'underline';
        row.onclick = () => {
          openModal(`Student ${student.name}`, "▪ Task 1, 2, and 3: Focus on revising foundational concepts like \"Light\" <br>▪ Complex task: Offer personalized feedback of their problem solution");
        };
        break;
      case 6:
        nameCell.style.textDecoration = 'underline';
        row.onclick = () => {
          openModal(`Student ${student.name}`, `▪ Task 1, 2, and 3: Review the student's engagement and understanding in class through direct observation and discussions. <br>▪ Complex task: Provide additional support through tutorials or pair them with "Student 3"`);
        };
        break;
    }
    row.appendChild(nameCell);

    // Tasks
    ['pre_fys', 'task1', 'task2', 'task3', 'comp_task', 'post_fys'].forEach((taskName) => {
      const taskCell = document.createElement('td');
      taskCell.appendChild(scoreSquare(student[taskName], scores[taskName]));
      row.appendChild(taskCell);
    })

    studentViewTable.appendChild(row);
  });

  // Student info modal
  document.getElementById('student-info-close').onclick = () => {
    document.getElementById('student-info').style.display = 'none';
  };

  document.getElementById('title-pre-test').onclick = () => {
    openModal(`Class pre-test score`, `Consider grouping students by ability for solving the complex task, so each student is challenged appropriately.`);
  };

  document.getElementById('title-complex-task').onclick = () => {
    openModal(`Class complex task`, `Incorporate more structured problem-solving scaffolds as a classroom demonstration`);
  };

  const taskTitles = document.getElementsByClassName('title-tasks')
  for (var i = 0; i < taskTitles.length; i++) {
    const title = taskTitles.item(i);
    title.onclick = () => {
      openModal(title.innerHTML, `Go over the core concepts together, in the form of a presentation.`);
    };
  }
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

function openModal(title, text) {
  document.getElementById('student-info-title').innerHTML = title;
  document.getElementById('student-info-content').innerHTML = text;
  document.getElementById('student-info').style.display = 'block';
}