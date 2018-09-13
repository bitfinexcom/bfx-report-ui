# Header

## Overview

The headers contain logo banner at the left side and the function menu at the right side.

## Definitions

## UI

1. The banner is shown at the left side of the header.
1. The banner will auto change based on current screen size and theme.
    1. Small screen and dark theme: `BFX` in white color.
    1. Small screen and light theme: `BFX` in black color.
    1. Normal screen and light theme: `BITFINEX` in white color.
    1. Normal screen and dark theme: `BITFINEX` in black color.
1. The language selection menu is shown at the right side of the header when user does not login yet.
    1. The language selection menu function requirements are defined in [prefernces.md](prefernces.md).
1. The function menu is shown at the right side of the header when user is login.
    1. Hover on the menu will popup the menu selector automatically.
    1. The menu lists items
        1. `Preferences`
            1. Click to open the `Preferences dialog`
        1. divider
        1. `Logout`
            1. Click to logout
            1. Will logout user and show the login dialog
1. A help icon is shown at the left of above menu.
    1. Click the icon will open a url in a new window.
