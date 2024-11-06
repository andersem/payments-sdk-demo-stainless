// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../resource';
import * as Core from '../../../../core';

export class Configuration extends APIResource {
  /**
   * Create settlement report configurations
   *
   * _scopes_:
   *
   * - admin:billing
   * - admin:reports
   * - admin:settlements
   * - write:settlements
   */
  create(
    aid: string,
    body: ConfigurationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SettlementReportConfigItem> {
    return this._client.post(`/accounts/${aid}/settlements/reports/configuration`, { body, ...options });
  }

  /**
   * Get settlement report configuration
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
  retrieve(
    aid: string,
    id: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SettlementReportConfigItem> {
    return this._client.get(`/accounts/${aid}/settlements/reports/configuration/${id}`, options);
  }

  /**
   * Update settlement report configuration
   *
   * _scopes_:
   *
   * - admin:billing
   * - write:billing
   * - admin:settlements
   * - write:settlements
   */
  update(
    aid: string,
    id: string,
    body: ConfigurationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SettlementReportConfigItem> {
    return this._client.put(`/accounts/${aid}/settlements/reports/configuration/${id}`, { body, ...options });
  }

  /**
   * List settlement report configurations
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
  list(aid: string, options?: Core.RequestOptions): Core.APIPromise<SettlementReportConfigResponse> {
    return this._client.get(`/accounts/${aid}/settlements/reports/configuration`, options);
  }

  /**
   * Delete settlement report configuration
   *
   * _scopes_:
   *
   * - admin:billing
   * - write:billing
   * - admin:settlements
   * - write:settlements
   */
  delete(
    aid: string,
    id: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SettlementReportConfigItem> {
    return this._client.delete(`/accounts/${aid}/settlements/reports/configuration/${id}`, options);
  }
}

export interface SettlementReportConfigItem {
  /**
   * List of destinations. If empty, the report is just stored and visible from the
   * backoffice.
   */
  destinations: Array<SettlementReportConfigItem.Destination>;

  /**
   * The filetypes that should be sent
   */
  filetypes: Array<string>;

  /**
   * List of providers to send report for. If empty, send for all.
   */
  providers: Array<string>;

  id?: string;

  account_id?: string;

  /**
   * The date-time when the resource was created
   */
  created_at?: string;

  /**
   * The report will only be sent to the provided destinations if it satisfies these
   * criterias.
   */
  filters?: Array<SettlementReportConfigItem.Filter>;

  /**
   * **Deprecated** report configuration is not used for controlling when to create
   * and send report
   *
   * Value in milliseconds (Unix epoch) describing when last time reports was
   * modified.
   */
  last_modified_at?: number;

  /**
   * **Deprecated** report configuration is not used for controlling when to create
   * and send report
   *
   * Value in milliseconds (Unix epoch) describing when last time reports was sent.
   */
  last_send_at?: number;

  /**
   * **Deprecated** report configuration is not used for controlling when to create
   * and send report
   *
   * Value in milliseconds describing how often reports should be sent.
   */
  send_every?: number;

  /**
   * The date-time when the resource was last updated
   */
  updated_at?: string;
}

export namespace SettlementReportConfigItem {
  export interface Destination {
    /**
     * Specifies the type of destination.
     *
     * - account_email: Send email to the billing email address registered on the
     *   account
     * - email: Send email to the email address specified in `destination_value`
     */
    destination_type: 'account_email' | 'email';

    id?: string;

    /**
     * If destination_type is email, the email address goes here
     */
    destination_value?: string;
  }

  export interface Filter {
    /**
     * The "field/column" the data will be filtered on
     */
    filter?: 'payout_destination_id';

    /**
     * The value the records must contain for the provided filter (field/column)
     */
    value?: string;
  }
}

export interface SettlementReportConfigResponse {
  items?: Array<SettlementReportConfigItem>;
}

export interface ConfigurationCreateParams {
  /**
   * List of destinations. If empty, the report is just stored and visible from the
   * backoffice.
   */
  destinations: Array<ConfigurationCreateParams.Destination>;

  /**
   * The filetypes that should be sent
   */
  filetypes: Array<string>;

  /**
   * List of providers to send report for. If empty, send for all.
   */
  providers: Array<string>;

  id?: string;

  /**
   * The report will only be sent to the provided destinations if it satisfies these
   * criterias.
   */
  filters?: Array<ConfigurationCreateParams.Filter>;

  /**
   * **Deprecated** report configuration is not used for controlling when to create
   * and send report
   *
   * Value in milliseconds describing how often reports should be sent.
   */
  send_every?: number;
}

export namespace ConfigurationCreateParams {
  export interface Destination {
    /**
     * Specifies the type of destination.
     *
     * - account_email: Send email to the billing email address registered on the
     *   account
     * - email: Send email to the email address specified in `destination_value`
     */
    destination_type: 'account_email' | 'email';

    id?: string;

    /**
     * If destination_type is email, the email address goes here
     */
    destination_value?: string;
  }

  export interface Filter {
    /**
     * The "field/column" the data will be filtered on
     */
    filter?: 'payout_destination_id';

    /**
     * The value the records must contain for the provided filter (field/column)
     */
    value?: string;
  }
}

export interface ConfigurationUpdateParams {
  /**
   * List of destinations. If empty, the report is just stored and visible from the
   * backoffice.
   */
  destinations: Array<ConfigurationUpdateParams.Destination>;

  /**
   * The filetypes that should be sent
   */
  filetypes: Array<string>;

  /**
   * List of providers to send report for. If empty, send for all.
   */
  providers: Array<string>;

  /**
   * The report will only be sent to the provided destinations if it satisfies these
   * criterias.
   */
  filters?: Array<ConfigurationUpdateParams.Filter>;

  /**
   * **Deprecated** report configuration is not used for controlling when to create
   * and send report
   *
   * Value in milliseconds describing how often reports should be sent.
   */
  send_every?: number;
}

export namespace ConfigurationUpdateParams {
  export interface Destination {
    /**
     * Specifies the type of destination.
     *
     * - account_email: Send email to the billing email address registered on the
     *   account
     * - email: Send email to the email address specified in `destination_value`
     */
    destination_type: 'account_email' | 'email';

    id?: string;

    /**
     * If destination_type is email, the email address goes here
     */
    destination_value?: string;
  }

  export interface Filter {
    /**
     * The "field/column" the data will be filtered on
     */
    filter?: 'payout_destination_id';

    /**
     * The value the records must contain for the provided filter (field/column)
     */
    value?: string;
  }
}

export declare namespace Configuration {
  export {
    type SettlementReportConfigItem as SettlementReportConfigItem,
    type SettlementReportConfigResponse as SettlementReportConfigResponse,
    type ConfigurationCreateParams as ConfigurationCreateParams,
    type ConfigurationUpdateParams as ConfigurationUpdateParams,
  };
}
