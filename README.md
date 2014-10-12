
A simple, Javascript-driven way to render tables on small screens. Below a certain width, the table condenses into two columns and the user can choose which column to display by changing the value of a select element.

For now this is a proof-of-concept. It will probably bork with tables that use colspan, or don’t follow a very similiar structure to the ones in index.html.

Anyway, just load table-column-switcher.js into your document, and add these data- attributes to your table:

*data-column-switch*

Tells javascript to modify this table

*data-column-switch-cols='2 3'*

Tells javascript which columns to make switchable.

*data-column-switch-default-col='3'*

Tells javascript which column to show by default.