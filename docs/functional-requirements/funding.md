# Funding Credit/Loan/Offer

Shows funding credit/loan/offer hisotry related data by date. Contain sections `Export button`, `Table`, `Pagination`.

Navigate to `/credits` will open funding credit history view.

Navigate to `/loans` will open funding loan history view.

Navigate to `/offers` will open funding offer history view.

## UI

1. The panel has title named `Trades`(translate).
1. The panel has a `Export`(translate) button with `cloud-download` icon besides the panel title.
1. The panel has a `Refresh`(translate) button with `refresh` icon besides the panel title.
    1. Click the icon will re-fetch the data.
1. The panel show loading animation when load new data.
1. The panel shows `No related data in this time range. You can try another time range.`(translate) when no data is fetched.
1. The panel shows a table when data is ready.
1. The credit tables shows several columns:
    1. `#` id
    1. `CURRENCY`(translate)
    1. `SIDE`(translate) could be `BOTH`, `PROVIDED`, `TAKEN`
    1. `AMOUNT`(translate), the number is left aligned.
    1. `STATUS`(translate),
    1. `RATE(% PER DAY)`(translate),
    1. `PERIOD`(translate),
    1. `OPENED`(translate), the date format looks like `18-08-09 09:36:41`.
    1. `CLOSED`(translate), the date format looks like `18-08-09 09:36:41`.
    1. `POSITION PAIR`(translate)
    1. `DATE`(translate), the date format looks like `18-08-09 09:36:41`.
1. The loan tables shows several columns:
    1. `#` id
    1. `CURRENCY`(translate)
    1. `SIDE`(translate) could be `BOTH`, `PROVIDED`, `TAKEN`
    1. `AMOUNT`(translate), the number is left aligned.
    1. `STATUS`(translate),
    1. `RATE(% PER DAY)`(translate),
    1. `PERIOD`(translate),
    1. `OPENED`(translate), the date format looks like `18-08-09 09:36:41`.
    1. `CLOSED`(translate), the date format looks like `18-08-09 09:36:41`.
    1. `DATE`(translate), the date format looks like `18-08-09 09:36:41`.
1. The offer tables shows several columns:
    1. `#` id
    1. `CURRENCY`(translate)
    1. `AMOUNT`(translate), the number is left aligned.
    1. `EXECUTED AMOUNT`(translate), the number is left aligned.
    1. `TYPE`(translate),
    1. `STATUS`(translate),
    1. `RATE(% PER DAY)`(translate),
    1. `PERIOD`(translate),
    1. `DATE`(translate), the date format looks like `18-08-09 09:36:41`.
1. Should show tooltip when mouse hover any contents in table cell
1. The pagination bar is shown at the top and the bottom of the table.
    1. The query limit is 5000 entries at once.
    1. The table shows 200 entries per page.
    1. should work similar to ledgers
