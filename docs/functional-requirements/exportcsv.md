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
    1. Click `Export`(translate) button will store the CSV file to the `csv` folder in local storage.
    1. The dialog shows message `Bitfinex will prepare your data during {start date} — {end date} and store to your local folder.`(translate).
1. When host on server:
    1.  Click `Export`(translate) button will send CSV file to user email.
    1. The dialog shows message `Bitfinex will prepare your data during {start date} — {end date} and send to Email {email@address} .`(translate).
1. The export data has the same time range shown in the main page
1. The dialog has a dataset selector which allow multiple dataset exports.
1. The dialog has a date format selector.
    1. Change the date format will effect the export file's date format.
1. If data was previously filtered, the export csv only contains the filtered coin / pair.
1. User can pass `reportEmail` url parms like `/?reportEmail=any@mail.address` to specify the email destination. The email address will be shown at dialog.
1. If some csv export task already in queue, backend will return the message `Spam restriction mode, user already has an export on queue` and status code 401.
