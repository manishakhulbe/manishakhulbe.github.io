// DATA
import { students } from '../data/physcompare.js';


window.onload = () => {
    // Student view graphs
    const studentsData = students.map((student) => {
        return {
            'ID': student.ID,
            'Ülesanne 1': parseFloat(student['Ülesanne 1']),
            'Ülesanne 2': parseFloat(student['Ülesanne 2']),
            'Ülesanne 3': parseFloat(student['Ülesanne 3']),
            'Probleemülesanne': parseFloat(student['Probleemülesanne']),
        };
    });


    // One on one table

    const oneOnOneTable = document.getElementById('1-1-table');

    // Header
    let rowHeader = document.createElement('tr');
    rowHeader.classList.add('text-primary');
    [
        'ID',
        'Ülesanne 1',
        'Ülesanne 2',
        'Ülesanne 3',
    ].forEach((title) => {
        const titleCell = document.createElement('th');
        titleCell.innerHTML = title;
        rowHeader.appendChild(titleCell);
    })
    oneOnOneTable.appendChild(rowHeader);

    studentsData.forEach((student) => {
        // Row
        let needsOneOnOne = false;
        const row = document.createElement('tr');
        // Cols
        [
            'ID',
            'Ülesanne 1',
            'Ülesanne 2',
            'Ülesanne 3',
        ].forEach((key) => {
            const taskCell = document.createElement('td');
            taskCell.innerHTML = student[key];
            row.appendChild(taskCell);
            if (key != 'ID' && student[key] < 10) {
                needsOneOnOne = true;
            }
        })
        if (needsOneOnOne) {
            oneOnOneTable.appendChild(row);
        }
    });

    // Pair up table

    const complexTable = document.getElementById('complex-table');

    // Header
    rowHeader = document.createElement('tr');
    rowHeader.classList.add('text-primary');
    [
        'ID',
        'Probleemülesanne',
    ].forEach((title) => {
        const titleCell = document.createElement('th');
        titleCell.innerHTML = title;
        rowHeader.appendChild(titleCell);
    })
    complexTable.appendChild(rowHeader);

    studentsData.forEach((student) => {
        // Row
        let needsTeamUp = false;
        const row = document.createElement('tr');
        // Cols
        [
            'ID',
            'Probleemülesanne',
        ].forEach((key) => {
            const taskCell = document.createElement('td');
            taskCell.innerHTML = student[key];
            row.appendChild(taskCell);
            if (key != 'ID' && student[key] < 60) {
                needsTeamUp = true;
            }
        })
        if (needsTeamUp) {
            complexTable.appendChild(row);
        }
    });

};
