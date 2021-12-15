(() => {
  const table = document.querySelector('#row-container');

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
      table.appendChild(tr);
    }
  }

  generate(ROW, COL);

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    e.stopPropagation();

    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  let items = document.querySelectorAll('#row-container .box');

  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
  });
})();
