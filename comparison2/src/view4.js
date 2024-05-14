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
  // Help modals
  document.getElementById('student-info-close').onclick = () => {
    document.getElementById('student-info').style.display = 'none';
  };

  document.getElementById('help-struggling-students').onclick = () => {
    openModal(`Help struggling students`, `<p>“14 students with weak prior knowledge have difficulty understanding how light reflects from mirrors. Consider going over the basic concepts with the whole class.”</p>
    <p>“The law of reflection states that θi = θr, or in other words, the angle of incidence equals the angle of reflection.”
    <br>If this is too abstract for them, consider the following explanation:
    <br>“Think about throwing a ball at a wall. If you throw the ball straight at the wall, it bounces straight back to you. If you throw it at an angle, it bounces off at the same angle in the opposite direction. The law of reflection says that the angle you throw the ball at the wall (angle of incidence) is the same as the angle it bounces back (angle of reflection). Just like with a ball, light acts the same way when it hits a mirror.”</p>`);
  };

  document.getElementById('help-problem-solving').onclick = () => {
    openModal(`Guide problem solving`, `<p>“The low complex task scores indicate that these 10 students are struggling in applying their knowledge of light reflection. Consider discussing the problem-solution steps in the context of reflection with them.”</p>
    <p>
    State the Problem: Describe what's going wrong or what you need to fix.
    <br>Gather Information: Look for details and learn more about the problem.
    <br>Propose a Solution: Think of a way to fix the problem based on what you learned.
    <br>Test the Solution: Try out your idea to see if it solves the problem. If it doesn’t work, you might need to think of another solution and start the cycle again!
</p>`);
  };

  document.getElementById('help-challenge-expert-students').onclick = () => {
    openModal(`Challenge expert students`, `<p>“These 5 students with high complex task scores are also good problem solvers. Consider assigning them as guides for Novice students.”</p>
    <p>Guiding others is developing their ability to communicate complex ideas.</p>`);
  };


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

function openModal(title, text) {
  document.getElementById('student-info-title').innerHTML = title;
  document.getElementById('student-info-content').innerHTML = text;
  document.getElementById('student-info').style.display = 'block';
}