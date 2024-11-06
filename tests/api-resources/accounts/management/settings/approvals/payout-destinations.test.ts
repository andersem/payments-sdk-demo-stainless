// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SpecPayments from 'spec-payments-stainless-demo';
import { Response } from 'node-fetch';

const client = new SpecPayments({
  accessToken: 'My Access Token',
  apiKey: 'My API Key',
  adminKey: 'My Admin Key',
  clientId: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource payoutDestinations', () => {
  test('create: only required params', async () => {
    const responsePromise = client.accounts.management.settings.approvals.payoutDestinations.create(
      'xxxxxxxxx',
      {
        bank_accounts: [{ bank_account_currency: 'NOK', payout_currency: 'NOK' }],
        country_code: 'xx',
        organization_number: 'organization_number',
        payout_destination_id: 'payout_destination_id',
        payout_reference: 'payout_reference',
      },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.accounts.management.settings.approvals.payoutDestinations.create(
      'xxxxxxxxx',
      {
        bank_accounts: [
          {
            bank_account_currency: 'NOK',
            payout_currency: 'NOK',
            bank_account_country_code: 'xx',
            bank_account_number: 'bank_account_number',
            bank_account_number_type: 'IBAN',
            bank_identification_code: 'DNBANOKKXXX',
            bank_name: 'bank_name',
          },
        ],
        country_code: 'xx',
        organization_number: 'organization_number',
        payout_destination_id: 'payout_destination_id',
        payout_reference: 'payout_reference',
        form_submitter: { email: 'dev@stainlessapi.com', name: 'name', title: 'title' },
        payout_destination_description: 'payout_destination_description',
        payout_destination_name: 'payout_destination_name',
        payout_interval_type: 'daily',
      },
    );
  });

  test('list', async () => {
    const responsePromise =
      client.accounts.management.settings.approvals.payoutDestinations.list('xxxxxxxxx');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.management.settings.approvals.payoutDestinations.list('xxxxxxxxx', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(SpecPayments.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.management.settings.approvals.payoutDestinations.list(
        'xxxxxxxxx',
        {
          case_status: ['ACTIVE', 'DECLINED', 'UNDER_MANUAL_REVIEW'],
          payout_destination_id: 'payout_destination_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(SpecPayments.NotFoundError);
  });
});
