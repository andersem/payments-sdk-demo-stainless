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

describe('resource settlements', () => {
  test('list', async () => {
    const responsePromise = client.accounts.settlements.list('xxxxxxxxx');
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
      client.accounts.settlements.list('xxxxxxxxx', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(SpecPayments.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.settlements.list(
        'xxxxxxxxx',
        {
          created_at: { gte: '2019-12-27', lte: '2019-12-27' },
          limit: 1,
          payment_provider: ['string', 'string', 'string'],
          payout_destination_id: 'payout_destination_id',
          search: 'search',
          starting_after_date: 'starting_after_date',
          starting_after_id: 'starting_after_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(SpecPayments.NotFoundError);
  });
});
