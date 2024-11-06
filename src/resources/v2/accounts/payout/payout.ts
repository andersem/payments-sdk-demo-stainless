// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../resource';
import * as Core from '../../../../core';
import * as PayoutDestinationsAPI from './payout-destinations/payout-destinations';
import { PayoutDestinations } from './payout-destinations/payout-destinations';

export class Payout extends APIResource {
  payoutDestinations: PayoutDestinationsAPI.PayoutDestinations = new PayoutDestinationsAPI.PayoutDestinations(
    this._client,
  );

  /**
   * You can use the endpoint to programmatically initiate a fund transfer between
   * two sellers
   *
   * Requests for fund transfers are processed asynchronously so in the response, we
   * only inform you that we received your request. You'll get the result in the
   * settlement report
   */
  fundTransfer(
    aid: string,
    body: PayoutFundTransferParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PayoutFundTransferResponse> {
    return this._client.post(`/v2/accounts/${aid}/payout/fund-transfer`, { body, ...options });
  }
}

/**
 * This object contains the result from initiating a transfer fund
 */
export interface FundTransfer {
  account_id: string;

  /**
   * The amount of the fund transfer in the smallest unit of the currency
   */
  amount: number;

  /**
   * The date-time when the resource was created
   */
  created_at: string;

  /**
   * User id of the user who created the resource
   */
  created_by: string;

  currency: string;

  destination_payout_destination_id: string;

  /**
   * A string id that uniquely identifies the fund transfer. The `id` is used for
   * idempotent processing so you can safely retry the request with same id if you
   * don't receive a response (for example, in case of a timeout)
   */
  fund_transfer_id: string;

  /**
   * A static reference that will be included on settlements made to the sellers
   */
  reference: string;

  source_payout_destination_id: string;

  type: 'payout-destination';
}

export type PayoutDestinationBalances = Array<PayoutDestinationBalances.PayoutDestinationBalanceItem>;

export namespace PayoutDestinationBalances {
  /**
   * Seller balance for a currency
   */
  export interface PayoutDestinationBalanceItem {
    account_id: string;

    /**
     * Amount in the smallest unit of the currency
     */
    amount: number;

    currency: string;

    /**
     * A string id that uniquely identifies the payout destination configuration id
     */
    payout_destination_config_id: string;

    /**
     * The id of the seller as defined elsewhere in dintero.
     */
    payout_destination_id: string;
  }
}

export type PayoutDestinationTransfers = Array<PayoutDestinationTransfers.PayoutDestinationTransferItem>;

export namespace PayoutDestinationTransfers {
  /**
   * Seller transfer entry
   */
  export interface PayoutDestinationTransferItem {
    /**
     * The Dintero account id
     */
    account_id: string;

    /**
     * Amount in the smallest unit of the currency
     */
    amount: number;

    /**
     * The date-time when the resource was created
     */
    created_at: string;

    currency: string;

    /**
     * The underlying payment provider for the inbound payment, eg. `collector`,
     * `bambora`, `payex`. Only applicable for type `inbound`
     */
    inbound_payment_provider: string | null;

    /**
     * A string id that uniquely identifies the entry in the ledger
     */
    ledger_entry_id: string;

    /**
     * Text message attached to the bank transaction. Only applicable for type
     * `outbound`
     */
    outbound_message: string | null;

    /**
     * The bic for the bank account will receive the funds. Only applicable for type
     * `outbound` if the bank account type is `iban`
     */
    outbound_receiver_bank_account_bic: string | null;

    /**
     * The bank account number that will receive the funds. Only applicable for type
     * `outbound`
     */
    outbound_receiver_bank_account_number: string | null;

    /**
     * The bank account number type that will receive the funds, eg. `iban` or `bban`.
     * Only applicable for type `outbound`
     */
    outbound_receiver_bank_account_type: string | null;

    /**
     * The country of the bank account that will receive the funds. Only applicable for
     * type `outbound`
     */
    outbound_receiver_country: string | null;

    /**
     * A string id that uniquely identifies the payout destination configuration id
     */
    payout_destination_config_id: string;

    /**
     * The id of the seller as defined elsewhere in dintero.
     */
    payout_destination_id: string;

    /**
     * The id of the seller that money was transferred to as defined elsewhere in
     * dintero. Only applicable for type `transfer`
     */
    transfer_destination_payout_destination_id: string | null;

    /**
     * The id of the transfer. Only applicable for type `transfer`
     */
    transfer_id: string | null;

    /**
     * The reference of the transfer. Only applicable for type `transfer`
     */
    transfer_reference: string | null;

    /**
     * The id of the seller that money was transferred from as defined elsewhere in
     * dintero. Only applicable for type `transfer`
     */
    transfer_source_payout_destination_id: string | null;

    /**
     * The type of the transfer.
     *
     * - `inbound` is a transfer from a payment provider to the sellers account in
     *   Dintero
     * - `transfer` is a transfer between two Dintero sellers
     * - `outbound` is a transfer from the seller account in Dintero to the sellers
     *   bank account
     */
    type: 'inbound' | 'transfer' | 'outbound';
  }
}

export interface PayoutFundTransferResponse {
  /**
   * This object contains the result from initiating a transfer fund
   */
  fund_transfer?: FundTransfer;
}

export interface PayoutFundTransferParams {
  /**
   * The amount of the fund transfer in the smallest unit of the currency
   */
  amount: number;

  currency: string;

  destination_payout_destination_id: string;

  /**
   * A string id that uniquely identifies the fund transfer. The `id` is used for
   * idempotent processing so you can safely retry the request with same id if you
   * don't receive a response (for example, in case of a timeout)
   */
  fund_transfer_id: string;

  /**
   * A static reference that will be included on settlements made to the sellers
   */
  reference: string;

  source_payout_destination_id: string;

  type: 'payout-destination';
}

Payout.PayoutDestinations = PayoutDestinations;

export declare namespace Payout {
  export {
    type FundTransfer as FundTransfer,
    type PayoutDestinationBalances as PayoutDestinationBalances,
    type PayoutDestinationTransfers as PayoutDestinationTransfers,
    type PayoutFundTransferResponse as PayoutFundTransferResponse,
    type PayoutFundTransferParams as PayoutFundTransferParams,
  };

  export { PayoutDestinations as PayoutDestinations };
}
