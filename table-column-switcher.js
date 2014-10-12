var ColumnSwitcher = function(table)
{

  // private vars -------------------------------------------------------------//
  var _table          = table,
      _columns        = _table.getAttribute('data-column-switch-cols').split(' '),
      _currentColumn  = _table.getAttribute('data-column-switch-default-col'),
      _thead          = _table.querySelector('thead'),
      _tbody          = _table.querySelector('tbody'),
      _selectCell,
      _select;





  // private methods ----------------------------------------------------------//

  var _update = function()
  {
    // hide all cells
    var a = _table.querySelectorAll('td'),
        i = a.length;
    while(i--)
    {
      a[i].classList.add('column-switcher__hidden');
    }

    // show cells at current column index
    a = _table.querySelectorAll('td:nth-child(' + _currentColumn + ')');
    i = a.length;
    while(i--)
    {
      a[i].classList.remove('column-switcher__hidden');
    }
  };


  var _handleSelectChange = function()
  {
      _currentColumn = _select.value;
      _update();
  }


  var _init = function()
  {
    // add styling hooks to the table so we can specifically style js-modified table-switchers
    _table.classList.add('column-switcher');

    // add an extra cell to the header row and stick a select element in it
    _selectCell = _thead.querySelector('tr').appendChild(document.createElement('th'));
    _selectCell.classList.add('column-switcher__select-cell')
    _select = _selectCell.appendChild(document.createElement('select'));

    // hide all the  cells in the header row that we don’t need
    _thead.querySelector('th')
    for(var i=0; i<_columns.length; i++)
    {
      _thead.querySelector('th:nth-child(' + _columns[i] + ')').classList.add('column-switcher__hidden');
    }


    // build list of options for select
    var option,
        optionText,
        optionValue;
        headerCells = _thead.querySelectorAll('th');
 
    for(var j=0; j<_columns.length; j++)
    {
      option      = _select.appendChild(document.createElement('option'));
      optionText  = headerCells[_columns[j] - 1].textContent;
      optionValue = _columns[j];
      option.innerHTML = optionText;
      option.value = optionValue; 
      if(_columns[j] == _currentColumn)
      {
        _select.selectedIndex = j;
      }
    }

    // handle changes to the select value
    _select.addEventListener('change', _handleSelectChange);

    // run update once on init to set an initial state
    _update();
  }





  // getter/setters ----------------------------------------------------------//


  this.currentColumn = function(n)
  {
    if(n != parseFloat(n)) { throw new TypeError(); }
    _currentColumn = parseInt(n);
    console.log('_currentColumn = ' + _currentColumn);
    _update();
  }





  // initialise this instance -------------------------------------------------//


  _init();


}

// STATIC METHODS ------------------------------------------------------------//

ColumnSwitcher.init = function()
{
  var tables = document.querySelectorAll('table[data-column-switch]');
  var n = tables.length;
  for(var i=0; i<n; i++)
  {
    var columnSwitcher = new ColumnSwitcher(tables[i]);
  }
}
ColumnSwitcher.init();