// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as SessionsAPI from './sessions';

export class Transactions extends APIResource {
  /**
   * scopes:
   *
   * - admin:checkout
   * - read:checkout
   */
  retrieve(
    id: string,
    query?: TransactionRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction>;
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Transaction>;
  retrieve(
    id: string,
    query: TransactionRetrieveParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction> {
    if (isRequestOptions(query)) {
      return this.retrieve(id, {}, query);
    }
    return this._client.get(`/transactions/${id}`, { query, ...options });
  }

  /**
   * scopes:
   *
   * - admin:checkout
   * - write:checkout
   */
  update(
    id: string,
    body?: TransactionUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction>;
  update(id: string, options?: Core.RequestOptions): Core.APIPromise<Transaction>;
  update(
    id: string,
    body: TransactionUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction> {
    if (isRequestOptions(body)) {
      return this.update(id, {}, body);
    }
    return this._client.put(`/transactions/${id}`, { body, ...options });
  }

  /**
   * scopes:
   *
   * - admin:checkout
   * - read:checkout
   */
  list(
    query?: TransactionListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<TransactionListResponse>;
  list(
    query: TransactionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/transactions', { query, ...options });
  }

  /**
   * Extend authorization on transaction for greater time to capture. NB: Currently
   * only supported for Klarna.
   */
  authorization(
    id: string,
    body?: TransactionAuthorizationParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction>;
  authorization(id: string, options?: Core.RequestOptions): Core.APIPromise<Transaction>;
  authorization(
    id: string,
    body: TransactionAuthorizationParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction> {
    if (isRequestOptions(body)) {
      return this.authorization(id, {}, body);
    }
    return this._client.post(`/transactions/${id}/authorization`, { body, ...options });
  }

  /**
   * Captures a transaction that was created with the Checkout endpoint with a
   * `capture_now` value of `false`.
   *
   * #### Capture Instabank transaction
   *
   * Note that `items` is required when capturing a transaction with
   * `payment_product=instabank`. The items must include the lines to Capture, with
   * `line_id`, `quantity` and `amount`.
   *
   * scopes:
   *
   * - admin:checkout
   * - write:checkout
   */
  capture(
    id: string,
    params: TransactionCaptureParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction> {
    const {
      includes,
      'Dintero-System-Name': dinteroSystemName,
      'Dintero-System-Plugin-Name': dinteroSystemPluginName,
      'Dintero-System-Plugin-Version': dinteroSystemPluginVersion,
      'Dintero-System-Version': dinteroSystemVersion,
      ...body
    } = params;
    return this._client.post(`/transactions/${id}/capture`, {
      query: { includes },
      body,
      ...options,
      headers: {
        ...(dinteroSystemName != null ? { 'Dintero-System-Name': dinteroSystemName } : undefined),
        ...(dinteroSystemPluginName != null ?
          { 'Dintero-System-Plugin-Name': dinteroSystemPluginName }
        : undefined),
        ...(dinteroSystemPluginVersion != null ?
          { 'Dintero-System-Plugin-Version': dinteroSystemPluginVersion }
        : undefined),
        ...(dinteroSystemVersion != null ? { 'Dintero-System-Version': dinteroSystemVersion } : undefined),
        ...options?.headers,
      },
    });
  }

  /**
   * Once a transaction has been successfully captured, a refund operation is
   * available. Like other operations, refund can be partial or total
   *
   * #### Refund Instabank transaction
   *
   * Note that `items` is required when refunding a transaction with
   * `payment_product=instabank`. The items must include the lines to Refund, with
   * `line_id`, `quantity` and `amount`.
   *
   * scopes:
   *
   * - admin:checkout
   * - write:checkout
   */
  refund(
    id: string,
    params: TransactionRefundParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction> {
    const {
      includes,
      'Dintero-System-Name': dinteroSystemName,
      'Dintero-System-Plugin-Name': dinteroSystemPluginName,
      'Dintero-System-Plugin-Version': dinteroSystemPluginVersion,
      'Dintero-System-Version': dinteroSystemVersion,
      ...body
    } = params;
    return this._client.post(`/transactions/${id}/refund`, {
      query: { includes },
      body,
      ...options,
      headers: {
        ...(dinteroSystemName != null ? { 'Dintero-System-Name': dinteroSystemName } : undefined),
        ...(dinteroSystemPluginName != null ?
          { 'Dintero-System-Plugin-Name': dinteroSystemPluginName }
        : undefined),
        ...(dinteroSystemPluginVersion != null ?
          { 'Dintero-System-Plugin-Version': dinteroSystemPluginVersion }
        : undefined),
        ...(dinteroSystemVersion != null ? { 'Dintero-System-Version': dinteroSystemVersion } : undefined),
        ...options?.headers,
      },
    });
  }

  /**
   * At any moment before capture of a transaction, it is possible to cancel an
   * authorization. This operation is called voiding and can be performed by doing a
   * POST to this endpoint
   *
   * #### Void on part capture
   *
   * Void after a part capture will cancel the difference between the capture amount
   * and the authorization amount.
   *
   * Void on part capture is only supported on following types:
   *
   * - `payex.creditcard`
   * - `payex.mobilepay`
   * - `payex.vipps`
   * - `payex.applepay`
   * - `payex.clicktopay`
   * - `payex.googlepay`
   * - `vipps`
   * - `klarna.klarna`
   * - `klarna.billie`
   *
   * scopes:
   *
   * - admin:checkout
   * - write:checkout
   */
  void(
    id: string,
    params?: TransactionVoidParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction>;
  void(id: string, options?: Core.RequestOptions): Core.APIPromise<Transaction>;
  void(
    id: string,
    params: TransactionVoidParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transaction> {
    if (isRequestOptions(params)) {
      return this.void(id, {}, params);
    }
    const {
      includes,
      'Dintero-System-Name': dinteroSystemName,
      'Dintero-System-Plugin-Name': dinteroSystemPluginName,
      'Dintero-System-Plugin-Version': dinteroSystemPluginVersion,
      'Dintero-System-Version': dinteroSystemVersion,
    } = params;
    return this._client.post(`/transactions/${id}/void`, {
      query: { includes },
      ...options,
      headers: {
        ...(dinteroSystemName != null ? { 'Dintero-System-Name': dinteroSystemName } : undefined),
        ...(dinteroSystemPluginName != null ?
          { 'Dintero-System-Plugin-Name': dinteroSystemPluginName }
        : undefined),
        ...(dinteroSystemPluginVersion != null ?
          { 'Dintero-System-Plugin-Version': dinteroSystemPluginVersion }
        : undefined),
        ...(dinteroSystemVersion != null ? { 'Dintero-System-Version': dinteroSystemVersion } : undefined),
        ...options?.headers,
      },
    });
  }
}

export interface Transaction extends SessionsAPI.ID {
  /**
   * Non-negative, minor units. Total amount of the transaction
   */
  amount: number;

  /**
   * ISO 4217 transaction currency
   */
  currency: string;

  /**
   * The payment product corresponding to this transaction
   */
  payment_product:
    | 'bambora'
    | 'collector'
    | 'dintero'
    | 'dintero_psp'
    | 'instabank'
    | 'klarna'
    | 'netaxept'
    | 'payex'
    | 'santander'
    | 'swish'
    | 'vipps';

  /**
   * The payment product type corresponding to this transaction
   */
  payment_product_type:
    | 'bambora.creditcard'
    | 'bambora.vipps'
    | 'collector.invoice'
    | 'collector.invoice_b2b'
    | 'collector.invoice_b2b_preapproved'
    | 'collector.installment'
    | 'dintero.zero'
    | 'dintero.wallets'
    | 'dintero_psp.creditcard'
    | 'instabank.finance'
    | 'instabank.invoice'
    | 'instabank.installment'
    | 'instabank.postponement'
    | 'klarna.klarna'
    | 'klarna.billie'
    | 'netaxept.creditcard'
    | 'payex.creditcard'
    | 'payex.mobilepay'
    | 'payex.swish'
    | 'payex.vipps'
    | 'payex.applepay'
    | 'payex.clicktopay'
    | 'payex.googlepay'
    | 'santander.debit_account'
    | 'swish.swish'
    | 'vipps';

  /**
   * Address
   */
  billing_address?: Transaction.BillingAddress;

  card?: Transaction.Card;

  /**
   * Configuration for checkboxes that should be part of the checkout
   */
  checkboxes?: Array<Transaction.Checkbox>;

  /**
   * When the transaction was created
   */
  created_at?: string;

  customer?: Transaction.Customer;

  /**
   * The IP address of the customer
   */
  customer_ip?: string;

  /**
   * A short reference / descriptor that will show up on the customers bank statement
   */
  dynamic_descriptor?: string;

  events?: Array<Transaction.Event>;

  /**
   * The gift cards that used to partially or fully authorize the transaction
   */
  gift_cards?: Array<Transaction.GiftCard>;

  initiating_system_request_headers?: Transaction.InitiatingSystemRequestHeaders;

  /**
   * The applicable transaction items
   */
  items?: Array<Transaction.Item>;

  /**
   * A reference specified by the merchant to identify the transaction
   */
  merchant_reference?: string;

  /**
   * A reference specified by the merchant to identify the transaction, can be
   * updated after the transaction has been created
   */
  merchant_reference_2?: string;

  metadata?: Transaction.Metadata;

  /**
   * Initiated by the merchant or used to generate a token
   */
  payment_operation?: 'unscheduled_purchase' | 'recurring_purchase' | 'generate_payment_token';

  /**
   * An id that identifies the seller, value will be included in the settlement
   * reports
   */
  payout_destination_id?: string;

  session?: SessionsAPI.Session;

  /**
   * The session id for the transaction
   */
  session_id?: string;

  /**
   * Overall settlement status after the events
   */
  settlement_status?: 'NOT_SETTLED' | 'PENDING_SETTLEMENT' | 'PARTIALLY_SETTLED' | 'SETTLED';

  /**
   * Address
   */
  shipping_address?: Transaction.ShippingAddress;

  shipping_option?: Transaction.ShippingOption;

  status?:
    | 'INITIATED'
    | 'AUTHORIZED'
    | 'AUTHORIZATION_VOIDED'
    | 'CAPTURED'
    | 'PARTIALLY_CAPTURED'
    | 'REFUNDED'
    | 'PARTIALLY_REFUNDED'
    | 'DECLINED'
    | 'FAILED'
    | 'UNKNOWN'
    | 'ON_HOLD';

  store?: Transaction.Store;

  /**
   * When the transaction was last modified.
   */
  updated_at?: string;

  url?: Transaction.URL;

  /**
   * The full user agent string of the device the customer used to submit the
   * transaction
   */
  user_agent?: string;
}

export namespace Transaction {
  /**
   * Address
   */
  export interface BillingAddress {
    /**
     * Gaustadalleen 21
     */
    address_line?: string;

    /**
     * PB 123
     */
    address_line_2?: string;

    /**
     * Name of the company
     */
    business_name?: string;

    co_address?: string;

    /**
     * Comment about the address
     */
    comment?: string;

    /**
     * For companies that needs to specify a cost center.
     */
    cost_center?: string;

    /**
     * Country of the location
     */
    country?: string;

    /**
     * The customer's reference
     */
    customer_reference?: string;

    /**
     * The email address of a person or an organization
     */
    email?: string;

    first_name?: string;

    last_name?: string;

    latitude?: number;

    longitude?: number;

    /**
     * The organization number of the customer.
     */
    organization_number?: string;

    /**
     * Type indicating what kind of organization it is.
     */
    organization_type?: string;

    /**
     * mobile number of a person / company, ITU/E.123 format with international prefix
     * (+PPNNNNNNNNN...)
     */
    phone_number?: string;

    /**
     * The zip code / postal code of the address.
     */
    postal_code?: string;

    /**
     * The name of the postal code
     */
    postal_place?: string;
  }

  export interface Card {
    /**
     * The System Trace Audit Number assigned by the acquirer to uniquely identify the
     * transaction.
     */
    acquirer_stan?: string;

    /**
     * The ID of the acquirer terminal.
     */
    acquirer_terminal_id?: string;

    /**
     * The ISO-8601 date and time of the acquirer transaction.
     */
    acquirer_transaction_time?: string;

    /**
     * 3DSECURE or SSL. Indicates the transaction type of the acquirer.
     */
    acquirer_transaction_type?: '3DSECURE' | 'SSL';

    /**
     * Y, A, U or N. Indicates the status of the authentication.
     */
    authentication_status?: 'Y' | 'A' | 'U' | 'N';

    /**
     * Visa, MasterCard, etc. The brand of the card.
     */
    brand?: string;

    /**
     * The country the card is issued in
     */
    country?: string;

    eci?: string;

    expiry_date?: string;

    /**
     * The name of the bank that issued the card used
     */
    issuing_bank?: string;

    masked_pan?: string;

    payment_system_type?: string;

    /**
     * The payment token generated by the authorization. Only available for
     * transactions created from session where the generate_payment_token option is
     * enabled in the payex session configuration or from payment token sessions
     * created with payex configured
     *
     * - [POST /v1/sessions-payment-token](#operation/checkout_payment_token_session_post)
     */
    payment_token?: string;

    /**
     * The id of the payment_token, only included in transaction where a payment_token
     * was generated.
     */
    payment_token_id?: string;

    /**
     * The payment token generated by the authorization. Only available for
     * transactions created from session where the generate_recurrence_token option is
     * enabled in the payex session configuration or from payment token sessions
     * created with payex configured
     *
     * - [POST /v1/sessions-payment-token](#operation/checkout_payment_token_session_post)
     */
    recurrence_token?: string;

    /**
     * The id of the recurrence_token, only included in transaction where a
     * recurrence_token was generated.
     */
    recurrence_token_id?: string;

    region?: 'domestic' | 'eea' | 'inter';

    three_ds_server_trans_id?: string;

    three_ds_version?: string;

    /**
     * Credit or Debit. Indicates the type of card used
     */
    type?: 'Credit Card' | 'Debit Card' | 'Credit' | 'Debit';
  }

  export interface Checkbox {
    /**
     * ID to assign to the checkbox so you can reference it later
     */
    id: string;

    /**
     * Label that should be visible next to the checkbox
     */
    label: string;

    /**
     * If the checkbox should be checked by default or not
     */
    checked?: boolean;

    link?: Checkbox.Link;

    /**
     * If the checkbox should be required or not
     */
    required?: boolean;
  }

  export namespace Checkbox {
    export interface Link {
      /**
       * Link text
       */
      text: string;

      /**
       * Link URL
       */
      url: string;
    }
  }

  export interface Customer {
    /**
     * Customer id
     */
    customer_id?: string;

    /**
     * Customer email address
     */
    email?: string;

    /**
     * Options for myDintero
     */
    my_dintero?: Customer.MyDintero;

    /**
     * Customer phone number, ITU/E.123 format with international prefix
     * (+PPNNNNNNNNN...)
     */
    phone_number?: string;
  }

  export namespace Customer {
    /**
     * Options for myDintero
     */
    export interface MyDintero {
      /**
       * Actions to perform on the customer
       */
      actions: Array<'create_user'>;

      /**
       * Terms and conditions accepted
       */
      terms: MyDintero.Terms;
    }

    export namespace MyDintero {
      /**
       * Terms and conditions accepted
       */
      export interface Terms {
        /**
         * id of the myDintero terms and conditions
         */
        id: string;

        /**
         * Url to the terms and conditions accepted by the customer
         */
        url: string;
      }
    }
  }

  export interface Event {
    id?: string;

    /**
     * Amount captured or refunded
     */
    amount?: number;

    /**
     * Best-effort calculation of the VAT amount in this transaction
     */
    calculated_vat_amount?: number;

    /**
     * Correction of the transaction status and event after a failed operation
     */
    correction?: Event.Correction;

    /**
     * The event correlation to existing event. The property will be set if the event
     * is an CAPTURE or REFUND of correlated INITIATE_CAPTURE or INITIATE_REFUND event.
     */
    correlation_request_id?: string;

    created_at?: string;

    created_by?: string;

    /**
     * The event error is only used when the success is `false`.
     */
    error?: Event.Error;

    /**
     * the event type
     */
    event?:
      | 'INITIALIZE'
      | 'AUTHORIZE'
      | 'CAPTURE'
      | 'REFUND'
      | 'VOID'
      | 'INITIATE_REFUND'
      | 'INITIATE_VOID'
      | 'INITIATE_CAPTURE'
      | 'SETTLEMENT';

    /**
     * Reference for the transaction event provided by the merchant.
     *
     * - For captures, this is `capture_reference`
     * - For refunds, this is `refund_reference`
     *
     * When relevant, it will be visible on the Dintero settlement report.
     */
    event_reference?: string;

    /**
     * The gift cards that was used as part of this event
     */
    gift_cards?: Array<Event.GiftCard>;

    /**
     * The applicable event items
     */
    items?: Array<Event.Item>;

    metadata?: Event.Metadata;

    request_headers?: Event.RequestHeaders;

    request_id?: string;

    settlements?: Event.Settlements;

    /**
     * The event operation completed with success
     */
    success?: boolean;

    transaction_status?:
      | 'INITIATED'
      | 'AUTHORIZED'
      | 'AUTHORIZATION_VOIDED'
      | 'CAPTURED'
      | 'PARTIALLY_CAPTURED'
      | 'REFUNDED'
      | 'PARTIALLY_REFUNDED'
      | 'DECLINED'
      | 'FAILED'
      | 'UNKNOWN'
      | 'ON_HOLD';
  }

  export namespace Event {
    /**
     * Correction of the transaction status and event after a failed operation
     */
    export interface Correction {
      /**
       * Monetary amount in smallest unit for the currency
       */
      remaining_capture_amount: number;

      /**
       * Monetary amount in smallest unit for the currency
       */
      remaining_refund_amount: number;

      /**
       * Monetary amount in smallest unit for the currency
       */
      remaining_void_amount: number;

      /**
       * status the transaction was corrected to
       */
      status: string;

      /**
       * List of event ids added to correct the transaction status
       */
      event_ids?: Array<string>;
    }

    /**
     * The event error is only used when the success is `false`.
     */
    export interface Error {
      /**
       * The human readable description of the error/warning
       */
      message: string;

      type:
        | 'DO_NOT_RETRY'
        | 'MODIFICATIONS_REQUIRED'
        | 'DAILY_LIMIT_EXCEEDED'
        | 'MONTHLY_LIMIT_EXCEEDED'
        | 'REJECTED_BY_ACQUIRER_INVALID_AMOUNT'
        | 'REJECTED_BY_ACQUIRER_FORMAT_ERROR'
        | 'REJECTED_BY_ACQUIRER_POSSIBLE_FRAUD'
        | 'REJECTED_BY_ACQUIRER_CARD_STOLEN'
        | 'REJECTED_BY_ACQUIRER_CARD_EXPIRED'
        | 'REJECTED_BY_ACQUIRER'
        | 'REJECTED_BY_ACQUIRER_INSUFFICIENT_FUNDS'
        | 'ACQUIRER_HOST_OFFLINE'
        | 'UNKNOWN';

      /**
       * The code used to identify the error/warning
       */
      code?: string;

      /**
       * Result code received from Visa or Mastercard
       */
      result_code?: string;
    }

    export interface GiftCard {
      /**
       * Non-negative, minor units. Total amount for the gift card
       */
      amount: number;

      card_id: string;

      /**
       * The external transaction ID
       */
      transaction_id: string;

      type: 'dintero.wallets';

      masked_card_token?: string;
    }

    export interface Item {
      /**
       * The ID or SKU of the product on the line
       */
      id?: string;

      /**
       * The total monetary amount of the line item, including VAT and discounts.
       *
       * In smallest unit for the currency, e.g. cents
       */
      amount?: number;

      /**
       * A short, localized description of the line item
       */
      description?: string;

      /**
       * Metadata about discounts given
       */
      discount_lines?: Array<unknown>;

      /**
       * Details related to
       * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
       *
       * Some items require extra information to be provided when using Klarna as an
       * enabled payment option.
       */
      emd?: Item.Emd;

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      fee_split?: Item.FeeSplit;

      /**
       * The groups the product on the line belongs to
       */
      groups?: Array<Item.Group>;

      /**
       * the number of the line (or id), must be `unique` between all items. `required`
       * when Instabank payment is configured.
       */
      line_id?: string;

      /**
       * The quantity of the product in the item line.
       */
      quantity?: number;

      /**
       * An array of objects specifying how the amount should be split between sellers
       * when using Dintero Payout
       *
       * Specify an empty array if the splits will be provided during capture.
       * `auto_capture` cannot be enabled when splits are defined as empty array.
       */
      splits?: Array<Item.Split>;

      /**
       * URL to a thumbnail of the item. Will be displayed when redirecting to the
       * session.
       *
       * Recommended limitations for the image:
       *
       * - all images should preferrably have the same dimensions
       * - max file size should be less than 2MB
       */
      thumbnail_url?: string;

      /**
       * The type of order item this is.
       *
       * - **physical** - a physical item which must be delivered or handed over
       * - **digital** - a digital item which doesn't need shipping
       * - **service** - payment for services like maintenance performed in your home
       * - **gift_card** - usage of a gift card, where the amount is usually a negative
       *   number
       * - **shipping** - payment for shipping of the order
       * - **surcharge** - extra incurred costs, like taxes or necessary rounding
       */
      type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

      /**
       * The dimensional weight (also known as volumetric) value unit of one item.
       * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
       */
      unit_dimensional_weight?: number;

      /**
       * The volume of one item in m³ (cubic meters)
       */
      unit_volume?: number;

      /**
       * The volume of one item in kg (kilo grams)
       */
      unit_weight?: number;

      /**
       * The VAT percentage
       */
      vat?: number;

      /**
       * The VAT of the `amount` parameter. Only used for display purposes.
       *
       * In smallest unit for the currency, e.g. cents
       */
      vat_amount?: number;

      /**
       * The version where the item was added or last updated, see the events for the
       * source.
       */
      version?: number;
    }

    export namespace Item {
      /**
       * Details related to
       * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
       *
       * Some items require extra information to be provided when using Klarna as an
       * enabled payment option.
       */
      export interface Emd {
        /**
         * Only required if the item is related to an event or multiple events, like for
         * example tickets to a concert.
         *
         * If you are selling an event package as a single ticket or item that includes
         * multiple events, for example a festival, you need to provide information about
         * all the individual events that are part of the package.
         */
        event?: Array<Emd.Event>;

        /**
         * Only required if them item is related to a marketplace order.
         *
         * If that is the case, you need to provide information about both the seller and
         * the winner.
         */
        marketplace_order?: Emd.MarketplaceOrder;

        /**
         * Only required if the item is related to a subscription.
         *
         * If that is the case, you need to provide information about both the subscription
         * and the customer account.
         */
        subscription?: Emd.Subscription;

        /**
         * Only required if the item is part of a travel-related transaction.
         *
         * If that is the case, you need to provide information about the itinerary to be
         * booked.
         */
        travel?: Emd.Travel;
      }

      export namespace Emd {
        export interface Event {
          /**
           * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          end_time: string;

          /**
           * Name of the company arranging the event, e.g. "Happy Parties Ltd."
           */
          event_company: string;

          /**
           * Name of the event, e.g. "Fancy Singer"
           */
          event_name: string;

          /**
           * Category or type of venue, e.g. "Pop"
           */
          genre_of_event: string;

          /**
           * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          start_time: string;

          ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

          /**
           * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
           *
           * If email or phone, then use either the email address or the phone number
           * respectively.
           */
          ticket_delivery_recipient: string;

          /**
           * If tickets are digitally checked when entering the venue, e.g. true
           */
          access_controlled_venue?: boolean;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          arena_location?: Event.ArenaLocation;

          /**
           * Name of the venue, e.g. "Song Arena"
           */
          arena_name?: string;
        }

        export namespace Event {
          export interface ArenaLocation {
            /**
             * City that the venue is located in, e.g. "Oslo"
             */
            city: string;

            /**
             * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
             */
            country: string;

            /**
             * Postal code for the venue location, e.g. "0185"
             */
            postal_code?: string;

            /**
             * Street address representing the venue location, e.g. "Sonja Henies plass 2"
             */
            street_address?: string;
          }
        }

        /**
         * Only required if them item is related to a marketplace order.
         *
         * If that is the case, you need to provide information about both the seller and
         * the winner.
         */
        export interface MarketplaceOrder {
          /**
           * Details related to the seller involved in the marketplace order.
           */
          seller_info: MarketplaceOrder.SellerInfo;

          /**
           * Details related to the winner involved in the marketplace order.
           */
          winner_info: MarketplaceOrder.WinnerInfo;
        }

        export namespace MarketplaceOrder {
          /**
           * Details related to the seller involved in the marketplace order.
           */
          export interface SellerInfo {
            account_last_modified: SellerInfo.AccountLastModified;

            /**
             * Date and time that the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Number of trades the sub-merchant did in the last 12 months, e.g. 23
             */
            number_of_trades: number;

            /**
             * Name of the category to which the specific good belongs to, according to the
             * selling merchant's categorization, e.g. "Phones".
             */
            product_category: string;

            /**
             * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
             * Ltd."
             */
            sub_merchant_id: string;

            /**
             * Name of the good purchased.
             */
            product_name?: string;

            /**
             * Current rating of the good purchased according to the marketplace's rating
             * scale, e.g. 5
             */
            seller_rating?: number;

            /**
             * Details about the seller.
             */
            unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

            /**
             * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
             */
            volume_of_trades?: number;
          }

          export namespace SellerInfo {
            export interface AccountLastModified {
              /**
               * Date and time that the (physical) address was last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              address: string;

              /**
               * Date and time that the email was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              email: string;

              /**
               * Date and time that the listing details were last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              listing: string;

              /**
               * Date and time that the login details were last changed (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              login: string;

              /**
               * Date and time that the password was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              password: string;
            }

            /**
             * Details about the seller.
             */
            export interface UniqueAccountIdentifierSeller {
              /**
               * Seller's email address, e.g. "seller@mail.com"
               */
              email?: string;

              other?: string;

              /**
               * Seller's phone number, e.g. "97712123"
               */
              phone_number?: string;
            }
          }

          /**
           * Details related to the winner involved in the marketplace order.
           */
          export interface WinnerInfo {
            account_last_modified: WinnerInfo.AccountLastModified;

            /**
             * Date and time that the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Number of trades the winner did in the last 12 months, e.g. 23
             */
            number_of_trades: number;

            /**
             * Details about the winner.
             */
            unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

            /**
             * Volumes of trades the winner did in the last 12 months, e.g. 230
             */
            volume_of_trades?: number;
          }

          export namespace WinnerInfo {
            export interface AccountLastModified {
              /**
               * Date and time that the (physical) address was last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              address: string;

              /**
               * Date and time that the email was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              email: string;

              /**
               * Date and time that the listing details were last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              listing: string;

              /**
               * Date and time that the login details were last changed (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              login: string;

              /**
               * Date and time that the password was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              password: string;
            }

            /**
             * Details about the winner.
             */
            export interface UniqueAccountIdentifierWinner {
              /**
               * Winner's email address, e.g. "winner@mail.com"
               */
              email?: string;

              other?: string;

              /**
               * Winner's phone number, e.g. "97712123"
               */
              phone_number?: string;
            }
          }
        }

        /**
         * Only required if the item is related to a subscription.
         *
         * If that is the case, you need to provide information about both the subscription
         * and the customer account.
         */
        export interface Subscription {
          /**
           * Information related to the customer that wants to purchase the subscription.
           */
          customer_account_info: Subscription.CustomerAccountInfo;

          /**
           * Details related to the subscription.
           */
          subscription: Subscription.Subscription;
        }

        export namespace Subscription {
          /**
           * Information related to the customer that wants to purchase the subscription.
           */
          export interface CustomerAccountInfo {
            /**
             * The date and time the account was last modified (ISO 8601 format), e.g.
             * "2023-10-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_last_modified: string;

            /**
             * The date and time the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Unique name / number to identify the specific customer account. Max 24
             * characters, e.g. "Adam Adamsson"
             */
            unique_account_identifier: string;
          }

          /**
           * Details related to the subscription.
           */
          export interface Subscription {
            /**
             * Whether the subscription will be auto renewed upon expiry, e.g. true
             */
            auto_renewal_of_subscription: boolean;

            /**
             * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC
             */
            end_time: string;

            /**
             * The start time of the subscription (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC
             */
            start_time: string;

            /**
             * Name of the product on subscription, e.g. "Contact lenses"
             */
            subscription_name: string;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;
          }
        }

        /**
         * Only required if the item is part of a travel-related transaction.
         *
         * If that is the case, you need to provide information about the itinerary to be
         * booked.
         */
        export interface Travel {
          /**
           * Details about the reservation of airline tickets.
           */
          air_reservation_details?: Travel.AirReservationDetails;

          /**
           * Details about the reservation of bus tickets.
           */
          bus_reservation_details?: Travel.BusReservationDetails;

          /**
           * Details about the reservation of rental cars.
           */
          car_rental_reservation_details?: Travel.CarRentalReservationDetails;

          /**
           * Details about the reservation of ferry tickets.
           */
          ferry_reservation_details?: Travel.FerryReservationDetails;

          /**
           * Details about the reservation of hotel rooms.
           */
          hotel_reservation_details?: Travel.HotelReservationDetails;

          /**
           * Details about the reservation of train tickets.
           */
          train_reservation_details?: Travel.TrainReservationDetails;
        }

        export namespace Travel {
          /**
           * Details about the reservation of airline tickets.
           */
          export interface AirReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one flight from Oslo to Munich, and
             * another flight from Munich to Dubai, you need to provide one itinerary object
             * for each of these two flights, and so on.
             */
            itinerary: Array<AirReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<AirReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<AirReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace AirReservationDetails {
            export interface Itinerary {
              /**
               * IATA Airport Code (three letters), e.g. "MUC"
               */
              arrival: string;

              /**
               * IATA Airline standard (two letters or digits), e.g. "LH"
               */
              carrier: string;

              /**
               * IATA Airport Code (three letters), e.g. "OSL"
               */
              departure: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * City the flight arrives in, e.g. "Munich"
               */
              arrival_city?: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * City the flight departs from, e.g. "Oslo"
               */
              departure_city?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the flight in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of bus tickets.
           */
          export interface BusReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one bus journey from Oslo to Munich,
             * and another bus journey from Munich to Rome, you need to provide one itinerary
             * object for each of these two bus journeys, and so on.
             */
            itinerary: Array<BusReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<BusReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<BusReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace BusReservationDetails {
            export interface Itinerary {
              /**
               * City the bus arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Bus Travels Ltd."
               */
              carrier: string;

              /**
               * City the bus departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the bus journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of rental cars.
           */
          export interface CarRentalReservationDetails {
            /**
             * Driver data, one per driver.
             */
            drivers: Array<CarRentalReservationDetails.Driver>;

            /**
             * Car rental itinerary data, one per car rental.
             *
             * If you are selling a package that contains multiple car rentals, you need to
             * provide itinerary data for each of the individual rentals.
             */
            itinerary: Array<CarRentalReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<CarRentalReservationDetails.Insurance>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace CarRentalReservationDetails {
            export interface Driver {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }

            export interface Itinerary {
              /**
               * End time of the car rental reservation (ISO 8601 format), e.g.
               * "2023-08-20T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              end_time: string;

              /**
               * Name of the car rental company, e.g. "Premium Cars Ltd."
               */
              rental_company: string;

              /**
               * Start time of the car rental reservation (ISO 8601 format), e.g.
               * "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              start_time: string;

              /**
               * Price for the car rental reservation in smallest unit of local currency, e.g.
               * 500000
               */
              car_price?: number;

              /**
               * Travel class, e.g. "Premium Cars Premium Class"
               */
              class?: string;

              /**
               * Driver IDs.
               */
              drivers_id?: Array<number>;

              /**
               * Details related to the drop off location.
               */
              drop_off_location?: Itinerary.DropOffLocation;

              /**
               * Details related to the pick up location.
               */
              pick_up_location?: Itinerary.PickUpLocation;
            }

            export namespace Itinerary {
              /**
               * Details related to the drop off location.
               */
              export interface DropOffLocation {
                /**
                 * City where the car should be dropped off, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
                 * "NO"
                 */
                country: string;

                /**
                 * Postal code where the car should be dropped off, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }

              /**
               * Details related to the pick up location.
               */
              export interface PickUpLocation {
                /**
                 * City where the car should be picked up, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
                 * "NO",
                 */
                country: string;

                /**
                 * Postal code where the car should be picked up, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }
          }

          /**
           * Details about the reservation of ferry tickets.
           */
          export interface FerryReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
             * and another ferry journey from Kiel to Gothenburg, you need to provide one
             * itinerary object for each of these two ferry journeys, and so on.
             */
            itinerary: Array<FerryReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<FerryReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<FerryReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace FerryReservationDetails {
            export interface Itinerary {
              /**
               * City the ferry arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Ferry Travels Ltd."
               */
              carrier: string;

              /**
               * City the ferry departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the ferry journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of hotel rooms.
           */
          export interface HotelReservationDetails {
            /**
             * Hotel itinerary data, one per hotel stay.
             *
             * If you are selling a package that contains multiple hotel stays, you need to
             * provide itinerary data for each of the individual stays.
             */
            itinerary: Array<HotelReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<HotelReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<HotelReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace HotelReservationDetails {
            export interface Itinerary {
              /**
               * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              end_time: string;

              /**
               * Price for the hotel stay in smallest unit of local currency, e.g. 200000
               */
              hotel_price: number;

              /**
               * Number of rooms booked, e.g. 2
               */
              number_of_rooms: number;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id: Array<number>;

              /**
               * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              start_time: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Address details of the hotel.
               */
              address?: Itinerary.Address;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * Name of the hotel, e.g. "Premium Hotel"
               */
              hotel_name?: string;
            }

            export namespace Itinerary {
              /**
               * Address details of the hotel.
               */
              export interface Address {
                /**
                 * City the hotel is located in, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
                 */
                country: string;

                /**
                 * Postal code of the hotel, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address of the hotel, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of train tickets.
           */
          export interface TrainReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one train journey from Oslo to Munich,
             * and another train journey from Munich to Rome, you need to provide one itinerary
             * object for each of these two train journeys, and so on.
             */
            itinerary: Array<TrainReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<TrainReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<TrainReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace TrainReservationDetails {
            export interface Itinerary {
              /**
               * City the train arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Train Travels Ltd."
               */
              carrier: string;

              /**
               * City the train departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id: Array<number>;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * Price for that specific segment of the train journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }
        }
      }

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      export interface FeeSplit {
        type: 'proportional';

        /**
         * Seller ids that will be debited for the payment fees All destinations must be
         * included in the list of splits
         */
        destinations?: Array<string>;
      }

      export interface Group {
        /**
         * Group ID
         */
        id: string;

        /**
         * Group name
         */
        name?: string;
      }

      export interface Split {
        /**
         * The split amount in smalles unit for the currency, e.g. cents.
         */
        amount: number;

        /**
         * An id that identifies the seller
         */
        payout_destination_id: string;
      }
    }

    export interface Metadata {
      'bambora:meta:action:code'?: string;

      'bambora:meta:action:source'?: string;

      'bambora:meta:action:type'?: string;

      'bambora:transaction:status'?: string;

      'bambora:transactionoperation:id'?: string;

      /**
       * External request id
       */
      'collector:CorrelationId'?: string;

      /**
       * The invoice number of the invoice that this event belongs to.
       */
      'collector:Invoice.CurrentInvoiceNumber'?: string;

      /**
       * The due date of the invoice.
       */
      'collector:Invoice.DueDate'?: string;

      /**
       * External status reported after adding invoice and activating invoice
       */
      'collector:Invoice.InvoiceStatus'?: number;

      /**
       * The url to invoice in pdf format.
       */
      'collector:Invoice.InvoiceUrl'?: string;

      /**
       * The lowest amount to pay on the invoice.
       */
      'collector:Invoice.LowestAmountToPay'?: number;

      /**
       * The invoice number for the next capture.
       */
      'collector:Invoice.NewInvoiceNumber'?: string;

      /**
       * The payment identification number. This is the id the customer must use when
       * they do a payment of an invoice.
       */
      'collector:Invoice.PaymentReference'?: string;

      /**
       * The total amount to pay for the invoice.
       */
      'collector:Invoice.TotalAmount'?: number;

      /**
       * Reference to authorization operation upon void or capture
       */
      'dintero_psp:authorization_operation_ref'?: string;

      /**
       * Reference to capture operation upon refund
       */
      'dintero_psp:capture_operation_ref'?: string;

      /**
       * Unique reference of operation
       */
      'dintero_psp:operation_ref'?: string;

      /**
       * Reference to sale operation upon sale refund
       */
      'dintero_psp:sale_operation_ref'?: string;

      /**
       * External request id
       */
      'instabank:RequestId'?: string;

      /**
       * External status reported after the transaction event
       */
      'instabank:Sale.Status'?: string;

      /**
       * Authorization expiration date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
       */
      'klarna:authorization_expiration'?: string;

      /**
       * The reason an error occurred when trying to extend the authorization date.
       */
      'klarna:authorization_expiration_error_reason'?: string;

      /**
       * The reason for extending the authorization date.
       */
      'klarna:authorization_expiration_reason'?: string;

      /**
       * A reference specified by the merchant to identify the transaction.
       */
      'klarna:authorization_expiration_reference'?: string;

      /**
       * Id of the capture created in Klarna
       */
      'klarna:headers:capture_id'?: string;

      /**
       * The URI at which the capture or refund created in Klarna can be found
       */
      'klarna:headers:location'?: string;

      /**
       * Id of the refund created in Klarna
       */
      'klarna:headers:refund_id'?: string;

      /**
       * Internal reference sent to Klarna for the capture/refund. This will be included
       * in the settlement files.
       */
      'klarna:reference'?: string;

      'netaxept:bat_number'?: string;

      'netaxept:execution_time'?: string;

      'netaxept:operation'?: string;

      'netaxept:response_code'?: string;

      'netaxept:terminal_url'?: string;

      'netaxept:transaction_id'?: string;

      'payex:transaction:created'?: string;

      'payex:transaction:id'?: string;

      'payex:transaction:payee_reference'?: string;

      'payex:transaction:state'?: string;

      'payex:transaction:type'?: string;

      /**
       * ID of the application provided by Santander
       */
      'santander:debit_account.ApplicationNumber'?: string;

      /**
       * Status code from Santander
       */
      'santander:debit_account.StatusCode'?: string;

      'swish:amount'?: string;

      'swish:dateCreated'?: string;

      'swish:datePaid'?: string;

      'swish:errorCode'?: string;

      'swish:errorMessage'?: string;

      'swish:id'?: string;

      'swish:originalPaymentReference'?: string;

      'swish:payment_request:get_payment_url'?: string;

      'swish:paymentReference'?: string;

      'swish:status'?: string;

      'vipps:transaction.transactionText'?: string;

      'vipps:transactionInfo.status'?: 'INITIATE' | 'RESERVE' | 'CANCEL' | 'CAPTURE' | 'VOID';

      'vipps:transactionInfo.timeStamp'?: string;

      'vipps:transactionInfo.transactionId'?: string;
    }

    export interface RequestHeaders {
      /**
       * The instance of the checkout that performed the request
       */
      'dintero-checkout-instance-id'?: string;

      /**
       * The name of the ecommerce solution
       */
      'dintero-system-name'?: string;

      /**
       * The name of the ecommerce plugin
       */
      'dintero-system-plugin-name'?: string;

      /**
       * The version number of the ecommerce plugin
       */
      'dintero-system-plugin-version'?: string;

      /**
       * The version number of the ecommerce solution
       */
      'dintero-system-version'?: string;

      /**
       * The user-agent that performed the request
       */
      'user-agent'?: string;
    }

    export interface Settlements {
      /**
       * One item per payout to the merchants bank account
       */
      events: Array<Settlements.Event>;

      settlement_status?: 'NOT_SETTLED' | 'PENDING_SETTLEMENT' | 'PARTIALLY_SETTLED' | 'SETTLED';
    }

    export namespace Settlements {
      export interface Event {
        /**
         * The amount paid out in this settlement
         */
        amount: number;

        /**
         * The providers reference for the settlement
         */
        provider_reference: string;

        /**
         * Id of the settlement this was paid in
         */
        settlement_id: string;

        /**
         * Amount captured in this settlement
         */
        capture?: number;

        /**
         * Id for matching to transaction event
         */
        event_correlation_id?: string;

        /**
         * Fee of the capture in this settlement
         */
        fee?: number;

        /**
         * Amount refunded in this settlement
         */
        refund?: number;
      }
    }
  }

  export interface GiftCard {
    /**
     * Non-negative, minor units. Total amount for the gift card
     */
    amount: number;

    card_id: string;

    type: 'dintero.wallets';

    masked_card_token?: string;
  }

  export interface InitiatingSystemRequestHeaders {
    /**
     * The name of the ecommerce solution
     */
    'dintero-system-name'?: string;

    /**
     * The name of the ecommerce plugin
     */
    'dintero-system-plugin-name'?: string;

    /**
     * The version number of the ecommerce plugin
     */
    'dintero-system-plugin-version'?: string;

    /**
     * The version number of the ecommerce solution
     */
    'dintero-system-version'?: string;

    /**
     * The user-agent that performed the request
     */
    'user-agent'?: string;
  }

  export interface Item {
    /**
     * The ID or SKU of the product on the line
     */
    id?: string;

    /**
     * The total monetary amount of the line item, including VAT and discounts.
     *
     * In smallest unit for the currency, e.g. cents
     */
    amount?: number;

    /**
     * A short, localized description of the line item
     */
    description?: string;

    discount_lines?: Array<Item.DiscountLine>;

    /**
     * The item is eligible for discount
     */
    eligible_for_discount?: boolean;

    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    emd?: Item.Emd;

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    fee_split?: Item.FeeSplit;

    /**
     * The origin item amount before any discount
     */
    gross_amount?: number;

    /**
     * The groups the product on the line belongs to
     */
    groups?: Array<Item.Group>;

    /**
     * Discount applied to amount
     */
    is_changed?: boolean;

    /**
     * the number of the line (or id), must be `unique` between all items. `required`
     * when Instabank payment is configured.
     */
    line_id?: string;

    /**
     * The quantity of the product in the item line.
     */
    quantity?: number;

    /**
     * An array of objects specifying how the amount should be split between sellers
     * when using Dintero Payout
     *
     * Specify an empty array if the splits will be provided during capture.
     * `auto_capture` cannot be enabled when splits are defined as empty array.
     */
    splits?: Array<Item.Split>;

    /**
     * URL to a thumbnail of the item. Will be displayed when redirecting to the
     * session.
     *
     * Recommended limitations for the image:
     *
     * - all images should preferrably have the same dimensions
     * - max file size should be less than 2MB
     */
    thumbnail_url?: string;

    /**
     * The type of order item this is.
     *
     * - **physical** - a physical item which must be delivered or handed over
     * - **digital** - a digital item which doesn't need shipping
     * - **service** - payment for services like maintenance performed in your home
     * - **gift_card** - usage of a gift card, where the amount is usually a negative
     *   number
     * - **shipping** - payment for shipping of the order
     * - **surcharge** - extra incurred costs, like taxes or necessary rounding
     */
    type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

    /**
     * The dimensional weight (also known as volumetric) value unit of one item.
     * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
     */
    unit_dimensional_weight?: number;

    /**
     * The volume of one item in m³ (cubic meters)
     */
    unit_volume?: number;

    /**
     * The volume of one item in kg (kilo grams)
     */
    unit_weight?: number;

    /**
     * The VAT percentage
     */
    vat?: number;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     *
     * In smallest unit for the currency, e.g. cents
     */
    vat_amount?: number;

    /**
     * The version where the item was added or last updated, see the events for the
     * source.
     */
    version?: number;
  }

  export namespace Item {
    export interface DiscountLine {
      /**
       * Monetary amount in smallest unit for the currency
       */
      amount?: number;

      description?: string;

      discount_id?: string;

      discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

      line_id?: number;

      /**
       * Optional, set if the amount given was from a percentage discount
       */
      percentage?: number;
    }

    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    export interface Emd {
      /**
       * Only required if the item is related to an event or multiple events, like for
       * example tickets to a concert.
       *
       * If you are selling an event package as a single ticket or item that includes
       * multiple events, for example a festival, you need to provide information about
       * all the individual events that are part of the package.
       */
      event?: Array<Emd.Event>;

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      marketplace_order?: Emd.MarketplaceOrder;

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      subscription?: Emd.Subscription;

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      travel?: Emd.Travel;
    }

    export namespace Emd {
      export interface Event {
        /**
         * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        end_time: string;

        /**
         * Name of the company arranging the event, e.g. "Happy Parties Ltd."
         */
        event_company: string;

        /**
         * Name of the event, e.g. "Fancy Singer"
         */
        event_name: string;

        /**
         * Category or type of venue, e.g. "Pop"
         */
        genre_of_event: string;

        /**
         * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        start_time: string;

        ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

        /**
         * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
         *
         * If email or phone, then use either the email address or the phone number
         * respectively.
         */
        ticket_delivery_recipient: string;

        /**
         * If tickets are digitally checked when entering the venue, e.g. true
         */
        access_controlled_venue?: boolean;

        /**
         * Name of the affiliate that originated the purchase.
         */
        affiliate_name?: string;

        arena_location?: Event.ArenaLocation;

        /**
         * Name of the venue, e.g. "Song Arena"
         */
        arena_name?: string;
      }

      export namespace Event {
        export interface ArenaLocation {
          /**
           * City that the venue is located in, e.g. "Oslo"
           */
          city: string;

          /**
           * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
           */
          country: string;

          /**
           * Postal code for the venue location, e.g. "0185"
           */
          postal_code?: string;

          /**
           * Street address representing the venue location, e.g. "Sonja Henies plass 2"
           */
          street_address?: string;
        }
      }

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      export interface MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        seller_info: MarketplaceOrder.SellerInfo;

        /**
         * Details related to the winner involved in the marketplace order.
         */
        winner_info: MarketplaceOrder.WinnerInfo;
      }

      export namespace MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        export interface SellerInfo {
          account_last_modified: SellerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the sub-merchant did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Name of the category to which the specific good belongs to, according to the
           * selling merchant's categorization, e.g. "Phones".
           */
          product_category: string;

          /**
           * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
           * Ltd."
           */
          sub_merchant_id: string;

          /**
           * Name of the good purchased.
           */
          product_name?: string;

          /**
           * Current rating of the good purchased according to the marketplace's rating
           * scale, e.g. 5
           */
          seller_rating?: number;

          /**
           * Details about the seller.
           */
          unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

          /**
           * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace SellerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the seller.
           */
          export interface UniqueAccountIdentifierSeller {
            /**
             * Seller's email address, e.g. "seller@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Seller's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }

        /**
         * Details related to the winner involved in the marketplace order.
         */
        export interface WinnerInfo {
          account_last_modified: WinnerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the winner did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Details about the winner.
           */
          unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

          /**
           * Volumes of trades the winner did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace WinnerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the winner.
           */
          export interface UniqueAccountIdentifierWinner {
            /**
             * Winner's email address, e.g. "winner@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Winner's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }
      }

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      export interface Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        customer_account_info: Subscription.CustomerAccountInfo;

        /**
         * Details related to the subscription.
         */
        subscription: Subscription.Subscription;
      }

      export namespace Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        export interface CustomerAccountInfo {
          /**
           * The date and time the account was last modified (ISO 8601 format), e.g.
           * "2023-10-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_last_modified: string;

          /**
           * The date and time the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Unique name / number to identify the specific customer account. Max 24
           * characters, e.g. "Adam Adamsson"
           */
          unique_account_identifier: string;
        }

        /**
         * Details related to the subscription.
         */
        export interface Subscription {
          /**
           * Whether the subscription will be auto renewed upon expiry, e.g. true
           */
          auto_renewal_of_subscription: boolean;

          /**
           * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          end_time: string;

          /**
           * The start time of the subscription (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          start_time: string;

          /**
           * Name of the product on subscription, e.g. "Contact lenses"
           */
          subscription_name: string;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;
        }
      }

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      export interface Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        air_reservation_details?: Travel.AirReservationDetails;

        /**
         * Details about the reservation of bus tickets.
         */
        bus_reservation_details?: Travel.BusReservationDetails;

        /**
         * Details about the reservation of rental cars.
         */
        car_rental_reservation_details?: Travel.CarRentalReservationDetails;

        /**
         * Details about the reservation of ferry tickets.
         */
        ferry_reservation_details?: Travel.FerryReservationDetails;

        /**
         * Details about the reservation of hotel rooms.
         */
        hotel_reservation_details?: Travel.HotelReservationDetails;

        /**
         * Details about the reservation of train tickets.
         */
        train_reservation_details?: Travel.TrainReservationDetails;
      }

      export namespace Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        export interface AirReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one flight from Oslo to Munich, and
           * another flight from Munich to Dubai, you need to provide one itinerary object
           * for each of these two flights, and so on.
           */
          itinerary: Array<AirReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<AirReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<AirReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace AirReservationDetails {
          export interface Itinerary {
            /**
             * IATA Airport Code (three letters), e.g. "MUC"
             */
            arrival: string;

            /**
             * IATA Airline standard (two letters or digits), e.g. "LH"
             */
            carrier: string;

            /**
             * IATA Airport Code (three letters), e.g. "OSL"
             */
            departure: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * City the flight arrives in, e.g. "Munich"
             */
            arrival_city?: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * City the flight departs from, e.g. "Oslo"
             */
            departure_city?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the flight in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of bus tickets.
         */
        export interface BusReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one bus journey from Oslo to Munich,
           * and another bus journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two bus journeys, and so on.
           */
          itinerary: Array<BusReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<BusReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<BusReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace BusReservationDetails {
          export interface Itinerary {
            /**
             * City the bus arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Bus Travels Ltd."
             */
            carrier: string;

            /**
             * City the bus departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the bus journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of rental cars.
         */
        export interface CarRentalReservationDetails {
          /**
           * Driver data, one per driver.
           */
          drivers: Array<CarRentalReservationDetails.Driver>;

          /**
           * Car rental itinerary data, one per car rental.
           *
           * If you are selling a package that contains multiple car rentals, you need to
           * provide itinerary data for each of the individual rentals.
           */
          itinerary: Array<CarRentalReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<CarRentalReservationDetails.Insurance>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace CarRentalReservationDetails {
          export interface Driver {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }

          export interface Itinerary {
            /**
             * End time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Name of the car rental company, e.g. "Premium Cars Ltd."
             */
            rental_company: string;

            /**
             * Start time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            /**
             * Price for the car rental reservation in smallest unit of local currency, e.g.
             * 500000
             */
            car_price?: number;

            /**
             * Travel class, e.g. "Premium Cars Premium Class"
             */
            class?: string;

            /**
             * Driver IDs.
             */
            drivers_id?: Array<number>;

            /**
             * Details related to the drop off location.
             */
            drop_off_location?: Itinerary.DropOffLocation;

            /**
             * Details related to the pick up location.
             */
            pick_up_location?: Itinerary.PickUpLocation;
          }

          export namespace Itinerary {
            /**
             * Details related to the drop off location.
             */
            export interface DropOffLocation {
              /**
               * City where the car should be dropped off, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
               * "NO"
               */
              country: string;

              /**
               * Postal code where the car should be dropped off, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }

            /**
             * Details related to the pick up location.
             */
            export interface PickUpLocation {
              /**
               * City where the car should be picked up, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
               * "NO",
               */
              country: string;

              /**
               * Postal code where the car should be picked up, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }
        }

        /**
         * Details about the reservation of ferry tickets.
         */
        export interface FerryReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
           * and another ferry journey from Kiel to Gothenburg, you need to provide one
           * itinerary object for each of these two ferry journeys, and so on.
           */
          itinerary: Array<FerryReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<FerryReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<FerryReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace FerryReservationDetails {
          export interface Itinerary {
            /**
             * City the ferry arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Ferry Travels Ltd."
             */
            carrier: string;

            /**
             * City the ferry departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the ferry journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of hotel rooms.
         */
        export interface HotelReservationDetails {
          /**
           * Hotel itinerary data, one per hotel stay.
           *
           * If you are selling a package that contains multiple hotel stays, you need to
           * provide itinerary data for each of the individual stays.
           */
          itinerary: Array<HotelReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<HotelReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<HotelReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace HotelReservationDetails {
          export interface Itinerary {
            /**
             * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Price for the hotel stay in smallest unit of local currency, e.g. 200000
             */
            hotel_price: number;

            /**
             * Number of rooms booked, e.g. 2
             */
            number_of_rooms: number;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            /**
             * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Address details of the hotel.
             */
            address?: Itinerary.Address;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Name of the hotel, e.g. "Premium Hotel"
             */
            hotel_name?: string;
          }

          export namespace Itinerary {
            /**
             * Address details of the hotel.
             */
            export interface Address {
              /**
               * City the hotel is located in, e.g. "Oslo"
               */
              city: string;

              /**
               * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
               */
              country: string;

              /**
               * Postal code of the hotel, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address of the hotel, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of train tickets.
         */
        export interface TrainReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one train journey from Oslo to Munich,
           * and another train journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two train journeys, and so on.
           */
          itinerary: Array<TrainReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<TrainReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<TrainReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace TrainReservationDetails {
          export interface Itinerary {
            /**
             * City the train arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Train Travels Ltd."
             */
            carrier: string;

            /**
             * City the train departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Price for that specific segment of the train journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }
      }
    }

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    export interface FeeSplit {
      type: 'proportional';

      /**
       * Seller ids that will be debited for the payment fees All destinations must be
       * included in the list of splits
       */
      destinations?: Array<string>;
    }

    export interface Group {
      /**
       * Group ID
       */
      id: string;

      /**
       * Group name
       */
      name?: string;
    }

    export interface Split {
      /**
       * The split amount in smalles unit for the currency, e.g. cents.
       */
      amount: number;

      /**
       * An id that identifies the seller
       */
      payout_destination_id: string;
    }
  }

  export interface Metadata {
    'bambora:acquirer'?: string;

    'bambora:merchant_number'?: string;

    'bambora:reference'?: string;

    'bambora:transaction_id'?: string;

    'bambora:wallet'?: string;

    /**
     * The country of the payment
     */
    'collector:Invoice.CountryCode'?: string;

    /**
     * The invoice number of the invoice.
     */
    'collector:Invoice.InvoiceNumber'?: string;

    'collector:Invoice.InvoiceType'?: string;

    /**
     * Corresponds to the Dintero session ID
     */
    'collector:Invoice.OrderNumber'?: string;

    'collector:Invoice.ProductCode'?: string;

    /**
     * The SettlementReference used for the payment.
     */
    'collector:Invoice.SettlementReference'?: string;

    /**
     * The Collector Store ID of the payment
     */
    'collector:StoreId'?: string;

    /**
     * Order Id in Klarna
     */
    'gateway:id'?: string;

    /**
     * External reference for the transaction
     */
    'instabank:Sale.ExternalReference'?: string;

    /**
     * Payment product name
     */
    'instabank:Sale.Product.Name'?: string;

    /**
     * External case sequence (id)
     */
    'instabank:Sale.Sequence'?: number;

    /**
     * Fraud status for order
     */
    'klarna:authorized_payment_method:fraud_status'?: 'ACCEPTED' | 'PENDING';

    'klarna:authorized_payment_method:number_of_days'?: string;

    'klarna:authorized_payment_method:number_of_installments'?: string;

    'klarna:authorized_payment_method:type'?:
      | 'invoice'
      | 'fixed_amount'
      | 'base_account'
      | 'direct_debit'
      | 'direct_bank_transfer'
      | 'b2b_invoice'
      | 'card'
      | 'slice_it_by_card'
      | 'pay_later_by_card'
      | 'pay_by_card'
      | 'fixed_sum_credit';

    merchant_name?: string;

    'netaxept:merchant_id'?: string;

    'netaxept:transaction_id'?: string;

    'payex:payment:created'?: string;

    'payex:payment:id'?: string;

    'payex:payment:operation'?: string;

    'payex:payment:payee_info:payee_id'?: string;

    'payex:payment:payee_info:payee_name'?: string;

    'payex:payment:payee_info:subsite'?: string;

    /**
     * How settlement payout will be done by Dintero
     *
     * - `payout_account`: Payout directly to merchant
     * - `payout_splits`: Payout is splitted to one or more sellers
     * - `payout_destination_id`: Payout is done to a single seller
     */
    payout?: 'payout_account' | 'payout_splits' | 'payout_destination_id';

    /**
     * Id that will be referenced on the settlement report
     */
    payout_correlation_id?: string;

    /**
     * ID of the application provided by Santander
     */
    'santander:debit_account.ApplicationNumber'?: string;

    /**
     * Status code from Santander
     */
    'santander:debit_account.StatusCode'?: string;

    /**
     * Profile Id used when session was created
     */
    'session:profile_id'?: string;

    /**
     * Payment request id
     */
    'swish:id'?: string;

    'swish:payment_request:id'?: string;

    /**
     * Capture payment reference from bank
     */
    'swish:paymentReference'?: string;

    'swish:swish_number'?: string;

    /**
     * Unique id for this merchant's sales channel: website, mobile app etc. Short
     * name: MSN.
     */
    'vipps:merchantInfo.merchantSerialNumber'?: string;

    'vipps:merchantInfo.paymentType'?: 'eComm Regular Payment';

    'vipps:transaction.orderId'?: string;

    'vipps:transaction.transactionText'?: string;
  }

  /**
   * Address
   */
  export interface ShippingAddress {
    /**
     * Gaustadalleen 21
     */
    address_line?: string;

    /**
     * PB 123
     */
    address_line_2?: string;

    /**
     * Name of the company
     */
    business_name?: string;

    co_address?: string;

    /**
     * Comment about the address
     */
    comment?: string;

    /**
     * For companies that needs to specify a cost center.
     */
    cost_center?: string;

    /**
     * Country of the location
     */
    country?: string;

    /**
     * The customer's reference
     */
    customer_reference?: string;

    /**
     * The email address of a person or an organization
     */
    email?: string;

    first_name?: string;

    last_name?: string;

    latitude?: number;

    longitude?: number;

    /**
     * The organization number of the customer.
     */
    organization_number?: string;

    /**
     * Type indicating what kind of organization it is.
     */
    organization_type?: string;

    /**
     * mobile number of a person / company, ITU/E.123 format with international prefix
     * (+PPNNNNNNNNN...)
     */
    phone_number?: string;

    /**
     * The zip code / postal code of the address.
     */
    postal_code?: string;

    /**
     * The name of the postal code
     */
    postal_place?: string;
  }

  export interface ShippingOption {
    /**
     * Id of this shipping option product.
     *
     * The express checkout will group all products with the same id. Used for grouping
     * delivery to the same address at different time slots, or for grouping deliveries
     * to different pick up points.
     */
    id: string;

    /**
     * The monetary amount of the shipping option, including VAT and discounts.
     *
     * In smallest unit for the currency, e.g. cents
     */
    amount: number;

    /**
     * Unique id of the specific configuration of this shipping product
     */
    line_id: string;

    /**
     * Name of company that provides shipping service
     */
    operator: string;

    /**
     * A shipping option title. Eg. "Standard"
     */
    title: string;

    /**
     * Countries where this shipping option can be used
     */
    countries?: Array<string>;

    delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

    /**
     * A short description of the shipping option product
     */
    description?: string;

    /**
     * Environmental data about the shipping option
     */
    environmental_data?: ShippingOption.EnvironmentalData;

    /**
     * Estimated time of arrival
     */
    eta?: ShippingOption.Eta;

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    fee_split?: ShippingOption.FeeSplit;

    /**
     * Additional metadata about the shipping_option
     */
    metadata?: unknown;

    /**
     * The operators own id for this shipping product
     */
    operator_product_id?: string;

    pick_up_address?: ShippingOption.PickUpAddress;

    /**
     * An array of objects specifying how the amount should be split between sellers
     * when using Dintero Payout
     *
     * Specify an empty array if the splits will be provided during capture.
     * `auto_capture` cannot be enabled when splits are defined as empty array.
     */
    splits?: Array<ShippingOption.Split>;

    /**
     * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
     * the session. Recommended limitations for the image:
     *
     * - all images should preferrably have the same dimensions
     * - max file size should be less than 2MB
     */
    thumbnail_url?: string;

    /**
     * A specified time for delivery to customer
     */
    time_slot?: ShippingOption.TimeSlot;

    /**
     * The VAT percentage
     */
    vat?: number;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     */
    vat_amount?: number;
  }

  export namespace ShippingOption {
    /**
     * Environmental data about the shipping option
     */
    export interface EnvironmentalData {
      /**
       * A short description of the environmental data, something like
       *
       * - "Fossil free",
       * - "Carbon neutral"
       * - "Low emissions"
       * - "Renewable Energy Sourced"
       * - "Eco-certified Fleet"
       */
      description: string;

      details?: Array<EnvironmentalData.Detail>;
    }

    export namespace EnvironmentalData {
      export interface Detail {
        /**
         * Give context to the value field. Example:
         *
         * - "CO2 emissions"
         * - "Energy consumption"
         * - "Carbon footprint"
         * - "Carbon offset"
         * - "Trees planted"
         * - "Renewable energy percentage"
         */
        label: string;

        value: string;
      }
    }

    /**
     * Estimated time of arrival
     */
    export interface Eta {
      ends_at?: string;

      starts_at?: string;
    }

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    export interface FeeSplit {
      type: 'proportional';

      /**
       * Seller ids that will be debited for the payment fees All destinations must be
       * included in the list of splits
       */
      destinations?: Array<string>;
    }

    export interface PickUpAddress {
      /**
       * Gaustadalleen 21
       */
      address_line?: string;

      /**
       * PB 123
       */
      address_line_2?: string;

      /**
       * Name of the company
       */
      business_name?: string;

      co_address?: string;

      /**
       * Comment about the address
       */
      comment?: string;

      /**
       * For companies that needs to specify a cost center.
       */
      cost_center?: string;

      /**
       * Country of the location
       */
      country?: string;

      /**
       * The customer's reference
       */
      customer_reference?: string;

      /**
       * Distance in kilometers from the shipping_address.
       */
      distance?: number;

      /**
       * The email address of a person or an organization
       */
      email?: string;

      first_name?: string;

      last_name?: string;

      latitude?: number;

      longitude?: number;

      /**
       * The organization number of the customer.
       */
      organization_number?: string;

      /**
       * Type indicating what kind of organization it is.
       */
      organization_type?: string;

      /**
       * mobile number of a person / company, ITU/E.123 format with international prefix
       * (+PPNNNNNNNNN...)
       */
      phone_number?: string;

      /**
       * The zip code / postal code of the address.
       */
      postal_code?: string;

      /**
       * The name of the postal code
       */
      postal_place?: string;
    }

    export interface Split {
      /**
       * The split amount in smalles unit for the currency, e.g. cents.
       */
      amount: number;

      /**
       * An id that identifies the seller
       */
      payout_destination_id: string;
    }

    /**
     * A specified time for delivery to customer
     */
    export interface TimeSlot {
      ends_at?: string;

      starts_at?: string;
    }
  }

  export interface Store {
    id: string;

    address?: Store.Address;

    /**
     * Merchant number associated with the stores payment terminal
     */
    bax?: string;

    /**
     * Official name of the person or entity that owns the store.
     */
    business_name?: string;

    chain?: string;

    email?: string;

    gln?: string;

    /**
     * A four-digit Merchant Category Code (MCC) for the store
     * [ISO 18245:2003](https://www.iso.org/standard/33365.html)
     */
    mcc?: string;

    /**
     * name of the store, aka trade name of the store
     */
    name?: string;

    organization_number?: string;

    phone_number?: string;

    /**
     * Id to a specific point-of-sale (POS) terminal or workstation
     */
    terminal_id?: string;
  }

  export namespace Store {
    export interface Address {
      address_line: string;

      /**
       * ISO 3166-1 country code
       */
      country: string;

      postal_place: string;

      address_line_2?: string;

      postal_code?: string;
    }
  }

  export interface URL {
    /**
     * URL the customer is redirected to for authentication.
     */
    approval_url?: string;

    /**
     * URL that Checkout will call when the session payment is complete and the
     * transaction has been authorized
     */
    callback_url?: string;

    /**
     * URL the customer is redirected after checkout completes (successfully or failed)
     */
    redirect_url?: string;
  }
}

export type TransactionListResponse = Array<Transaction>;

export interface TransactionRetrieveParams {
  /**
   * Include aditional data that are by default excluded from the transaction
   * details.
   *
   * - **`card.payment_token`**: Include the payment_token generated from the
   *   transaction. Only available for transaction with a session that enabled
   *   generate_payment_token.
   * - **`card.recurrence_token`**: Include the recurrence generated from the
   *   transaction. Only available for transaction with a session that enabled
   *   generate_recurrence_token.
   * - **`session`** Include the session that the transaction resulted from
   * - **`events.request_headers`** Include the event headers stored for each event
   * - **`initiating_system_request_headers`** Include the request headers from the
   *   initating system
   */
  includes?: Array<
    | 'card.payment_token'
    | 'card.recurrence_token'
    | 'session'
    | 'events.request_headers'
    | 'initiating_system_request_headers'
  >;
}

export interface TransactionUpdateParams {
  /**
   * A reference specified by the merchant to identify the transaction, can be
   * updated after the transaction has been created
   */
  merchant_reference_2?: string;
}

export interface TransactionListParams {
  /**
   * List of ids that should be included in the result. ?id=A&id=B&id=X
   */
  id?: Array<string>;

  amount?: TransactionListParams.Amount;

  captured_at?: TransactionListParams.CapturedAt;

  /**
   * The card brand for the payment
   */
  card_brand?: Array<string>;

  created_at?: TransactionListParams.CreatedAt;

  /**
   * The currency of the transaction. ?currency=NOK&currency=SEK.
   */
  currency?: Array<string>;

  /**
   * Filter transactions on the `customer.customer_id`.
   */
  customer_id?: string;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100 items, and the default is 10 items.
   */
  limit?: number;

  /**
   * The merchant reference used
   */
  merchant_reference?: string;

  /**
   * The second merchant reference on the transaction
   */
  merchant_reference_2?: string;

  /**
   * Filter on `payment_operation`
   */
  payment_operation?: string;

  /**
   * The type of payment product used
   */
  payment_product?: Array<string>;

  /**
   * The payment product type
   */
  payment_product_type?: Array<string>;

  /**
   * Filter by the `payout_correlation_id`. Different format between payment
   * providers. ?payout_correlation_id=A,B
   */
  payout_correlation_id?: Array<string>;

  refunded_at?: TransactionListParams.RefundedAt;

  /**
   * Will try to match the search to either transaction_id, session_id or
   * merchant_reference, merchant_reference_2, phone_number, email or the customer
   * name using the format `{first_name} {last_name}`.
   */
  search?: string;

  /**
   * The session id(s) associated with the transactions.
   * ?session_id=A&session_id=B&session_id=X.
   */
  session_id?: Array<string>;

  /**
   * cursor for use in pagination. starting_after is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, ending with `obj_foo`, your subsequent call can include
   * `starting_after=obj_foo` in order to fetch the next page of the list.
   */
  starting_after?: string;

  /**
   * The status of the transaction.
   */
  status?: Array<
    | 'AUTHORIZATION_VOIDED'
    | 'AUTHORIZED'
    | 'CAPTURED'
    | 'DECLINED'
    | 'FAILED'
    | 'INITIATED'
    | 'ON_HOLD'
    | 'PARTIALLY_CAPTURED'
    | 'PARTIALLY_REFUNDED'
    | 'PARTIALLY_CAPTURED_REFUNDED'
    | 'REFUNDED'
    | 'UNKNOWN'
  >;

  /**
   * The store_id that the transaction belongs to. ?store_id=A&store_id=B&store_id=X.
   */
  store_id?: Array<string>;
}

export namespace TransactionListParams {
  export interface Amount {
    /**
     * Lower limit for filtering on transaction amount, amount authorized.
     */
    gte?: number;

    /**
     * Upper limit for filtering on transaction amount, amount authorized.
     */
    lte?: number;
  }

  export interface CapturedAt {
    /**
     * Transaction captured after date (This param is subject to change in the future)
     * (ISO 8601. We recommend using a localised ISO 8601 datetime like
     * `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC)
     */
    gte?: string;

    /**
     * Transaction captured before date (This param is subject to change in the future)
     * (ISO 8601. We recommend using a localised ISO 8601 datetime like
     * `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC)
     */
    lte?: string;
  }

  export interface CreatedAt {
    /**
     * Transaction created after (ISO 8601. We recommend using a localised ISO 8601
     * datetime like `2017-07-21T17:32:28Z`. If a timezone is not specified we assume
     * UTC)
     */
    gte?: string;

    /**
     * Transaction created before a date (ISO 8601. We recommend using a localised ISO
     * 8601 datetime like `2017-07-21T17:32:28Z`. If a timezone is not specified we
     * assume UTC)
     */
    lte?: string;
  }

  export interface RefundedAt {
    /**
     * Transaction refunded after date (This param is subject to change in the future)
     * (ISO 8601. We recommend using a localised ISO 8601 datetime like
     * `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC)
     */
    gte?: string;

    /**
     * Transaction refunded before date (This param is subject to change in the future)
     * (ISO 8601. We recommend using a localised ISO 8601 datetime like
     * `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC)
     */
    lte?: string;
  }
}

export interface TransactionAuthorizationParams {
  /**
   * The reason of the extension
   */
  reason?: string;

  /**
   * A reference specified by the merchant to identify the transaction
   */
  reference?: string;
}

export interface TransactionCaptureParams {
  /**
   * Body param: The amount to be captured
   */
  amount: number;

  /**
   * Query param: Include aditional data in the returned data that are by default
   * excluded from the transaction details.
   *
   * - **`events.request_headers`** Include the event headers stored for each event
   *   **deprecated**
   * - **`initiating_system_request_headers`** Include the request headers from the
   *   initating system **deprecated**
   *
   * From 2023-09, `events.request_headers` and `initiating_system_request_headers`
   * will be included by default
   */
  includes?: Array<'events.request_headers' | 'initiating_system_request_headers'>;

  /**
   * Body param: A reference specified by the merchant to identify the transaction
   */
  capture_reference?: string;

  /**
   * Body param: Info about the captured order items
   *
   * #### Instabank
   *
   * `required` if the transaction `payment_product` is _instabank_. The capture will
   * then be applied to the items included.
   */
  items?: Array<TransactionCaptureParams.Item>;

  /**
   * Header param: The name of the ecommerce solution
   *
   * Example: `woocommerce`
   */
  'Dintero-System-Name'?: string;

  /**
   * Header param: The name of the ecommerce plugin
   *
   * Example: `Dintero.Checkout.WooCommerce`
   */
  'Dintero-System-Plugin-Name'?: string;

  /**
   * Header param: The version number of the ecommerce plugin
   *
   * Example: `2.3.4`
   */
  'Dintero-System-Plugin-Version'?: string;

  /**
   * Header param: The version number of the ecommerce solution
   *
   * Example: `5.4`
   */
  'Dintero-System-Version'?: string;
}

export namespace TransactionCaptureParams {
  export interface Item {
    /**
     * The total monetary amount of the line item
     */
    amount: number;

    /**
     * the number of the line (or id), must be `unique` between all items. `required`
     * when Instabank payment is configured.
     */
    line_id: string;

    /**
     * The ID or SKU of the product on the line
     */
    id?: string;

    /**
     * A short, localized description of the line item
     */
    description?: string;

    /**
     * Metadata about discounts given
     */
    discount_lines?: Array<unknown>;

    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    emd?: Item.Emd;

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    fee_split?: Item.FeeSplit;

    /**
     * The groups the product on the line belongs to
     */
    groups?: Array<Item.Group>;

    /**
     * The quantity of the product in the item line.
     */
    quantity?: number;

    /**
     * An array of objects specifying how the amount should be split between sellers
     * when using Dintero Payout
     *
     * Specify an empty array if the splits will be provided during capture.
     * `auto_capture` cannot be enabled when splits are defined as empty array.
     */
    splits?: Array<Item.Split>;

    /**
     * URL to a thumbnail of the item. Will be displayed when redirecting to the
     * session.
     *
     * Recommended limitations for the image:
     *
     * - all images should preferrably have the same dimensions
     * - max file size should be less than 2MB
     */
    thumbnail_url?: string;

    /**
     * The type of order item this is.
     *
     * - **physical** - a physical item which must be delivered or handed over
     * - **digital** - a digital item which doesn't need shipping
     * - **service** - payment for services like maintenance performed in your home
     * - **gift_card** - usage of a gift card, where the amount is usually a negative
     *   number
     * - **shipping** - payment for shipping of the order
     * - **surcharge** - extra incurred costs, like taxes or necessary rounding
     */
    type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

    /**
     * The dimensional weight (also known as volumetric) value unit of one item.
     * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
     */
    unit_dimensional_weight?: number;

    /**
     * The volume of one item in m³ (cubic meters)
     */
    unit_volume?: number;

    /**
     * The volume of one item in kg (kilo grams)
     */
    unit_weight?: number;

    /**
     * The VAT percentage
     */
    vat?: number;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     *
     * In smallest unit for the currency, e.g. cents
     */
    vat_amount?: number;
  }

  export namespace Item {
    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    export interface Emd {
      /**
       * Only required if the item is related to an event or multiple events, like for
       * example tickets to a concert.
       *
       * If you are selling an event package as a single ticket or item that includes
       * multiple events, for example a festival, you need to provide information about
       * all the individual events that are part of the package.
       */
      event?: Array<Emd.Event>;

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      marketplace_order?: Emd.MarketplaceOrder;

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      subscription?: Emd.Subscription;

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      travel?: Emd.Travel;
    }

    export namespace Emd {
      export interface Event {
        /**
         * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        end_time: string;

        /**
         * Name of the company arranging the event, e.g. "Happy Parties Ltd."
         */
        event_company: string;

        /**
         * Name of the event, e.g. "Fancy Singer"
         */
        event_name: string;

        /**
         * Category or type of venue, e.g. "Pop"
         */
        genre_of_event: string;

        /**
         * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        start_time: string;

        ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

        /**
         * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
         *
         * If email or phone, then use either the email address or the phone number
         * respectively.
         */
        ticket_delivery_recipient: string;

        /**
         * If tickets are digitally checked when entering the venue, e.g. true
         */
        access_controlled_venue?: boolean;

        /**
         * Name of the affiliate that originated the purchase.
         */
        affiliate_name?: string;

        arena_location?: Event.ArenaLocation;

        /**
         * Name of the venue, e.g. "Song Arena"
         */
        arena_name?: string;
      }

      export namespace Event {
        export interface ArenaLocation {
          /**
           * City that the venue is located in, e.g. "Oslo"
           */
          city: string;

          /**
           * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
           */
          country: string;

          /**
           * Postal code for the venue location, e.g. "0185"
           */
          postal_code?: string;

          /**
           * Street address representing the venue location, e.g. "Sonja Henies plass 2"
           */
          street_address?: string;
        }
      }

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      export interface MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        seller_info: MarketplaceOrder.SellerInfo;

        /**
         * Details related to the winner involved in the marketplace order.
         */
        winner_info: MarketplaceOrder.WinnerInfo;
      }

      export namespace MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        export interface SellerInfo {
          account_last_modified: SellerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the sub-merchant did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Name of the category to which the specific good belongs to, according to the
           * selling merchant's categorization, e.g. "Phones".
           */
          product_category: string;

          /**
           * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
           * Ltd."
           */
          sub_merchant_id: string;

          /**
           * Name of the good purchased.
           */
          product_name?: string;

          /**
           * Current rating of the good purchased according to the marketplace's rating
           * scale, e.g. 5
           */
          seller_rating?: number;

          /**
           * Details about the seller.
           */
          unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

          /**
           * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace SellerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the seller.
           */
          export interface UniqueAccountIdentifierSeller {
            /**
             * Seller's email address, e.g. "seller@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Seller's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }

        /**
         * Details related to the winner involved in the marketplace order.
         */
        export interface WinnerInfo {
          account_last_modified: WinnerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the winner did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Details about the winner.
           */
          unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

          /**
           * Volumes of trades the winner did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace WinnerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the winner.
           */
          export interface UniqueAccountIdentifierWinner {
            /**
             * Winner's email address, e.g. "winner@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Winner's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }
      }

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      export interface Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        customer_account_info: Subscription.CustomerAccountInfo;

        /**
         * Details related to the subscription.
         */
        subscription: Subscription.Subscription;
      }

      export namespace Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        export interface CustomerAccountInfo {
          /**
           * The date and time the account was last modified (ISO 8601 format), e.g.
           * "2023-10-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_last_modified: string;

          /**
           * The date and time the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Unique name / number to identify the specific customer account. Max 24
           * characters, e.g. "Adam Adamsson"
           */
          unique_account_identifier: string;
        }

        /**
         * Details related to the subscription.
         */
        export interface Subscription {
          /**
           * Whether the subscription will be auto renewed upon expiry, e.g. true
           */
          auto_renewal_of_subscription: boolean;

          /**
           * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          end_time: string;

          /**
           * The start time of the subscription (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          start_time: string;

          /**
           * Name of the product on subscription, e.g. "Contact lenses"
           */
          subscription_name: string;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;
        }
      }

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      export interface Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        air_reservation_details?: Travel.AirReservationDetails;

        /**
         * Details about the reservation of bus tickets.
         */
        bus_reservation_details?: Travel.BusReservationDetails;

        /**
         * Details about the reservation of rental cars.
         */
        car_rental_reservation_details?: Travel.CarRentalReservationDetails;

        /**
         * Details about the reservation of ferry tickets.
         */
        ferry_reservation_details?: Travel.FerryReservationDetails;

        /**
         * Details about the reservation of hotel rooms.
         */
        hotel_reservation_details?: Travel.HotelReservationDetails;

        /**
         * Details about the reservation of train tickets.
         */
        train_reservation_details?: Travel.TrainReservationDetails;
      }

      export namespace Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        export interface AirReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one flight from Oslo to Munich, and
           * another flight from Munich to Dubai, you need to provide one itinerary object
           * for each of these two flights, and so on.
           */
          itinerary: Array<AirReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<AirReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<AirReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace AirReservationDetails {
          export interface Itinerary {
            /**
             * IATA Airport Code (three letters), e.g. "MUC"
             */
            arrival: string;

            /**
             * IATA Airline standard (two letters or digits), e.g. "LH"
             */
            carrier: string;

            /**
             * IATA Airport Code (three letters), e.g. "OSL"
             */
            departure: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * City the flight arrives in, e.g. "Munich"
             */
            arrival_city?: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * City the flight departs from, e.g. "Oslo"
             */
            departure_city?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the flight in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of bus tickets.
         */
        export interface BusReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one bus journey from Oslo to Munich,
           * and another bus journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two bus journeys, and so on.
           */
          itinerary: Array<BusReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<BusReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<BusReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace BusReservationDetails {
          export interface Itinerary {
            /**
             * City the bus arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Bus Travels Ltd."
             */
            carrier: string;

            /**
             * City the bus departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the bus journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of rental cars.
         */
        export interface CarRentalReservationDetails {
          /**
           * Driver data, one per driver.
           */
          drivers: Array<CarRentalReservationDetails.Driver>;

          /**
           * Car rental itinerary data, one per car rental.
           *
           * If you are selling a package that contains multiple car rentals, you need to
           * provide itinerary data for each of the individual rentals.
           */
          itinerary: Array<CarRentalReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<CarRentalReservationDetails.Insurance>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace CarRentalReservationDetails {
          export interface Driver {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }

          export interface Itinerary {
            /**
             * End time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Name of the car rental company, e.g. "Premium Cars Ltd."
             */
            rental_company: string;

            /**
             * Start time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            /**
             * Price for the car rental reservation in smallest unit of local currency, e.g.
             * 500000
             */
            car_price?: number;

            /**
             * Travel class, e.g. "Premium Cars Premium Class"
             */
            class?: string;

            /**
             * Driver IDs.
             */
            drivers_id?: Array<number>;

            /**
             * Details related to the drop off location.
             */
            drop_off_location?: Itinerary.DropOffLocation;

            /**
             * Details related to the pick up location.
             */
            pick_up_location?: Itinerary.PickUpLocation;
          }

          export namespace Itinerary {
            /**
             * Details related to the drop off location.
             */
            export interface DropOffLocation {
              /**
               * City where the car should be dropped off, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
               * "NO"
               */
              country: string;

              /**
               * Postal code where the car should be dropped off, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }

            /**
             * Details related to the pick up location.
             */
            export interface PickUpLocation {
              /**
               * City where the car should be picked up, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
               * "NO",
               */
              country: string;

              /**
               * Postal code where the car should be picked up, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }
        }

        /**
         * Details about the reservation of ferry tickets.
         */
        export interface FerryReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
           * and another ferry journey from Kiel to Gothenburg, you need to provide one
           * itinerary object for each of these two ferry journeys, and so on.
           */
          itinerary: Array<FerryReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<FerryReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<FerryReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace FerryReservationDetails {
          export interface Itinerary {
            /**
             * City the ferry arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Ferry Travels Ltd."
             */
            carrier: string;

            /**
             * City the ferry departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the ferry journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of hotel rooms.
         */
        export interface HotelReservationDetails {
          /**
           * Hotel itinerary data, one per hotel stay.
           *
           * If you are selling a package that contains multiple hotel stays, you need to
           * provide itinerary data for each of the individual stays.
           */
          itinerary: Array<HotelReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<HotelReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<HotelReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace HotelReservationDetails {
          export interface Itinerary {
            /**
             * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Price for the hotel stay in smallest unit of local currency, e.g. 200000
             */
            hotel_price: number;

            /**
             * Number of rooms booked, e.g. 2
             */
            number_of_rooms: number;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            /**
             * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Address details of the hotel.
             */
            address?: Itinerary.Address;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Name of the hotel, e.g. "Premium Hotel"
             */
            hotel_name?: string;
          }

          export namespace Itinerary {
            /**
             * Address details of the hotel.
             */
            export interface Address {
              /**
               * City the hotel is located in, e.g. "Oslo"
               */
              city: string;

              /**
               * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
               */
              country: string;

              /**
               * Postal code of the hotel, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address of the hotel, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of train tickets.
         */
        export interface TrainReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one train journey from Oslo to Munich,
           * and another train journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two train journeys, and so on.
           */
          itinerary: Array<TrainReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<TrainReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<TrainReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace TrainReservationDetails {
          export interface Itinerary {
            /**
             * City the train arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Train Travels Ltd."
             */
            carrier: string;

            /**
             * City the train departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Price for that specific segment of the train journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }
      }
    }

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    export interface FeeSplit {
      type: 'proportional';

      /**
       * Seller ids that will be debited for the payment fees All destinations must be
       * included in the list of splits
       */
      destinations?: Array<string>;
    }

    export interface Group {
      /**
       * Group ID
       */
      id: string;

      /**
       * Group name
       */
      name?: string;
    }

    export interface Split {
      /**
       * The split amount in smalles unit for the currency, e.g. cents.
       */
      amount: number;

      /**
       * An id that identifies the seller
       */
      payout_destination_id: string;
    }
  }
}

export interface TransactionRefundParams {
  /**
   * Body param: The amount to be refunded
   */
  amount: number;

  /**
   * Query param: Include aditional data in the returned data that are by default
   * excluded from the transaction details.
   *
   * - **`events.request_headers`** Include the event headers stored for each event
   *   **deprecated**
   * - **`initiating_system_request_headers`** Include the request headers from the
   *   initating system **deprecated**
   *
   * From 2023-09, `events.request_headers` and `initiating_system_request_headers`
   * will be included by default
   */
  includes?: Array<'events.request_headers' | 'initiating_system_request_headers'>;

  /**
   * Body param: Info about the refunded order items
   *
   * #### Instabank
   *
   * `required` if the transaction `payment_product` is _instabank_. The refund will
   * then be applied to the items included.
   */
  items?: Array<TransactionRefundParams.Item>;

  /**
   * Body param: The reason of the refund
   */
  reason?: string;

  /**
   * Body param: A reference specified by the merchant to identify the transaction
   */
  refund_reference?: string;

  /**
   * Header param: The name of the ecommerce solution
   *
   * Example: `woocommerce`
   */
  'Dintero-System-Name'?: string;

  /**
   * Header param: The name of the ecommerce plugin
   *
   * Example: `Dintero.Checkout.WooCommerce`
   */
  'Dintero-System-Plugin-Name'?: string;

  /**
   * Header param: The version number of the ecommerce plugin
   *
   * Example: `2.3.4`
   */
  'Dintero-System-Plugin-Version'?: string;

  /**
   * Header param: The version number of the ecommerce solution
   *
   * Example: `5.4`
   */
  'Dintero-System-Version'?: string;
}

export namespace TransactionRefundParams {
  export interface Item {
    /**
     * The total monetary amount of the line item
     */
    amount: number;

    /**
     * the number of the line (or id), must be `unique` between all items. `required`
     * when Instabank payment is configured.
     */
    line_id: string;

    /**
     * The ID or SKU of the product on the line
     */
    id?: string;

    /**
     * A short, localized description of the line item
     */
    description?: string;

    /**
     * Metadata about discounts given
     */
    discount_lines?: Array<unknown>;

    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    emd?: Item.Emd;

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    fee_split?: Item.FeeSplit;

    /**
     * The groups the product on the line belongs to
     */
    groups?: Array<Item.Group>;

    /**
     * The quantity of the product in the item line.
     */
    quantity?: number;

    /**
     * An array of objects specifying how the amount should be split between sellers
     * when using Dintero Payout
     *
     * Specify an empty array if the splits will be provided during capture.
     * `auto_capture` cannot be enabled when splits are defined as empty array.
     */
    splits?: Array<Item.Split>;

    /**
     * URL to a thumbnail of the item. Will be displayed when redirecting to the
     * session.
     *
     * Recommended limitations for the image:
     *
     * - all images should preferrably have the same dimensions
     * - max file size should be less than 2MB
     */
    thumbnail_url?: string;

    /**
     * The type of order item this is.
     *
     * - **physical** - a physical item which must be delivered or handed over
     * - **digital** - a digital item which doesn't need shipping
     * - **service** - payment for services like maintenance performed in your home
     * - **gift_card** - usage of a gift card, where the amount is usually a negative
     *   number
     * - **shipping** - payment for shipping of the order
     * - **surcharge** - extra incurred costs, like taxes or necessary rounding
     */
    type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

    /**
     * The dimensional weight (also known as volumetric) value unit of one item.
     * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
     */
    unit_dimensional_weight?: number;

    /**
     * The volume of one item in m³ (cubic meters)
     */
    unit_volume?: number;

    /**
     * The volume of one item in kg (kilo grams)
     */
    unit_weight?: number;

    /**
     * The VAT percentage
     */
    vat?: number;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     *
     * In smallest unit for the currency, e.g. cents
     */
    vat_amount?: number;
  }

  export namespace Item {
    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    export interface Emd {
      /**
       * Only required if the item is related to an event or multiple events, like for
       * example tickets to a concert.
       *
       * If you are selling an event package as a single ticket or item that includes
       * multiple events, for example a festival, you need to provide information about
       * all the individual events that are part of the package.
       */
      event?: Array<Emd.Event>;

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      marketplace_order?: Emd.MarketplaceOrder;

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      subscription?: Emd.Subscription;

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      travel?: Emd.Travel;
    }

    export namespace Emd {
      export interface Event {
        /**
         * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        end_time: string;

        /**
         * Name of the company arranging the event, e.g. "Happy Parties Ltd."
         */
        event_company: string;

        /**
         * Name of the event, e.g. "Fancy Singer"
         */
        event_name: string;

        /**
         * Category or type of venue, e.g. "Pop"
         */
        genre_of_event: string;

        /**
         * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        start_time: string;

        ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

        /**
         * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
         *
         * If email or phone, then use either the email address or the phone number
         * respectively.
         */
        ticket_delivery_recipient: string;

        /**
         * If tickets are digitally checked when entering the venue, e.g. true
         */
        access_controlled_venue?: boolean;

        /**
         * Name of the affiliate that originated the purchase.
         */
        affiliate_name?: string;

        arena_location?: Event.ArenaLocation;

        /**
         * Name of the venue, e.g. "Song Arena"
         */
        arena_name?: string;
      }

      export namespace Event {
        export interface ArenaLocation {
          /**
           * City that the venue is located in, e.g. "Oslo"
           */
          city: string;

          /**
           * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
           */
          country: string;

          /**
           * Postal code for the venue location, e.g. "0185"
           */
          postal_code?: string;

          /**
           * Street address representing the venue location, e.g. "Sonja Henies plass 2"
           */
          street_address?: string;
        }
      }

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      export interface MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        seller_info: MarketplaceOrder.SellerInfo;

        /**
         * Details related to the winner involved in the marketplace order.
         */
        winner_info: MarketplaceOrder.WinnerInfo;
      }

      export namespace MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        export interface SellerInfo {
          account_last_modified: SellerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the sub-merchant did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Name of the category to which the specific good belongs to, according to the
           * selling merchant's categorization, e.g. "Phones".
           */
          product_category: string;

          /**
           * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
           * Ltd."
           */
          sub_merchant_id: string;

          /**
           * Name of the good purchased.
           */
          product_name?: string;

          /**
           * Current rating of the good purchased according to the marketplace's rating
           * scale, e.g. 5
           */
          seller_rating?: number;

          /**
           * Details about the seller.
           */
          unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

          /**
           * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace SellerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the seller.
           */
          export interface UniqueAccountIdentifierSeller {
            /**
             * Seller's email address, e.g. "seller@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Seller's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }

        /**
         * Details related to the winner involved in the marketplace order.
         */
        export interface WinnerInfo {
          account_last_modified: WinnerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the winner did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Details about the winner.
           */
          unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

          /**
           * Volumes of trades the winner did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace WinnerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the winner.
           */
          export interface UniqueAccountIdentifierWinner {
            /**
             * Winner's email address, e.g. "winner@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Winner's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }
      }

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      export interface Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        customer_account_info: Subscription.CustomerAccountInfo;

        /**
         * Details related to the subscription.
         */
        subscription: Subscription.Subscription;
      }

      export namespace Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        export interface CustomerAccountInfo {
          /**
           * The date and time the account was last modified (ISO 8601 format), e.g.
           * "2023-10-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_last_modified: string;

          /**
           * The date and time the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Unique name / number to identify the specific customer account. Max 24
           * characters, e.g. "Adam Adamsson"
           */
          unique_account_identifier: string;
        }

        /**
         * Details related to the subscription.
         */
        export interface Subscription {
          /**
           * Whether the subscription will be auto renewed upon expiry, e.g. true
           */
          auto_renewal_of_subscription: boolean;

          /**
           * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          end_time: string;

          /**
           * The start time of the subscription (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          start_time: string;

          /**
           * Name of the product on subscription, e.g. "Contact lenses"
           */
          subscription_name: string;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;
        }
      }

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      export interface Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        air_reservation_details?: Travel.AirReservationDetails;

        /**
         * Details about the reservation of bus tickets.
         */
        bus_reservation_details?: Travel.BusReservationDetails;

        /**
         * Details about the reservation of rental cars.
         */
        car_rental_reservation_details?: Travel.CarRentalReservationDetails;

        /**
         * Details about the reservation of ferry tickets.
         */
        ferry_reservation_details?: Travel.FerryReservationDetails;

        /**
         * Details about the reservation of hotel rooms.
         */
        hotel_reservation_details?: Travel.HotelReservationDetails;

        /**
         * Details about the reservation of train tickets.
         */
        train_reservation_details?: Travel.TrainReservationDetails;
      }

      export namespace Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        export interface AirReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one flight from Oslo to Munich, and
           * another flight from Munich to Dubai, you need to provide one itinerary object
           * for each of these two flights, and so on.
           */
          itinerary: Array<AirReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<AirReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<AirReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace AirReservationDetails {
          export interface Itinerary {
            /**
             * IATA Airport Code (three letters), e.g. "MUC"
             */
            arrival: string;

            /**
             * IATA Airline standard (two letters or digits), e.g. "LH"
             */
            carrier: string;

            /**
             * IATA Airport Code (three letters), e.g. "OSL"
             */
            departure: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * City the flight arrives in, e.g. "Munich"
             */
            arrival_city?: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * City the flight departs from, e.g. "Oslo"
             */
            departure_city?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the flight in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of bus tickets.
         */
        export interface BusReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one bus journey from Oslo to Munich,
           * and another bus journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two bus journeys, and so on.
           */
          itinerary: Array<BusReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<BusReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<BusReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace BusReservationDetails {
          export interface Itinerary {
            /**
             * City the bus arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Bus Travels Ltd."
             */
            carrier: string;

            /**
             * City the bus departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the bus journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of rental cars.
         */
        export interface CarRentalReservationDetails {
          /**
           * Driver data, one per driver.
           */
          drivers: Array<CarRentalReservationDetails.Driver>;

          /**
           * Car rental itinerary data, one per car rental.
           *
           * If you are selling a package that contains multiple car rentals, you need to
           * provide itinerary data for each of the individual rentals.
           */
          itinerary: Array<CarRentalReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<CarRentalReservationDetails.Insurance>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace CarRentalReservationDetails {
          export interface Driver {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }

          export interface Itinerary {
            /**
             * End time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Name of the car rental company, e.g. "Premium Cars Ltd."
             */
            rental_company: string;

            /**
             * Start time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            /**
             * Price for the car rental reservation in smallest unit of local currency, e.g.
             * 500000
             */
            car_price?: number;

            /**
             * Travel class, e.g. "Premium Cars Premium Class"
             */
            class?: string;

            /**
             * Driver IDs.
             */
            drivers_id?: Array<number>;

            /**
             * Details related to the drop off location.
             */
            drop_off_location?: Itinerary.DropOffLocation;

            /**
             * Details related to the pick up location.
             */
            pick_up_location?: Itinerary.PickUpLocation;
          }

          export namespace Itinerary {
            /**
             * Details related to the drop off location.
             */
            export interface DropOffLocation {
              /**
               * City where the car should be dropped off, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
               * "NO"
               */
              country: string;

              /**
               * Postal code where the car should be dropped off, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }

            /**
             * Details related to the pick up location.
             */
            export interface PickUpLocation {
              /**
               * City where the car should be picked up, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
               * "NO",
               */
              country: string;

              /**
               * Postal code where the car should be picked up, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }
        }

        /**
         * Details about the reservation of ferry tickets.
         */
        export interface FerryReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
           * and another ferry journey from Kiel to Gothenburg, you need to provide one
           * itinerary object for each of these two ferry journeys, and so on.
           */
          itinerary: Array<FerryReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<FerryReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<FerryReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace FerryReservationDetails {
          export interface Itinerary {
            /**
             * City the ferry arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Ferry Travels Ltd."
             */
            carrier: string;

            /**
             * City the ferry departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the ferry journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of hotel rooms.
         */
        export interface HotelReservationDetails {
          /**
           * Hotel itinerary data, one per hotel stay.
           *
           * If you are selling a package that contains multiple hotel stays, you need to
           * provide itinerary data for each of the individual stays.
           */
          itinerary: Array<HotelReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<HotelReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<HotelReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace HotelReservationDetails {
          export interface Itinerary {
            /**
             * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Price for the hotel stay in smallest unit of local currency, e.g. 200000
             */
            hotel_price: number;

            /**
             * Number of rooms booked, e.g. 2
             */
            number_of_rooms: number;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            /**
             * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Address details of the hotel.
             */
            address?: Itinerary.Address;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Name of the hotel, e.g. "Premium Hotel"
             */
            hotel_name?: string;
          }

          export namespace Itinerary {
            /**
             * Address details of the hotel.
             */
            export interface Address {
              /**
               * City the hotel is located in, e.g. "Oslo"
               */
              city: string;

              /**
               * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
               */
              country: string;

              /**
               * Postal code of the hotel, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address of the hotel, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of train tickets.
         */
        export interface TrainReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one train journey from Oslo to Munich,
           * and another train journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two train journeys, and so on.
           */
          itinerary: Array<TrainReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<TrainReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<TrainReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace TrainReservationDetails {
          export interface Itinerary {
            /**
             * City the train arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Train Travels Ltd."
             */
            carrier: string;

            /**
             * City the train departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Price for that specific segment of the train journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }
      }
    }

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    export interface FeeSplit {
      type: 'proportional';

      /**
       * Seller ids that will be debited for the payment fees All destinations must be
       * included in the list of splits
       */
      destinations?: Array<string>;
    }

    export interface Group {
      /**
       * Group ID
       */
      id: string;

      /**
       * Group name
       */
      name?: string;
    }

    export interface Split {
      /**
       * The split amount in smalles unit for the currency, e.g. cents.
       */
      amount: number;

      /**
       * An id that identifies the seller
       */
      payout_destination_id: string;
    }
  }
}

export interface TransactionVoidParams {
  /**
   * Query param: Include aditional data in the returned data that are by default
   * excluded from the transaction details.
   *
   * - **`events.request_headers`** Include the event headers stored for each event
   *   **deprecated**
   * - **`initiating_system_request_headers`** Include the request headers from the
   *   initating system **deprecated**
   *
   * From 2023-09, `events.request_headers` and `initiating_system_request_headers`
   * will be included by default
   */
  includes?: Array<'events.request_headers' | 'initiating_system_request_headers'>;

  /**
   * Header param: The name of the ecommerce solution
   *
   * Example: `woocommerce`
   */
  'Dintero-System-Name'?: string;

  /**
   * Header param: The name of the ecommerce plugin
   *
   * Example: `Dintero.Checkout.WooCommerce`
   */
  'Dintero-System-Plugin-Name'?: string;

  /**
   * Header param: The version number of the ecommerce plugin
   *
   * Example: `2.3.4`
   */
  'Dintero-System-Plugin-Version'?: string;

  /**
   * Header param: The version number of the ecommerce solution
   *
   * Example: `5.4`
   */
  'Dintero-System-Version'?: string;
}

export declare namespace Transactions {
  export {
    type Transaction as Transaction,
    type TransactionListResponse as TransactionListResponse,
    type TransactionRetrieveParams as TransactionRetrieveParams,
    type TransactionUpdateParams as TransactionUpdateParams,
    type TransactionListParams as TransactionListParams,
    type TransactionAuthorizationParams as TransactionAuthorizationParams,
    type TransactionCaptureParams as TransactionCaptureParams,
    type TransactionRefundParams as TransactionRefundParams,
    type TransactionVoidParams as TransactionVoidParams,
  };
}
