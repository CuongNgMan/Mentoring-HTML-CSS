(() => {
  const table = document.querySelector('#table');
  const tableBody = document.querySelector('#row-container');

  table.addEventListener('click', (e) => {
    console.log('in table', e.target.innerText);
  });

  const ROW = 100;
  const COL = 100;

  function createARow(col, start) {
    const tr = document.createElement('tr');

    let td;
    for (let i = start; i < col; i++) {
      td = document.createElement('td');
      td.className = 'box';
      td.innerText = Number.parseInt(`${i + 1}`);
      td.setAttribute('draggable', true);
      tr.appendChild(td);
    }

    return tr;
  }

  function generate(row, col) {
    for (let i = 0; i < row; i++) {
      const tr = createARow(col * (i + 1), col * i);
      tableBody.appendChild(tr);
    }
  }

  generate(ROW, COL);
})();
