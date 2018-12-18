# Orders

## Overview

Positions shows positions history related data by date. Contain sections `Export button`, `Table`, `Pagination`.

Navigate to `/positions` will open this view.

## UI

1. The panel has title named `Positions`(translate).
1. The panel has a `Export`(translate) button with `cloud-download` icon besides the panel title.
1. The panel has a `Refresh`(translate) button with `refresh` icon besides the panel title.
    1. Click the icon will re-fetch the data.
1. The panel show loading animation when load new data.
1. The panel shows `No related data in this time range. You can try another time range.`(translate) when no data is fetched.
1. The panel shows a table when data is ready.
1. The tables shows several columns:
    1. `#` id
    1. `PAIR`(translate)
    1. `AMOUNT`(translate), the number is left aligned.
    1. `BASE PRICE`(translate), the number is left aligned.
    1. `LIQ PRICE`(translate), the number is left aligned.
    1. `P/L`(translate), the number is left aligned.
    1. `P/L%`(translate), the number is left aligned.
    1. `FUNDING COST`(translate), the number is left aligned.
    1. `FUNDING TYPE`(translate), the number is left aligned.
    1. `UPDATE`(translate), the date format looks like `18-08-09 09:36:41`.
1. Should show tooltip when mouse hover any contents in table cell
1. The pagination bar is shown at the top and the bottom of the table.
    1. The query limit is 500 entries at once.
    1. The table shows 125 entries per page.
    1. should work similar to orders
