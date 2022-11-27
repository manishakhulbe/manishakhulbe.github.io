// TAB SWITCH FUNCTIONALITY
function openTab(activeTabLink, activeTab) {
  const tabs = document.getElementsByClassName('tabcontent');
  for (const tab of tabs) {
    tab.style.display = tab.id == activeTab ? 'block' : 'none';
  }
  const tabLinks = document.getElementsByClassName('tablinks');
  for (const tabLink of tabLinks) {
    tabLink.className = tabLink.className.replace(' active', '');
    if (tabLink == activeTabLink) {
      tabLink.className += ' active';
    }
  }
}
window.openTab = openTab;

// DATA
import {students} from '../data/digitund_6.js';

window.onload = () => {
  // Display default tab
  document.getElementById('ClassOverview').style.display = 'block';
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
        studentCell.style.backgroundColor = 'rgb(102, 204, 255)';
        break;
      case 3:
      case 4:
        studentCell.style.backgroundColor = 'rgb(255, 204, 102)';
        break;
      default:
        studentCell.style.backgroundColor = 'rgb(255, 83, 26)';
    }
    graphOverview.appendChild(studentCell);
  });

  for (let i = 1; i <= 5; i++) {
    const task = `task${i}`;
    const taskGraph = document.getElementById(`graph-${task}-attempts`);
    students.forEach((student) => {
      const studentCell = document.createElement('div');
      studentCell.classList.add('boxes-graph-cell');
      studentCell.classList.add('hovertext');
      studentCell.setAttribute(
        'data-hover',
        `${student.name}: ${student[task]}`
      );
      switch (student[task]) {
        case 1:
          studentCell.style.backgroundColor = 'rgb(102, 204, 255)';
          break;
        case 2:
          studentCell.style.backgroundColor = 'rgb(255, 204, 102)';
          break;
        default:
          studentCell.style.backgroundColor = 'rgb(255, 83, 26)';
      }
      taskGraph.appendChild(studentCell);
    });
  }
};
