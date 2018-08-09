# Custom Time Range Menu and Dialog

## Overview

Allow user to select the start and end range by date and time.

## UI

1. Shows current query range at top of the Side Menu.
    1. shows in `{start date} — {end date}` format.
    1. The date format looks like `JUL 25 2018`.
1. The sub menu lists available preset query range.
    1. `Last 24 hours`(translate)
    1. `Yesterday`(translate)
    1. `Last 2 weeks`(translate)
    1. `Month to date`(translate)
    1. `Past month`(translate)
    1. `Past 3 month`(translate)
    1. `Custom`(translate)
        1. Click this will trigger the Custom Time range dialog.

When Custom Time Range dialog is shown:

1. The dialog has tilte `Select Query Range`(translate).
1. The dialog has a close icon at top right, click it will close the dialog.
1. The dialog contain `startDate` and `endDate` input fields.
    1. tap these field will pop the date selector.
1. The dialog has a `View`(translate) button at the bottom of dialog.
    1. The button is disabled if `startDate` or `endDate` field doesn't entered
    1. Click the button will save current custom query and close the dialog.
