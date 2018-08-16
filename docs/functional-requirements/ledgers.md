# Ledgers

## Overview

Ledgers shows ledgers balances and descriptions by date. Contain sections `Export button`, `Symbol filter buttons`, `Table`, `Pagination`.

## UI

1. The panel has title named `Ledgers`(translate).
1. The panel has a `Export`(translate) button with `cloud-download` icon besides the panel title.
1. The panel shows loading animation when load new data.
1. The panel shows `No related data in this time range. You can try another time range.`(translate) when no data is fetched.
    1. The panel shows a list of symbol filter buttons if available.
1. The panel shows a list of symbol filter buttons and table when data is ready.
    1. The first button is `All`, click it will shows all fetched data.
        1. The related symbol will be shown in `BALANCE`(translate) field.
    1. Symbol buttons are sorted alphabetically, click it will filter the fetched data to this symbol.
    1. Symbols appeared in current queried data is shown with a different color.
1. The tables shows several columns:
    1. `DESCRIPTION`(translate)
    1. `CREDIT`(translate), the number is left aligned.
    1. `DEBIT`(translate), the number is left aligned.
    1. `BALANCE`(translate), the number is left aligned.
    1. `DATE`(translate), the date format looks like `18-08-09 09:36:41`.
1. Should show tooltip when mouse hover any contents in table cell
1. The pagination bar is shown at the bottom of the table.
    1. The query limit is 5000 entries at once.
    1. The table shows 200 entries per page.
    1. Contain `<<` (previous query), `<`(backward a page), `>`(forward a page), `>>`(next query) buttons
    1. Contain a page indicator field which shows current page.
    1. The page indicator field allows user input a page number, press enter key will jump to that  page.
    1. when user press >> in pagination, show `loading...`(translate) with animation icon.
        1. all pagination function are disabled while loading
        1. hide the text when new data retrieved
        1. hide the text when data fetch failed
