// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';

export class Metadata extends APIResource {
  /**
   * Get list of report metadata for the account
   *
   * Scopes:
   *
   * - read:reports
   * - admin:reports
   */
  list(
    aid: string,
    query?: MetadataListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetadataListResponse>;
  list(aid: string, options?: Core.RequestOptions): Core.APIPromise<MetadataListResponse>;
  list(
    aid: string,
    query: MetadataListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<MetadataListResponse> {
    if (isRequestOptions(query)) {
      return this.list(aid, {}, query);
    }
    return this._client.get(`/accounts/${aid}/reports/metadata`, { query, ...options });
  }
}

/**
 * cursor for use in pagination. starting_after is an object ID that defines your
 * place in the list. For instance, if you make a list request and receive 100
 * objects, ending with `obj_foo`, your subsequent call can include
 * `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export type StartingAfter = string;

export interface MetadataListResponse {
  reports?: Array<MetadataListResponse.Report>;

  /**
   * cursor for use in pagination. starting_after is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, ending with `obj_foo`, your subsequent call can include
   * `starting_after=obj_foo` in order to fetch the next page of the list.
   */
  starting_after?: StartingAfter;
}

export namespace MetadataListResponse {
  export interface Report {
    /**
     * Unique identification of the report
     */
    id?: string;

    /**
     * Id of the report owner
     */
    account_id?: string;

    /**
     * Report content language
     */
    content_language?: string;

    /**
     * Report content type
     */
    content_type?: string;

    /**
     * The date-time when the report was created
     */
    created_at?: string;

    /**
     * The ID of the user/client that created the report
     */
    created_by?: string;

    /**
     * Custom name of the report, defined in the report configuration used to generate
     * the report
     */
    custom_report_name?: string;

    /**
     * The start of the data interval, contains created_at if data_from qparam not
     * provided
     */
    data_from?: string;

    /**
     * The end of the data interval, contains created_at if data_to qparam not provided
     */
    data_to?: string;

    /**
     * Source of the data used to generate the report. Defined by the report
     * configuration used to create the report
     */
    data_type?: string;

    /**
     * Id of the report configuration used to generate the report.
     */
    report_config_id?: string;

    /**
     * Name of the report file stored in S3.
     */
    report_file_name?: string;

    /**
     * List of filters used to filter the data for the report. Similar to SQL
     * WHERE-clause. i.e, WHERE filter=value
     */
    report_filters?: Array<Report.ReportFilter>;

    /**
     * Unique identification for all reports created by the same reportconfig at the
     * same time (with different content types)
     */
    report_job_id?: string;

    /**
     * Schedule for the report
     */
    schedule?: string;

    /**
     * Signed url used to download the report from s3
     */
    signed_url?: string;

    /**
     * Id of the template used to create the report
     */
    template_id?: string;
  }

  export namespace Report {
    export interface ReportFilter {
      /**
       * The "field/column" the data will be filtered on
       */
      filter?: 'operation_payout_destination' | 'store_id';

      /**
       * The value the records must contain for the provided filter (field/column)
       */
      value?: string;
    }
  }
}

export interface MetadataListParams {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100 items, and the default is 10 items.
   */
  limit?: number;

  /**
   * cursor for use in pagination. starting_after is an object ID that defines your
   * place in the list. For instance, if you make a list request and receive 100
   * objects, end the result contains `paging_token=pt1`, your subsequent call can
   * include `starting_after=pt1` in order to fetch the next page of the list.
   */
  starting_after?: string;
}

export declare namespace Metadata {
  export {
    type StartingAfter as StartingAfter,
    type MetadataListResponse as MetadataListResponse,
    type MetadataListParams as MetadataListParams,
  };
}
