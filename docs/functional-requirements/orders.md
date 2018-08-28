# Orders

## Overview

Orders shows orders related data by date. Contain sections `Export button`, `Table`, `Pagination`.

## UI

1. The panel has title named `Orders`(translate).
1. The panel has a `Export`(translate) button with `cloud-download` icon besides the panel title.
1. The panel show loading animation when load new data.
1. The panel shows `No related data in this time range. You can try another time range.`(translate) when no data is fetched.
1. The panel shows a table when data is ready.
1. The tables shows several columns:
    1. `#` id
    1. `SYMBOL`(translate)
    1. `TYPE`(translate)
    1. `AMOUNT`(translate), the number is left aligned.
    1. `AMOUNT ORIGIN`(translate), the number is left aligned.
    1. `PRICE`(translate), the number is left aligned.
    1. `AVERAGE PRICE`(translate), the number is left aligned.
    1. `DATE`(translate), the date format looks like `18-08-09 09:36:41`.
    1. `STATUS`(translate)
1. Should show tooltip when mouse hover any contents in table cell
1. The pagination bar is shown at the top and the bottom of the table.
    1. The query limit is 5000 entries at once.
    1. The table shows 200 entries per page.
    1. should work similar to ledgers
