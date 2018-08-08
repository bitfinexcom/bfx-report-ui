# Auth

## Overview

Let user type api key and secret to login.

## Definition

1. Persist: store data locally and restore when user visit this page next time.

## UI

1. Show `Auth`(translate) in Auth dialog
1. Show a highlight section to indicate user to visit web page to get API key and secret.
1. An input field to enter API key.
    1. With a title `Enter API Key: (required)`(translate)
    1. The api key is persist for convinience
1. An input field to enter API secret.
    1. With a title `Enter API Secret: (required)`(translate)
    1. The api secret is persist for convinience
1. A Button `Check Auth`(translate) for login
    1. The button will disabled when api key or api secret field is not entered
    1. Click the button will trigger the login procedure.
    1. If success will hide the auth dialog and show the side menu and the default panel, with success status bar below the header.
    1. If auth fail will keep stay in auth dialog, with error status bar below the header.
