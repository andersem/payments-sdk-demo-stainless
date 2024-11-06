# SessionsProfiles

Types:

- <code><a href="./src/resources/sessions-profiles.ts">PublishConfiguration</a></code>
- <code><a href="./src/resources/sessions-profiles.ts">SessionsProfileCreateResponse</a></code>

Methods:

- <code title="post /sessions-profile">client.sessionsProfiles.<a href="./src/resources/sessions-profiles.ts">create</a>({ ...params }) -> SessionsProfileCreateResponse</code>

# Sessions

Types:

- <code><a href="./src/resources/sessions.ts">ID</a></code>
- <code><a href="./src/resources/sessions.ts">Session</a></code>
- <code><a href="./src/resources/sessions.ts">SessionCancelled</a></code>
- <code><a href="./src/resources/sessions.ts">SessionPayResult</a></code>
- <code><a href="./src/resources/sessions.ts">SessionRead</a></code>
- <code><a href="./src/resources/sessions.ts">SessionRetrieveResponse</a></code>
- <code><a href="./src/resources/sessions.ts">SessionUpdateResponse</a></code>
- <code><a href="./src/resources/sessions.ts">SessionCancelResponse</a></code>
- <code><a href="./src/resources/sessions.ts">SessionPayResponse</a></code>
- <code><a href="./src/resources/sessions.ts">SessionPaymentTokenResponse</a></code>

Methods:

- <code title="get /sessions/{session_id}">client.sessions.<a href="./src/resources/sessions.ts">retrieve</a>(sessionId, { ...params }) -> SessionRetrieveResponse</code>
- <code title="put /sessions/{session_id}">client.sessions.<a href="./src/resources/sessions.ts">update</a>(sessionId, { ...params }) -> SessionUpdateResponse</code>
- <code title="post /sessions/{session_id}/cancel">client.sessions.<a href="./src/resources/sessions.ts">cancel</a>(sessionId, { ...params }) -> SessionCancelResponse</code>
- <code title="post /sessions/pay">client.sessions.<a href="./src/resources/sessions.ts">pay</a>({ ...params }) -> SessionPayResponse</code>
- <code title="post /sessions/payment-token">client.sessions.<a href="./src/resources/sessions.ts">paymentToken</a>({ ...params }) -> SessionPaymentTokenResponse</code>

# Transactions

Types:

- <code><a href="./src/resources/transactions.ts">Transaction</a></code>
- <code><a href="./src/resources/transactions.ts">TransactionListResponse</a></code>

Methods:

- <code title="get /transactions/{id}">client.transactions.<a href="./src/resources/transactions.ts">retrieve</a>(id, { ...params }) -> Transaction</code>
- <code title="put /transactions/{id}">client.transactions.<a href="./src/resources/transactions.ts">update</a>(id, { ...params }) -> Transaction</code>
- <code title="get /transactions">client.transactions.<a href="./src/resources/transactions.ts">list</a>({ ...params }) -> TransactionListResponse</code>
- <code title="post /transactions/{id}/authorization">client.transactions.<a href="./src/resources/transactions.ts">authorization</a>(id, { ...params }) -> Transaction</code>
- <code title="post /transactions/{id}/capture">client.transactions.<a href="./src/resources/transactions.ts">capture</a>(id, { ...params }) -> Transaction</code>
- <code title="post /transactions/{id}/refund">client.transactions.<a href="./src/resources/transactions.ts">refund</a>(id, { ...params }) -> Transaction</code>
- <code title="post /transactions/{id}/void">client.transactions.<a href="./src/resources/transactions.ts">void</a>(id, { ...params }) -> Transaction</code>

# Accounts

## Settlements

Types:

- <code><a href="./src/resources/accounts/settlements/settlements.ts">SettlementResponse</a></code>

Methods:

- <code title="get /accounts/{aid}/settlements">client.accounts.settlements.<a href="./src/resources/accounts/settlements/settlements.ts">list</a>(aid, { ...params }) -> SettlementResponse</code>

