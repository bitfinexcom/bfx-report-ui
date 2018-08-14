# Trades

## Overview

Trades shows trades related data by date. Contain sections `Export button`, `Table`, `Pagination`.

## UI

1. The panel has title named `Trades`(translate).
1. The panel has a `Export`(translate) button with `cloud-download` icon besides the panel title.
1. The panel show loading animation when load new data.
1. The panel shows `No related data in this time range. You can try another time range.`(translate) when no data is fetched.
1. The panel shows a table when data is ready.
1. The tables shows several columns:
    1. `#` id
    1. `PAIR`(translate)
    1. `AMOUNT`(translate), the number is left aligned.
    1. `PRICE`(translate), the number is left aligned.
    1. `FEE`(translate), the number is left aligned.
    1. `DATE`(translate), the date format looks like `18-08-09 09:36:41`.
1. The pagination bar is shown at the bottom of the table.
    1. The query limit is 1500 entries at once.
    1. The table shows 200 entries per page.
