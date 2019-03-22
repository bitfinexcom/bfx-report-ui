# Wallets

## Overview

Wallets shows wallet related currency alphabetically. Contain sections `Export button`, Exchange, Margin, and Funding `Table`.

Navigate to `/wallets` will open this view.

## UI

1. The panel has title named `Wallets`(translate).
1. The panel has a `Export`(translate) button with `cloud-download` icon besides the panel title.
1. The panel has a Date Time input field besides the panel title.
  1. Click the input filed will popup the Date Time picker
  1. Change Date Time will update new data from the server
1. The panel has a `Refresh`(translate) button with `refresh` icon besides the Date Time input field.
    1. Click the icon will re-fetch the data.
1. The panel show loading animation when load new data.
1. The panel shows `No related data in this date time. You can try another date time.`(translate) when no data is fetched.
1. The panel shows a table when data is ready.
1. The tables shows several columns:
    1. `CURRENCY`(translate)
    1. `BALANCE`(translate), the number is left aligned.
    1. `BALANCE (USD)`(translate), the number is left aligned. Framework mode only.
    1. `UNSETTLED INTEREST`(translate), the number is left aligned.
    1. `BALANCE AVAILABLE`(translate), the number is left aligned.
1. Should show tooltip when mouse hover any contents in table cell
