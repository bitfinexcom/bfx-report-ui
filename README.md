# bfx-report-ui

The frontend of bfx-report at https://report.bitfinex.com

The hosted version of report (https://report.bitfinex.com) will not allow access via API keys (for security reasons), https://report.bitfinex.com will be only accessible starting from https://www.bitfinex.com/report that will redirect the user to https://report.bitfinex.com/?auth=UUID

User can use either the UUID or the API key to access his data

The report tool support:
[x] react/redux structure
[x] run lint & run lintFix with eslint
[] husky prepush validation
[] redux-saga request
[] export to different platform (bitfinex/ethfinex, local)
[] show in a nice scrolling tables
[] ledger entries
[] trades
[] orders
[] movements (deposits/withdrawals)
[] request a full history CSV
[] switch themes
[] l10n

Doc example https://docs.bitfinex.com/v2/reference#movements
