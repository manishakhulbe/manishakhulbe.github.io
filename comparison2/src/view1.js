// DATA
import { students } from '../data/digitund_6.js';


window.onload = () => {
  // Student view graphs
  students.sort((a, b) => a.performance - b.performance);
  const studentViewTable = document.getElementById('student-table');
  students.forEach((student) => {

    // Row
    const row = document.createElement('tr');

    // Name cell
    const nameCell = document.createElement('td');
    nameCell.innerHTML = `Student ${student.name}`;
    row.appendChild(nameCell);

    // Tasks
    ['task1', 'task2', 'task3', 'comp_task', 'desc_utter_nr', 'pre_fys'].forEach((taskName) => {
      const taskCell = document.createElement('td');
      taskCell.innerHTML = student[taskName];
      row.appendChild(taskCell);
    })

    studentViewTable.appendChild(row);
  });
};
