// DATA
import { students } from '../data/physcompare.js';


window.onload = () => {
  // Student view graphs
  students.sort((a, b) => a.performance - b.performance);
  const studentViewTable = document.getElementById('student-table');

  // Header
  const rowHeader = document.createElement('tr');
  rowHeader.classList.add('text-primary');
  [
    'ID',
    'Pre-test',
    'Task 1',
    'Task 2',
    'Task 3',
    'Complex Task',
    'Complex Task In Group',
    'Complex Task Made Correction (1-Y, 0-N)',
    'Complex Task After Correction',
    'Post-test',
    'Written Answers (nr. of words)',
  ].forEach((title) => {
    const titleCell = document.createElement('th');
    titleCell.innerHTML = title;
    rowHeader.appendChild(titleCell);
  })
  studentViewTable.appendChild(rowHeader);

  students.forEach((student) => {
    // Row
    const row = document.createElement('tr');
    // Cols
    [
      'ID',
      'Pre-test',
      'Task 1',
      'Task 2',
      'Task 3',
      'Complex Task',
      'Complex Task In Group',
      'Complex Task Made Correction (1-Y, 0-N)',
      'Complex Task After Correction',
      'Post-test',
      'Written Answers (nr. of words)',
    ].forEach((key) => {
      const taskCell = document.createElement('td');
      taskCell.innerHTML = student[key];
      row.appendChild(taskCell);
    })

    studentViewTable.appendChild(row);
  });
};
