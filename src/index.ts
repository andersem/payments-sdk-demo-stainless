// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as qs from './internal/qs';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  ID,
  Session,
  SessionCancelParams,
  SessionCancelResponse,
  SessionCancelled,
  SessionPayParams,
  SessionPayResponse,
  SessionPayResult,
  SessionPaymentTokenParams,
  SessionPaymentTokenResponse,
  SessionRead,
  SessionRetrieveParams,
  SessionRetrieveResponse,
  SessionUpdateParams,
  SessionUpdateResponse,
  Sessions,
} from './resources/sessions';
import {
  PublishConfiguration,
  SessionsProfileCreateParams,
  SessionsProfileCreateResponse,
  SessionsProfiles,
} from './resources/sessions-profiles';
import {
  Transaction,
  TransactionAuthorizationParams,
  TransactionCaptureParams,
  TransactionListParams,
  TransactionListResponse,
  TransactionRefundParams,
  TransactionRetrieveParams,
  TransactionUpdateParams,
  TransactionVoidParams,
  Transactions,
} from './resources/transactions';
import { Accounts } from './resources/accounts/accounts';
import { Branding } from './resources/branding/branding';
import {
  DiscountCodesOrderUpdate,
  ExampleDiscountCodeCallbackURLParams,
  ExampleDiscountCodeCallbackURLResponse,
  ExampleShippingAddressCallbackURLParams,
  ExampleShippingAddressCallbackURLResponse,
  Examples,
  ShippingAddressCallbackSessionOrderUpdate,
} from './resources/examples/examples';
import { V2 } from './resources/v2/v2';

export interface ClientOptions {
  /**
   * Defaults to process.env['SPEC_PAYMENTS_ACCESS_TOKEN'].
   */
  accessToken?: string | undefined;

  /**
   * Defaults to process.env['SPEC_PAYMENTS_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Defaults to process.env['SPEC_PAYMENTS_ADMIN_KEY'].
   */
  adminKey?: string | undefined;

  /**
   * Defaults to process.env['SPEC_PAYMENTS_CLIENT_ID'].
   */
  clientId?: string | undefined;

  /**
   * Defaults to process.env['SPEC_PAYMENTS_CLIENT_SECRET'].
   */
  clientSecret?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['SPEC_PAYMENTS_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/**
 * API Client for interfacing with the Spec Payments API.
 */
export class SpecPayments extends Core.APIClient {
  accessToken: string;
  apiKey: string;
  adminKey: string;
  clientId: string;
  clientSecret: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Spec Payments API.
   *
   * @param {string | undefined} [opts.accessToken=process.env['SPEC_PAYMENTS_ACCESS_TOKEN'] ?? undefined]
   * @param {string | undefined} [opts.apiKey=process.env['SPEC_PAYMENTS_API_KEY'] ?? undefined]
   * @param {string | undefined} [opts.adminKey=process.env['SPEC_PAYMENTS_ADMIN_KEY'] ?? undefined]
   * @param {string | undefined} [opts.clientId=process.env['SPEC_PAYMENTS_CLIENT_ID'] ?? undefined]
   * @param {string | undefined} [opts.clientSecret=process.env['SPEC_PAYMENTS_CLIENT_SECRET'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['SPEC_PAYMENTS_BASE_URL'] ?? /] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('SPEC_PAYMENTS_BASE_URL'),
    accessToken = Core.readEnv('SPEC_PAYMENTS_ACCESS_TOKEN'),
    apiKey = Core.readEnv('SPEC_PAYMENTS_API_KEY'),
    adminKey = Core.readEnv('SPEC_PAYMENTS_ADMIN_KEY'),
    clientId = Core.readEnv('SPEC_PAYMENTS_CLIENT_ID'),
    clientSecret = Core.readEnv('SPEC_PAYMENTS_CLIENT_SECRET'),
    ...opts
  }: ClientOptions = {}) {
    if (accessToken === undefined) {
      throw new Errors.SpecPaymentsError(
        "The SPEC_PAYMENTS_ACCESS_TOKEN environment variable is missing or empty; either provide it, or instantiate the SpecPayments client with an accessToken option, like new SpecPayments({ accessToken: 'My Access Token' }).",
      );
    }
    if (apiKey === undefined) {
      throw new Errors.SpecPaymentsError(
        "The SPEC_PAYMENTS_API_KEY environment variable is missing or empty; either provide it, or instantiate the SpecPayments client with an apiKey option, like new SpecPayments({ apiKey: 'My API Key' }).",
      );
    }
    if (adminKey === undefined) {
      throw new Errors.SpecPaymentsError(
        "The SPEC_PAYMENTS_ADMIN_KEY environment variable is missing or empty; either provide it, or instantiate the SpecPayments client with an adminKey option, like new SpecPayments({ adminKey: 'My Admin Key' }).",
      );
    }
    if (clientId === undefined) {
      throw new Errors.SpecPaymentsError(
        "The SPEC_PAYMENTS_CLIENT_ID environment variable is missing or empty; either provide it, or instantiate the SpecPayments client with an clientId option, like new SpecPayments({ clientId: 'My Client ID' }).",
      );
    }
    if (clientSecret === undefined) {
      throw new Errors.SpecPaymentsError(
        "The SPEC_PAYMENTS_CLIENT_SECRET environment variable is missing or empty; either provide it, or instantiate the SpecPayments client with an clientSecret option, like new SpecPayments({ clientSecret: 'My Client Secret' }).",
      );
    }

    const options: ClientOptions = {
      accessToken,
      apiKey,
      adminKey,
      clientId,
      clientSecret,
      ...opts,
      baseURL: baseURL || `/`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.accessToken = accessToken;
    this.apiKey = apiKey;
    this.adminKey = adminKey;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  sessionsProfiles: API.SessionsProfiles = new API.SessionsProfiles(this);
  sessions: API.Sessions = new API.Sessions(this);
  transactions: API.Transactions = new API.Transactions(this);
  accounts: API.Accounts = new API.Accounts(this);
  branding: API.Branding = new API.Branding(this);
  examples: API.Examples = new API.Examples(this);
  v2: API.V2 = new API.V2(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    const jwtAuth = this.jwtAuth(opts);
    const apikeyAuth = this.apikeyAuth(opts);
    const adminKeyAuth = this.adminKeyAuth(opts);
    const clientAuth = this.clientAuth(opts);

    if (apikeyAuth != null && !Core.isEmptyObj(apikeyAuth)) {
      return apikeyAuth;
    }
    return {};
  }

  protected jwtAuth(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: this.accessToken };
  }

  protected apikeyAuth(opts: Core.FinalRequestOptions): Core.Headers {
    return { 'x-api-key': this.apiKey };
  }

  protected adminKeyAuth(opts: Core.FinalRequestOptions): Core.Headers {
    return { 'x-api-key': this.adminKey };
  }

  protected clientAuth(opts: Core.FinalRequestOptions): Core.Headers {
    if (!this.clientId) {
      return {};
    }

    if (!this.clientSecret) {
      return {};
    }

    const credentials = `${this.clientId}:${this.clientSecret}`;
    const Authorization = `Basic ${Core.toBase64(credentials)}`;
    return { Authorization };
  }

  protected override stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'comma' });
  }

  static SpecPayments = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static SpecPaymentsError = Errors.SpecPaymentsError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

