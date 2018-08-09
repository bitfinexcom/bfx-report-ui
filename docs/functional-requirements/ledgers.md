# Ledgers

## Overview

## UI

1. The panel has title named `Ledgers`(translate).
1. The panel has a `Export`(translate) button with `cloud-download` icon besides the panel title.
1. The panel show loading animation when load new data.
1. The panel shows `No related data in this time range. You can try another time range.`(translate) when no data is fetched.
1. The panel shows a list of symbol filter buttons and table when data is ready.
    1. The first button is `All`, click it will shows all fetched data.
        1. The related symbol will be shown in `BALANCE`(translate) field.
    1. Symbol buttons are sorted alphabetically, click it will filter the fetched data to this symbol.
1. The tables shows several columns:
    1. `DESCRIPTION`(translate)
    1. `CREDIT`(translate), the number is left aligned.
    1. `DEBIT`(translate), the number is left aligned.
    1. `BALANCE`(translate), the number is left aligned.
    1. `DATE`(translate), the date format looks like `18-08-09 09:36:41`.
1. The pagination bar is shown at the bottom of the table.
    1. The query limit is 5000 entries at once
