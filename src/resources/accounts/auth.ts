// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Auth extends APIResource {
  /**
   * Use this endpoint to directly request an access_token
   *
   * ### Client Access Token
   *
   * Use HTTP Basic authentication scheme for authenticating grant_type
   * `client_credentials`, use client_id/client_secret as user/password.
   *
   * ### Code/Password Token
   *
   * Use HTTP Bearer authentication scheme for authenticating grant_type
   * `authorization_code` or `password`, where the Bearer value must be a JWT toke
   * with access to the token endpoint.
   *
   * ### Account User Token
   *
   * Use HTTP Bearer authentication scheme for authenticating grant_type
   * `account_user_token`, where the Bearer value must be a account user JWT token.
   *
   * > Use ID token as Bearer toke if the user was authenticated externally. The ID
   * > must include a `email` claim that identifies the account user.
   *
   * ### Refresh Token
   *
   * Use HTTP Bearer authentication scheme for authenticating grant_type
   * `refresh_token` where the Bearer value **must** be an Access Token for the
   * clients that was used to create the Refresh Token.
   *
   * ### Multi-factor authentication (MFA)
   *
   * When a request is made to the endpoint to get an access token, normally you
   * either get an error, or you get an access token. However, when the MFA is
   * enabled, the endpoint may return a new error with `error.code: mfa_required`.
   *
   * When an `mfa_required` error is returned, the client must perform a `challenge`.
   * This is done by sending a request to the
   * [auth/mfa/challenge](#operation/aid_auth_mfa_challenge_post) endpoint
   *
   * To verify MFA using an OOB challenge, the client must make a request to this
   * endpoint with `grant_type=mfa-oob`. Include the `oob_code` you received from the
   * challenge response, as well as the `mfa_token` you received as part of
   * mfa_required error.
   *
   * scopes:
   *
   * - admin:accounts
   * - write:accounts
   * - write:accounts:/auth/users
   * - write:accounts:/auth/users/no-mfa
   */
  token(oid: string, body: AuthTokenParams, options?: Core.RequestOptions): Core.APIPromise<AccessToken> {
    return this._client.post(`/accounts/${oid}/auth/token`, { body, ...options });
  }
}

export interface AccessToken {
  /**
   * A JWT access token
   */
  access_token: string;

  /**
   * The lifetime in seconds of the access token. For example, the value "3600"
   * denotes that the access token will expire in one hour from the time the response
   * was generated.
   */
  expires_in: number;

  token_type: 'Bearer';

  /**
   * Token that can be used to request new tokens when the existing Access Token
   * expire.
   *
   * You can only get a Refresh Token if the Access Token used in the request has
   * scope:
   *
   * - `create:accounts:auth:refresh_token`
   *
   * and the `grant-type` is one of:
   *
   * - `authorization_code`
   * - `password`
   *
   * **NOTE**:
   *
   * - A Single-Page Application should not ever receive a Refresh Token, this
   *   information is sensitive and should not be exposed client-side in a browser.
   * - Refresh token must be stored securely by an application since they allow a
   *   user to remain authenticated essentially forever.
   */
  refresh_token?: string;
}

export interface AuthTokenParams {
  grant_type: string;
}

export declare namespace Auth {
  export { type AccessToken as AccessToken, type AuthTokenParams as AuthTokenParams };
}
