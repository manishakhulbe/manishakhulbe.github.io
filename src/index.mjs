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
import studentsData from '../data/digitund_6.json' assert {type: 'json'};

window.onload = () => {
  // Display default tab
  document.getElementById('ClassOverview').style.display = 'block';
  const graphOverview = document.getElementById('graph-overview');
  const students = studentsData.students;
  students.sort((a, b) => a.performance - b.performance);
  students.forEach((student) => {
    const studentCell = document.createElement('div');
    studentCell.classList.add('graph-overview-cell');
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
};