### Reports

#### Configuration

Types:

- <code><a href="./src/resources/accounts/settlements/reports/configuration.ts">SettlementReportConfigItem</a></code>
- <code><a href="./src/resources/accounts/settlements/reports/configuration.ts">SettlementReportConfigResponse</a></code>

Methods:

- <code title="post /accounts/{aid}/settlements/reports/configuration">client.accounts.settlements.reports.configuration.<a href="./src/resources/accounts/settlements/reports/configuration.ts">create</a>(aid, { ...params }) -> SettlementReportConfigItem</code>
- <code title="get /accounts/{aid}/settlements/reports/configuration/{id}">client.accounts.settlements.reports.configuration.<a href="./src/resources/accounts/settlements/reports/configuration.ts">retrieve</a>(aid, id) -> SettlementReportConfigItem</code>
- <code title="put /accounts/{aid}/settlements/reports/configuration/{id}">client.accounts.settlements.reports.configuration.<a href="./src/resources/accounts/settlements/reports/configuration.ts">update</a>(aid, id, { ...params }) -> SettlementReportConfigItem</code>
- <code title="get /accounts/{aid}/settlements/reports/configuration">client.accounts.settlements.reports.configuration.<a href="./src/resources/accounts/settlements/reports/configuration.ts">list</a>(aid) -> SettlementReportConfigResponse</code>
- <code title="delete /accounts/{aid}/settlements/reports/configuration/{id}">client.accounts.settlements.reports.configuration.<a href="./src/resources/accounts/settlements/reports/configuration.ts">delete</a>(aid, id) -> SettlementReportConfigItem</code>

### Attachments

Types:

- <code><a href="./src/resources/accounts/settlements/attachments.ts">AttachmentRetrieveResponse</a></code>

Methods:

- <code title="get /accounts/{aid}/settlements/{settlementid}/attachments/{attachmentid}">client.accounts.settlements.attachments.<a href="./src/resources/accounts/settlements/attachments.ts">retrieve</a>(aid, settlementid, attachmentid) -> string</code>

## Reports

### Metadata

Types:

- <code><a href="./src/resources/accounts/reports/metadata.ts">StartingAfter</a></code>
- <code><a href="./src/resources/accounts/reports/metadata.ts">MetadataListResponse</a></code>

Methods:

- <code title="get /accounts/{aid}/reports/metadata">client.accounts.reports.metadata.<a href="./src/resources/accounts/reports/metadata.ts">list</a>(aid, { ...params }) -> MetadataListResponse</code>

## Auth

Types:

- <code><a href="./src/resources/accounts/auth.ts">AccessToken</a></code>

Methods:

- <code title="post /accounts/{oid}/auth/token">client.accounts.auth.<a href="./src/resources/accounts/auth.ts">token</a>(oid, { ...params }) -> AccessToken</code>

## Management

### Settings

#### Approvals

##### PayoutDestinations

Types:

- <code><a href="./src/resources/accounts/management/settings/approvals/payout-destinations.ts">ApprovalsPayoutDestinationResponse</a></code>
- <code><a href="./src/resources/accounts/management/settings/approvals/payout-destinations.ts">PayoutDestinationListResponse</a></code>

Methods:

- <code title="post /accounts/{aid}/management/settings/approvals/payout-destinations">client.accounts.management.settings.approvals.payoutDestinations.<a href="./src/resources/accounts/management/settings/approvals/payout-destinations.ts">create</a>(aid, { ...params }) -> ApprovalsPayoutDestinationResponse</code>
- <code title="get /accounts/{aid}/management/settings/approvals/payout-destinations">client.accounts.management.settings.approvals.payoutDestinations.<a href="./src/resources/accounts/management/settings/approvals/payout-destinations.ts">list</a>(aid, { ...params }) -> PayoutDestinationListResponse</code>

# Branding

## Logos

### Variants

Methods:

