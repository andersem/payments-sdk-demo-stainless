// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as AttachmentsAPI from './attachments';
import { AttachmentRetrieveResponse, Attachments } from './attachments';
import * as ReportsAPI from './reports/reports';
import { Reports } from './reports/reports';

export class Settlements extends APIResource {
  reports: ReportsAPI.Reports = new ReportsAPI.Reports(this._client);
  attachments: AttachmentsAPI.Attachments = new AttachmentsAPI.Attachments(this._client);

  /**
   * List settlements
   *
   * _scopes_:
   *
   * - admin:billing
   * - read:billing
   * - admin:reports
   * - read:reports
   * - admin:settlements
   * - read:settlements
   */
  list(
    aid: string,
    query?: SettlementListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SettlementResponse>;
  list(aid: string, options?: Core.RequestOptions): Core.APIPromise<SettlementResponse>;
  list(
    aid: string,
    query: SettlementListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<SettlementResponse> {
    if (isRequestOptions(query)) {
      return this.list(aid, {}, query);
    }
    return this._client.get(`/accounts/${aid}/settlements`, { query, ...options });
  }
}

export interface SettlementResponse {
  items?: Array<SettlementResponse.Item>;

  last_evaluated_key?: SettlementResponse.LastEvaluatedKey;
}

export namespace SettlementResponse {
  export interface Item {
    /**
     * Unique identifier for the settlement
     */
    id?: string;

    amounts?: Array<Item.Amount>;

    attachments?: Array<Item.Attachment>;

    /**
     * Time of email received in Dintero's system
     */
    email_received_at?: string;

    /**
     * Time of last payment event in this settlement
     */
    end_at?: string;

    /**
     * Whether the amount in the report has actually been paid or not. The payment
     * might be postponed for later.
     */
    payment_status?: 'paid' | 'postponed';

    /**
     * The seller id this report is for. Will only be set if all transactions share the
     * same payout_destination_id.
     */
    payout_destination_id?: string;

    /**
     * Name of payment provider.
     */
    provider?: string;

    /**
     * The provider's unique id of the settlement
     */
    provider_reference?: string;

    /**
     * Settlement date
     */
    settled_at?: string;

    /**
     * Time of first payment event in this settlement
     */
    start_at?: string;

    /**
     * The sales location this report is for. Will only be set if all transactions
     * share the same store_id.
     */
    store_id?: string;
  }

  export namespace Item {
    export interface Amount {
      /**
       * The amount paid out, unless payment_status is postponed.
       *
       * `amount = capture - refund - fee`
       */
      amount?: number;

      /**
       * The amount captured on the orders in the settlement period.
       */
      capture?: number;

      currency?: string;

      /**
       * The sum of fees on the orders in the settlement period.
       */
      fee?: number;

      /**
       * The amount refunded on the orders in the settlement period.
       */
      refund?: number;
    }

    export interface Attachment {
      /**
       * Unique id of the attachment
       */
      id?: string;

      content_type?: string;

      /**
       * Where the attachment was created. Might be created by dintero, or might be
       * created by the providers, e.g. payex, vipps, collector
       */
      created_by?: string;

      extension?: string;

      /**
       * Attachment path
       */
      key?: string;
    }
  }

  export interface LastEvaluatedKey {
    id?: string;

    account_id?: string;

    settled_at?: string;
  }
}

export interface SettlementListParams {
  created_at?: SettlementListParams.CreatedAt;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 1000 items, and the default is 10 items.
   */
  limit?: number;

  /**
   * The payment provider
   */
  payment_provider?: Array<string>;

  /**
   * The seller id to filter on
   */
  payout_destination_id?: string;

  /**
   * Will try to match the search to settlement_id.
   */
  search?: string;

  /**
   * cursor for use in pagination. starting_after_date is the `settled_at` that
   * defines your place in the list. For instance, if you make a list request and
   * receive 100 objects, ending with `obj_foo` and `settled_at=2021-02-02`, your
   * subsequent call can include
   * `starting_after_id=obj_foo&starting_after_date=2021-02-02` in order to fetch the
   * next page of the list.
   *
   * Must be used together with `starting_after_id`
   */
  starting_after_date?: string;

  /**
   * cursor for use in pagination. starting_after_id is an object ID that defines
   * your place in the list. For instance, if you make a list request and receive 100
   * objects, ending with `obj_foo` and `settled_at=2021-02-02`, your subsequent call
   * can include `starting_after_id=obj_foo&starting_after_date=2021-02-02` in order
   * to fetch the next page of the list.
   *
   * Must be used together with `starting_after_date`
   */
  starting_after_id?: string;
}

export namespace SettlementListParams {
  export interface CreatedAt {
    /**
     * Settlement created after
     */
    gte?: string;

    /**
     * Settlement created before a date
     */
    lte?: string;
  }
}

Settlements.Reports = Reports;
Settlements.Attachments = Attachments;

export declare namespace Settlements {
  export { type SettlementResponse as SettlementResponse, type SettlementListParams as SettlementListParams };

  export { Reports as Reports };

  export { Attachments as Attachments, type AttachmentRetrieveResponse as AttachmentRetrieveResponse };
}
