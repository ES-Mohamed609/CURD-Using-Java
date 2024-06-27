let tableItems = document.getElementById('table').getElementsByTagName('tbody')[0];
let itemIndex = 1;

function validateInput(event) {
    const input = event.target.value;
    const errorDiv = document.getElementById('error');
    
    // Validation: only letters and spaces allowed
    const lettersOnly = /^[A-Za-z\s]*$/;
    if (!lettersOnly.test(input)) {
        errorDiv.textContent = 'Name can only contain letters and spaces.';
        event.target.value = input.replace(/[^A-Za-z\s]/g, '');
    } else {
        errorDiv.textContent = '';
    }
}

function saving() {
    let name = document.getElementById('name').value;
    let color = document.getElementById('colors').value;
    let years = document.getElementById('date').value;
    let courses = document.getElementById('courses').value;

    if (name && color && years && courses) {
        let newRow = tableItems.insertRow();
        newRow.innerHTML = `
            <td data-label="No.">${itemIndex++}</td>
            <td data-label="Names">${name}</td>
            <td data-label="Colors">${color}</td>
            <td data-label="Date">${years}</td>
            <td data-label="Courses">${courses}</td>
            <td data-label="Edit"><span class="edit-btn" onclick="editItem(this)">✏️</span></td>
            <td data-label="Delete"><span class="delete-btn" onclick="deleteItem(this)">❌</span></td>
        `;

        document.getElementById('name').value = '';
        document.getElementById('colors').value = '';
        document.getElementById('date').value = '';
        document.getElementById('courses').value = '';
    } else {
        alert("Please fill in all fields before saving.");
    }
}

function searching() {
    let textSearchValue = document.getElementById('text-search').value.toLowerCase();
    let numberSearchValue = document.getElementById('number-search').value.toLowerCase();
    let rows = tableItems.getElementsByTagName('tr');

    for (let row of rows) {
        let cells = row.getElementsByTagName('td');
        let textMatch = false;
        let numberMatch = false;

        for (let cell of cells) {
            cell.classList.remove('highlight-cell');

            if (textSearchValue && cell.textContent.toLowerCase().includes(textSearchValue)) {
                cell.classList.add('highlight-cell');
                textMatch = true;
            }

            if (numberSearchValue && !isNaN(numberSearchValue) && cell.textContent.toLowerCase().includes(numberSearchValue)) {
                cell.classList.add('highlight-cell');
                numberMatch = true;
            }
        }

        if (textMatch || numberMatch) {
            row.classList.add('highlight-row');
        } else {
            row.classList.remove('highlight-row');
        }
    }
}

function editItem(button) {
    let row = button.parentElement.parentElement;
    document.getElementById('name').value = row.cells[1].innerText;
    document.getElementById('colors').value = row.cells[2].innerText;
    document.getElementById('date').value = row.cells[3].innerText;
    document.getElementById('courses').value = row.cells[4].innerText;

    deleteItem(button);
}

function deleteItem(button) {
    let row = button.parentElement.parentElement;
    tableItems.deleteRow(row.rowIndex - 1);
    updateIndex();
}

function updateIndex() {
    itemIndex = 1;
    Array.from(tableItems.rows).forEach((row) => {
        row.cells[0].innerText = itemIndex++;
    });
}
