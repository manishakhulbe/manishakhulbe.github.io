function openTab(active_tab) {
  const tabs = document.getElementsByClassName('tabcontent');
  for (const tab of tabs) {
    console.log(tab, active_tab);
    tab.style.display = tab.id == active_tab ? 'block' : 'none';
  }
}

window.openTab = openTab;