export {
  SpecPaymentsError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

SpecPayments.SessionsProfiles = SessionsProfiles;
SpecPayments.Sessions = Sessions;
SpecPayments.Transactions = Transactions;
SpecPayments.Accounts = Accounts;
SpecPayments.Branding = Branding;
SpecPayments.Examples = Examples;
SpecPayments.V2 = V2;

export declare namespace SpecPayments {
  export type RequestOptions = Core.RequestOptions;

  export {
    SessionsProfiles as SessionsProfiles,
    type PublishConfiguration as PublishConfiguration,
    type SessionsProfileCreateResponse as SessionsProfileCreateResponse,
    type SessionsProfileCreateParams as SessionsProfileCreateParams,
  };

  export {
    Sessions as Sessions,
    type ID as ID,
    type Session as Session,
    type SessionCancelled as SessionCancelled,
    type SessionPayResult as SessionPayResult,
    type SessionRead as SessionRead,
    type SessionRetrieveResponse as SessionRetrieveResponse,
    type SessionUpdateResponse as SessionUpdateResponse,
    type SessionCancelResponse as SessionCancelResponse,
    type SessionPayResponse as SessionPayResponse,
    type SessionPaymentTokenResponse as SessionPaymentTokenResponse,
    type SessionRetrieveParams as SessionRetrieveParams,
    type SessionUpdateParams as SessionUpdateParams,
    type SessionCancelParams as SessionCancelParams,
    type SessionPayParams as SessionPayParams,
    type SessionPaymentTokenParams as SessionPaymentTokenParams,
  };

  export {
    Transactions as Transactions,
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

  export { Accounts as Accounts };

  export { Branding as Branding };

  export {
    Examples as Examples,
    type DiscountCodesOrderUpdate as DiscountCodesOrderUpdate,
    type ShippingAddressCallbackSessionOrderUpdate as ShippingAddressCallbackSessionOrderUpdate,
    type ExampleDiscountCodeCallbackURLResponse as ExampleDiscountCodeCallbackURLResponse,
    type ExampleShippingAddressCallbackURLResponse as ExampleShippingAddressCallbackURLResponse,
    type ExampleDiscountCodeCallbackURLParams as ExampleDiscountCodeCallbackURLParams,
    type ExampleShippingAddressCallbackURLParams as ExampleShippingAddressCallbackURLParams,
  };

  export { V2 as V2 };
}

export default SpecPayments;
