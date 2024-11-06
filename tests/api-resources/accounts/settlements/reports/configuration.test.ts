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

describe('resource configuration', () => {
  test('create: only required params', async () => {
    const responsePromise = client.accounts.settlements.reports.configuration.create('xxxxxxxxx', {
      destinations: [
        { destination_type: 'account_email' },
        { destination_type: 'account_email' },
        { destination_type: 'account_email' },
      ],
      filetypes: ['string', 'string', 'string'],
      providers: ['string', 'string', 'string'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.accounts.settlements.reports.configuration.create('xxxxxxxxx', {
      destinations: [
        { destination_type: 'account_email', id: 'id', destination_value: 'destination_value' },
        { destination_type: 'account_email', id: 'id', destination_value: 'destination_value' },
        { destination_type: 'account_email', id: 'id', destination_value: 'destination_value' },
      ],
      filetypes: ['string', 'string', 'string'],
      providers: ['string', 'string', 'string'],
      id: 'id',
      filters: [
        { filter: 'payout_destination_id', value: 'value' },
        { filter: 'payout_destination_id', value: 'value' },
        { filter: 'payout_destination_id', value: 'value' },
      ],
      send_every: 86400000,
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.accounts.settlements.reports.configuration.retrieve(
      'xxxxxxxxx',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.settlements.reports.configuration.retrieve(
        'xxxxxxxxx',
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(SpecPayments.NotFoundError);
  });

  test('update: only required params', async () => {
    const responsePromise = client.accounts.settlements.reports.configuration.update(
      'xxxxxxxxx',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
        destinations: [
          { destination_type: 'account_email' },
          { destination_type: 'account_email' },
          { destination_type: 'account_email' },
        ],
        filetypes: ['string', 'string', 'string'],
        providers: ['string', 'string', 'string'],
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

  test('update: required and optional params', async () => {
    const response = await client.accounts.settlements.reports.configuration.update(
      'xxxxxxxxx',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
        destinations: [
          { destination_type: 'account_email', id: 'id', destination_value: 'destination_value' },
          { destination_type: 'account_email', id: 'id', destination_value: 'destination_value' },
          { destination_type: 'account_email', id: 'id', destination_value: 'destination_value' },
        ],
        filetypes: ['string', 'string', 'string'],
        providers: ['string', 'string', 'string'],
        filters: [
          { filter: 'payout_destination_id', value: 'value' },
          { filter: 'payout_destination_id', value: 'value' },
          { filter: 'payout_destination_id', value: 'value' },
        ],
        send_every: 86400000,
      },
    );
  });

  test('list', async () => {
    const responsePromise = client.accounts.settlements.reports.configuration.list('xxxxxxxxx');
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
      client.accounts.settlements.reports.configuration.list('xxxxxxxxx', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(SpecPayments.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.accounts.settlements.reports.configuration.delete(
      'xxxxxxxxx',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.settlements.reports.configuration.delete(
        'xxxxxxxxx',
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(SpecPayments.NotFoundError);
  });
});