- <code title="get /branding/logos/{logos}/variant/{variant}/color/{color}/width/{width}/{template}">client.branding.logos.variants.<a href="./src/resources/branding/logos/variants.ts">retrieve</a>(logos, variant, color, width, template) -> void</code>

## Profiles

### Variants

Methods:

- <code title="get /branding/profiles/{profile_id}/variant/{variant}/color/{color}/width/{width}/{template}">client.branding.profiles.variants.<a href="./src/resources/branding/profiles/variants.ts">retrieve</a>(profileId, variant, color, width, template) -> void</code>

# Examples

Types:

- <code><a href="./src/resources/examples/examples.ts">DiscountCodesOrderUpdate</a></code>
- <code><a href="./src/resources/examples/examples.ts">ShippingAddressCallbackSessionOrderUpdate</a></code>
- <code><a href="./src/resources/examples/examples.ts">ExampleDiscountCodeCallbackURLResponse</a></code>
- <code><a href="./src/resources/examples/examples.ts">ExampleShippingAddressCallbackURLResponse</a></code>

Methods:

- <code title="post /examples/discount_code_callback_url">client.examples.<a href="./src/resources/examples/examples.ts">discountCodeCallbackURL</a>({ ...params }) -> ExampleDiscountCodeCallbackURLResponse</code>
- <code title="post /examples/shipping_address_callback_url">client.examples.<a href="./src/resources/examples/examples.ts">shippingAddressCallbackURL</a>({ ...params }) -> ExampleShippingAddressCallbackURLResponse</code>

## SessionURLCallback

Types:

- <code><a href="./src/resources/examples/session-url-callback.ts">SessionURLCallbackCreateResponse</a></code>
- <code><a href="./src/resources/examples/session-url-callback.ts">SessionURLCallbackRetrieveResponse</a></code>

Methods:

- <code title="post /examples/session_url_callback">client.examples.sessionURLCallback.<a href="./src/resources/examples/session-url-callback.ts">create</a>({ ...params }) -> unknown</code>
- <code title="get /examples/session_url_callback">client.examples.sessionURLCallback.<a href="./src/resources/examples/session-url-callback.ts">retrieve</a>({ ...params }) -> unknown</code>

# V2

## Accounts

### Payout

Types:

- <code><a href="./src/resources/v2/accounts/payout/payout.ts">FundTransfer</a></code>
- <code><a href="./src/resources/v2/accounts/payout/payout.ts">PayoutDestinationBalances</a></code>
- <code><a href="./src/resources/v2/accounts/payout/payout.ts">PayoutDestinationTransfers</a></code>
- <code><a href="./src/resources/v2/accounts/payout/payout.ts">PayoutFundTransferResponse</a></code>

Methods:

- <code title="post /v2/accounts/{aid}/payout/fund-transfer">client.v2.accounts.payout.<a href="./src/resources/v2/accounts/payout/payout.ts">fundTransfer</a>(aid, { ...params }) -> PayoutFundTransferResponse</code>

#### PayoutDestinations

##### Balances

Types:

- <code><a href="./src/resources/v2/accounts/payout/payout-destinations/balances.ts">BalanceRetrieveResponse</a></code>

Methods:

- <code title="get /v2/accounts/{aid}/payout/payout-destinations/{payout_destination_id}/balances">client.v2.accounts.payout.payoutDestinations.balances.<a href="./src/resources/v2/accounts/payout/payout-destinations/balances.ts">retrieve</a>(aid, payoutDestinationId) -> BalanceRetrieveResponse</code>

##### Transfers

Types:

- <code><a href="./src/resources/v2/accounts/payout/payout-destinations/transfers.ts">TransferListResponse</a></code>

Methods:

- <code title="get /v2/accounts/{aid}/payout/payout-destinations/{payout_destination_id}/transfers">client.v2.accounts.payout.payoutDestinations.transfers.<a href="./src/resources/v2/accounts/payout/payout-destinations/transfers.ts">list</a>(aid, payoutDestinationId, { ...params }) -> TransferListResponse</code>
