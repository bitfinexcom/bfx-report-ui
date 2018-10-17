## Overview

bfx-report UI contain 3 main sections: `Header, Side Menu, and Panel`.

Besides the main section, the UI also contain some function dialogs that overlap the whole UI: `Auth dialog, Custom Time Range dialog, Export CSV dialog, and Prefernces dialog`.

The layout is inherit from [flexboxgrid](http://flexboxgrid.com/) with 5 level screen size:
- xs : extra small screen
- sm: small screen
- md: medium size screen
- lg: large screen
- xl: extra large screen

### Header

The headers contain logo banner at the left side and the function menu at the right side.

### Side Menu

The sidemenu list major contents and the current query time range. Allow user to query data in certain time range.

### Panel

Current available panels are `Ledgers, Trades, Orders, Deposits, Withdrawals, Offers, Loans, Credits`.

### Auth Dialog

Let user type api key and secret to login.

### Custom Time Range Menu and Dialog

Allow user to select the start and end range by date and time.

### Export CSV dialog

An information dialog and a confirm button to help user export the query data as a CSV file.

### Prefernces dialog

Let user set preferred language, theme etc.
