// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../resource';
import { isRequestOptions } from '../../../../../core';
import * as Core from '../../../../../core';

export class PayoutDestinations extends APIResource {
  /**
   * Initiate an application for a new seller for Dintero Payout with split-payment.
   * The application will contain a link to an URL where the signatory of the seller
   * will need to finish submission of the case contract and sign it. Dintero will
   * perform a KYC, AML and bank ownership check on the seller before the application
   * `case_status`will be updated to `ACTIVE`. Once the application is approved, the
   * payout destination will be added automatically to the Dintero Payout service.
   *
   * scopes:
   *
   * - admin:accounts
   * - write:accounts
   *
   * ---
   *
   * For testing purposes it is possible to auto-approve or decline a new seller by
   * adding one of the following values to `payout_destination_description`:
   *
   * - "AUTO_APPROVE": Approves the case automatically, the case status will be set
   *   to `ACTIVE`
   * - "AUTO_DECLINE": Declines the case automatically, the case status will be set
   *   to `DECLINED`
   * - "AUTO_WAITING_FOR_SIGNATURE": Leaves the signature check for the case, the
   *   case status will be set to `WAITING_FOR_SIGNATURE`
   *
   * NOTE: This behavior is only available in test mode, i.e. with an `aid` prefixed
   * with "T".
   */
  create(
    aid: string,
    body: PayoutDestinationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ApprovalsPayoutDestinationResponse> {
    return this._client.post(`/accounts/${aid}/management/settings/approvals/payout-destinations`, {
      body,
      ...options,
    });
  }

  /**
   * scopes:
   *
   * - admin:accounts
   * - read:accounts
   */
  list(
    aid: string,
    query?: PayoutDestinationListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PayoutDestinationListResponse>;
  list(aid: string, options?: Core.RequestOptions): Core.APIPromise<PayoutDestinationListResponse>;
  list(
    aid: string,
    query: PayoutDestinationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<PayoutDestinationListResponse> {
    if (isRequestOptions(query)) {
      return this.list(aid, {}, query);
    }
    return this._client.get(`/accounts/${aid}/management/settings/approvals/payout-destinations`, {
      query,
      ...options,
    });
  }
}

export interface ApprovalsPayoutDestinationResponse {
  /**
   * Bank account information about the seller. Currently the contract service only
   * supports one bank_account per payout destination.
   */
  bank_accounts: Array<ApprovalsPayoutDestinationResponse.BankAccount>;

  /**
   * Country code, must be a two letter ISO 3166-1-alpha-2 country code
   */
  country_code: string;

  /**
   * National organization number valid in the country specified.
   */
  organization_number: string;

  /**
   * ID of seller to create when the contract has been completed, signed, and
   * approved.
   */
  payout_destination_id: string;

  /**
   * A static reference that will be included on bank payments, the name of the
   * service the payout-destination will be enrolled into. Eg. if yor platform is an
   * "Uber for lawnmowers" called "Mowber" the payout_reference should be "Mowber".
   */
  payout_reference: string;

  /**
   * An UUID that uniquely identifies the resource
   */
  id?: string;

  case_status?:
    | 'ACTIVE'
    | 'DECLINED'
    | 'UNDER_MANUAL_REVIEW'
    | 'AUTOMATIC_REVIEW'
    | 'WAITING_FOR_SIGNATURE'
    | 'WAITING_FOR_DECLARATION'
    | 'ERROR'
    | 'ARCHIVED';

  /**
   * The date-time when the resource was created
   */
  created_at?: string;

  /**
   * The ID of the user/client created the resource
   */
  created_by?: string;

  deleted_at?: string;

  /**
   * The ID of the user/client created the resource
   */
  deleted_by?: string;

  /**
   * The user that will submit the form. If the email is set the user will be
   * notified about the form via email.
   */
  form_submitter?: ApprovalsPayoutDestinationResponse.FormSubmitter;

  links?: Array<ApprovalsPayoutDestinationResponse.Link>;

  /**
   * Description of the seller
   */
  payout_destination_description?: string;

  /**
   * The name of the seller
   */
  payout_destination_name?: string;

  /**
   * The interval of the payout. The interval can be `daily`, `weekly` or `monthly`.
   */
  payout_interval_type?: 'daily' | 'weekly' | 'monthly';

  /**
   * The date-time when the resource was last updated
   */
  updated_at?: string;
}

export namespace ApprovalsPayoutDestinationResponse {
  export interface BankAccount {
    /**
     * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
     */
    bank_account_currency: string;

    /**
     * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
     */
    payout_currency: string;

    /**
     * Country code, must be a two letter ISO 3166-1-alpha-2 country code. If not set
     * we default to the country_code of parent approval object.
     */
    bank_account_country_code?: string;

    /**
     * BBAN, national bank account number
     */
    bank_account_number?: string;

    /**
     * The type of bank account number. Will default to BBAN in bank_country_code is
     * norwegian. Will default to IBAN in all other countries.
     */
    bank_account_number_type?: 'IBAN' | 'BBAN';

    /**
     * A BIC code, or Bank Identifier Code also know as SWIFT code, consistin of 8 to
     * 11 alphanumeric characters.
     */
    bank_identification_code?: string;

    /**
     * Name of the Bank used
     */
    bank_name?: string;
  }

  /**
   * The user that will submit the form. If the email is set the user will be
   * notified about the form via email.
   */
  export interface FormSubmitter {
    /**
     * The email of the user that will submit the form.
     */
    email?: string;

    /**
     * The name of the user that will submit the form.
     */
    name?: string;

    /**
     * The title of the user that will submit the form.
     */
    title?: string;
  }

  export interface Link {
    /**
     * The URL of the link.
     */
    href?: string;

    /**
     * Specifies the type of link
     */
    rel?:
      | 'contract_url'
      | 'cdd_case_url'
      | 'dintero_cdd_case_url'
      | 'declaration_url'
      | 'signed_contract_file_url';
  }
}

export interface PayoutDestinationListResponse {
  payout_destinations?: Array<ApprovalsPayoutDestinationResponse>;
}

export interface PayoutDestinationCreateParams {
  /**
   * Bank account information about the seller. Currently the contract service only
   * supports one bank_account per payout destination.
   */
  bank_accounts: Array<PayoutDestinationCreateParams.BankAccount>;

  /**
   * Country code, must be a two letter ISO 3166-1-alpha-2 country code
   */
  country_code: string;

  /**
   * National organization number valid in the country specified.
   */
  organization_number: string;

  /**
   * ID of seller to create when the contract has been completed, signed, and
   * approved.
   */
  payout_destination_id: string;

  /**
   * A static reference that will be included on bank payments, the name of the
   * service the payout-destination will be enrolled into. Eg. if yor platform is an
   * "Uber for lawnmowers" called "Mowber" the payout_reference should be "Mowber".
   */
  payout_reference: string;

  /**
   * The user that will submit the form. If the email is set the user will be
   * notified about the form via email.
   */
  form_submitter?: PayoutDestinationCreateParams.FormSubmitter;

  /**
   * Description of the seller
   */
  payout_destination_description?: string;

  /**
   * The name of the seller
   */
  payout_destination_name?: string;

  /**
   * The interval of the payout. The interval can be `daily`, `weekly` or `monthly`.
   */
  payout_interval_type?: 'daily' | 'weekly' | 'monthly';
}

export namespace PayoutDestinationCreateParams {
  export interface BankAccount {
    /**
     * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
     */
    bank_account_currency: string;

    /**
     * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
     */
    payout_currency: string;

    /**
     * Country code, must be a two letter ISO 3166-1-alpha-2 country code. If not set
     * we default to the country_code of parent approval object.
     */
    bank_account_country_code?: string;

    /**
     * BBAN, national bank account number
     */
    bank_account_number?: string;

    /**
     * The type of bank account number. Will default to BBAN in bank_country_code is
     * norwegian. Will default to IBAN in all other countries.
     */
    bank_account_number_type?: 'IBAN' | 'BBAN';

    /**
     * A BIC code, or Bank Identifier Code also know as SWIFT code, consistin of 8 to
     * 11 alphanumeric characters.
     */
    bank_identification_code?: string;

    /**
     * Name of the Bank used
     */
    bank_name?: string;
  }

  /**
   * The user that will submit the form. If the email is set the user will be
   * notified about the form via email.
   */
  export interface FormSubmitter {
    /**
     * The email of the user that will submit the form.
     */
    email?: string;

    /**
     * The name of the user that will submit the form.
     */
    name?: string;

    /**
     * The title of the user that will submit the form.
     */
    title?: string;
  }
}

export interface PayoutDestinationListParams {
  /**
   * filter CDDs by status
   */
  case_status?: Array<
    | 'ACTIVE'
    | 'DECLINED'
    | 'UNDER_MANUAL_REVIEW'
    | 'AUTOMATIC_REVIEW'
    | 'WAITING_FOR_SIGNATURE'
    | 'WAITING_FOR_DECLARATION'
    | 'ERROR'
    | 'ARCHIVED'
  >;

  /**
   * filter CDDs by payout_destination_id
   */
  payout_destination_id?: string;
}

export declare namespace PayoutDestinations {
  export {
    type ApprovalsPayoutDestinationResponse as ApprovalsPayoutDestinationResponse,
    type PayoutDestinationListResponse as PayoutDestinationListResponse,
    type PayoutDestinationCreateParams as PayoutDestinationCreateParams,
    type PayoutDestinationListParams as PayoutDestinationListParams,
  };
}
