# Export CSV

## Overview

An information dialog and a confirm button to help user export the query data as a CSV file.

## UI

1. Each of data panel has a `Export`(translate) button with `cloud-download` icon besides the panel title.
1. Click the button will trigger the Export CSV dialog.
1. The dialog has title `Export CSV`(translate)
1. The dialog has a close icon at top right, click it will close the dialog.
1. The dialog has a `Cancel`(translate) button and `Export`(translate) button at bottom of dialog
    1. click  `Cancel`(translate) button will close the dialog.
1. When run on local machine:
    1. Click `Export`(translate) button will export the CSV file to the `csv` folder in local storage.
    1. The dialog shows message `Bitfinex will prepare your {panel title} data during {start date} — {end date} and send to your Email.`(translate).
1. When host on server:
    1.  Click `Export`(translate) button will send CSV file to user email.
    1. The dialog shows message `Bitfinex will prepare your {panel title} data during {start date} — {end date} and store to your local folder.`(translate).
