// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as SessionsProfilesAPI from '../sessions-profiles';
import * as SessionURLCallbackAPI from './session-url-callback';
import {
  SessionURLCallback,
  SessionURLCallbackCreateParams,
  SessionURLCallbackCreateResponse,
  SessionURLCallbackRetrieveParams,
  SessionURLCallbackRetrieveResponse,
} from './session-url-callback';

export class Examples extends APIResource {
  sessionURLCallback: SessionURLCallbackAPI.SessionURLCallback = new SessionURLCallbackAPI.SessionURLCallback(
    this._client,
  );

  /**
   * This API endpoint on the merchant side allows Dintero to get shipping_options
   * and order with discounts based on the provided session that had its
   * `order.discount_codes` updated.
   */
  discountCodeCallbackURL(
    body: ExampleDiscountCodeCallbackURLParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExampleDiscountCodeCallbackURLResponse> {
    return this._client.post('/examples/discount_code_callback_url', { body, ...options });
  }

  /**
   * This API endpoint on the merchant side allows Dintero to get shipping options
   * based on the provided session after an address update
   */
  shippingAddressCallbackURL(
    body: ExampleShippingAddressCallbackURLParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExampleShippingAddressCallbackURLResponse> {
    return this._client.post('/examples/shipping_address_callback_url', { body, ...options });
  }
}

/**
 * Order updated with discount given by discount_code.
 */
export interface DiscountCodesOrderUpdate {
  /**
   * The amount to authorize/capture including VAT and discounts. In smallest unit
   * for the currency, e.g. cents
   */
  amount: number;

  discount_codes?: Array<string>;

  /**
   * Items with discount lines.
   *
   * - The list must include all items in the session order
   * - **Required** if the session order has any items.
   */
  items?: Array<DiscountCodesOrderUpdate.Item>;
}

export namespace DiscountCodesOrderUpdate {
  export interface Item {
    /**
     * The ID or SKU of the product on the line
     */
    id?: string;

    /**
     * The total monetary amount of the line item, including VAT and discounts.
     *
     * In smallest unit for the currency, e.g. cents
     */
    amount?: number;

    /**
     * A short, localized description of the line item
     */
    description?: string;

    discount_lines?: Array<unknown>;

    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    emd?: Item.Emd;

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    fee_split?: Item.FeeSplit;

    /**
     * The groups the product on the line belongs to
     */
    groups?: Array<Item.Group>;

    /**
     * the number of the line (or id), must be `unique` between all items. `required`
     * when Instabank payment is configured.
     */
    line_id?: string;

    /**
     * The quantity of the product in the item line.
     */
    quantity?: number;

    /**
     * An array of objects specifying how the amount should be split between sellers
     * when using Dintero Payout
     *
     * Specify an empty array if the splits will be provided during capture.
     * `auto_capture` cannot be enabled when splits are defined as empty array.
     */
    splits?: Array<Item.Split>;

    /**
     * URL to a thumbnail of the item. Will be displayed when redirecting to the
     * session.
     *
     * Recommended limitations for the image:
     *
     * - all images should preferrably have the same dimensions
     * - max file size should be less than 2MB
     */
    thumbnail_url?: string;

    /**
     * The type of order item this is.
     *
     * - **physical** - a physical item which must be delivered or handed over
     * - **digital** - a digital item which doesn't need shipping
     * - **service** - payment for services like maintenance performed in your home
     * - **gift_card** - usage of a gift card, where the amount is usually a negative
     *   number
     * - **shipping** - payment for shipping of the order
     * - **surcharge** - extra incurred costs, like taxes or necessary rounding
     */
    type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

    /**
     * The dimensional weight (also known as volumetric) value unit of one item.
     * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
     */
    unit_dimensional_weight?: number;

    /**
     * The volume of one item in m³ (cubic meters)
     */
    unit_volume?: number;

    /**
     * The volume of one item in kg (kilo grams)
     */
    unit_weight?: number;

    /**
     * The VAT percentage
     */
    vat?: number;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     *
     * In smallest unit for the currency, e.g. cents
     */
    vat_amount?: number;

    /**
     * The version where the item was added or last updated, see the events for the
     * source.
     */
    version?: number;
  }

  export namespace Item {
    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    export interface Emd {
      /**
       * Only required if the item is related to an event or multiple events, like for
       * example tickets to a concert.
       *
       * If you are selling an event package as a single ticket or item that includes
       * multiple events, for example a festival, you need to provide information about
       * all the individual events that are part of the package.
       */
      event?: Array<Emd.Event>;

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      marketplace_order?: Emd.MarketplaceOrder;

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      subscription?: Emd.Subscription;

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      travel?: Emd.Travel;
    }

    export namespace Emd {
      export interface Event {
        /**
         * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        end_time: string;

        /**
         * Name of the company arranging the event, e.g. "Happy Parties Ltd."
         */
        event_company: string;

        /**
         * Name of the event, e.g. "Fancy Singer"
         */
        event_name: string;

        /**
         * Category or type of venue, e.g. "Pop"
         */
        genre_of_event: string;

        /**
         * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        start_time: string;

        ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

        /**
         * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
         *
         * If email or phone, then use either the email address or the phone number
         * respectively.
         */
        ticket_delivery_recipient: string;

        /**
         * If tickets are digitally checked when entering the venue, e.g. true
         */
        access_controlled_venue?: boolean;

        /**
         * Name of the affiliate that originated the purchase.
         */
        affiliate_name?: string;

        arena_location?: Event.ArenaLocation;

        /**
         * Name of the venue, e.g. "Song Arena"
         */
        arena_name?: string;
      }

      export namespace Event {
        export interface ArenaLocation {
          /**
           * City that the venue is located in, e.g. "Oslo"
           */
          city: string;

          /**
           * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
           */
          country: string;

          /**
           * Postal code for the venue location, e.g. "0185"
           */
          postal_code?: string;

          /**
           * Street address representing the venue location, e.g. "Sonja Henies plass 2"
           */
          street_address?: string;
        }
      }

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      export interface MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        seller_info: MarketplaceOrder.SellerInfo;

        /**
         * Details related to the winner involved in the marketplace order.
         */
        winner_info: MarketplaceOrder.WinnerInfo;
      }

      export namespace MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        export interface SellerInfo {
          account_last_modified: SellerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the sub-merchant did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Name of the category to which the specific good belongs to, according to the
           * selling merchant's categorization, e.g. "Phones".
           */
          product_category: string;

          /**
           * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
           * Ltd."
           */
          sub_merchant_id: string;

          /**
           * Name of the good purchased.
           */
          product_name?: string;

          /**
           * Current rating of the good purchased according to the marketplace's rating
           * scale, e.g. 5
           */
          seller_rating?: number;

          /**
           * Details about the seller.
           */
          unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

          /**
           * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace SellerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the seller.
           */
          export interface UniqueAccountIdentifierSeller {
            /**
             * Seller's email address, e.g. "seller@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Seller's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }

        /**
         * Details related to the winner involved in the marketplace order.
         */
        export interface WinnerInfo {
          account_last_modified: WinnerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the winner did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Details about the winner.
           */
          unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

          /**
           * Volumes of trades the winner did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace WinnerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the winner.
           */
          export interface UniqueAccountIdentifierWinner {
            /**
             * Winner's email address, e.g. "winner@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Winner's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }
      }

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      export interface Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        customer_account_info: Subscription.CustomerAccountInfo;

        /**
         * Details related to the subscription.
         */
        subscription: Subscription.Subscription;
      }

      export namespace Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        export interface CustomerAccountInfo {
          /**
           * The date and time the account was last modified (ISO 8601 format), e.g.
           * "2023-10-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_last_modified: string;

          /**
           * The date and time the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Unique name / number to identify the specific customer account. Max 24
           * characters, e.g. "Adam Adamsson"
           */
          unique_account_identifier: string;
        }

        /**
         * Details related to the subscription.
         */
        export interface Subscription {
          /**
           * Whether the subscription will be auto renewed upon expiry, e.g. true
           */
          auto_renewal_of_subscription: boolean;

          /**
           * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          end_time: string;

          /**
           * The start time of the subscription (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          start_time: string;

          /**
           * Name of the product on subscription, e.g. "Contact lenses"
           */
          subscription_name: string;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;
        }
      }

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      export interface Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        air_reservation_details?: Travel.AirReservationDetails;

        /**
         * Details about the reservation of bus tickets.
         */
        bus_reservation_details?: Travel.BusReservationDetails;

        /**
         * Details about the reservation of rental cars.
         */
        car_rental_reservation_details?: Travel.CarRentalReservationDetails;

        /**
         * Details about the reservation of ferry tickets.
         */
        ferry_reservation_details?: Travel.FerryReservationDetails;

        /**
         * Details about the reservation of hotel rooms.
         */
        hotel_reservation_details?: Travel.HotelReservationDetails;

        /**
         * Details about the reservation of train tickets.
         */
        train_reservation_details?: Travel.TrainReservationDetails;
      }

      export namespace Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        export interface AirReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one flight from Oslo to Munich, and
           * another flight from Munich to Dubai, you need to provide one itinerary object
           * for each of these two flights, and so on.
           */
          itinerary: Array<AirReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<AirReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<AirReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace AirReservationDetails {
          export interface Itinerary {
            /**
             * IATA Airport Code (three letters), e.g. "MUC"
             */
            arrival: string;

            /**
             * IATA Airline standard (two letters or digits), e.g. "LH"
             */
            carrier: string;

            /**
             * IATA Airport Code (three letters), e.g. "OSL"
             */
            departure: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * City the flight arrives in, e.g. "Munich"
             */
            arrival_city?: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * City the flight departs from, e.g. "Oslo"
             */
            departure_city?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the flight in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of bus tickets.
         */
        export interface BusReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one bus journey from Oslo to Munich,
           * and another bus journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two bus journeys, and so on.
           */
          itinerary: Array<BusReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<BusReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<BusReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace BusReservationDetails {
          export interface Itinerary {
            /**
             * City the bus arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Bus Travels Ltd."
             */
            carrier: string;

            /**
             * City the bus departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the bus journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of rental cars.
         */
        export interface CarRentalReservationDetails {
          /**
           * Driver data, one per driver.
           */
          drivers: Array<CarRentalReservationDetails.Driver>;

          /**
           * Car rental itinerary data, one per car rental.
           *
           * If you are selling a package that contains multiple car rentals, you need to
           * provide itinerary data for each of the individual rentals.
           */
          itinerary: Array<CarRentalReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<CarRentalReservationDetails.Insurance>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace CarRentalReservationDetails {
          export interface Driver {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }

          export interface Itinerary {
            /**
             * End time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Name of the car rental company, e.g. "Premium Cars Ltd."
             */
            rental_company: string;

            /**
             * Start time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            /**
             * Price for the car rental reservation in smallest unit of local currency, e.g.
             * 500000
             */
            car_price?: number;

            /**
             * Travel class, e.g. "Premium Cars Premium Class"
             */
            class?: string;

            /**
             * Driver IDs.
             */
            drivers_id?: Array<number>;

            /**
             * Details related to the drop off location.
             */
            drop_off_location?: Itinerary.DropOffLocation;

            /**
             * Details related to the pick up location.
             */
            pick_up_location?: Itinerary.PickUpLocation;
          }

          export namespace Itinerary {
            /**
             * Details related to the drop off location.
             */
            export interface DropOffLocation {
              /**
               * City where the car should be dropped off, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
               * "NO"
               */
              country: string;

              /**
               * Postal code where the car should be dropped off, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }

            /**
             * Details related to the pick up location.
             */
            export interface PickUpLocation {
              /**
               * City where the car should be picked up, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
               * "NO",
               */
              country: string;

              /**
               * Postal code where the car should be picked up, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }
        }

        /**
         * Details about the reservation of ferry tickets.
         */
        export interface FerryReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
           * and another ferry journey from Kiel to Gothenburg, you need to provide one
           * itinerary object for each of these two ferry journeys, and so on.
           */
          itinerary: Array<FerryReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<FerryReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<FerryReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace FerryReservationDetails {
          export interface Itinerary {
            /**
             * City the ferry arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Ferry Travels Ltd."
             */
            carrier: string;

            /**
             * City the ferry departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the ferry journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of hotel rooms.
         */
        export interface HotelReservationDetails {
          /**
           * Hotel itinerary data, one per hotel stay.
           *
           * If you are selling a package that contains multiple hotel stays, you need to
           * provide itinerary data for each of the individual stays.
           */
          itinerary: Array<HotelReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<HotelReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<HotelReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace HotelReservationDetails {
          export interface Itinerary {
            /**
             * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Price for the hotel stay in smallest unit of local currency, e.g. 200000
             */
            hotel_price: number;

            /**
             * Number of rooms booked, e.g. 2
             */
            number_of_rooms: number;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            /**
             * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Address details of the hotel.
             */
            address?: Itinerary.Address;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Name of the hotel, e.g. "Premium Hotel"
             */
            hotel_name?: string;
          }

          export namespace Itinerary {
            /**
             * Address details of the hotel.
             */
            export interface Address {
              /**
               * City the hotel is located in, e.g. "Oslo"
               */
              city: string;

              /**
               * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
               */
              country: string;

              /**
               * Postal code of the hotel, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address of the hotel, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of train tickets.
         */
        export interface TrainReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one train journey from Oslo to Munich,
           * and another train journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two train journeys, and so on.
           */
          itinerary: Array<TrainReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<TrainReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<TrainReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace TrainReservationDetails {
          export interface Itinerary {
            /**
             * City the train arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Train Travels Ltd."
             */
            carrier: string;

            /**
             * City the train departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Price for that specific segment of the train journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }
      }
    }

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    export interface FeeSplit {
      type: 'proportional';

      /**
       * Seller ids that will be debited for the payment fees All destinations must be
       * included in the list of splits
       */
      destinations?: Array<string>;
    }

    export interface Group {
      /**
       * Group ID
       */
      id: string;

      /**
       * Group name
       */
      name?: string;
    }

    export interface Split {
      /**
       * The split amount in smalles unit for the currency, e.g. cents.
       */
      amount: number;

      /**
       * An id that identifies the seller
       */
      payout_destination_id: string;
    }
  }
}

/**
 * Updates to session order. If the amount is not equal to sum of items.amount and
 * the shipping_option.amount from the request are not equal a correction item will
 * be added to the items.
 */
export interface ShippingAddressCallbackSessionOrderUpdate {
  /**
   * The amount to authorize/capture including VAT and discounts. In smallest unit
   * for the currency, e.g. cents
   */
  amount: number;

  /**
   * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
   */
  currency?: string;

  discount_codes?: Array<string>;

  /**
   * Details about the order items.
   *
   * #### Instabank
   *
   * `required` if Instabank payment is configured in and partial_payment is false.
   * All items must include a unique `line_id`, quantity and amount
   *
   * #### Collector Bank
   *
   * `required` if Collector Bank payment is configured in and partial_payment is
   * false. All items must include a unique `line_id`, quantity and amount
   */
  items?: Array<ShippingAddressCallbackSessionOrderUpdate.Item>;

  /**
   * The VAT of the `amount` parameter. Only used for display purposes.
   *
   * In smallest unit for the currency, e.g. cents
   */
  vat_amount?: number;
}

export namespace ShippingAddressCallbackSessionOrderUpdate {
  export interface Item {
    /**
     * The ID or SKU of the product on the line
     */
    id?: string;

    /**
     * The total monetary amount of the line item, including VAT and discounts.
     *
     * In smallest unit for the currency, e.g. cents
     */
    amount?: number;

    /**
     * A short, localized description of the line item
     */
    description?: string;

    discount_lines?: Array<Item.DiscountLine>;

    /**
     * The item is eligible for discount
     */
    eligible_for_discount?: boolean;

    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    emd?: Item.Emd;

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    fee_split?: Item.FeeSplit;

    /**
     * The origin item amount before any discount
     */
    gross_amount?: number;

    /**
     * The groups the product on the line belongs to
     */
    groups?: Array<Item.Group>;

    /**
     * Discount applied to amount
     */
    is_changed?: boolean;

    /**
     * the number of the line (or id), must be `unique` between all items. `required`
     * when Instabank payment is configured.
     */
    line_id?: string;

    /**
     * The quantity of the product in the item line.
     */
    quantity?: number;

    /**
     * An array of objects specifying how the amount should be split between sellers
     * when using Dintero Payout
     *
     * Specify an empty array if the splits will be provided during capture.
     * `auto_capture` cannot be enabled when splits are defined as empty array.
     */
    splits?: Array<Item.Split>;

    /**
     * URL to a thumbnail of the item. Will be displayed when redirecting to the
     * session.
     *
     * Recommended limitations for the image:
     *
     * - all images should preferrably have the same dimensions
     * - max file size should be less than 2MB
     */
    thumbnail_url?: string;

    /**
     * The type of order item this is.
     *
     * - **physical** - a physical item which must be delivered or handed over
     * - **digital** - a digital item which doesn't need shipping
     * - **service** - payment for services like maintenance performed in your home
     * - **gift_card** - usage of a gift card, where the amount is usually a negative
     *   number
     * - **shipping** - payment for shipping of the order
     * - **surcharge** - extra incurred costs, like taxes or necessary rounding
     */
    type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

    /**
     * The dimensional weight (also known as volumetric) value unit of one item.
     * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
     */
    unit_dimensional_weight?: number;

    /**
     * The volume of one item in m³ (cubic meters)
     */
    unit_volume?: number;

    /**
     * The volume of one item in kg (kilo grams)
     */
    unit_weight?: number;

    /**
     * The VAT percentage
     */
    vat?: number;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     *
     * In smallest unit for the currency, e.g. cents
     */
    vat_amount?: number;

    /**
     * The version where the item was added or last updated, see the events for the
     * source.
     */
    version?: number;
  }

  export namespace Item {
    export interface DiscountLine {
      /**
       * Monetary amount in smallest unit for the currency
       */
      amount?: number;

      description?: string;

      discount_id?: string;

      discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

      line_id?: number;

      /**
       * Optional, set if the amount given was from a percentage discount
       */
      percentage?: number;
    }

    /**
     * Details related to
     * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
     *
     * Some items require extra information to be provided when using Klarna as an
     * enabled payment option.
     */
    export interface Emd {
      /**
       * Only required if the item is related to an event or multiple events, like for
       * example tickets to a concert.
       *
       * If you are selling an event package as a single ticket or item that includes
       * multiple events, for example a festival, you need to provide information about
       * all the individual events that are part of the package.
       */
      event?: Array<Emd.Event>;

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      marketplace_order?: Emd.MarketplaceOrder;

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      subscription?: Emd.Subscription;

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      travel?: Emd.Travel;
    }

    export namespace Emd {
      export interface Event {
        /**
         * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        end_time: string;

        /**
         * Name of the company arranging the event, e.g. "Happy Parties Ltd."
         */
        event_company: string;

        /**
         * Name of the event, e.g. "Fancy Singer"
         */
        event_name: string;

        /**
         * Category or type of venue, e.g. "Pop"
         */
        genre_of_event: string;

        /**
         * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
         *
         * If a timezone is not specified we assume UTC.
         */
        start_time: string;

        ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

        /**
         * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
         *
         * If email or phone, then use either the email address or the phone number
         * respectively.
         */
        ticket_delivery_recipient: string;

        /**
         * If tickets are digitally checked when entering the venue, e.g. true
         */
        access_controlled_venue?: boolean;

        /**
         * Name of the affiliate that originated the purchase.
         */
        affiliate_name?: string;

        arena_location?: Event.ArenaLocation;

        /**
         * Name of the venue, e.g. "Song Arena"
         */
        arena_name?: string;
      }

      export namespace Event {
        export interface ArenaLocation {
          /**
           * City that the venue is located in, e.g. "Oslo"
           */
          city: string;

          /**
           * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
           */
          country: string;

          /**
           * Postal code for the venue location, e.g. "0185"
           */
          postal_code?: string;

          /**
           * Street address representing the venue location, e.g. "Sonja Henies plass 2"
           */
          street_address?: string;
        }
      }

      /**
       * Only required if them item is related to a marketplace order.
       *
       * If that is the case, you need to provide information about both the seller and
       * the winner.
       */
      export interface MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        seller_info: MarketplaceOrder.SellerInfo;

        /**
         * Details related to the winner involved in the marketplace order.
         */
        winner_info: MarketplaceOrder.WinnerInfo;
      }

      export namespace MarketplaceOrder {
        /**
         * Details related to the seller involved in the marketplace order.
         */
        export interface SellerInfo {
          account_last_modified: SellerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the sub-merchant did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Name of the category to which the specific good belongs to, according to the
           * selling merchant's categorization, e.g. "Phones".
           */
          product_category: string;

          /**
           * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
           * Ltd."
           */
          sub_merchant_id: string;

          /**
           * Name of the good purchased.
           */
          product_name?: string;

          /**
           * Current rating of the good purchased according to the marketplace's rating
           * scale, e.g. 5
           */
          seller_rating?: number;

          /**
           * Details about the seller.
           */
          unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

          /**
           * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace SellerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the seller.
           */
          export interface UniqueAccountIdentifierSeller {
            /**
             * Seller's email address, e.g. "seller@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Seller's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }

        /**
         * Details related to the winner involved in the marketplace order.
         */
        export interface WinnerInfo {
          account_last_modified: WinnerInfo.AccountLastModified;

          /**
           * Date and time that the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Number of trades the winner did in the last 12 months, e.g. 23
           */
          number_of_trades: number;

          /**
           * Details about the winner.
           */
          unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

          /**
           * Volumes of trades the winner did in the last 12 months, e.g. 230
           */
          volume_of_trades?: number;
        }

        export namespace WinnerInfo {
          export interface AccountLastModified {
            /**
             * Date and time that the (physical) address was last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            address: string;

            /**
             * Date and time that the email was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            email: string;

            /**
             * Date and time that the listing details were last modified (ISO 8601 format),
             * e.g. "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            listing: string;

            /**
             * Date and time that the login details were last changed (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            login: string;

            /**
             * Date and time that the password was last modified (ISO 8601 format), e.g.
             * "2023-08-17T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            password: string;
          }

          /**
           * Details about the winner.
           */
          export interface UniqueAccountIdentifierWinner {
            /**
             * Winner's email address, e.g. "winner@mail.com"
             */
            email?: string;

            other?: string;

            /**
             * Winner's phone number, e.g. "97712123"
             */
            phone_number?: string;
          }
        }
      }

      /**
       * Only required if the item is related to a subscription.
       *
       * If that is the case, you need to provide information about both the subscription
       * and the customer account.
       */
      export interface Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        customer_account_info: Subscription.CustomerAccountInfo;

        /**
         * Details related to the subscription.
         */
        subscription: Subscription.Subscription;
      }

      export namespace Subscription {
        /**
         * Information related to the customer that wants to purchase the subscription.
         */
        export interface CustomerAccountInfo {
          /**
           * The date and time the account was last modified (ISO 8601 format), e.g.
           * "2023-10-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_last_modified: string;

          /**
           * The date and time the account was registered (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          account_registration_date: string;

          /**
           * Unique name / number to identify the specific customer account. Max 24
           * characters, e.g. "Adam Adamsson"
           */
          unique_account_identifier: string;
        }

        /**
         * Details related to the subscription.
         */
        export interface Subscription {
          /**
           * Whether the subscription will be auto renewed upon expiry, e.g. true
           */
          auto_renewal_of_subscription: boolean;

          /**
           * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          end_time: string;

          /**
           * The start time of the subscription (ISO 8601 format), e.g.
           * "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC
           */
          start_time: string;

          /**
           * Name of the product on subscription, e.g. "Contact lenses"
           */
          subscription_name: string;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;
        }
      }

      /**
       * Only required if the item is part of a travel-related transaction.
       *
       * If that is the case, you need to provide information about the itinerary to be
       * booked.
       */
      export interface Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        air_reservation_details?: Travel.AirReservationDetails;

        /**
         * Details about the reservation of bus tickets.
         */
        bus_reservation_details?: Travel.BusReservationDetails;

        /**
         * Details about the reservation of rental cars.
         */
        car_rental_reservation_details?: Travel.CarRentalReservationDetails;

        /**
         * Details about the reservation of ferry tickets.
         */
        ferry_reservation_details?: Travel.FerryReservationDetails;

        /**
         * Details about the reservation of hotel rooms.
         */
        hotel_reservation_details?: Travel.HotelReservationDetails;

        /**
         * Details about the reservation of train tickets.
         */
        train_reservation_details?: Travel.TrainReservationDetails;
      }

      export namespace Travel {
        /**
         * Details about the reservation of airline tickets.
         */
        export interface AirReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one flight from Oslo to Munich, and
           * another flight from Munich to Dubai, you need to provide one itinerary object
           * for each of these two flights, and so on.
           */
          itinerary: Array<AirReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<AirReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<AirReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace AirReservationDetails {
          export interface Itinerary {
            /**
             * IATA Airport Code (three letters), e.g. "MUC"
             */
            arrival: string;

            /**
             * IATA Airline standard (two letters or digits), e.g. "LH"
             */
            carrier: string;

            /**
             * IATA Airport Code (three letters), e.g. "OSL"
             */
            departure: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * City the flight arrives in, e.g. "Munich"
             */
            arrival_city?: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * City the flight departs from, e.g. "Oslo"
             */
            departure_city?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the flight in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of bus tickets.
         */
        export interface BusReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one bus journey from Oslo to Munich,
           * and another bus journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two bus journeys, and so on.
           */
          itinerary: Array<BusReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<BusReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<BusReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace BusReservationDetails {
          export interface Itinerary {
            /**
             * City the bus arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Bus Travels Ltd."
             */
            carrier: string;

            /**
             * City the bus departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the bus journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of rental cars.
         */
        export interface CarRentalReservationDetails {
          /**
           * Driver data, one per driver.
           */
          drivers: Array<CarRentalReservationDetails.Driver>;

          /**
           * Car rental itinerary data, one per car rental.
           *
           * If you are selling a package that contains multiple car rentals, you need to
           * provide itinerary data for each of the individual rentals.
           */
          itinerary: Array<CarRentalReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<CarRentalReservationDetails.Insurance>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace CarRentalReservationDetails {
          export interface Driver {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }

          export interface Itinerary {
            /**
             * End time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Name of the car rental company, e.g. "Premium Cars Ltd."
             */
            rental_company: string;

            /**
             * Start time of the car rental reservation (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            /**
             * Price for the car rental reservation in smallest unit of local currency, e.g.
             * 500000
             */
            car_price?: number;

            /**
             * Travel class, e.g. "Premium Cars Premium Class"
             */
            class?: string;

            /**
             * Driver IDs.
             */
            drivers_id?: Array<number>;

            /**
             * Details related to the drop off location.
             */
            drop_off_location?: Itinerary.DropOffLocation;

            /**
             * Details related to the pick up location.
             */
            pick_up_location?: Itinerary.PickUpLocation;
          }

          export namespace Itinerary {
            /**
             * Details related to the drop off location.
             */
            export interface DropOffLocation {
              /**
               * City where the car should be dropped off, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
               * "NO"
               */
              country: string;

              /**
               * Postal code where the car should be dropped off, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }

            /**
             * Details related to the pick up location.
             */
            export interface PickUpLocation {
              /**
               * City where the car should be picked up, e.g. "Oslo"
               */
              city: string;

              /**
               * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
               * "NO",
               */
              country: string;

              /**
               * Postal code where the car should be picked up, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }
        }

        /**
         * Details about the reservation of ferry tickets.
         */
        export interface FerryReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
           * and another ferry journey from Kiel to Gothenburg, you need to provide one
           * itinerary object for each of these two ferry journeys, and so on.
           */
          itinerary: Array<FerryReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<FerryReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<FerryReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace FerryReservationDetails {
          export interface Itinerary {
            /**
             * City the ferry arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Ferry Travels Ltd."
             */
            carrier: string;

            /**
             * City the ferry departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id?: Array<number>;

            /**
             * Price for that specific segment of the ferry journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of hotel rooms.
         */
        export interface HotelReservationDetails {
          /**
           * Hotel itinerary data, one per hotel stay.
           *
           * If you are selling a package that contains multiple hotel stays, you need to
           * provide itinerary data for each of the individual stays.
           */
          itinerary: Array<HotelReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<HotelReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<HotelReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace HotelReservationDetails {
          export interface Itinerary {
            /**
             * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            end_time: string;

            /**
             * Price for the hotel stay in smallest unit of local currency, e.g. 200000
             */
            hotel_price: number;

            /**
             * Number of rooms booked, e.g. 2
             */
            number_of_rooms: number;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            /**
             * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            start_time: string;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Address details of the hotel.
             */
            address?: Itinerary.Address;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Name of the hotel, e.g. "Premium Hotel"
             */
            hotel_name?: string;
          }

          export namespace Itinerary {
            /**
             * Address details of the hotel.
             */
            export interface Address {
              /**
               * City the hotel is located in, e.g. "Oslo"
               */
              city: string;

              /**
               * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
               */
              country: string;

              /**
               * Postal code of the hotel, e.g. "0159"
               */
              postal_code?: string;

              /**
               * Street address of the hotel, e.g. "Karl Johans gt. 31"
               */
              street_address?: string;
            }
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }

        /**
         * Details about the reservation of train tickets.
         */
        export interface TrainReservationDetails {
          /**
           * Itinerary data, one per segment.
           *
           * If you are selling a ticket that contains one train journey from Oslo to Munich,
           * and another train journey from Munich to Rome, you need to provide one itinerary
           * object for each of these two train journeys, and so on.
           */
          itinerary: Array<TrainReservationDetails.Itinerary>;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          /**
           * Insurance data, one per segment
           */
          insurance?: Array<TrainReservationDetails.Insurance>;

          /**
           * Passenger data, one per passenger.
           */
          passengers?: Array<TrainReservationDetails.Passenger>;

          /**
           * Trip booking number, e.g. "VH67899"
           */
          pnr?: string;
        }

        export namespace TrainReservationDetails {
          export interface Itinerary {
            /**
             * City the train arrives in, e.g. "Munich"
             */
            arrival_city: string;

            /**
             * Name of transportation company. "Big Train Travels Ltd."
             */
            carrier: string;

            /**
             * City the train departs from, e.g. "Oslo"
             */
            departure_city: string;

            /**
             * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified, we assume UTC.
             */
            departure_date: string;

            /**
             * IDs of all the passengers included in this itinerary.
             */
            passenger_id: Array<number>;

            ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

            /**
             * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             * If email or phone, then use either the email address or the phone number
             * respectively.
             */
            ticket_delivery_recipient: string;

            /**
             * Travel class, e.g. "First Class"
             */
            class?: string;

            /**
             * Price for that specific segment of the train journey in smallest unit of local
             * currency, e.g. 200000
             */
            segment_price?: number;
          }

          export interface Insurance {
            /**
             * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             */
            insurance_company?: string;

            /**
             * Price of the insurance in smallest unit of local currency, e.g. 50000
             */
            insurance_price?: number;

            /**
             * Type of insurance, e.g. "travel"
             */
            insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
          }

          export interface Passenger {
            /**
             * First name of the passenger, e.g. "Paul"
             */
            first_name: string;

            /**
             * Last name of the passenger, e.g. "Lamb"
             */
            last_name: string;

            /**
             * Passenger id, e.g. 1
             */
            id?: number;

            /**
             * Passenger title, e.g. "mr".
             *
             * Blank if under 12 years.
             */
            title?: 'mr' | 'mrs' | 'ms' | '';
          }
        }
      }
    }

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    export interface FeeSplit {
      type: 'proportional';

      /**
       * Seller ids that will be debited for the payment fees All destinations must be
       * included in the list of splits
       */
      destinations?: Array<string>;
    }

    export interface Group {
      /**
       * Group ID
       */
      id: string;

      /**
       * Group name
       */
      name?: string;
    }

    export interface Split {
      /**
       * The split amount in smalles unit for the currency, e.g. cents.
       */
      amount: number;

      /**
       * An id that identifies the seller
       */
      payout_destination_id: string;
    }
  }
}

export interface ExampleDiscountCodeCallbackURLResponse {
  /**
   * Shipping options that will be presented to the end user after the callback
   *
   * - If the merchant is not able to ship the order to the end users shipping
   *   address, use an empty array.
   * - If there is only one option, a free delivery, the order still has to contain
   *   one option with a _`price.amount`_ of 0.
   */
  shipping_options: Array<ExampleDiscountCodeCallbackURLResponse.ShippingOption>;

  /**
   * Order updated with discount given by discount_code.
   */
  order?: DiscountCodesOrderUpdate;
}

export namespace ExampleDiscountCodeCallbackURLResponse {
  export interface ShippingOption {
    /**
     * Id of this shipping option product.
     *
     * The express checkout will group all products with the same id. Used for grouping
     * delivery to the same address at different time slots, or for grouping deliveries
     * to different pick up points.
     */
    id: string;

    /**
     * The monetary amount of the shipping option, including VAT and discounts.
     *
     * In smallest unit for the currency, e.g. cents
     */
    amount: number;

    /**
     * Unique id of the specific configuration of this shipping product
     */
    line_id: string;

    /**
     * Name of company that provides shipping service
     */
    operator: string;

    /**
     * A shipping option title. Eg. "Standard"
     */
    title: string;

    /**
     * Countries where this shipping option can be used
     */
    countries?: Array<string>;

    delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

    /**
     * A short description of the shipping option product
     */
    description?: string;

    /**
     * Environmental data about the shipping option
     */
    environmental_data?: ShippingOption.EnvironmentalData;

    /**
     * Estimated time of arrival
     */
    eta?: ShippingOption.Eta;

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    fee_split?: ShippingOption.FeeSplit;

    /**
     * Additional metadata about the shipping_option
     */
    metadata?: unknown;

    /**
     * The operators own id for this shipping product
     */
    operator_product_id?: string;

    pick_up_address?: ShippingOption.PickUpAddress;

    /**
     * An array of objects specifying how the amount should be split between sellers
     * when using Dintero Payout
     *
     * Specify an empty array if the splits will be provided during capture.
     * `auto_capture` cannot be enabled when splits are defined as empty array.
     */
    splits?: Array<ShippingOption.Split>;

    /**
     * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
     * the session. Recommended limitations for the image:
     *
     * - all images should preferrably have the same dimensions
     * - max file size should be less than 2MB
     */
    thumbnail_url?: string;

    /**
     * A specified time for delivery to customer
     */
    time_slot?: ShippingOption.TimeSlot;

    /**
     * The VAT percentage
     */
    vat?: number;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     */
    vat_amount?: number;
  }

  export namespace ShippingOption {
    /**
     * Environmental data about the shipping option
     */
    export interface EnvironmentalData {
      /**
       * A short description of the environmental data, something like
       *
       * - "Fossil free",
       * - "Carbon neutral"
       * - "Low emissions"
       * - "Renewable Energy Sourced"
       * - "Eco-certified Fleet"
       */
      description: string;

      details?: Array<EnvironmentalData.Detail>;
    }

    export namespace EnvironmentalData {
      export interface Detail {
        /**
         * Give context to the value field. Example:
         *
         * - "CO2 emissions"
         * - "Energy consumption"
         * - "Carbon footprint"
         * - "Carbon offset"
         * - "Trees planted"
         * - "Renewable energy percentage"
         */
        label: string;

        value: string;
      }
    }

    /**
     * Estimated time of arrival
     */
    export interface Eta {
      ends_at?: string;

      starts_at?: string;
    }

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    export interface FeeSplit {
      type: 'proportional';

      /**
       * Seller ids that will be debited for the payment fees All destinations must be
       * included in the list of splits
       */
      destinations?: Array<string>;
    }

    export interface PickUpAddress {
      /**
       * Gaustadalleen 21
       */
      address_line?: string;

      /**
       * PB 123
       */
      address_line_2?: string;

      /**
       * Name of the company
       */
      business_name?: string;

      co_address?: string;

      /**
       * Comment about the address
       */
      comment?: string;

      /**
       * For companies that needs to specify a cost center.
       */
      cost_center?: string;

      /**
       * Country of the location
       */
      country?: string;

      /**
       * The customer's reference
       */
      customer_reference?: string;

      /**
       * Distance in kilometers from the shipping_address.
       */
      distance?: number;

      /**
       * The email address of a person or an organization
       */
      email?: string;

      first_name?: string;

      last_name?: string;

      latitude?: number;

      longitude?: number;

      /**
       * The organization number of the customer.
       */
      organization_number?: string;

      /**
       * Type indicating what kind of organization it is.
       */
      organization_type?: string;

      /**
       * mobile number of a person / company, ITU/E.123 format with international prefix
       * (+PPNNNNNNNNN...)
       */
      phone_number?: string;

      /**
       * The zip code / postal code of the address.
       */
      postal_code?: string;

      /**
       * The name of the postal code
       */
      postal_place?: string;
    }

    export interface Split {
      /**
       * The split amount in smalles unit for the currency, e.g. cents.
       */
      amount: number;

      /**
       * An id that identifies the seller
       */
      payout_destination_id: string;
    }

    /**
     * A specified time for delivery to customer
     */
    export interface TimeSlot {
      ends_at?: string;

      starts_at?: string;
    }
  }
}

export interface ExampleShippingAddressCallbackURLResponse {
  /**
   * Shipping options that will be presented to the end user after the callback
   *
   * - If the merchant is not able to ship the order to the end users shipping
   *   address, use an empty array.
   * - If there is only one option, a free delivery, the order still has to contain
   *   one option with a _`price.amount`_ of 0.
   */
  shipping_options: Array<ExampleShippingAddressCallbackURLResponse.ShippingOption>;

  /**
   * Updates to session order. If the amount is not equal to sum of items.amount and
   * the shipping_option.amount from the request are not equal a correction item will
   * be added to the items.
   */
  order?: ShippingAddressCallbackSessionOrderUpdate;
}

export namespace ExampleShippingAddressCallbackURLResponse {
  export interface ShippingOption {
    /**
     * Id of this shipping option product.
     *
     * The express checkout will group all products with the same id. Used for grouping
     * delivery to the same address at different time slots, or for grouping deliveries
     * to different pick up points.
     */
    id: string;

    /**
     * The monetary amount of the shipping option, including VAT and discounts.
     *
     * In smallest unit for the currency, e.g. cents
     */
    amount: number;

    /**
     * Unique id of the specific configuration of this shipping product
     */
    line_id: string;

    /**
     * Name of company that provides shipping service
     */
    operator: string;

    /**
     * A shipping option title. Eg. "Standard"
     */
    title: string;

    /**
     * Countries where this shipping option can be used
     */
    countries?: Array<string>;

    delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

    /**
     * A short description of the shipping option product
     */
    description?: string;

    /**
     * Environmental data about the shipping option
     */
    environmental_data?: ShippingOption.EnvironmentalData;

    /**
     * Estimated time of arrival
     */
    eta?: ShippingOption.Eta;

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    fee_split?: ShippingOption.FeeSplit;

    /**
     * Additional metadata about the shipping_option
     */
    metadata?: unknown;

    /**
     * The operators own id for this shipping product
     */
    operator_product_id?: string;

    pick_up_address?: ShippingOption.PickUpAddress;

    /**
     * An array of objects specifying how the amount should be split between sellers
     * when using Dintero Payout
     *
     * Specify an empty array if the splits will be provided during capture.
     * `auto_capture` cannot be enabled when splits are defined as empty array.
     */
    splits?: Array<ShippingOption.Split>;

    /**
     * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
     * the session. Recommended limitations for the image:
     *
     * - all images should preferrably have the same dimensions
     * - max file size should be less than 2MB
     */
    thumbnail_url?: string;

    /**
     * A specified time for delivery to customer
     */
    time_slot?: ShippingOption.TimeSlot;

    /**
     * The VAT percentage
     */
    vat?: number;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     */
    vat_amount?: number;
  }

  export namespace ShippingOption {
    /**
     * Environmental data about the shipping option
     */
    export interface EnvironmentalData {
      /**
       * A short description of the environmental data, something like
       *
       * - "Fossil free",
       * - "Carbon neutral"
       * - "Low emissions"
       * - "Renewable Energy Sourced"
       * - "Eco-certified Fleet"
       */
      description: string;

      details?: Array<EnvironmentalData.Detail>;
    }

    export namespace EnvironmentalData {
      export interface Detail {
        /**
         * Give context to the value field. Example:
         *
         * - "CO2 emissions"
         * - "Energy consumption"
         * - "Carbon footprint"
         * - "Carbon offset"
         * - "Trees planted"
         * - "Renewable energy percentage"
         */
        label: string;

        value: string;
      }
    }

    /**
     * Estimated time of arrival
     */
    export interface Eta {
      ends_at?: string;

      starts_at?: string;
    }

    /**
     * Specify how fees are handled with splits. The default behaviour is to share the
     * fees proportional with all splits destinations
     */
    export interface FeeSplit {
      type: 'proportional';

      /**
       * Seller ids that will be debited for the payment fees All destinations must be
       * included in the list of splits
       */
      destinations?: Array<string>;
    }

    export interface PickUpAddress {
      /**
       * Gaustadalleen 21
       */
      address_line?: string;

      /**
       * PB 123
       */
      address_line_2?: string;

      /**
       * Name of the company
       */
      business_name?: string;

      co_address?: string;

      /**
       * Comment about the address
       */
      comment?: string;

      /**
       * For companies that needs to specify a cost center.
       */
      cost_center?: string;

      /**
       * Country of the location
       */
      country?: string;

      /**
       * The customer's reference
       */
      customer_reference?: string;

      /**
       * Distance in kilometers from the shipping_address.
       */
      distance?: number;

      /**
       * The email address of a person or an organization
       */
      email?: string;

      first_name?: string;

      last_name?: string;

      latitude?: number;

      longitude?: number;

      /**
       * The organization number of the customer.
       */
      organization_number?: string;

      /**
       * Type indicating what kind of organization it is.
       */
      organization_type?: string;

      /**
       * mobile number of a person / company, ITU/E.123 format with international prefix
       * (+PPNNNNNNNNN...)
       */
      phone_number?: string;

      /**
       * The zip code / postal code of the address.
       */
      postal_code?: string;

      /**
       * The name of the postal code
       */
      postal_place?: string;
    }

    export interface Split {
      /**
       * The split amount in smalles unit for the currency, e.g. cents.
       */
      amount: number;

      /**
       * An id that identifies the seller
       */
      payout_destination_id: string;
    }

    /**
     * A specified time for delivery to customer
     */
    export interface TimeSlot {
      ends_at?: string;

      starts_at?: string;
    }
  }
}

export interface ExampleDiscountCodeCallbackURLParams {
  configuration: ExampleDiscountCodeCallbackURLParams.Configuration;

  order: ExampleDiscountCodeCallbackURLParams.Order;

  url: ExampleDiscountCodeCallbackURLParams.URL;

  /**
   * The ID of the Checkout
   */
  id?: string;

  /**
   * Configuration for checkboxes that should be part of the checkout
   */
  checkboxes?: Array<ExampleDiscountCodeCallbackURLParams.Checkbox>;

  /**
   * Time when the Checkout was created
   */
  created_at?: string;

  customer?: ExampleDiscountCodeCallbackURLParams.Customer;

  /**
   * The IP of the customer upon visiting the page. If the page is visited multiple
   * times, the field is always updated with the last known value.
   */
  customer_ip?: string;

  /**
   * Checkout process events
   */
  events?: Array<ExampleDiscountCodeCallbackURLParams.Event>;

  /**
   * The session expiration time after which the Checkout page wouldn't be available
   */
  expires_at?: string;

  /**
   * ### Present only for _Express Checkout_ sessions.
   *
   * An _Express Checkout_ session is a session where the end user will submit a
   * shipping address and then select a shipping option before the before a payment
   * method is selected and the payment is initiated.
   *
   * Endpoints used in the _Express Checkout_ flow.
   *
   * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
   * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
   */
  express?: ExampleDiscountCodeCallbackURLParams.Express;

  initiating_system_request_headers?: ExampleDiscountCodeCallbackURLParams.InitiatingSystemRequestHeaders;

  /**
   * metadata about the session
   */
  metadata?: ExampleDiscountCodeCallbackURLParams.Metadata;

  /**
   * Initiated by the merchant or used to generate a token
   */
  payment_operation?: 'unscheduled_purchase' | 'recurring_purchase' | 'generate_payment_token';

  /**
   * Transaction which has been created using the checkout.
   */
  transaction_id?: string;

  /**
   * Last time when the Checkout was updated
   */
  updated_at?: string;

  /**
   * The full user agent of the device the customer used when visiting the checkout
   * page
   */
  user_agent?: string;
}

export namespace ExampleDiscountCodeCallbackURLParams {
  export interface Configuration {
    active_payment_types?: Configuration.ActivePaymentTypes;

    /**
     * Allow that the shipping and billing address can be different.
     *
     * An array of strings, the values `b2c` and `b2b` can be used to limit the what
     * types of customer that are allowed to submit different addresses for shipping
     * and billing.
     *
     * By default we limit the shipping and billing addresses to be equal for both B2C
     * and B2B customers.
     */
    allow_different_billing_shipping_address?: Array<'b2c' | 'b2b'>;

    /**
     * If `true` the transaction from the payment session will be captured
     * automatically after the transaction has been `AUTHORIZED`. The checkout sessions
     * `callback_url` will not be called until after the transaction has been
     * `CAPTURED`.
     *
     * If `auto_capture` is not specified it defaults to `false`.
     *
     * A successful auto-capture of a transaction sometimes requires more than one
     * capture attempt. This can be the case if the payment gateway is down or is
     * experiencing heavy traffic.
     *
     * Dintero will attempts capture retries for 48 hours, the `callback_url` will be
     * invoked when capture succeeds.
     *
     * Manual capture of a transaction that is pending auto-capture will stop the
     * auto-capture process from completing the capture.
     */
    auto_capture?: boolean;

    /**
     * Bambora configuration
     */
    bambora?: Configuration.Bambora;

    /**
     * `channel` enables special behaviour for various scenarios.
     *
     * The majority of web integrations will not need to set this property.
     *
     * ### in_app
     *
     * The `in_app` channel is intended for payments done from mobile devices where
     * `url.return_url` can be set to the application's appswitch URL.
     *
     * #### Session deeplink URL
     *
     * Creating a session with `channel=in_app` will return an appswitch deeplink URL
     * if the enabled payment options in the session supports it
     *
     * Appswitch deeplink is currently only supported for sessions that has only Vipps
     * enabled, via Vipps or Swedbank (payex) or Mobilepay enable via Swedbank (payex)
     *
     * - configuration.vipps.enabled
     * - configuration.payex.vipps.enabled
     * - configuration.payex.mobilepay.enabled
     *
     * > `in_app` is currently not supported when express is enabled
     *
     * > `in_app` with deeplink URL is not supported if `publish` is enabled
     *
     * ### in_store
     *
     * The `in_store` channel is intended for payments done in physical stores.
     *
     * Depending on the payment_type, choosing `in_store` will change the behaviour of
     * the payment.
     */
    channel?: 'in_app' | 'in_store';

    /**
     * Collector configuration
     */
    collector?: Configuration.Collector;

    /**
     * Country preferences
     */
    countries?: Configuration.Countries;

    /**
     * Customer type to use as default for the customer.
     */
    default_customer_type?: 'b2c' | 'b2b';

    /**
     * Configure the default payment type, the selected payment when loading the
     * checkout window. The value must be an enabled payment type.
     */
    default_payment_type?:
      | 'bambora.creditcard'
      | 'bambora.vipps'
      | 'dintero.zero'
      | 'dintero_psp.creditcard'
      | 'instabank.finance'
      | 'instabank.invoice'
      | 'instabank.installment'
      | 'instabank.postponement'
      | 'vipps'
      | 'payex.creditcard'
      | 'payex.mobilepay'
      | 'payex.swish'
      | 'payex.vipps'
      | 'payex.applepay'
      | 'payex.clicktopay'
      | 'payex.googlepay'
      | 'collector.finance'
      | 'collector.invoice'
      | 'collector.invoice_b2b'
      | 'collector.invoice_b2b_preapproved'
      | 'collector.installment_b2b_preapproved'
      | 'collector.installment'
      | 'santander.debit_account'
      | 'swish.swish'
      | 'netaxept.creditcard'
      | 'klarna.klarna'
      | 'klarna.billie';

    /**
     * Dintero configuration
     */
    dintero?: Configuration.Dintero;

    /**
     * Dintero PSP configuration
     */
    dintero_psp?: Configuration.DinteroPsp;

    /**
     * Configuration for discounts calculations
     */
    discounts?: Configuration.Discounts;

    instabank?: Configuration.Instabank;

    /**
     * Klarna configuration
     */
    klarna?: Configuration.Klarna;

    merchant?: Configuration.Merchant;

    /**
     * Netaxept configuration
     */
    netaxept?: Configuration.Netaxept;

    payex?: Configuration.Payex;

    /**
     * Payout configuration
     */
    payout?: Configuration.Payout;

    /**
     * Publish checkout message to the customer.
     */
    publish?: SessionsProfilesAPI.PublishConfiguration;

    santander?: Configuration.Santander;

    /**
     * Swish configuration
     */
    swish?: Configuration.Swish;

    /**
     * Customize the appearance of the checkout.
     */
    theme?: Configuration.Theme;

    vipps?: Configuration.Vipps;
  }

  export namespace Configuration {
    export interface ActivePaymentTypes {
      /**
       * Use this flag as wildcard to include all active payment types configured for a
       * given currency when creating a payment session.
       */
      enabled?: boolean;
    }

    /**
     * Bambora configuration
     */
    export interface Bambora {
      creditcard?: Bambora.Creditcard;

      mobilepay?: Bambora.Mobilepay;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';

      vipps?: Bambora.Vipps;
    }

    export namespace Bambora {
      export interface Creditcard {
        /**
         * enable Credit Card Payment
         */
        enabled: boolean;

        /**
         * generate payment token to use for future payments
         *
         * The generated payment token will be made available from the transaction details.
         */
        generate_payment_token?: boolean;

        /**
         * generate recurrence payment token to use for future payments
         *
         * The generated recurrence payment token will be made available from the
         * transaction details.
         */
        generate_recurrence_token?: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Mobilepay {
        /**
         * enable MobilePay Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Vipps {
        /**
         * enable Vipps Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Collector configuration
     */
    export interface Collector {
      /**
       * A textual description max 40 characters of the purchase.
       */
      dynamic_descriptor?: string;

      finance?: Collector.Finance;

      /**
       * Fixed Part Payment
       */
      installment?: Collector.Installment;

      /**
       * Invoice / Part Payment
       */
      invoice?: Collector.Invoice;

      /**
       * Invoice / Part Payment
       */
      invoice_b2b?: Collector.InvoiceB2b;

      /**
       * Invoice for pre-approved B2B-customers
       */
      invoice_b2b_preapproved?: Collector.InvoiceB2bPreapproved;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Collector {
      export interface Finance {
        /**
         * enable Collector Bank Finance Payment
         */
        enabled: boolean;

        countries?: Array<string>;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      /**
       * Fixed Part Payment
       */
      export interface Installment {
        /**
         * enable Collector Bank Installment Payment
         */
        enabled: boolean;

        countries?: Array<string>;

        options?: Installment.Options;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace Installment {
        export interface Options {
          /**
           * Create the collector transaction with status `ON_HOLD` and let the Collector
           * callback update the transaction state from `ON_HOLD` to `AUTHORIZED` or
           * `FAILED`.
           *
           * A callback will be sent to the `callback_url` when the transaction changes state
           * from `ON_HOLD` to any new state.
           *
           * This will override the gateway's `options.enable_on_hold`-setting.
           */
          enable_on_hold?: boolean;
        }
      }

      /**
       * Invoice / Part Payment
       */
      export interface Invoice {
        /**
         * enable Collector Bank Invoice Payment
         */
        enabled: boolean;

        countries?: Array<string>;

        options?: Invoice.Options;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace Invoice {
        export interface Options {
          /**
           * Create the collector transaction with status `ON_HOLD` and let the Collector
           * callback update the transaction state from `ON_HOLD` to `AUTHORIZED` or
           * `FAILED`.
           *
           * A callback will be sent to the `callback_url` when the transaction changes state
           * from `ON_HOLD` to any new state.
           *
           * This will override the payment option `enable_on_hold` and gateway config
           * `options.enable_on_hold`-setting.
           */
          enable_on_hold?: boolean;
        }
      }

      /**
       * Invoice / Part Payment
       */
      export interface InvoiceB2b {
        /**
         * enable Collector Bank Invoice Payment B2B
         */
        enabled: boolean;

        countries?: Array<string>;

        options?: InvoiceB2b.Options;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace InvoiceB2b {
        export interface Options {
          /**
           * For `collector.invoice_b2b`. By default, the shipping_address B2B payments will
           * be restricted to the registered addresses of a company.
           *
           * Setting this on the session will override the
           * `collector_b2b_address_enforcement` in `payment_options` on the checkout
           * configuration.
           */
          disable_collector_b2b_address_enforcement?: boolean;

          /**
           * Create the collector transaction with status `ON_HOLD` and let the Collector
           * callback update the transaction state from `ON_HOLD` to `AUTHORIZED` or
           * `FAILED`.
           *
           * A callback will be sent to the `callback_url` when the transaction changes state
           * from `ON_HOLD` to any new state.
           *
           * This will override the gateway's `options.enable_on_hold`-setting.
           */
          enable_on_hold?: boolean;
        }
      }

      /**
       * Invoice for pre-approved B2B-customers
       */
      export interface InvoiceB2bPreapproved {
        /**
         * enable Collector Bank Invoice Payment B2B
         */
        enabled: boolean;

        /**
         * All Collector B2B accounts configured for the customer's phone number at the
         * merchant.
         */
        accounts?: Array<InvoiceB2bPreapproved.Account>;

        countries?: Array<string>;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace InvoiceB2bPreapproved {
        export interface Account {
          billing_address?: Account.BillingAddress;

          /**
           * Token to represent the company
           */
          company_id?: string;
        }

        export namespace Account {
          export interface BillingAddress {
            /**
             * Gaustadalleen 21
             */
            address_line: string;

            /**
             * ACME Inc
             */
            business_name: string;

            /**
             * Country of the location
             */
            country: string;

            /**
             * The email address of a person or an organisation
             */
            email: string;

            /**
             * The organization number of the customer. For Norway, the length is 9. For
             * Sweden, it's either 10 or 12 digits.
             */
            organization_number: string;

            /**
             * mobile number of a person / company, ITU/E.123 format with international prefix
             * (+PPNNNNNNNNN...)
             */
            phone_number: string;

            /**
             * The zip code / postal code of the address.
             */
            postal_code: string;

            /**
             * The name of the postal code
             */
            postal_place: string;

            /**
             * The unique identification of the address from the available addresses for the
             * business
             */
            address_id?: string;

            /**
             * More details about address.
             */
            address_line_2?: string;

            /**
             * CO-Address if applicable.
             */
            co_address?: string;

            /**
             * For companies that needs to specify a cost center.
             */
            cost_center?: string;

            /**
             * The customer's reference
             */
            customer_reference?: string;

            first_name?: string;

            last_name?: string;
          }
        }
      }
    }

    /**
     * Country preferences
     */
    export interface Countries {
      /**
       * List of countries where the customer is allowed to set their address. If empty,
       * all countries are allowed, except for the ones in `deny_countries`.
       *
       * A country can not be in both `allow_countries` and `deny_countries`.
       */
      allow_countries?: Array<string>;

      /**
       * List of countries where the customer is not allowed to set their address.
       *
       * A country can not be in both `allow_countries` and `deny_countries`.
       */
      deny_countries?: Array<string>;

      /**
       * Country to use as default in address and phone country code
       */
      preferred_country?: string;
    }

    /**
     * Dintero configuration
     */
    export interface Dintero {
      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';

      /**
       * Allow the payment session to be fully or partial authorized with Dintero Wallets
       * gift card.
       */
      wallets?: Dintero.Wallets;

      /**
       * Allow initiating pay on zero amount session, the payability will only be enabled
       * if the session order amount is zero. Initiating a `dintero.zero` payment will
       * result in a transaction with `dintero.zero` payment product type that will be
       * excluded from settlement reports (as it will not have any payout)
       */
      zero?: Dintero.Zero;
    }

    export namespace Dintero {
      /**
       * Allow the payment session to be fully or partial authorized with Dintero Wallets
       * gift card.
       */
      export interface Wallets {
        /**
         * enable gift card
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      /**
       * Allow initiating pay on zero amount session, the payability will only be enabled
       * if the session order amount is zero. Initiating a `dintero.zero` payment will
       * result in a transaction with `dintero.zero` payment product type that will be
       * excluded from settlement reports (as it will not have any payout)
       */
      export interface Zero {
        /**
         * enable zero amount session
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Dintero PSP configuration
     */
    export interface DinteroPsp {
      creditcard?: DinteroPsp.Creditcard;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace DinteroPsp {
      export interface Creditcard {
        /**
         * enable creditcard
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Configuration for discounts calculations
     */
    export interface Discounts {
      express_discount_codes?: Discounts.ExpressDiscountCodes;

      /**
       * Configure discounts calculation on the session order.
       */
      order?: Discounts.Order;
    }

    export namespace Discounts {
      export interface ExpressDiscountCodes {
        /**
         * The discounts will be given by the configured express callback url.
         *
         * The callback URL will be invoked when the session is updated with a discount
         * code, and the response used to update the discounts on the order items and the
         * shipping options.
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }

      /**
       * Configure discounts calculation on the session order.
       */
      export interface Order {
        /**
         * Enable discount calculation on order items eligible for discount
         *
         * - A session that has the `customer.customer_id` set will have its discounts
         *   calculated when the session is created.
         *
         * - A session with no customer_id will only have the discounts calculated when the
         *   customer is identified by the checkout page.
         *
         * - The autorized amount will be the net amount from the original session amount
         *   specified when the session was created.
         */
        enabled: boolean;
      }
    }

    export interface Instabank {
      /**
       * finance payment
       */
      finance?: Instabank.Finance;

      /**
       * Fixed Part Payment
       */
      installment?: Instabank.Installment;

      /**
       * invoice payment
       */
      invoice?: Instabank.Invoice;

      /**
       * Postpone payment
       */
      postponement?: Instabank.Postponement;
    }

    export namespace Instabank {
      /**
       * finance payment
       */
      export interface Finance {
        /**
         * enable finance payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        product?: Finance.Product;
      }

      export namespace Finance {
        export interface Product {
          loan_example: Product.LoanExample;

          /**
           * The minimum monthly installment basis as a percentage of the account balance.
           */
          minimum_monthly_balance_rate: string;

          /**
           * The notification fee for the payment product.
           */
          notification_fee: number;

          /**
           * The startup fee for the payment product.
           */
          origination_fee: number;

          product_code: string;

          /**
           * The interest rate for the payment product.
           */
          annual_interest_rate?: string;

          /**
           * Url for a custom branding image
           */
          branding_image_url?: string;

          /**
           * Minimum order amount for this product. The product option will be excluded in
           * payments where the order amount is less than the minimum amount.
           */
          minimum_amount?: number;
        }

        export namespace Product {
          export interface LoanExample {
            /**
             * The amount loaned in the example.
             */
            amount: number;

            /**
             * The cost of the loan in the example.
             */
            cost: number;

            /**
             * The total amount paid back in the example.
             */
            total_amount: number;

            /**
             * Years of payment in the example.
             */
            years: number;
          }
        }
      }

      /**
       * Fixed Part Payment
       */
      export interface Installment {
        /**
         * enable Instabank Installment Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      /**
       * invoice payment
       */
      export interface Invoice {
        /**
         * enable invoice payment (only for amounts greater than 500 NOK)
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        product?: Invoice.Product;

        require_applicant?: boolean;
      }

      export namespace Invoice {
        export interface Product {
          /**
           * Number of days before the payment is due.
           */
          due_in_days: number;

          /**
           * The fee for the payment product
           */
          invoice_fee: number;

          product_code: string;

          /**
           * The limit for when instabank will require a full applicant during payment.
           */
          require_applicant_amount: number;

          /**
           * Url for a custom branding image
           */
          branding_image_url?: string;

          /**
           * Minimum order amount for this product. The product option will be excluded in
           * payments where the order amount is less than the minimum amount.
           */
          minimum_amount?: number;
        }
      }

      /**
       * Postpone payment
       */
      export interface Postponement {
        /**
         * enable Instabank Postponement Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Klarna configuration
     */
    export interface Klarna {
      billie?: Klarna.Billie;

      klarna?: Klarna.Klarna;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Klarna {
      export interface Billie {
        /**
         * enable Klarna B2B Payment with Billie
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Klarna {
        /**
         * enable Klarna Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    export interface Merchant {
      id?: string;

      logo_url?: string;

      name?: string;
    }

    /**
     * Netaxept configuration
     */
    export interface Netaxept {
      creditcard?: Netaxept.Creditcard;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Netaxept {
      export interface Creditcard {
        /**
         * enable Credit Card Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Use Netaxept terminal instead of Dintero Checkout
         *
         * See https://shop.nets.eu/web/partners/register
         */
        terminal?: Creditcard.Terminal;

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace Creditcard {
        /**
         * Use Netaxept terminal instead of Dintero Checkout
         *
         * See https://shop.nets.eu/web/partners/register
         */
        export interface Terminal {
          terminal: '/Terminal/default.aspx' | '/terminal/mobile/default.aspx';

          /**
           * Set hosted payment window to single page
           */
          terminal_single_page: boolean;

          /**
           * Name of the terminal template to use, created in Netaxept Admin
           */
          terminal_design?: string;

          terminal_layout?: string;
        }
      }
    }

    export interface Payex {
      applepay?: Payex.Applepay;

      clicktopay?: Payex.Clicktopay;

      creditcard?: Payex.Creditcard;

      /**
       * A textual description max 40 characters of the purchase.
       */
      dynamic_descriptor?: string;

      googlepay?: Payex.Googlepay;

      mobilepay?: Payex.Mobilepay;

      swish?: Payex.Swish;

      vipps?: Payex.Vipps;
    }

    export namespace Payex {
      export interface Applepay {
        /**
         * enable PayEx Apple Pay payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Clicktopay {
        /**
         * enable PayEx Click to Pay payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Creditcard {
        /**
         * enable Credit Card Payment
         */
        enabled: boolean;

        /**
         * generate payment token to use for future payments
         *
         * The generated payment token will be made available from the transaction details.
         */
        generate_payment_token?: boolean;

        /**
         * generate recurrence payment token to use for future payments
         *
         * The generated recurrence payment token will be made available from the
         * transaction details.
         */
        generate_recurrence_token?: boolean;

        /**
         * Disable the CVC field for payments where payment token is used.
         *
         * > To use this feature it has to be enabled on the contract with Swedbank Pay.
         */
        no_cvc?: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }

      export interface Googlepay {
        /**
         * enable PayEx Google Pay payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Mobilepay {
        /**
         * enable Payex MobilePay Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }

      export interface Swish {
        /**
         * enable Payex Swish Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }

      export interface Vipps {
        /**
         * enable Payex Vipps Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }
    }

    /**
     * Payout configuration
     */
    export interface Payout {
      /**
       * Use the order store id to control what `payout_destination_id` should be use
       *
       * A session created with the option set must have a store id that resolves to a
       * payout_destination_id or have payout_destination_id set
       *
       * A session where both `order.store.id` and `order.payout_destination_id` will not
       * be updated with match from `dynamic_payout_destination`
       */
      dynamic_payout_destination_ids?: Array<Payout.DynamicPayoutDestinationID>;
    }

    export namespace Payout {
      export interface DynamicPayoutDestinationID {
        order_payout_destination_id: string;

        order_store_id: string;

        type: 'order_store_id';
      }
    }

    export interface Santander {
      debit_account?: Santander.DebitAccount;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Santander {
      export interface DebitAccount {
        /**
         * enable Santander Finance Debit Account
         */
        enabled: boolean;

        /**
         * Debit accounts belonging to the customer's phone number
         */
        accounts?: Array<DebitAccount.Account>;

        /**
         * The name of the chain
         */
        branding_name?: string;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: unknown;
      }

      export namespace DebitAccount {
        export interface Account {
          /**
           * Token to represent the account number
           */
          account_number_token?: string;

          /**
           * Representation of the account number for display purposes
           */
          masked_account_number?: string;
        }
      }
    }

    /**
     * Swish configuration
     */
    export interface Swish {
      swish?: Swish.Swish;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Swish {
      export interface Swish {
        /**
         * enable Swish Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Customize the appearance of the checkout.
     */
    export interface Theme {
      /**
       * Color on backdrop shown in desktop mode
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      backdrop?: string;

      /**
       * **Deprecated** - will be ignored.
       *
       * Color used for errors.
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      error?: string;

      /**
       * **Deprecated** - will be ignored.
       *
       * Fontstack used by the checkout.
       *
       * Default value
       * `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
       */
      'font-family'?: string;

      /**
       * Primary color used on pay button and other buttons.
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      primary?: string;

      /**
       * **Deprecated** - will be ignored.
       *
       * Default text color.
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      text?: string;

      /**
       * **Deprecated** - will be ignored.
       *
       * Color used for warnings.
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      warning?: string;
    }

    export interface Vipps {
      /**
       * enable vipps payment
       */
      enabled: boolean;

      /**
       * A short reference / descriptor that can be displayed to the end user
       */
      dynamic_descriptor?: string;

      /**
       * Determines if the payment_product_type is currently available for payment
       */
      payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
    }
  }

  export interface Order {
    /**
     * A reference by the merchant to identify the corresponding order for the Checkout
     * Session
     */
    merchant_reference: string;

    /**
     * The amount to authorize/capture including VAT and discounts. In smallest unit
     * for the currency, e.g. cents
     *
     * The `amount` should be equal to the sum of the `items.amount` +
     * `shipping_option.amount`.
     */
    amount?: number;

    /**
     * Address
     */
    billing_address?: Order.BillingAddress;

    /**
     * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
     */
    currency?: string;

    discount_codes?: Array<string>;

    /**
     * Discounts given, additions to any items discount_lines.
     */
    discount_lines?: Array<Order.DiscountLine>;

    /**
     * The gift cards selected, the part of `order.amount` that will be authorized
     * using gift cards
     */
    gift_cards?: Array<Order.GiftCard>;

    /**
     * Details about the order items.
     *
     * #### Instabank
     *
     * `required` if Instabank payment is configured in and partial_payment is false.
     * All items must include a unique `line_id`, quantity and amount
     *
     * #### Collector Bank
     *
     * `required` if Collector Bank payment is configured in and partial_payment is
     * false. All items must include a unique `line_id`, quantity and amount
     */
    items?: Array<Order.Item>;

    /**
     * A reference by the merchant to identify the corresponding order for the Checkout
     * Session
     */
    merchant_reference_2?: string;

    /**
     * This is a partial payment where the `order.amount` can be lower or equal to the
     * sum of `order.items.amount`
     */
    partial_payment?: boolean;

    /**
     * An id that identifies the seller, value will be included in the settlement
     * reports
     */
    payout_destination_id?: string;

    /**
     * Address
     */
    shipping_address?: Order.ShippingAddress;

    shipping_option?: Order.ShippingOption;

    store?: Order.Store;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     *
     * In smallest unit for the currency, e.g. cents
     *
     * The `vat_amount` should be equal to the sum of the `items.vat_amount` +
     * `shipping_option.vat_amount`.
     */
    vat_amount?: number;
  }

  export namespace Order {
    /**
     * Address
     */
    export interface BillingAddress {
      /**
       * Gaustadalleen 21
       */
      address_line?: string;

      /**
       * PB 123
       */
      address_line_2?: string;

      /**
       * Name of the company
       */
      business_name?: string;

      co_address?: string;

      /**
       * Comment about the address
       */
      comment?: string;

      /**
       * For companies that needs to specify a cost center.
       */
      cost_center?: string;

      /**
       * Country of the location
       */
      country?: string;

      /**
       * The customer's reference
       */
      customer_reference?: string;

      /**
       * The email address of a person or an organization
       */
      email?: string;

      first_name?: string;

      last_name?: string;

      latitude?: number;

      longitude?: number;

      /**
       * The organization number of the customer.
       */
      organization_number?: string;

      /**
       * Type indicating what kind of organization it is.
       */
      organization_type?: string;

      /**
       * mobile number of a person / company, ITU/E.123 format with international prefix
       * (+PPNNNNNNNNN...)
       */
      phone_number?: string;

      /**
       * The zip code / postal code of the address.
       */
      postal_code?: string;

      /**
       * The name of the postal code
       */
      postal_place?: string;
    }

    export interface DiscountLine {
      /**
       * Monetary amount in smallest unit for the currency
       */
      amount?: number;

      description?: string;

      discount_id?: string;

      discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

      line_id?: number;

      /**
       * Optional, set if the amount given was from a percentage discount
       */
      percentage?: number;
    }

    export interface GiftCard {
      /**
       * Non-negative, minor units. Total amount for the gift card
       */
      amount: number;

      card_id: string;

      type: 'dintero.wallets';

      masked_card_token?: string;
    }

    export interface Item {
      /**
       * The ID or SKU of the product on the line
       */
      id?: string;

      /**
       * The total monetary amount of the line item, including VAT and discounts.
       *
       * In smallest unit for the currency, e.g. cents
       */
      amount?: number;

      /**
       * A short, localized description of the line item
       */
      description?: string;

      discount_lines?: Array<Item.DiscountLine>;

      /**
       * The item is eligible for discount
       */
      eligible_for_discount?: boolean;

      /**
       * Details related to
       * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
       *
       * Some items require extra information to be provided when using Klarna as an
       * enabled payment option.
       */
      emd?: Item.Emd;

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      fee_split?: Item.FeeSplit;

      /**
       * The groups the product on the line belongs to
       */
      groups?: Array<Item.Group>;

      /**
       * Discount applied to amount
       */
      is_changed?: boolean;

      /**
       * the number of the line (or id), must be `unique` between all items. `required`
       * when Instabank payment is configured.
       */
      line_id?: string;

      /**
       * The quantity of the product in the item line.
       */
      quantity?: number;

      /**
       * An array of objects specifying how the amount should be split between sellers
       * when using Dintero Payout
       *
       * Specify an empty array if the splits will be provided during capture.
       * `auto_capture` cannot be enabled when splits are defined as empty array.
       */
      splits?: Array<Item.Split>;

      /**
       * URL to a thumbnail of the item. Will be displayed when redirecting to the
       * session.
       *
       * Recommended limitations for the image:
       *
       * - all images should preferrably have the same dimensions
       * - max file size should be less than 2MB
       */
      thumbnail_url?: string;

      /**
       * The type of order item this is.
       *
       * - **physical** - a physical item which must be delivered or handed over
       * - **digital** - a digital item which doesn't need shipping
       * - **service** - payment for services like maintenance performed in your home
       * - **gift_card** - usage of a gift card, where the amount is usually a negative
       *   number
       * - **shipping** - payment for shipping of the order
       * - **surcharge** - extra incurred costs, like taxes or necessary rounding
       */
      type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

      /**
       * The dimensional weight (also known as volumetric) value unit of one item.
       * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
       */
      unit_dimensional_weight?: number;

      /**
       * The volume of one item in m³ (cubic meters)
       */
      unit_volume?: number;

      /**
       * The volume of one item in kg (kilo grams)
       */
      unit_weight?: number;

      /**
       * The VAT percentage
       */
      vat?: number;

      /**
       * The VAT of the `amount` parameter. Only used for display purposes.
       *
       * In smallest unit for the currency, e.g. cents
       */
      vat_amount?: number;
    }

    export namespace Item {
      export interface DiscountLine {
        /**
         * Monetary amount in smallest unit for the currency
         */
        amount?: number;

        description?: string;

        discount_id?: string;

        discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

        line_id?: number;

        /**
         * Optional, set if the amount given was from a percentage discount
         */
        percentage?: number;
      }

      /**
       * Details related to
       * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
       *
       * Some items require extra information to be provided when using Klarna as an
       * enabled payment option.
       */
      export interface Emd {
        /**
         * Only required if the item is related to an event or multiple events, like for
         * example tickets to a concert.
         *
         * If you are selling an event package as a single ticket or item that includes
         * multiple events, for example a festival, you need to provide information about
         * all the individual events that are part of the package.
         */
        event?: Array<Emd.Event>;

        /**
         * Only required if them item is related to a marketplace order.
         *
         * If that is the case, you need to provide information about both the seller and
         * the winner.
         */
        marketplace_order?: Emd.MarketplaceOrder;

        /**
         * Only required if the item is related to a subscription.
         *
         * If that is the case, you need to provide information about both the subscription
         * and the customer account.
         */
        subscription?: Emd.Subscription;

        /**
         * Only required if the item is part of a travel-related transaction.
         *
         * If that is the case, you need to provide information about the itinerary to be
         * booked.
         */
        travel?: Emd.Travel;
      }

      export namespace Emd {
        export interface Event {
          /**
           * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          end_time: string;

          /**
           * Name of the company arranging the event, e.g. "Happy Parties Ltd."
           */
          event_company: string;

          /**
           * Name of the event, e.g. "Fancy Singer"
           */
          event_name: string;

          /**
           * Category or type of venue, e.g. "Pop"
           */
          genre_of_event: string;

          /**
           * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          start_time: string;

          ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

          /**
           * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
           *
           * If email or phone, then use either the email address or the phone number
           * respectively.
           */
          ticket_delivery_recipient: string;

          /**
           * If tickets are digitally checked when entering the venue, e.g. true
           */
          access_controlled_venue?: boolean;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          arena_location?: Event.ArenaLocation;

          /**
           * Name of the venue, e.g. "Song Arena"
           */
          arena_name?: string;
        }

        export namespace Event {
          export interface ArenaLocation {
            /**
             * City that the venue is located in, e.g. "Oslo"
             */
            city: string;

            /**
             * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
             */
            country: string;

            /**
             * Postal code for the venue location, e.g. "0185"
             */
            postal_code?: string;

            /**
             * Street address representing the venue location, e.g. "Sonja Henies plass 2"
             */
            street_address?: string;
          }
        }

        /**
         * Only required if them item is related to a marketplace order.
         *
         * If that is the case, you need to provide information about both the seller and
         * the winner.
         */
        export interface MarketplaceOrder {
          /**
           * Details related to the seller involved in the marketplace order.
           */
          seller_info: MarketplaceOrder.SellerInfo;

          /**
           * Details related to the winner involved in the marketplace order.
           */
          winner_info: MarketplaceOrder.WinnerInfo;
        }

        export namespace MarketplaceOrder {
          /**
           * Details related to the seller involved in the marketplace order.
           */
          export interface SellerInfo {
            account_last_modified: SellerInfo.AccountLastModified;

            /**
             * Date and time that the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Number of trades the sub-merchant did in the last 12 months, e.g. 23
             */
            number_of_trades: number;

            /**
             * Name of the category to which the specific good belongs to, according to the
             * selling merchant's categorization, e.g. "Phones".
             */
            product_category: string;

            /**
             * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
             * Ltd."
             */
            sub_merchant_id: string;

            /**
             * Name of the good purchased.
             */
            product_name?: string;

            /**
             * Current rating of the good purchased according to the marketplace's rating
             * scale, e.g. 5
             */
            seller_rating?: number;

            /**
             * Details about the seller.
             */
            unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

            /**
             * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
             */
            volume_of_trades?: number;
          }

          export namespace SellerInfo {
            export interface AccountLastModified {
              /**
               * Date and time that the (physical) address was last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              address: string;

              /**
               * Date and time that the email was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              email: string;

              /**
               * Date and time that the listing details were last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              listing: string;

              /**
               * Date and time that the login details were last changed (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              login: string;

              /**
               * Date and time that the password was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              password: string;
            }

            /**
             * Details about the seller.
             */
            export interface UniqueAccountIdentifierSeller {
              /**
               * Seller's email address, e.g. "seller@mail.com"
               */
              email?: string;

              other?: string;

              /**
               * Seller's phone number, e.g. "97712123"
               */
              phone_number?: string;
            }
          }

          /**
           * Details related to the winner involved in the marketplace order.
           */
          export interface WinnerInfo {
            account_last_modified: WinnerInfo.AccountLastModified;

            /**
             * Date and time that the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Number of trades the winner did in the last 12 months, e.g. 23
             */
            number_of_trades: number;

            /**
             * Details about the winner.
             */
            unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

            /**
             * Volumes of trades the winner did in the last 12 months, e.g. 230
             */
            volume_of_trades?: number;
          }

          export namespace WinnerInfo {
            export interface AccountLastModified {
              /**
               * Date and time that the (physical) address was last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              address: string;

              /**
               * Date and time that the email was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              email: string;

              /**
               * Date and time that the listing details were last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              listing: string;

              /**
               * Date and time that the login details were last changed (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              login: string;

              /**
               * Date and time that the password was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              password: string;
            }

            /**
             * Details about the winner.
             */
            export interface UniqueAccountIdentifierWinner {
              /**
               * Winner's email address, e.g. "winner@mail.com"
               */
              email?: string;

              other?: string;

              /**
               * Winner's phone number, e.g. "97712123"
               */
              phone_number?: string;
            }
          }
        }

        /**
         * Only required if the item is related to a subscription.
         *
         * If that is the case, you need to provide information about both the subscription
         * and the customer account.
         */
        export interface Subscription {
          /**
           * Information related to the customer that wants to purchase the subscription.
           */
          customer_account_info: Subscription.CustomerAccountInfo;

          /**
           * Details related to the subscription.
           */
          subscription: Subscription.Subscription;
        }

        export namespace Subscription {
          /**
           * Information related to the customer that wants to purchase the subscription.
           */
          export interface CustomerAccountInfo {
            /**
             * The date and time the account was last modified (ISO 8601 format), e.g.
             * "2023-10-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_last_modified: string;

            /**
             * The date and time the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Unique name / number to identify the specific customer account. Max 24
             * characters, e.g. "Adam Adamsson"
             */
            unique_account_identifier: string;
          }

          /**
           * Details related to the subscription.
           */
          export interface Subscription {
            /**
             * Whether the subscription will be auto renewed upon expiry, e.g. true
             */
            auto_renewal_of_subscription: boolean;

            /**
             * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC
             */
            end_time: string;

            /**
             * The start time of the subscription (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC
             */
            start_time: string;

            /**
             * Name of the product on subscription, e.g. "Contact lenses"
             */
            subscription_name: string;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;
          }
        }

        /**
         * Only required if the item is part of a travel-related transaction.
         *
         * If that is the case, you need to provide information about the itinerary to be
         * booked.
         */
        export interface Travel {
          /**
           * Details about the reservation of airline tickets.
           */
          air_reservation_details?: Travel.AirReservationDetails;

          /**
           * Details about the reservation of bus tickets.
           */
          bus_reservation_details?: Travel.BusReservationDetails;

          /**
           * Details about the reservation of rental cars.
           */
          car_rental_reservation_details?: Travel.CarRentalReservationDetails;

          /**
           * Details about the reservation of ferry tickets.
           */
          ferry_reservation_details?: Travel.FerryReservationDetails;

          /**
           * Details about the reservation of hotel rooms.
           */
          hotel_reservation_details?: Travel.HotelReservationDetails;

          /**
           * Details about the reservation of train tickets.
           */
          train_reservation_details?: Travel.TrainReservationDetails;
        }

        export namespace Travel {
          /**
           * Details about the reservation of airline tickets.
           */
          export interface AirReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one flight from Oslo to Munich, and
             * another flight from Munich to Dubai, you need to provide one itinerary object
             * for each of these two flights, and so on.
             */
            itinerary: Array<AirReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<AirReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<AirReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace AirReservationDetails {
            export interface Itinerary {
              /**
               * IATA Airport Code (three letters), e.g. "MUC"
               */
              arrival: string;

              /**
               * IATA Airline standard (two letters or digits), e.g. "LH"
               */
              carrier: string;

              /**
               * IATA Airport Code (three letters), e.g. "OSL"
               */
              departure: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * City the flight arrives in, e.g. "Munich"
               */
              arrival_city?: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * City the flight departs from, e.g. "Oslo"
               */
              departure_city?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the flight in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of bus tickets.
           */
          export interface BusReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one bus journey from Oslo to Munich,
             * and another bus journey from Munich to Rome, you need to provide one itinerary
             * object for each of these two bus journeys, and so on.
             */
            itinerary: Array<BusReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<BusReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<BusReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace BusReservationDetails {
            export interface Itinerary {
              /**
               * City the bus arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Bus Travels Ltd."
               */
              carrier: string;

              /**
               * City the bus departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the bus journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of rental cars.
           */
          export interface CarRentalReservationDetails {
            /**
             * Driver data, one per driver.
             */
            drivers: Array<CarRentalReservationDetails.Driver>;

            /**
             * Car rental itinerary data, one per car rental.
             *
             * If you are selling a package that contains multiple car rentals, you need to
             * provide itinerary data for each of the individual rentals.
             */
            itinerary: Array<CarRentalReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<CarRentalReservationDetails.Insurance>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace CarRentalReservationDetails {
            export interface Driver {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }

            export interface Itinerary {
              /**
               * End time of the car rental reservation (ISO 8601 format), e.g.
               * "2023-08-20T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              end_time: string;

              /**
               * Name of the car rental company, e.g. "Premium Cars Ltd."
               */
              rental_company: string;

              /**
               * Start time of the car rental reservation (ISO 8601 format), e.g.
               * "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              start_time: string;

              /**
               * Price for the car rental reservation in smallest unit of local currency, e.g.
               * 500000
               */
              car_price?: number;

              /**
               * Travel class, e.g. "Premium Cars Premium Class"
               */
              class?: string;

              /**
               * Driver IDs.
               */
              drivers_id?: Array<number>;

              /**
               * Details related to the drop off location.
               */
              drop_off_location?: Itinerary.DropOffLocation;

              /**
               * Details related to the pick up location.
               */
              pick_up_location?: Itinerary.PickUpLocation;
            }

            export namespace Itinerary {
              /**
               * Details related to the drop off location.
               */
              export interface DropOffLocation {
                /**
                 * City where the car should be dropped off, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
                 * "NO"
                 */
                country: string;

                /**
                 * Postal code where the car should be dropped off, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }

              /**
               * Details related to the pick up location.
               */
              export interface PickUpLocation {
                /**
                 * City where the car should be picked up, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
                 * "NO",
                 */
                country: string;

                /**
                 * Postal code where the car should be picked up, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }
          }

          /**
           * Details about the reservation of ferry tickets.
           */
          export interface FerryReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
             * and another ferry journey from Kiel to Gothenburg, you need to provide one
             * itinerary object for each of these two ferry journeys, and so on.
             */
            itinerary: Array<FerryReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<FerryReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<FerryReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace FerryReservationDetails {
            export interface Itinerary {
              /**
               * City the ferry arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Ferry Travels Ltd."
               */
              carrier: string;

              /**
               * City the ferry departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the ferry journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of hotel rooms.
           */
          export interface HotelReservationDetails {
            /**
             * Hotel itinerary data, one per hotel stay.
             *
             * If you are selling a package that contains multiple hotel stays, you need to
             * provide itinerary data for each of the individual stays.
             */
            itinerary: Array<HotelReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<HotelReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<HotelReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace HotelReservationDetails {
            export interface Itinerary {
              /**
               * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              end_time: string;

              /**
               * Price for the hotel stay in smallest unit of local currency, e.g. 200000
               */
              hotel_price: number;

              /**
               * Number of rooms booked, e.g. 2
               */
              number_of_rooms: number;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id: Array<number>;

              /**
               * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              start_time: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Address details of the hotel.
               */
              address?: Itinerary.Address;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * Name of the hotel, e.g. "Premium Hotel"
               */
              hotel_name?: string;
            }

            export namespace Itinerary {
              /**
               * Address details of the hotel.
               */
              export interface Address {
                /**
                 * City the hotel is located in, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
                 */
                country: string;

                /**
                 * Postal code of the hotel, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address of the hotel, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of train tickets.
           */
          export interface TrainReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one train journey from Oslo to Munich,
             * and another train journey from Munich to Rome, you need to provide one itinerary
             * object for each of these two train journeys, and so on.
             */
            itinerary: Array<TrainReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<TrainReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<TrainReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace TrainReservationDetails {
            export interface Itinerary {
              /**
               * City the train arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Train Travels Ltd."
               */
              carrier: string;

              /**
               * City the train departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id: Array<number>;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * Price for that specific segment of the train journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }
        }
      }

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      export interface FeeSplit {
        type: 'proportional';

        /**
         * Seller ids that will be debited for the payment fees All destinations must be
         * included in the list of splits
         */
        destinations?: Array<string>;
      }

      export interface Group {
        /**
         * Group ID
         */
        id: string;

        /**
         * Group name
         */
        name?: string;
      }

      export interface Split {
        /**
         * The split amount in smalles unit for the currency, e.g. cents.
         */
        amount: number;

        /**
         * An id that identifies the seller
         */
        payout_destination_id: string;
      }
    }

    /**
     * Address
     */
    export interface ShippingAddress {
      /**
       * Gaustadalleen 21
       */
      address_line?: string;

      /**
       * PB 123
       */
      address_line_2?: string;

      /**
       * Name of the company
       */
      business_name?: string;

      co_address?: string;

      /**
       * Comment about the address
       */
      comment?: string;

      /**
       * For companies that needs to specify a cost center.
       */
      cost_center?: string;

      /**
       * Country of the location
       */
      country?: string;

      /**
       * The customer's reference
       */
      customer_reference?: string;

      /**
       * The email address of a person or an organization
       */
      email?: string;

      first_name?: string;

      last_name?: string;

      latitude?: number;

      longitude?: number;

      /**
       * The organization number of the customer.
       */
      organization_number?: string;

      /**
       * Type indicating what kind of organization it is.
       */
      organization_type?: string;

      /**
       * mobile number of a person / company, ITU/E.123 format with international prefix
       * (+PPNNNNNNNNN...)
       */
      phone_number?: string;

      /**
       * The zip code / postal code of the address.
       */
      postal_code?: string;

      /**
       * The name of the postal code
       */
      postal_place?: string;
    }

    export interface ShippingOption {
      /**
       * Id of this shipping option product.
       *
       * The express checkout will group all products with the same id. Used for grouping
       * delivery to the same address at different time slots, or for grouping deliveries
       * to different pick up points.
       */
      id: string;

      /**
       * The monetary amount of the shipping option, including VAT and discounts.
       *
       * In smallest unit for the currency, e.g. cents
       */
      amount: number;

      /**
       * Unique id of the specific configuration of this shipping product
       */
      line_id: string;

      /**
       * Name of company that provides shipping service
       */
      operator: string;

      /**
       * A shipping option title. Eg. "Standard"
       */
      title: string;

      /**
       * Countries where this shipping option can be used
       */
      countries?: Array<string>;

      delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

      /**
       * A short description of the shipping option product
       */
      description?: string;

      /**
       * Environmental data about the shipping option
       */
      environmental_data?: ShippingOption.EnvironmentalData;

      /**
       * Estimated time of arrival
       */
      eta?: ShippingOption.Eta;

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      fee_split?: ShippingOption.FeeSplit;

      /**
       * Additional metadata about the shipping_option
       */
      metadata?: unknown;

      /**
       * The operators own id for this shipping product
       */
      operator_product_id?: string;

      pick_up_address?: ShippingOption.PickUpAddress;

      /**
       * An array of objects specifying how the amount should be split between sellers
       * when using Dintero Payout
       *
       * Specify an empty array if the splits will be provided during capture.
       * `auto_capture` cannot be enabled when splits are defined as empty array.
       */
      splits?: Array<ShippingOption.Split>;

      /**
       * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
       * the session. Recommended limitations for the image:
       *
       * - all images should preferrably have the same dimensions
       * - max file size should be less than 2MB
       */
      thumbnail_url?: string;

      /**
       * A specified time for delivery to customer
       */
      time_slot?: ShippingOption.TimeSlot;

      /**
       * The VAT percentage
       */
      vat?: number;

      /**
       * The VAT of the `amount` parameter. Only used for display purposes.
       */
      vat_amount?: number;
    }

    export namespace ShippingOption {
      /**
       * Environmental data about the shipping option
       */
      export interface EnvironmentalData {
        /**
         * A short description of the environmental data, something like
         *
         * - "Fossil free",
         * - "Carbon neutral"
         * - "Low emissions"
         * - "Renewable Energy Sourced"
         * - "Eco-certified Fleet"
         */
        description: string;

        details?: Array<EnvironmentalData.Detail>;
      }

      export namespace EnvironmentalData {
        export interface Detail {
          /**
           * Give context to the value field. Example:
           *
           * - "CO2 emissions"
           * - "Energy consumption"
           * - "Carbon footprint"
           * - "Carbon offset"
           * - "Trees planted"
           * - "Renewable energy percentage"
           */
          label: string;

          value: string;
        }
      }

      /**
       * Estimated time of arrival
       */
      export interface Eta {
        ends_at?: string;

        starts_at?: string;
      }

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      export interface FeeSplit {
        type: 'proportional';

        /**
         * Seller ids that will be debited for the payment fees All destinations must be
         * included in the list of splits
         */
        destinations?: Array<string>;
      }

      export interface PickUpAddress {
        /**
         * Gaustadalleen 21
         */
        address_line?: string;

        /**
         * PB 123
         */
        address_line_2?: string;

        /**
         * Name of the company
         */
        business_name?: string;

        co_address?: string;

        /**
         * Comment about the address
         */
        comment?: string;

        /**
         * For companies that needs to specify a cost center.
         */
        cost_center?: string;

        /**
         * Country of the location
         */
        country?: string;

        /**
         * The customer's reference
         */
        customer_reference?: string;

        /**
         * Distance in kilometers from the shipping_address.
         */
        distance?: number;

        /**
         * The email address of a person or an organization
         */
        email?: string;

        first_name?: string;

        last_name?: string;

        latitude?: number;

        longitude?: number;

        /**
         * The organization number of the customer.
         */
        organization_number?: string;

        /**
         * Type indicating what kind of organization it is.
         */
        organization_type?: string;

        /**
         * mobile number of a person / company, ITU/E.123 format with international prefix
         * (+PPNNNNNNNNN...)
         */
        phone_number?: string;

        /**
         * The zip code / postal code of the address.
         */
        postal_code?: string;

        /**
         * The name of the postal code
         */
        postal_place?: string;
      }

      export interface Split {
        /**
         * The split amount in smalles unit for the currency, e.g. cents.
         */
        amount: number;

        /**
         * An id that identifies the seller
         */
        payout_destination_id: string;
      }

      /**
       * A specified time for delivery to customer
       */
      export interface TimeSlot {
        ends_at?: string;

        starts_at?: string;
      }
    }

    export interface Store {
      id: string;

      address?: Store.Address;

      /**
       * Merchant number associated with the stores payment terminal
       */
      bax?: string;

      /**
       * Official name of the person or entity that owns the store.
       */
      business_name?: string;

      chain?: string;

      email?: string;

      gln?: string;

      /**
       * A four-digit Merchant Category Code (MCC) for the store
       * [ISO 18245:2003](https://www.iso.org/standard/33365.html)
       */
      mcc?: string;

      /**
       * name of the store, aka trade name of the store
       */
      name?: string;

      organization_number?: string;

      phone_number?: string;

      /**
       * Id to a specific point-of-sale (POS) terminal or workstation
       */
      terminal_id?: string;
    }

    export namespace Store {
      export interface Address {
        address_line: string;

        /**
         * ISO 3166-1 country code
         */
        country: string;

        postal_place: string;

        address_line_2?: string;

        postal_code?: string;
      }
    }
  }

  export interface URL {
    /**
     * URL to page where Checkout will redirect the customer to after the Checkout
     * process has ended.
     *
     * If a transaction was completed successfully, a `transaction_id` will be appended
     * to the URL as a `query` string parameter
     *
     * > A `transaction_id` will be appended to the URL if the Checkout failed with
     * > `error=capture`
     *
     * > A transaction with status `ON_HOLD` must be handled as a payment that is
     * > pending approval, where the transaction will later be updated with a final
     * > payment staus `AUTHORIZED` or `FAILED`. We recommend that `callback_url` is
     * > used to receive the callback when the transaction changes status from
     * > `ON_HOLD` to `AUTHORIZED` or `FAILED`. Alternative is to do an hourly/daily
     * > poll on the transaction to check if the status has changed.
     *
     * _Example_:
     *
     * ```
     * https://example.com/accept?transaction_id=T00000000.3YkJXSdSnUBXcmQSzn7uJj
     * ```
     *
     * | query name         |  type  | description                  | required |
     * | ------------------ | :----: | ---------------------------- | :------: |
     * | transaction_id     | string | Transaction Id               |  false   |
     * | error              | string | Error code identifying cause |  false   |
     * | merchant_reference | string | The merchants reference      |   true   |
     *
     * In case of that something went wrong with the payment flow, an `error` query
     * parameter will be appended to the URL. The value of the error is a code
     * identifying the cause.
     *
     * | error         | Description                                                                                     |
     * | ------------- | ----------------------------------------------------------------------------------------------- |
     * | cancelled     | Customer cancelled the checkout payment                                                         |
     * | authorization | Customer failed to authorize the payment                                                        |
     * | failed        | The transaction has been rejected by us, or an error has occurred during transaction processing |
     *
     * ### configuration.channel=in_app
     *
     * The `in_app` channel is intended for payments done from mobile devices where
     * `url.return_url` can be set to the application's appswitch URL.
     *
     * If the query-param `?initial_recipient=merchant` is appended to the appswitch
     * URL, the payment app will redirect directly to the app, without proxying through
     * Dintero.
     *
     * In that case, the `transaction_id` will be appended to the `return_url`, and you
     * will need to poll [GET /v1/transactions](#operation/transactions_get) with this
     * id until the transaction has been updated with one of these statuses:
     *
     * - AUTHORIZED
     * - CAPTURED
     * - FAILED
     *
     * Example url:
     * `myapp://?initial_recipient=merchant&transaction_id=T12345678.abc&merchant_reference=mref123&session_id=T12345678.abd`
     */
    return_url: string;

    /**
     * URL that Checkout will call when the session payment is complete and the
     * transaction has been authorized.
     *
     * > **Callback is only delivered to HTTPS URLs**
     *
     * > A callback done with a transaction with status `ON_HOLD` will receive an
     * > aditional callback (later) when the transaction state changes status from
     * > `ON_HOLD`.
     *
     * > The callback may be received after the transaction is `CAPTURED` in case when
     * > the transaction was created from a session where `auto_capture` was enabled.
     *
     * Unlike the `return_url` the `callback_url` is system-to-system which means
     * delivery is guaranteed.
     *
     * Once a session payment is complete the callback_url is invoked as a `GET`
     * request to notify your system that the payment has been approved.
     *
     * - A callback_url with `method=POST` query parameter will be invoked as a `POST`
     *   request with the transaction included in the request body.
     *
     * - A callback_url with `report_error=true` will enable the callback_url to be
     *   called if the payment failed with error `cancelled`, `authorization` or
     *   `failed`.
     *
     * - A callback_url with `delay_callback=<seconds>` will delay the callback before
     *   trying to deliver the callback. The **maximum** delay is 60 seconds.
     *
     * - A callback_url with `report_event={EVENT}` will enable the callback_url to be
     *   called if a payment event has been applied to the transaction. Valid values
     *   are `CAPTURE`, `REFUND` and `VOID`. The callback_url can contain multiple
     *   `report_event` query parameters. An `event` query parameter will be included
     *   in the request sent to the callback_url.
     *
     * - A callback_url with `includes=session` will enable the callback_url to include
     *   the session data in the body.
     *
     * - A callback_url with `sid_parameter_name=sid` will change the query param
     *   `session_id` to `sid` to avoid false session fixation alarms in firewalls.
     *   Possible values: `sid`, `session_id`
     *
     * A successful delivery to an HTTPS callback_url sometimes requires more than one
     * attempt. This can be the case, for example, if the server hosting the
     * callback_url is down for maintenance or is experiencing heavy traffic.
     *
     * Dintero attempts a retry only after a failed delivery attempt, following
     * situations is considered as failed delivery
     *
     * - HTTP status code 100 to 101 and 500 to 599 (inclusive) (HTTP status code 400
     *   to 499 is considered as permanent failure)
     * - A request timeout (10 seconds)
     * - Any connection error such as connection timeout, bad certificate, etc
     *
     * Failed delivery will be retried 20 times.
     *
     * | query name         |     type     | description                            | required |
     * | ------------------ | :----------: | :------------------------------------- | :------- |
     * | transaction_id     |    string    | Transaction Id                         | true     |
     * | session_id         |    string    | Session Id                             | true     |
     * | sid                |    string    | Session Id when sid_parameter_name=sid | true     |
     * | merchant_reference |    string    | The merchants reference                | true     |
     * | time               |    string    | ISO 8601 format                        | true     |
     * | error              |    string    | Error code                             | false    |
     * | event              |    string    | event applied                          | false    |
     * | event_id           |    string    | event id for callback                  | false    |
     * | includes           | string array | include additional data                | false    |
     *
     * > The transaction_id is optional when callback_url enables `report_error` where
     * > error query will be included in case where the payment was completed without
     * > creating an authorized transaction.
     *
     * > It is not possible to use `https://localhost` or `http://127.0.0.1` for the
     * > callback URL as Checkout backend would then call itself.
     *
     * See [validating callbacks](https://docs.dintero.com/docs/validating-callbacks)
     * to see how you can verify the integrity of the callbacks,
     */
    callback_url?: string;

    /**
     * URL to a webpage with the merchant's Terms of Service. Will be linked to from
     * the checkout.
     */
    merchant_terms_url?: string;
  }

  export interface Checkbox {
    /**
     * ID to assign to the checkbox so you can reference it later
     */
    id: string;

    /**
     * Label that should be visible next to the checkbox
     */
    label: string;

    /**
     * If the checkbox should be checked by default or not
     */
    checked?: boolean;

    link?: Checkbox.Link;

    /**
     * If the checkbox should be required or not
     */
    required?: boolean;
  }

  export namespace Checkbox {
    export interface Link {
      /**
       * Link text
       */
      text: string;

      /**
       * Link URL
       */
      url: string;
    }
  }

  export interface Customer {
    /**
     * Customer id
     */
    customer_id?: string;

    /**
     * Customer email address
     */
    email?: string;

    gift_cards?: Customer.GiftCards;

    /**
     * Options for myDintero
     */
    my_dintero?: Customer.MyDintero;

    /**
     * Customer phone number, ITU/E.123 format with international prefix
     * (+PPNNNNNNNNN...)
     */
    phone_number?: string;

    tokens?: Customer.Tokens;
  }

  export namespace Customer {
    export interface GiftCards {
      /**
       * Preload checkout with Wallets cards and let the customer use it during checkout
       * by providing PIN to activate the card (e.g. use Wallets card as giftcard)
       *
       * - The `dintero.wallets` must be enabled in the session configuration to activate
       *   the use of the provided gift card tokens
       */
      'dintero.wallets'?: Array<GiftCards.DinteroWallet>;
    }

    export namespace GiftCards {
      export interface DinteroWallet {
        card_id: string;

        masked_card_token?: string;
      }
    }

    /**
     * Options for myDintero
     */
    export interface MyDintero {
      /**
       * Actions to perform on the customer
       */
      actions: Array<'create_user'>;

      /**
       * Terms and conditions accepted
       */
      terms: MyDintero.Terms;
    }

    export namespace MyDintero {
      /**
       * Terms and conditions accepted
       */
      export interface Terms {
        /**
         * id of the myDintero terms and conditions
         */
        id: string;

        /**
         * Url to the terms and conditions accepted by the customer
         */
        url: string;
      }
    }

    export interface Tokens {
      'payex.creditcard'?: Tokens.PayexCreditcard;
    }

    export namespace Tokens {
      export interface PayexCreditcard {}
    }
  }

  export interface Event {
    id?: string;

    created_at?: string;

    details?: Event.Details;

    name?:
      | 'INITIATED'
      | 'VISITED'
      | 'COMPLETED'
      | 'AUTHORIZED'
      | 'DECLINED'
      | 'PAY_LOCK_START'
      | 'PAY_LOCK_META'
      | 'PAY_LOCK_END'
      | 'PAY_FAILED'
      | 'ON_HOLD_CALLBACK_SENT'
      | 'AUTH_CALLBACK_SENT'
      | 'FAILED'
      | 'UNKNOWN'
      | 'PAYMENT_TOKEN_FLOW_START'
      | 'UPDATE_SESSION'
      | 'CANCELLED'
      | 'SET_BILLING_ADDRESS'
      | 'SET_DISCOUNT_CODES'
      | 'SET_SHIPPING_ADDRESS'
      | 'SET_SHIPPING_OPTION'
      | 'SET_GIFT_CARD'
      | 'PUSH_NOTIFICATION_SENT'
      | 'SECRET_CONFIRMATION_CODE_SENT'
      | 'SET_MY_DINTERO'
      | 'ADD_PAYMENT_INFORMATION';

    request_headers?: Event.RequestHeaders;

    request_id?: string;
  }

  export namespace Event {
    export interface Details {
      amount?: number;

      bambora?: Details.Bambora;

      'collector:installment:products'?: Array<Details.CollectorInstallmentProduct>;

      'collector:invoice_b2b:addresses'?: Array<Details.CollectorInvoiceB2bAddress>;

      error?: string;

      gift_card?: Details.GiftCard;

      klarna?: Details.Klarna;

      /**
       * Options for myDintero
       */
      my_dintero?: Details.MyDintero;

      organization_number?: string;

      'payex:payment:id'?: string;

      payment_product_type?: string;

      previous_express?: Details.PreviousExpress;

      previous_order?: Details.PreviousOrder;

      /**
       * Address
       */
      shipping_address?: Details.ShippingAddress;

      shipping_option?: Details.ShippingOption;

      updated_express?: Details.UpdatedExpress;

      updated_order?: Details.UpdatedOrder;
    }

    export namespace Details {
      export interface Bambora {
        session_token?: string;

        session_url?: string;

        wallet_session_id?: string;
      }

      /**
       * Collector payment product
       */
      export interface CollectorInstallmentProduct {
        /**
         * Id for the payment product
         */
        id: string;

        /**
         * The fee for a "Buy now – pay later" Payment product
         */
        campaign_fee: number;

        /**
         * Number of months
         */
        credit_time: number;

        /**
         * The amount to pay in the first invoice. Origantion fee is added to the first
         * invoice.
         */
        first_monthly_amount: number;

        /**
         * The amount to pay pr month
         */
        monthly_amount: number;

        /**
         * The notification fee for the payment product
         */
        notification_fee: number;

        /**
         * The startup fee for the payment product
         */
        origination_fee: number;

        /**
         * The total amount to pay
         */
        total_amount: number;

        type: 'interest_free' | 'annuity';

        /**
         * The interest rate for the payment product.
         */
        annual_interest_rate?: string;

        /**
         * The effective annual interest rate for the payment product
         */
        effective_annual_interest_rate?: string;
      }

      export interface CollectorInvoiceB2bAddress {
        /**
         * Gaustadalleen 21
         */
        address_line: string;

        /**
         * ACME Inc
         */
        business_name: string;

        /**
         * Country of the location
         */
        country: string;

        /**
         * The organization number of the customer. For Norway, the length is 9. For
         * Sweden, it's either 10 or 12 digits.
         */
        organization_number: string;

        /**
         * The zip code / postal code of the address.
         */
        postal_code: string;

        /**
         * The name of the postal code
         */
        postal_place: string;

        /**
         * The unique identification of the address from the available addresses for the
         * business
         */
        address_id?: string;
      }

      export interface GiftCard {
        card_amount?: number;

        card_id?: string;

        currency?: string;

        masked_card_token?: string;
      }

      export interface Klarna {
        client_token: string;

        session_id: string;
      }

      /**
       * Options for myDintero
       */
      export interface MyDintero {
        /**
         * Actions to perform on the customer
         */
        actions: Array<'create_user'>;

        /**
         * Terms and conditions accepted
         */
        terms: MyDintero.Terms;
      }

      export namespace MyDintero {
        /**
         * Terms and conditions accepted
         */
        export interface Terms {
          /**
           * id of the myDintero terms and conditions
           */
          id: string;

          /**
           * Url to the terms and conditions accepted by the customer
           */
          url: string;
        }
      }

      export interface PreviousExpress {
        /**
         * ### Present only for _Express Checkout_ sessions.
         *
         * An _Express Checkout_ session is a session where the end user will submit a
         * shipping address and then select a shipping option before the before a payment
         * method is selected and the payment is initiated.
         *
         * Endpoints used in the _Express Checkout_ flow.
         *
         * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
         * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
         */
        express?: PreviousExpress.Express;
      }

      export namespace PreviousExpress {
        /**
         * ### Present only for _Express Checkout_ sessions.
         *
         * An _Express Checkout_ session is a session where the end user will submit a
         * shipping address and then select a shipping option before the before a payment
         * method is selected and the payment is initiated.
         *
         * Endpoints used in the _Express Checkout_ flow.
         *
         * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
         * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
         */
        export interface Express {
          /**
           * Shipping options that will be presented to the end user after the end user has
           * submitted a shipping address.
           *
           * To dynamically update the shipping*options when the *`order.shipping_address`_
           * is changed by the end user in the checkout, use the
           * _`url.shipping_address_callback_url`\_.
           *
           * If the merchant is not able to ship the order to the end users shipping address,
           * use an empty array.
           *
           * If there is only one option, a free delivery, the order still has to contain one
           * option with a _`price.amount`_ of 0.
           */
          shipping_options: Array<Express.ShippingOption>;

          /**
           * Limit the lind of customers that can be submitted via the address form in the
           * express checkout.
           */
          customer_types?: Array<'b2c' | 'b2b'>;

          /**
           * Enable discount codes for Express Checkout
           */
          discount_codes?: Express.DiscountCodes;

          /**
           * URL that Checkout will POST to when the end user has submitted/changed a
           * shipping address for an express-session.
           *
           * Dintero will not attempt a retry after a failed delivery attempt. Following
           * situations is considered as failed delivery
           *
           * - HTTP status codes that are not 200.
           * - A request timeout (60 seconds)
           * - Any connection error such as connection timeout, bad certificate, etc
           *
           * The response from the callback will be used to update the shipping options.
           *
           * See
           * [POST example/shipping_address_callback_url](#operation/example_shipping_address_callback_url)
           * for details about the request and response.
           */
          shipping_address_callback_url?: string;

          shipping_mode?: 'shipping_required' | 'shipping_not_required';
        }

        export namespace Express {
          /**
           * A shipping option
           */
          export interface ShippingOption {
            /**
             * Id of this shipping option product.
             *
             * The express checkout will group all products with the same id. Used for grouping
             * delivery to the same address at different time slots, or for grouping deliveries
             * to different pick up points.
             */
            id: string;

            /**
             * The monetary amount of the shipping option, including VAT and discounts.
             *
             * In smallest unit for the currency, e.g. cents
             */
            amount: number;

            /**
             * Unique id of the specific configuration of this shipping product
             */
            line_id: string;

            /**
             * Name of company that provides shipping service
             */
            operator: string;

            /**
             * A shipping option title. Eg. "Standard"
             */
            title: string;

            /**
             * Countries where this shipping option can be used
             */
            countries?: Array<string>;

            delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

            /**
             * A short description of the shipping option product
             */
            description?: string;

            /**
             * Environmental data about the shipping option
             */
            environmental_data?: ShippingOption.EnvironmentalData;

            /**
             * Estimated time of arrival
             */
            eta?: ShippingOption.Eta;

            /**
             * Additional metadata about the shipping_option
             */
            metadata?: unknown;

            /**
             * The operators own id for this shipping product
             */
            operator_product_id?: string;

            pick_up_address?: ShippingOption.PickUpAddress;

            /**
             * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
             * the session. Recommended limitations for the image:
             *
             * - all images should preferrably have the same dimensions
             * - max file size should be less than 2MB
             */
            thumbnail_url?: string;

            /**
             * A specified time for delivery to customer
             */
            time_slot?: ShippingOption.TimeSlot;

            /**
             * The VAT percentage
             */
            vat?: number;

            /**
             * The VAT of the `amount` parameter. Only used for display purposes.
             */
            vat_amount?: number;
          }

          export namespace ShippingOption {
            /**
             * Environmental data about the shipping option
             */
            export interface EnvironmentalData {
              /**
               * A short description of the environmental data, something like
               *
               * - "Fossil free",
               * - "Carbon neutral"
               * - "Low emissions"
               * - "Renewable Energy Sourced"
               * - "Eco-certified Fleet"
               */
              description: string;

              details?: Array<EnvironmentalData.Detail>;
            }

            export namespace EnvironmentalData {
              export interface Detail {
                /**
                 * Give context to the value field. Example:
                 *
                 * - "CO2 emissions"
                 * - "Energy consumption"
                 * - "Carbon footprint"
                 * - "Carbon offset"
                 * - "Trees planted"
                 * - "Renewable energy percentage"
                 */
                label: string;

                value: string;
              }
            }

            /**
             * Estimated time of arrival
             */
            export interface Eta {
              ends_at?: string;

              starts_at?: string;
            }

            export interface PickUpAddress {
              /**
               * Gaustadalleen 21
               */
              address_line?: string;

              /**
               * PB 123
               */
              address_line_2?: string;

              /**
               * Name of the company
               */
              business_name?: string;

              co_address?: string;

              /**
               * Comment about the address
               */
              comment?: string;

              /**
               * For companies that needs to specify a cost center.
               */
              cost_center?: string;

              /**
               * Country of the location
               */
              country?: string;

              /**
               * The customer's reference
               */
              customer_reference?: string;

              /**
               * Distance in kilometers from the shipping_address.
               */
              distance?: number;

              /**
               * The email address of a person or an organization
               */
              email?: string;

              first_name?: string;

              last_name?: string;

              latitude?: number;

              longitude?: number;

              /**
               * The organization number of the customer.
               */
              organization_number?: string;

              /**
               * Type indicating what kind of organization it is.
               */
              organization_type?: string;

              /**
               * mobile number of a person / company, ITU/E.123 format with international prefix
               * (+PPNNNNNNNNN...)
               */
              phone_number?: string;

              /**
               * The zip code / postal code of the address.
               */
              postal_code?: string;

              /**
               * The name of the postal code
               */
              postal_place?: string;
            }

            /**
             * A specified time for delivery to customer
             */
            export interface TimeSlot {
              ends_at?: string;

              starts_at?: string;
            }
          }

          /**
           * Enable discount codes for Express Checkout
           */
          export interface DiscountCodes {
            /**
             * URL that Checkout will POST to when the user has submitted/changed the discount
             * codes for an express session.
             *
             * Dintero will not attempt a retry after a failed delivery attempt. Following
             * situations is considered as failed delivery
             *
             * - HTTP status codes that are not 200.
             * - A request timeout (60 seconds)
             * - Any connection error such as connection timeout, bad certificate, etc
             *
             * The response from the callback will be used to update the order amount, items
             * discount_lines and shipping options.
             *
             * See
             * [POST example/discount_codes_callback_url](#operation/example_discount_codes_callback_url)
             * for details about the request and response.
             */
            callback_url?: string;

            /**
             * Limit how many discount codes can be added by the customer
             */
            max_count?: number;
          }
        }
      }

      export interface PreviousOrder {
        /**
         * A reference by the merchant to identify the corresponding order for the Checkout
         * Session
         */
        merchant_reference: string;

        /**
         * The amount to authorize/capture including VAT and discounts. In smallest unit
         * for the currency, e.g. cents
         *
         * The `amount` should be equal to the sum of the `items.amount` +
         * `shipping_option.amount`.
         */
        amount?: number;

        /**
         * Address
         */
        billing_address?: PreviousOrder.BillingAddress;

        /**
         * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
         */
        currency?: string;

        discount_codes?: Array<string>;

        /**
         * Discounts given, additions to any items discount_lines.
         */
        discount_lines?: Array<PreviousOrder.DiscountLine>;

        /**
         * Details about the order items.
         *
         * #### Instabank
         *
         * `required` if Instabank payment is configured in and partial_payment is false.
         * All items must include a unique `line_id`, quantity and amount
         *
         * #### Collector Bank
         *
         * `required` if Collector Bank payment is configured in and partial_payment is
         * false. All items must include a unique `line_id`, quantity and amount
         */
        items?: Array<PreviousOrder.Item>;

        /**
         * A reference by the merchant to identify the corresponding order for the Checkout
         * Session
         */
        merchant_reference_2?: string;

        /**
         * This is a partial payment where the `order.amount` can be lower or equal to the
         * sum of `order.items.amount`
         */
        partial_payment?: boolean;

        /**
         * An id that identifies the seller, value will be included in the settlement
         * reports
         */
        payout_destination_id?: string;

        /**
         * Address
         */
        shipping_address?: PreviousOrder.ShippingAddress;

        shipping_option?: PreviousOrder.ShippingOption;

        store?: PreviousOrder.Store;

        /**
         * The VAT of the `amount` parameter. Only used for display purposes.
         *
         * In smallest unit for the currency, e.g. cents
         *
         * The `vat_amount` should be equal to the sum of the `items.vat_amount` +
         * `shipping_option.vat_amount`.
         */
        vat_amount?: number;
      }

      export namespace PreviousOrder {
        /**
         * Address
         */
        export interface BillingAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface DiscountLine {
          /**
           * Monetary amount in smallest unit for the currency
           */
          amount?: number;

          description?: string;

          discount_id?: string;

          discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

          line_id?: number;

          /**
           * Optional, set if the amount given was from a percentage discount
           */
          percentage?: number;
        }

        export interface Item {
          /**
           * The ID or SKU of the product on the line
           */
          id?: string;

          /**
           * The total monetary amount of the line item, including VAT and discounts.
           *
           * In smallest unit for the currency, e.g. cents
           */
          amount?: number;

          /**
           * A short, localized description of the line item
           */
          description?: string;

          discount_lines?: Array<Item.DiscountLine>;

          /**
           * The item is eligible for discount
           */
          eligible_for_discount?: boolean;

          /**
           * Details related to
           * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
           *
           * Some items require extra information to be provided when using Klarna as an
           * enabled payment option.
           */
          emd?: Item.Emd;

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          fee_split?: Item.FeeSplit;

          /**
           * The groups the product on the line belongs to
           */
          groups?: Array<Item.Group>;

          /**
           * Discount applied to amount
           */
          is_changed?: boolean;

          /**
           * the number of the line (or id), must be `unique` between all items. `required`
           * when Instabank payment is configured.
           */
          line_id?: string;

          /**
           * The quantity of the product in the item line.
           */
          quantity?: number;

          /**
           * An array of objects specifying how the amount should be split between sellers
           * when using Dintero Payout
           *
           * Specify an empty array if the splits will be provided during capture.
           * `auto_capture` cannot be enabled when splits are defined as empty array.
           */
          splits?: Array<Item.Split>;

          /**
           * URL to a thumbnail of the item. Will be displayed when redirecting to the
           * session.
           *
           * Recommended limitations for the image:
           *
           * - all images should preferrably have the same dimensions
           * - max file size should be less than 2MB
           */
          thumbnail_url?: string;

          /**
           * The type of order item this is.
           *
           * - **physical** - a physical item which must be delivered or handed over
           * - **digital** - a digital item which doesn't need shipping
           * - **service** - payment for services like maintenance performed in your home
           * - **gift_card** - usage of a gift card, where the amount is usually a negative
           *   number
           * - **shipping** - payment for shipping of the order
           * - **surcharge** - extra incurred costs, like taxes or necessary rounding
           */
          type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

          /**
           * The dimensional weight (also known as volumetric) value unit of one item.
           * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
           */
          unit_dimensional_weight?: number;

          /**
           * The volume of one item in m³ (cubic meters)
           */
          unit_volume?: number;

          /**
           * The volume of one item in kg (kilo grams)
           */
          unit_weight?: number;

          /**
           * The VAT percentage
           */
          vat?: number;

          /**
           * The VAT of the `amount` parameter. Only used for display purposes.
           *
           * In smallest unit for the currency, e.g. cents
           */
          vat_amount?: number;
        }

        export namespace Item {
          export interface DiscountLine {
            /**
             * Monetary amount in smallest unit for the currency
             */
            amount?: number;

            description?: string;

            discount_id?: string;

            discount_type?:
              | 'customer'
              | 'periodic'
              | 'manual'
              | 'loyalty'
              | 'total'
              | 'employee'
              | 'external';

            line_id?: number;

            /**
             * Optional, set if the amount given was from a percentage discount
             */
            percentage?: number;
          }

          /**
           * Details related to
           * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
           *
           * Some items require extra information to be provided when using Klarna as an
           * enabled payment option.
           */
          export interface Emd {
            /**
             * Only required if the item is related to an event or multiple events, like for
             * example tickets to a concert.
             *
             * If you are selling an event package as a single ticket or item that includes
             * multiple events, for example a festival, you need to provide information about
             * all the individual events that are part of the package.
             */
            event?: Array<Emd.Event>;

            /**
             * Only required if them item is related to a marketplace order.
             *
             * If that is the case, you need to provide information about both the seller and
             * the winner.
             */
            marketplace_order?: Emd.MarketplaceOrder;

            /**
             * Only required if the item is related to a subscription.
             *
             * If that is the case, you need to provide information about both the subscription
             * and the customer account.
             */
            subscription?: Emd.Subscription;

            /**
             * Only required if the item is part of a travel-related transaction.
             *
             * If that is the case, you need to provide information about the itinerary to be
             * booked.
             */
            travel?: Emd.Travel;
          }

          export namespace Emd {
            export interface Event {
              /**
               * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              end_time: string;

              /**
               * Name of the company arranging the event, e.g. "Happy Parties Ltd."
               */
              event_company: string;

              /**
               * Name of the event, e.g. "Fancy Singer"
               */
              event_name: string;

              /**
               * Category or type of venue, e.g. "Pop"
               */
              genre_of_event: string;

              /**
               * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              start_time: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * If tickets are digitally checked when entering the venue, e.g. true
               */
              access_controlled_venue?: boolean;

              /**
               * Name of the affiliate that originated the purchase.
               */
              affiliate_name?: string;

              arena_location?: Event.ArenaLocation;

              /**
               * Name of the venue, e.g. "Song Arena"
               */
              arena_name?: string;
            }

            export namespace Event {
              export interface ArenaLocation {
                /**
                 * City that the venue is located in, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
                 */
                country: string;

                /**
                 * Postal code for the venue location, e.g. "0185"
                 */
                postal_code?: string;

                /**
                 * Street address representing the venue location, e.g. "Sonja Henies plass 2"
                 */
                street_address?: string;
              }
            }

            /**
             * Only required if them item is related to a marketplace order.
             *
             * If that is the case, you need to provide information about both the seller and
             * the winner.
             */
            export interface MarketplaceOrder {
              /**
               * Details related to the seller involved in the marketplace order.
               */
              seller_info: MarketplaceOrder.SellerInfo;

              /**
               * Details related to the winner involved in the marketplace order.
               */
              winner_info: MarketplaceOrder.WinnerInfo;
            }

            export namespace MarketplaceOrder {
              /**
               * Details related to the seller involved in the marketplace order.
               */
              export interface SellerInfo {
                account_last_modified: SellerInfo.AccountLastModified;

                /**
                 * Date and time that the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Number of trades the sub-merchant did in the last 12 months, e.g. 23
                 */
                number_of_trades: number;

                /**
                 * Name of the category to which the specific good belongs to, according to the
                 * selling merchant's categorization, e.g. "Phones".
                 */
                product_category: string;

                /**
                 * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
                 * Ltd."
                 */
                sub_merchant_id: string;

                /**
                 * Name of the good purchased.
                 */
                product_name?: string;

                /**
                 * Current rating of the good purchased according to the marketplace's rating
                 * scale, e.g. 5
                 */
                seller_rating?: number;

                /**
                 * Details about the seller.
                 */
                unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

                /**
                 * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
                 */
                volume_of_trades?: number;
              }

              export namespace SellerInfo {
                export interface AccountLastModified {
                  /**
                   * Date and time that the (physical) address was last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  address: string;

                  /**
                   * Date and time that the email was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  email: string;

                  /**
                   * Date and time that the listing details were last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  listing: string;

                  /**
                   * Date and time that the login details were last changed (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  login: string;

                  /**
                   * Date and time that the password was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  password: string;
                }

                /**
                 * Details about the seller.
                 */
                export interface UniqueAccountIdentifierSeller {
                  /**
                   * Seller's email address, e.g. "seller@mail.com"
                   */
                  email?: string;

                  other?: string;

                  /**
                   * Seller's phone number, e.g. "97712123"
                   */
                  phone_number?: string;
                }
              }

              /**
               * Details related to the winner involved in the marketplace order.
               */
              export interface WinnerInfo {
                account_last_modified: WinnerInfo.AccountLastModified;

                /**
                 * Date and time that the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Number of trades the winner did in the last 12 months, e.g. 23
                 */
                number_of_trades: number;

                /**
                 * Details about the winner.
                 */
                unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

                /**
                 * Volumes of trades the winner did in the last 12 months, e.g. 230
                 */
                volume_of_trades?: number;
              }

              export namespace WinnerInfo {
                export interface AccountLastModified {
                  /**
                   * Date and time that the (physical) address was last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  address: string;

                  /**
                   * Date and time that the email was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  email: string;

                  /**
                   * Date and time that the listing details were last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  listing: string;

                  /**
                   * Date and time that the login details were last changed (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  login: string;

                  /**
                   * Date and time that the password was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  password: string;
                }

                /**
                 * Details about the winner.
                 */
                export interface UniqueAccountIdentifierWinner {
                  /**
                   * Winner's email address, e.g. "winner@mail.com"
                   */
                  email?: string;

                  other?: string;

                  /**
                   * Winner's phone number, e.g. "97712123"
                   */
                  phone_number?: string;
                }
              }
            }

            /**
             * Only required if the item is related to a subscription.
             *
             * If that is the case, you need to provide information about both the subscription
             * and the customer account.
             */
            export interface Subscription {
              /**
               * Information related to the customer that wants to purchase the subscription.
               */
              customer_account_info: Subscription.CustomerAccountInfo;

              /**
               * Details related to the subscription.
               */
              subscription: Subscription.Subscription;
            }

            export namespace Subscription {
              /**
               * Information related to the customer that wants to purchase the subscription.
               */
              export interface CustomerAccountInfo {
                /**
                 * The date and time the account was last modified (ISO 8601 format), e.g.
                 * "2023-10-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_last_modified: string;

                /**
                 * The date and time the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Unique name / number to identify the specific customer account. Max 24
                 * characters, e.g. "Adam Adamsson"
                 */
                unique_account_identifier: string;
              }

              /**
               * Details related to the subscription.
               */
              export interface Subscription {
                /**
                 * Whether the subscription will be auto renewed upon expiry, e.g. true
                 */
                auto_renewal_of_subscription: boolean;

                /**
                 * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC
                 */
                end_time: string;

                /**
                 * The start time of the subscription (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC
                 */
                start_time: string;

                /**
                 * Name of the product on subscription, e.g. "Contact lenses"
                 */
                subscription_name: string;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;
              }
            }

            /**
             * Only required if the item is part of a travel-related transaction.
             *
             * If that is the case, you need to provide information about the itinerary to be
             * booked.
             */
            export interface Travel {
              /**
               * Details about the reservation of airline tickets.
               */
              air_reservation_details?: Travel.AirReservationDetails;

              /**
               * Details about the reservation of bus tickets.
               */
              bus_reservation_details?: Travel.BusReservationDetails;

              /**
               * Details about the reservation of rental cars.
               */
              car_rental_reservation_details?: Travel.CarRentalReservationDetails;

              /**
               * Details about the reservation of ferry tickets.
               */
              ferry_reservation_details?: Travel.FerryReservationDetails;

              /**
               * Details about the reservation of hotel rooms.
               */
              hotel_reservation_details?: Travel.HotelReservationDetails;

              /**
               * Details about the reservation of train tickets.
               */
              train_reservation_details?: Travel.TrainReservationDetails;
            }

            export namespace Travel {
              /**
               * Details about the reservation of airline tickets.
               */
              export interface AirReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one flight from Oslo to Munich, and
                 * another flight from Munich to Dubai, you need to provide one itinerary object
                 * for each of these two flights, and so on.
                 */
                itinerary: Array<AirReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<AirReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<AirReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace AirReservationDetails {
                export interface Itinerary {
                  /**
                   * IATA Airport Code (three letters), e.g. "MUC"
                   */
                  arrival: string;

                  /**
                   * IATA Airline standard (two letters or digits), e.g. "LH"
                   */
                  carrier: string;

                  /**
                   * IATA Airport Code (three letters), e.g. "OSL"
                   */
                  departure: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * City the flight arrives in, e.g. "Munich"
                   */
                  arrival_city?: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * City the flight departs from, e.g. "Oslo"
                   */
                  departure_city?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the flight in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of bus tickets.
               */
              export interface BusReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one bus journey from Oslo to Munich,
                 * and another bus journey from Munich to Rome, you need to provide one itinerary
                 * object for each of these two bus journeys, and so on.
                 */
                itinerary: Array<BusReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<BusReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<BusReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace BusReservationDetails {
                export interface Itinerary {
                  /**
                   * City the bus arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Bus Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the bus departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the bus journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of rental cars.
               */
              export interface CarRentalReservationDetails {
                /**
                 * Driver data, one per driver.
                 */
                drivers: Array<CarRentalReservationDetails.Driver>;

                /**
                 * Car rental itinerary data, one per car rental.
                 *
                 * If you are selling a package that contains multiple car rentals, you need to
                 * provide itinerary data for each of the individual rentals.
                 */
                itinerary: Array<CarRentalReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<CarRentalReservationDetails.Insurance>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace CarRentalReservationDetails {
                export interface Driver {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }

                export interface Itinerary {
                  /**
                   * End time of the car rental reservation (ISO 8601 format), e.g.
                   * "2023-08-20T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  end_time: string;

                  /**
                   * Name of the car rental company, e.g. "Premium Cars Ltd."
                   */
                  rental_company: string;

                  /**
                   * Start time of the car rental reservation (ISO 8601 format), e.g.
                   * "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  start_time: string;

                  /**
                   * Price for the car rental reservation in smallest unit of local currency, e.g.
                   * 500000
                   */
                  car_price?: number;

                  /**
                   * Travel class, e.g. "Premium Cars Premium Class"
                   */
                  class?: string;

                  /**
                   * Driver IDs.
                   */
                  drivers_id?: Array<number>;

                  /**
                   * Details related to the drop off location.
                   */
                  drop_off_location?: Itinerary.DropOffLocation;

                  /**
                   * Details related to the pick up location.
                   */
                  pick_up_location?: Itinerary.PickUpLocation;
                }

                export namespace Itinerary {
                  /**
                   * Details related to the drop off location.
                   */
                  export interface DropOffLocation {
                    /**
                     * City where the car should be dropped off, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
                     * "NO"
                     */
                    country: string;

                    /**
                     * Postal code where the car should be dropped off, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }

                  /**
                   * Details related to the pick up location.
                   */
                  export interface PickUpLocation {
                    /**
                     * City where the car should be picked up, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
                     * "NO",
                     */
                    country: string;

                    /**
                     * Postal code where the car should be picked up, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }
              }

              /**
               * Details about the reservation of ferry tickets.
               */
              export interface FerryReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
                 * and another ferry journey from Kiel to Gothenburg, you need to provide one
                 * itinerary object for each of these two ferry journeys, and so on.
                 */
                itinerary: Array<FerryReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<FerryReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<FerryReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace FerryReservationDetails {
                export interface Itinerary {
                  /**
                   * City the ferry arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Ferry Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the ferry departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the ferry journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of hotel rooms.
               */
              export interface HotelReservationDetails {
                /**
                 * Hotel itinerary data, one per hotel stay.
                 *
                 * If you are selling a package that contains multiple hotel stays, you need to
                 * provide itinerary data for each of the individual stays.
                 */
                itinerary: Array<HotelReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<HotelReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<HotelReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace HotelReservationDetails {
                export interface Itinerary {
                  /**
                   * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  end_time: string;

                  /**
                   * Price for the hotel stay in smallest unit of local currency, e.g. 200000
                   */
                  hotel_price: number;

                  /**
                   * Number of rooms booked, e.g. 2
                   */
                  number_of_rooms: number;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id: Array<number>;

                  /**
                   * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  start_time: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Address details of the hotel.
                   */
                  address?: Itinerary.Address;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * Name of the hotel, e.g. "Premium Hotel"
                   */
                  hotel_name?: string;
                }

                export namespace Itinerary {
                  /**
                   * Address details of the hotel.
                   */
                  export interface Address {
                    /**
                     * City the hotel is located in, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
                     */
                    country: string;

                    /**
                     * Postal code of the hotel, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address of the hotel, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of train tickets.
               */
              export interface TrainReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one train journey from Oslo to Munich,
                 * and another train journey from Munich to Rome, you need to provide one itinerary
                 * object for each of these two train journeys, and so on.
                 */
                itinerary: Array<TrainReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<TrainReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<TrainReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace TrainReservationDetails {
                export interface Itinerary {
                  /**
                   * City the train arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Train Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the train departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id: Array<number>;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * Price for that specific segment of the train journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }
            }
          }

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          export interface FeeSplit {
            type: 'proportional';

            /**
             * Seller ids that will be debited for the payment fees All destinations must be
             * included in the list of splits
             */
            destinations?: Array<string>;
          }

          export interface Group {
            /**
             * Group ID
             */
            id: string;

            /**
             * Group name
             */
            name?: string;
          }

          export interface Split {
            /**
             * The split amount in smalles unit for the currency, e.g. cents.
             */
            amount: number;

            /**
             * An id that identifies the seller
             */
            payout_destination_id: string;
          }
        }

        /**
         * Address
         */
        export interface ShippingAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface ShippingOption {
          /**
           * Id of this shipping option product.
           *
           * The express checkout will group all products with the same id. Used for grouping
           * delivery to the same address at different time slots, or for grouping deliveries
           * to different pick up points.
           */
          id: string;

          /**
           * The monetary amount of the shipping option, including VAT and discounts.
           *
           * In smallest unit for the currency, e.g. cents
           */
          amount: number;

          /**
           * Unique id of the specific configuration of this shipping product
           */
          line_id: string;

          /**
           * Name of company that provides shipping service
           */
          operator: string;

          /**
           * A shipping option title. Eg. "Standard"
           */
          title: string;

          /**
           * Countries where this shipping option can be used
           */
          countries?: Array<string>;

          delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

          /**
           * A short description of the shipping option product
           */
          description?: string;

          /**
           * Environmental data about the shipping option
           */
          environmental_data?: ShippingOption.EnvironmentalData;

          /**
           * Estimated time of arrival
           */
          eta?: ShippingOption.Eta;

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          fee_split?: ShippingOption.FeeSplit;

          /**
           * Additional metadata about the shipping_option
           */
          metadata?: unknown;

          /**
           * The operators own id for this shipping product
           */
          operator_product_id?: string;

          pick_up_address?: ShippingOption.PickUpAddress;

          /**
           * An array of objects specifying how the amount should be split between sellers
           * when using Dintero Payout
           *
           * Specify an empty array if the splits will be provided during capture.
           * `auto_capture` cannot be enabled when splits are defined as empty array.
           */
          splits?: Array<ShippingOption.Split>;

          /**
           * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
           * the session. Recommended limitations for the image:
           *
           * - all images should preferrably have the same dimensions
           * - max file size should be less than 2MB
           */
          thumbnail_url?: string;

          /**
           * A specified time for delivery to customer
           */
          time_slot?: ShippingOption.TimeSlot;

          /**
           * The VAT percentage
           */
          vat?: number;

          /**
           * The VAT of the `amount` parameter. Only used for display purposes.
           */
          vat_amount?: number;
        }

        export namespace ShippingOption {
          /**
           * Environmental data about the shipping option
           */
          export interface EnvironmentalData {
            /**
             * A short description of the environmental data, something like
             *
             * - "Fossil free",
             * - "Carbon neutral"
             * - "Low emissions"
             * - "Renewable Energy Sourced"
             * - "Eco-certified Fleet"
             */
            description: string;

            details?: Array<EnvironmentalData.Detail>;
          }

          export namespace EnvironmentalData {
            export interface Detail {
              /**
               * Give context to the value field. Example:
               *
               * - "CO2 emissions"
               * - "Energy consumption"
               * - "Carbon footprint"
               * - "Carbon offset"
               * - "Trees planted"
               * - "Renewable energy percentage"
               */
              label: string;

              value: string;
            }
          }

          /**
           * Estimated time of arrival
           */
          export interface Eta {
            ends_at?: string;

            starts_at?: string;
          }

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          export interface FeeSplit {
            type: 'proportional';

            /**
             * Seller ids that will be debited for the payment fees All destinations must be
             * included in the list of splits
             */
            destinations?: Array<string>;
          }

          export interface PickUpAddress {
            /**
             * Gaustadalleen 21
             */
            address_line?: string;

            /**
             * PB 123
             */
            address_line_2?: string;

            /**
             * Name of the company
             */
            business_name?: string;

            co_address?: string;

            /**
             * Comment about the address
             */
            comment?: string;

            /**
             * For companies that needs to specify a cost center.
             */
            cost_center?: string;

            /**
             * Country of the location
             */
            country?: string;

            /**
             * The customer's reference
             */
            customer_reference?: string;

            /**
             * Distance in kilometers from the shipping_address.
             */
            distance?: number;

            /**
             * The email address of a person or an organization
             */
            email?: string;

            first_name?: string;

            last_name?: string;

            latitude?: number;

            longitude?: number;

            /**
             * The organization number of the customer.
             */
            organization_number?: string;

            /**
             * Type indicating what kind of organization it is.
             */
            organization_type?: string;

            /**
             * mobile number of a person / company, ITU/E.123 format with international prefix
             * (+PPNNNNNNNNN...)
             */
            phone_number?: string;

            /**
             * The zip code / postal code of the address.
             */
            postal_code?: string;

            /**
             * The name of the postal code
             */
            postal_place?: string;
          }

          export interface Split {
            /**
             * The split amount in smalles unit for the currency, e.g. cents.
             */
            amount: number;

            /**
             * An id that identifies the seller
             */
            payout_destination_id: string;
          }

          /**
           * A specified time for delivery to customer
           */
          export interface TimeSlot {
            ends_at?: string;

            starts_at?: string;
          }
        }

        export interface Store {
          id: string;

          address?: Store.Address;

          /**
           * Merchant number associated with the stores payment terminal
           */
          bax?: string;

          /**
           * Official name of the person or entity that owns the store.
           */
          business_name?: string;

          chain?: string;

          email?: string;

          gln?: string;

          /**
           * A four-digit Merchant Category Code (MCC) for the store
           * [ISO 18245:2003](https://www.iso.org/standard/33365.html)
           */
          mcc?: string;

          /**
           * name of the store, aka trade name of the store
           */
          name?: string;

          organization_number?: string;

          phone_number?: string;

          /**
           * Id to a specific point-of-sale (POS) terminal or workstation
           */
          terminal_id?: string;
        }

        export namespace Store {
          export interface Address {
            address_line: string;

            /**
             * ISO 3166-1 country code
             */
            country: string;

            postal_place: string;

            address_line_2?: string;

            postal_code?: string;
          }
        }
      }

      /**
       * Address
       */
      export interface ShippingAddress {
        /**
         * Gaustadalleen 21
         */
        address_line?: string;

        /**
         * PB 123
         */
        address_line_2?: string;

        /**
         * Name of the company
         */
        business_name?: string;

        co_address?: string;

        /**
         * Comment about the address
         */
        comment?: string;

        /**
         * For companies that needs to specify a cost center.
         */
        cost_center?: string;

        /**
         * Country of the location
         */
        country?: string;

        /**
         * The customer's reference
         */
        customer_reference?: string;

        /**
         * The email address of a person or an organization
         */
        email?: string;

        first_name?: string;

        last_name?: string;

        latitude?: number;

        longitude?: number;

        /**
         * The organization number of the customer.
         */
        organization_number?: string;

        /**
         * Type indicating what kind of organization it is.
         */
        organization_type?: string;

        /**
         * mobile number of a person / company, ITU/E.123 format with international prefix
         * (+PPNNNNNNNNN...)
         */
        phone_number?: string;

        /**
         * The zip code / postal code of the address.
         */
        postal_code?: string;

        /**
         * The name of the postal code
         */
        postal_place?: string;
      }

      export interface ShippingOption {
        /**
         * Id of this shipping option product.
         *
         * The express checkout will group all products with the same id. Used for grouping
         * delivery to the same address at different time slots, or for grouping deliveries
         * to different pick up points.
         */
        id: string;

        /**
         * The monetary amount of the shipping option, including VAT and discounts.
         *
         * In smallest unit for the currency, e.g. cents
         */
        amount: number;

        /**
         * Unique id of the specific configuration of this shipping product
         */
        line_id: string;

        /**
         * Name of company that provides shipping service
         */
        operator: string;

        /**
         * A shipping option title. Eg. "Standard"
         */
        title: string;

        /**
         * Countries where this shipping option can be used
         */
        countries?: Array<string>;

        delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

        /**
         * A short description of the shipping option product
         */
        description?: string;

        /**
         * Environmental data about the shipping option
         */
        environmental_data?: ShippingOption.EnvironmentalData;

        /**
         * Estimated time of arrival
         */
        eta?: ShippingOption.Eta;

        /**
         * Specify how fees are handled with splits. The default behaviour is to share the
         * fees proportional with all splits destinations
         */
        fee_split?: ShippingOption.FeeSplit;

        /**
         * Additional metadata about the shipping_option
         */
        metadata?: unknown;

        /**
         * The operators own id for this shipping product
         */
        operator_product_id?: string;

        pick_up_address?: ShippingOption.PickUpAddress;

        /**
         * An array of objects specifying how the amount should be split between sellers
         * when using Dintero Payout
         *
         * Specify an empty array if the splits will be provided during capture.
         * `auto_capture` cannot be enabled when splits are defined as empty array.
         */
        splits?: Array<ShippingOption.Split>;

        /**
         * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
         * the session. Recommended limitations for the image:
         *
         * - all images should preferrably have the same dimensions
         * - max file size should be less than 2MB
         */
        thumbnail_url?: string;

        /**
         * A specified time for delivery to customer
         */
        time_slot?: ShippingOption.TimeSlot;

        /**
         * The VAT percentage
         */
        vat?: number;

        /**
         * The VAT of the `amount` parameter. Only used for display purposes.
         */
        vat_amount?: number;
      }

      export namespace ShippingOption {
        /**
         * Environmental data about the shipping option
         */
        export interface EnvironmentalData {
          /**
           * A short description of the environmental data, something like
           *
           * - "Fossil free",
           * - "Carbon neutral"
           * - "Low emissions"
           * - "Renewable Energy Sourced"
           * - "Eco-certified Fleet"
           */
          description: string;

          details?: Array<EnvironmentalData.Detail>;
        }

        export namespace EnvironmentalData {
          export interface Detail {
            /**
             * Give context to the value field. Example:
             *
             * - "CO2 emissions"
             * - "Energy consumption"
             * - "Carbon footprint"
             * - "Carbon offset"
             * - "Trees planted"
             * - "Renewable energy percentage"
             */
            label: string;

            value: string;
          }
        }

        /**
         * Estimated time of arrival
         */
        export interface Eta {
          ends_at?: string;

          starts_at?: string;
        }

        /**
         * Specify how fees are handled with splits. The default behaviour is to share the
         * fees proportional with all splits destinations
         */
        export interface FeeSplit {
          type: 'proportional';

          /**
           * Seller ids that will be debited for the payment fees All destinations must be
           * included in the list of splits
           */
          destinations?: Array<string>;
        }

        export interface PickUpAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * Distance in kilometers from the shipping_address.
           */
          distance?: number;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface Split {
          /**
           * The split amount in smalles unit for the currency, e.g. cents.
           */
          amount: number;

          /**
           * An id that identifies the seller
           */
          payout_destination_id: string;
        }

        /**
         * A specified time for delivery to customer
         */
        export interface TimeSlot {
          ends_at?: string;

          starts_at?: string;
        }
      }

      export interface UpdatedExpress {
        /**
         * ### Present only for _Express Checkout_ sessions.
         *
         * An _Express Checkout_ session is a session where the end user will submit a
         * shipping address and then select a shipping option before the before a payment
         * method is selected and the payment is initiated.
         *
         * Endpoints used in the _Express Checkout_ flow.
         *
         * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
         * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
         */
        express?: UpdatedExpress.Express;
      }

      export namespace UpdatedExpress {
        /**
         * ### Present only for _Express Checkout_ sessions.
         *
         * An _Express Checkout_ session is a session where the end user will submit a
         * shipping address and then select a shipping option before the before a payment
         * method is selected and the payment is initiated.
         *
         * Endpoints used in the _Express Checkout_ flow.
         *
         * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
         * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
         */
        export interface Express {
          /**
           * Shipping options that will be presented to the end user after the end user has
           * submitted a shipping address.
           *
           * To dynamically update the shipping*options when the *`order.shipping_address`_
           * is changed by the end user in the checkout, use the
           * _`url.shipping_address_callback_url`\_.
           *
           * If the merchant is not able to ship the order to the end users shipping address,
           * use an empty array.
           *
           * If there is only one option, a free delivery, the order still has to contain one
           * option with a _`price.amount`_ of 0.
           */
          shipping_options: Array<Express.ShippingOption>;

          /**
           * Limit the lind of customers that can be submitted via the address form in the
           * express checkout.
           */
          customer_types?: Array<'b2c' | 'b2b'>;

          /**
           * Enable discount codes for Express Checkout
           */
          discount_codes?: Express.DiscountCodes;

          /**
           * URL that Checkout will POST to when the end user has submitted/changed a
           * shipping address for an express-session.
           *
           * Dintero will not attempt a retry after a failed delivery attempt. Following
           * situations is considered as failed delivery
           *
           * - HTTP status codes that are not 200.
           * - A request timeout (60 seconds)
           * - Any connection error such as connection timeout, bad certificate, etc
           *
           * The response from the callback will be used to update the shipping options.
           *
           * See
           * [POST example/shipping_address_callback_url](#operation/example_shipping_address_callback_url)
           * for details about the request and response.
           */
          shipping_address_callback_url?: string;

          shipping_mode?: 'shipping_required' | 'shipping_not_required';
        }

        export namespace Express {
          /**
           * A shipping option
           */
          export interface ShippingOption {
            /**
             * Id of this shipping option product.
             *
             * The express checkout will group all products with the same id. Used for grouping
             * delivery to the same address at different time slots, or for grouping deliveries
             * to different pick up points.
             */
            id: string;

            /**
             * The monetary amount of the shipping option, including VAT and discounts.
             *
             * In smallest unit for the currency, e.g. cents
             */
            amount: number;

            /**
             * Unique id of the specific configuration of this shipping product
             */
            line_id: string;

            /**
             * Name of company that provides shipping service
             */
            operator: string;

            /**
             * A shipping option title. Eg. "Standard"
             */
            title: string;

            /**
             * Countries where this shipping option can be used
             */
            countries?: Array<string>;

            delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

            /**
             * A short description of the shipping option product
             */
            description?: string;

            /**
             * Environmental data about the shipping option
             */
            environmental_data?: ShippingOption.EnvironmentalData;

            /**
             * Estimated time of arrival
             */
            eta?: ShippingOption.Eta;

            /**
             * Additional metadata about the shipping_option
             */
            metadata?: unknown;

            /**
             * The operators own id for this shipping product
             */
            operator_product_id?: string;

            pick_up_address?: ShippingOption.PickUpAddress;

            /**
             * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
             * the session. Recommended limitations for the image:
             *
             * - all images should preferrably have the same dimensions
             * - max file size should be less than 2MB
             */
            thumbnail_url?: string;

            /**
             * A specified time for delivery to customer
             */
            time_slot?: ShippingOption.TimeSlot;

            /**
             * The VAT percentage
             */
            vat?: number;

            /**
             * The VAT of the `amount` parameter. Only used for display purposes.
             */
            vat_amount?: number;
          }

          export namespace ShippingOption {
            /**
             * Environmental data about the shipping option
             */
            export interface EnvironmentalData {
              /**
               * A short description of the environmental data, something like
               *
               * - "Fossil free",
               * - "Carbon neutral"
               * - "Low emissions"
               * - "Renewable Energy Sourced"
               * - "Eco-certified Fleet"
               */
              description: string;

              details?: Array<EnvironmentalData.Detail>;
            }

            export namespace EnvironmentalData {
              export interface Detail {
                /**
                 * Give context to the value field. Example:
                 *
                 * - "CO2 emissions"
                 * - "Energy consumption"
                 * - "Carbon footprint"
                 * - "Carbon offset"
                 * - "Trees planted"
                 * - "Renewable energy percentage"
                 */
                label: string;

                value: string;
              }
            }

            /**
             * Estimated time of arrival
             */
            export interface Eta {
              ends_at?: string;

              starts_at?: string;
            }

            export interface PickUpAddress {
              /**
               * Gaustadalleen 21
               */
              address_line?: string;

              /**
               * PB 123
               */
              address_line_2?: string;

              /**
               * Name of the company
               */
              business_name?: string;

              co_address?: string;

              /**
               * Comment about the address
               */
              comment?: string;

              /**
               * For companies that needs to specify a cost center.
               */
              cost_center?: string;

              /**
               * Country of the location
               */
              country?: string;

              /**
               * The customer's reference
               */
              customer_reference?: string;

              /**
               * Distance in kilometers from the shipping_address.
               */
              distance?: number;

              /**
               * The email address of a person or an organization
               */
              email?: string;

              first_name?: string;

              last_name?: string;

              latitude?: number;

              longitude?: number;

              /**
               * The organization number of the customer.
               */
              organization_number?: string;

              /**
               * Type indicating what kind of organization it is.
               */
              organization_type?: string;

              /**
               * mobile number of a person / company, ITU/E.123 format with international prefix
               * (+PPNNNNNNNNN...)
               */
              phone_number?: string;

              /**
               * The zip code / postal code of the address.
               */
              postal_code?: string;

              /**
               * The name of the postal code
               */
              postal_place?: string;
            }

            /**
             * A specified time for delivery to customer
             */
            export interface TimeSlot {
              ends_at?: string;

              starts_at?: string;
            }
          }

          /**
           * Enable discount codes for Express Checkout
           */
          export interface DiscountCodes {
            /**
             * URL that Checkout will POST to when the user has submitted/changed the discount
             * codes for an express session.
             *
             * Dintero will not attempt a retry after a failed delivery attempt. Following
             * situations is considered as failed delivery
             *
             * - HTTP status codes that are not 200.
             * - A request timeout (60 seconds)
             * - Any connection error such as connection timeout, bad certificate, etc
             *
             * The response from the callback will be used to update the order amount, items
             * discount_lines and shipping options.
             *
             * See
             * [POST example/discount_codes_callback_url](#operation/example_discount_codes_callback_url)
             * for details about the request and response.
             */
            callback_url?: string;

            /**
             * Limit how many discount codes can be added by the customer
             */
            max_count?: number;
          }
        }
      }

      export interface UpdatedOrder {
        /**
         * A reference by the merchant to identify the corresponding order for the Checkout
         * Session
         */
        merchant_reference: string;

        /**
         * The amount to authorize/capture including VAT and discounts. In smallest unit
         * for the currency, e.g. cents
         *
         * The `amount` should be equal to the sum of the `items.amount` +
         * `shipping_option.amount`.
         */
        amount?: number;

        /**
         * Address
         */
        billing_address?: UpdatedOrder.BillingAddress;

        /**
         * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
         */
        currency?: string;

        discount_codes?: Array<string>;

        /**
         * Discounts given, additions to any items discount_lines.
         */
        discount_lines?: Array<UpdatedOrder.DiscountLine>;

        /**
         * Details about the order items.
         *
         * #### Instabank
         *
         * `required` if Instabank payment is configured in and partial_payment is false.
         * All items must include a unique `line_id`, quantity and amount
         *
         * #### Collector Bank
         *
         * `required` if Collector Bank payment is configured in and partial_payment is
         * false. All items must include a unique `line_id`, quantity and amount
         */
        items?: Array<UpdatedOrder.Item>;

        /**
         * A reference by the merchant to identify the corresponding order for the Checkout
         * Session
         */
        merchant_reference_2?: string;

        /**
         * This is a partial payment where the `order.amount` can be lower or equal to the
         * sum of `order.items.amount`
         */
        partial_payment?: boolean;

        /**
         * An id that identifies the seller, value will be included in the settlement
         * reports
         */
        payout_destination_id?: string;

        /**
         * Address
         */
        shipping_address?: UpdatedOrder.ShippingAddress;

        shipping_option?: UpdatedOrder.ShippingOption;

        store?: UpdatedOrder.Store;

        /**
         * The VAT of the `amount` parameter. Only used for display purposes.
         *
         * In smallest unit for the currency, e.g. cents
         *
         * The `vat_amount` should be equal to the sum of the `items.vat_amount` +
         * `shipping_option.vat_amount`.
         */
        vat_amount?: number;
      }

      export namespace UpdatedOrder {
        /**
         * Address
         */
        export interface BillingAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface DiscountLine {
          /**
           * Monetary amount in smallest unit for the currency
           */
          amount?: number;

          description?: string;

          discount_id?: string;

          discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

          line_id?: number;

          /**
           * Optional, set if the amount given was from a percentage discount
           */
          percentage?: number;
        }

        export interface Item {
          /**
           * The ID or SKU of the product on the line
           */
          id?: string;

          /**
           * The total monetary amount of the line item, including VAT and discounts.
           *
           * In smallest unit for the currency, e.g. cents
           */
          amount?: number;

          /**
           * A short, localized description of the line item
           */
          description?: string;

          discount_lines?: Array<Item.DiscountLine>;

          /**
           * The item is eligible for discount
           */
          eligible_for_discount?: boolean;

          /**
           * Details related to
           * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
           *
           * Some items require extra information to be provided when using Klarna as an
           * enabled payment option.
           */
          emd?: Item.Emd;

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          fee_split?: Item.FeeSplit;

          /**
           * The groups the product on the line belongs to
           */
          groups?: Array<Item.Group>;

          /**
           * Discount applied to amount
           */
          is_changed?: boolean;

          /**
           * the number of the line (or id), must be `unique` between all items. `required`
           * when Instabank payment is configured.
           */
          line_id?: string;

          /**
           * The quantity of the product in the item line.
           */
          quantity?: number;

          /**
           * An array of objects specifying how the amount should be split between sellers
           * when using Dintero Payout
           *
           * Specify an empty array if the splits will be provided during capture.
           * `auto_capture` cannot be enabled when splits are defined as empty array.
           */
          splits?: Array<Item.Split>;

          /**
           * URL to a thumbnail of the item. Will be displayed when redirecting to the
           * session.
           *
           * Recommended limitations for the image:
           *
           * - all images should preferrably have the same dimensions
           * - max file size should be less than 2MB
           */
          thumbnail_url?: string;

          /**
           * The type of order item this is.
           *
           * - **physical** - a physical item which must be delivered or handed over
           * - **digital** - a digital item which doesn't need shipping
           * - **service** - payment for services like maintenance performed in your home
           * - **gift_card** - usage of a gift card, where the amount is usually a negative
           *   number
           * - **shipping** - payment for shipping of the order
           * - **surcharge** - extra incurred costs, like taxes or necessary rounding
           */
          type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

          /**
           * The dimensional weight (also known as volumetric) value unit of one item.
           * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
           */
          unit_dimensional_weight?: number;

          /**
           * The volume of one item in m³ (cubic meters)
           */
          unit_volume?: number;

          /**
           * The volume of one item in kg (kilo grams)
           */
          unit_weight?: number;

          /**
           * The VAT percentage
           */
          vat?: number;

          /**
           * The VAT of the `amount` parameter. Only used for display purposes.
           *
           * In smallest unit for the currency, e.g. cents
           */
          vat_amount?: number;
        }

        export namespace Item {
          export interface DiscountLine {
            /**
             * Monetary amount in smallest unit for the currency
             */
            amount?: number;

            description?: string;

            discount_id?: string;

            discount_type?:
              | 'customer'
              | 'periodic'
              | 'manual'
              | 'loyalty'
              | 'total'
              | 'employee'
              | 'external';

            line_id?: number;

            /**
             * Optional, set if the amount given was from a percentage discount
             */
            percentage?: number;
          }

          /**
           * Details related to
           * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
           *
           * Some items require extra information to be provided when using Klarna as an
           * enabled payment option.
           */
          export interface Emd {
            /**
             * Only required if the item is related to an event or multiple events, like for
             * example tickets to a concert.
             *
             * If you are selling an event package as a single ticket or item that includes
             * multiple events, for example a festival, you need to provide information about
             * all the individual events that are part of the package.
             */
            event?: Array<Emd.Event>;

            /**
             * Only required if them item is related to a marketplace order.
             *
             * If that is the case, you need to provide information about both the seller and
             * the winner.
             */
            marketplace_order?: Emd.MarketplaceOrder;

            /**
             * Only required if the item is related to a subscription.
             *
             * If that is the case, you need to provide information about both the subscription
             * and the customer account.
             */
            subscription?: Emd.Subscription;

            /**
             * Only required if the item is part of a travel-related transaction.
             *
             * If that is the case, you need to provide information about the itinerary to be
             * booked.
             */
            travel?: Emd.Travel;
          }

          export namespace Emd {
            export interface Event {
              /**
               * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              end_time: string;

              /**
               * Name of the company arranging the event, e.g. "Happy Parties Ltd."
               */
              event_company: string;

              /**
               * Name of the event, e.g. "Fancy Singer"
               */
              event_name: string;

              /**
               * Category or type of venue, e.g. "Pop"
               */
              genre_of_event: string;

              /**
               * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              start_time: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * If tickets are digitally checked when entering the venue, e.g. true
               */
              access_controlled_venue?: boolean;

              /**
               * Name of the affiliate that originated the purchase.
               */
              affiliate_name?: string;

              arena_location?: Event.ArenaLocation;

              /**
               * Name of the venue, e.g. "Song Arena"
               */
              arena_name?: string;
            }

            export namespace Event {
              export interface ArenaLocation {
                /**
                 * City that the venue is located in, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
                 */
                country: string;

                /**
                 * Postal code for the venue location, e.g. "0185"
                 */
                postal_code?: string;

                /**
                 * Street address representing the venue location, e.g. "Sonja Henies plass 2"
                 */
                street_address?: string;
              }
            }

            /**
             * Only required if them item is related to a marketplace order.
             *
             * If that is the case, you need to provide information about both the seller and
             * the winner.
             */
            export interface MarketplaceOrder {
              /**
               * Details related to the seller involved in the marketplace order.
               */
              seller_info: MarketplaceOrder.SellerInfo;

              /**
               * Details related to the winner involved in the marketplace order.
               */
              winner_info: MarketplaceOrder.WinnerInfo;
            }

            export namespace MarketplaceOrder {
              /**
               * Details related to the seller involved in the marketplace order.
               */
              export interface SellerInfo {
                account_last_modified: SellerInfo.AccountLastModified;

                /**
                 * Date and time that the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Number of trades the sub-merchant did in the last 12 months, e.g. 23
                 */
                number_of_trades: number;

                /**
                 * Name of the category to which the specific good belongs to, according to the
                 * selling merchant's categorization, e.g. "Phones".
                 */
                product_category: string;

                /**
                 * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
                 * Ltd."
                 */
                sub_merchant_id: string;

                /**
                 * Name of the good purchased.
                 */
                product_name?: string;

                /**
                 * Current rating of the good purchased according to the marketplace's rating
                 * scale, e.g. 5
                 */
                seller_rating?: number;

                /**
                 * Details about the seller.
                 */
                unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

                /**
                 * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
                 */
                volume_of_trades?: number;
              }

              export namespace SellerInfo {
                export interface AccountLastModified {
                  /**
                   * Date and time that the (physical) address was last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  address: string;

                  /**
                   * Date and time that the email was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  email: string;

                  /**
                   * Date and time that the listing details were last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  listing: string;

                  /**
                   * Date and time that the login details were last changed (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  login: string;

                  /**
                   * Date and time that the password was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  password: string;
                }

                /**
                 * Details about the seller.
                 */
                export interface UniqueAccountIdentifierSeller {
                  /**
                   * Seller's email address, e.g. "seller@mail.com"
                   */
                  email?: string;

                  other?: string;

                  /**
                   * Seller's phone number, e.g. "97712123"
                   */
                  phone_number?: string;
                }
              }

              /**
               * Details related to the winner involved in the marketplace order.
               */
              export interface WinnerInfo {
                account_last_modified: WinnerInfo.AccountLastModified;

                /**
                 * Date and time that the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Number of trades the winner did in the last 12 months, e.g. 23
                 */
                number_of_trades: number;

                /**
                 * Details about the winner.
                 */
                unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

                /**
                 * Volumes of trades the winner did in the last 12 months, e.g. 230
                 */
                volume_of_trades?: number;
              }

              export namespace WinnerInfo {
                export interface AccountLastModified {
                  /**
                   * Date and time that the (physical) address was last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  address: string;

                  /**
                   * Date and time that the email was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  email: string;

                  /**
                   * Date and time that the listing details were last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  listing: string;

                  /**
                   * Date and time that the login details were last changed (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  login: string;

                  /**
                   * Date and time that the password was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  password: string;
                }

                /**
                 * Details about the winner.
                 */
                export interface UniqueAccountIdentifierWinner {
                  /**
                   * Winner's email address, e.g. "winner@mail.com"
                   */
                  email?: string;

                  other?: string;

                  /**
                   * Winner's phone number, e.g. "97712123"
                   */
                  phone_number?: string;
                }
              }
            }

            /**
             * Only required if the item is related to a subscription.
             *
             * If that is the case, you need to provide information about both the subscription
             * and the customer account.
             */
            export interface Subscription {
              /**
               * Information related to the customer that wants to purchase the subscription.
               */
              customer_account_info: Subscription.CustomerAccountInfo;

              /**
               * Details related to the subscription.
               */
              subscription: Subscription.Subscription;
            }

            export namespace Subscription {
              /**
               * Information related to the customer that wants to purchase the subscription.
               */
              export interface CustomerAccountInfo {
                /**
                 * The date and time the account was last modified (ISO 8601 format), e.g.
                 * "2023-10-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_last_modified: string;

                /**
                 * The date and time the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Unique name / number to identify the specific customer account. Max 24
                 * characters, e.g. "Adam Adamsson"
                 */
                unique_account_identifier: string;
              }

              /**
               * Details related to the subscription.
               */
              export interface Subscription {
                /**
                 * Whether the subscription will be auto renewed upon expiry, e.g. true
                 */
                auto_renewal_of_subscription: boolean;

                /**
                 * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC
                 */
                end_time: string;

                /**
                 * The start time of the subscription (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC
                 */
                start_time: string;

                /**
                 * Name of the product on subscription, e.g. "Contact lenses"
                 */
                subscription_name: string;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;
              }
            }

            /**
             * Only required if the item is part of a travel-related transaction.
             *
             * If that is the case, you need to provide information about the itinerary to be
             * booked.
             */
            export interface Travel {
              /**
               * Details about the reservation of airline tickets.
               */
              air_reservation_details?: Travel.AirReservationDetails;

              /**
               * Details about the reservation of bus tickets.
               */
              bus_reservation_details?: Travel.BusReservationDetails;

              /**
               * Details about the reservation of rental cars.
               */
              car_rental_reservation_details?: Travel.CarRentalReservationDetails;

              /**
               * Details about the reservation of ferry tickets.
               */
              ferry_reservation_details?: Travel.FerryReservationDetails;

              /**
               * Details about the reservation of hotel rooms.
               */
              hotel_reservation_details?: Travel.HotelReservationDetails;

              /**
               * Details about the reservation of train tickets.
               */
              train_reservation_details?: Travel.TrainReservationDetails;
            }

            export namespace Travel {
              /**
               * Details about the reservation of airline tickets.
               */
              export interface AirReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one flight from Oslo to Munich, and
                 * another flight from Munich to Dubai, you need to provide one itinerary object
                 * for each of these two flights, and so on.
                 */
                itinerary: Array<AirReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<AirReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<AirReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace AirReservationDetails {
                export interface Itinerary {
                  /**
                   * IATA Airport Code (three letters), e.g. "MUC"
                   */
                  arrival: string;

                  /**
                   * IATA Airline standard (two letters or digits), e.g. "LH"
                   */
                  carrier: string;

                  /**
                   * IATA Airport Code (three letters), e.g. "OSL"
                   */
                  departure: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * City the flight arrives in, e.g. "Munich"
                   */
                  arrival_city?: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * City the flight departs from, e.g. "Oslo"
                   */
                  departure_city?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the flight in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of bus tickets.
               */
              export interface BusReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one bus journey from Oslo to Munich,
                 * and another bus journey from Munich to Rome, you need to provide one itinerary
                 * object for each of these two bus journeys, and so on.
                 */
                itinerary: Array<BusReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<BusReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<BusReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace BusReservationDetails {
                export interface Itinerary {
                  /**
                   * City the bus arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Bus Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the bus departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the bus journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of rental cars.
               */
              export interface CarRentalReservationDetails {
                /**
                 * Driver data, one per driver.
                 */
                drivers: Array<CarRentalReservationDetails.Driver>;

                /**
                 * Car rental itinerary data, one per car rental.
                 *
                 * If you are selling a package that contains multiple car rentals, you need to
                 * provide itinerary data for each of the individual rentals.
                 */
                itinerary: Array<CarRentalReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<CarRentalReservationDetails.Insurance>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace CarRentalReservationDetails {
                export interface Driver {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }

                export interface Itinerary {
                  /**
                   * End time of the car rental reservation (ISO 8601 format), e.g.
                   * "2023-08-20T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  end_time: string;

                  /**
                   * Name of the car rental company, e.g. "Premium Cars Ltd."
                   */
                  rental_company: string;

                  /**
                   * Start time of the car rental reservation (ISO 8601 format), e.g.
                   * "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  start_time: string;

                  /**
                   * Price for the car rental reservation in smallest unit of local currency, e.g.
                   * 500000
                   */
                  car_price?: number;

                  /**
                   * Travel class, e.g. "Premium Cars Premium Class"
                   */
                  class?: string;

                  /**
                   * Driver IDs.
                   */
                  drivers_id?: Array<number>;

                  /**
                   * Details related to the drop off location.
                   */
                  drop_off_location?: Itinerary.DropOffLocation;

                  /**
                   * Details related to the pick up location.
                   */
                  pick_up_location?: Itinerary.PickUpLocation;
                }

                export namespace Itinerary {
                  /**
                   * Details related to the drop off location.
                   */
                  export interface DropOffLocation {
                    /**
                     * City where the car should be dropped off, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
                     * "NO"
                     */
                    country: string;

                    /**
                     * Postal code where the car should be dropped off, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }

                  /**
                   * Details related to the pick up location.
                   */
                  export interface PickUpLocation {
                    /**
                     * City where the car should be picked up, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
                     * "NO",
                     */
                    country: string;

                    /**
                     * Postal code where the car should be picked up, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }
              }

              /**
               * Details about the reservation of ferry tickets.
               */
              export interface FerryReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
                 * and another ferry journey from Kiel to Gothenburg, you need to provide one
                 * itinerary object for each of these two ferry journeys, and so on.
                 */
                itinerary: Array<FerryReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<FerryReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<FerryReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace FerryReservationDetails {
                export interface Itinerary {
                  /**
                   * City the ferry arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Ferry Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the ferry departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the ferry journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of hotel rooms.
               */
              export interface HotelReservationDetails {
                /**
                 * Hotel itinerary data, one per hotel stay.
                 *
                 * If you are selling a package that contains multiple hotel stays, you need to
                 * provide itinerary data for each of the individual stays.
                 */
                itinerary: Array<HotelReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<HotelReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<HotelReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace HotelReservationDetails {
                export interface Itinerary {
                  /**
                   * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  end_time: string;

                  /**
                   * Price for the hotel stay in smallest unit of local currency, e.g. 200000
                   */
                  hotel_price: number;

                  /**
                   * Number of rooms booked, e.g. 2
                   */
                  number_of_rooms: number;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id: Array<number>;

                  /**
                   * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  start_time: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Address details of the hotel.
                   */
                  address?: Itinerary.Address;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * Name of the hotel, e.g. "Premium Hotel"
                   */
                  hotel_name?: string;
                }

                export namespace Itinerary {
                  /**
                   * Address details of the hotel.
                   */
                  export interface Address {
                    /**
                     * City the hotel is located in, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
                     */
                    country: string;

                    /**
                     * Postal code of the hotel, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address of the hotel, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of train tickets.
               */
              export interface TrainReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one train journey from Oslo to Munich,
                 * and another train journey from Munich to Rome, you need to provide one itinerary
                 * object for each of these two train journeys, and so on.
                 */
                itinerary: Array<TrainReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<TrainReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<TrainReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace TrainReservationDetails {
                export interface Itinerary {
                  /**
                   * City the train arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Train Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the train departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id: Array<number>;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * Price for that specific segment of the train journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }
            }
          }

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          export interface FeeSplit {
            type: 'proportional';

            /**
             * Seller ids that will be debited for the payment fees All destinations must be
             * included in the list of splits
             */
            destinations?: Array<string>;
          }

          export interface Group {
            /**
             * Group ID
             */
            id: string;

            /**
             * Group name
             */
            name?: string;
          }

          export interface Split {
            /**
             * The split amount in smalles unit for the currency, e.g. cents.
             */
            amount: number;

            /**
             * An id that identifies the seller
             */
            payout_destination_id: string;
          }
        }

        /**
         * Address
         */
        export interface ShippingAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface ShippingOption {
          /**
           * Id of this shipping option product.
           *
           * The express checkout will group all products with the same id. Used for grouping
           * delivery to the same address at different time slots, or for grouping deliveries
           * to different pick up points.
           */
          id: string;

          /**
           * The monetary amount of the shipping option, including VAT and discounts.
           *
           * In smallest unit for the currency, e.g. cents
           */
          amount: number;

          /**
           * Unique id of the specific configuration of this shipping product
           */
          line_id: string;

          /**
           * Name of company that provides shipping service
           */
          operator: string;

          /**
           * A shipping option title. Eg. "Standard"
           */
          title: string;

          /**
           * Countries where this shipping option can be used
           */
          countries?: Array<string>;

          delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

          /**
           * A short description of the shipping option product
           */
          description?: string;

          /**
           * Environmental data about the shipping option
           */
          environmental_data?: ShippingOption.EnvironmentalData;

          /**
           * Estimated time of arrival
           */
          eta?: ShippingOption.Eta;

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          fee_split?: ShippingOption.FeeSplit;

          /**
           * Additional metadata about the shipping_option
           */
          metadata?: unknown;

          /**
           * The operators own id for this shipping product
           */
          operator_product_id?: string;

          pick_up_address?: ShippingOption.PickUpAddress;

          /**
           * An array of objects specifying how the amount should be split between sellers
           * when using Dintero Payout
           *
           * Specify an empty array if the splits will be provided during capture.
           * `auto_capture` cannot be enabled when splits are defined as empty array.
           */
          splits?: Array<ShippingOption.Split>;

          /**
           * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
           * the session. Recommended limitations for the image:
           *
           * - all images should preferrably have the same dimensions
           * - max file size should be less than 2MB
           */
          thumbnail_url?: string;

          /**
           * A specified time for delivery to customer
           */
          time_slot?: ShippingOption.TimeSlot;

          /**
           * The VAT percentage
           */
          vat?: number;

          /**
           * The VAT of the `amount` parameter. Only used for display purposes.
           */
          vat_amount?: number;
        }

        export namespace ShippingOption {
          /**
           * Environmental data about the shipping option
           */
          export interface EnvironmentalData {
            /**
             * A short description of the environmental data, something like
             *
             * - "Fossil free",
             * - "Carbon neutral"
             * - "Low emissions"
             * - "Renewable Energy Sourced"
             * - "Eco-certified Fleet"
             */
            description: string;

            details?: Array<EnvironmentalData.Detail>;
          }

          export namespace EnvironmentalData {
            export interface Detail {
              /**
               * Give context to the value field. Example:
               *
               * - "CO2 emissions"
               * - "Energy consumption"
               * - "Carbon footprint"
               * - "Carbon offset"
               * - "Trees planted"
               * - "Renewable energy percentage"
               */
              label: string;

              value: string;
            }
          }

          /**
           * Estimated time of arrival
           */
          export interface Eta {
            ends_at?: string;

            starts_at?: string;
          }

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          export interface FeeSplit {
            type: 'proportional';

            /**
             * Seller ids that will be debited for the payment fees All destinations must be
             * included in the list of splits
             */
            destinations?: Array<string>;
          }

          export interface PickUpAddress {
            /**
             * Gaustadalleen 21
             */
            address_line?: string;

            /**
             * PB 123
             */
            address_line_2?: string;

            /**
             * Name of the company
             */
            business_name?: string;

            co_address?: string;

            /**
             * Comment about the address
             */
            comment?: string;

            /**
             * For companies that needs to specify a cost center.
             */
            cost_center?: string;

            /**
             * Country of the location
             */
            country?: string;

            /**
             * The customer's reference
             */
            customer_reference?: string;

            /**
             * Distance in kilometers from the shipping_address.
             */
            distance?: number;

            /**
             * The email address of a person or an organization
             */
            email?: string;

            first_name?: string;

            last_name?: string;

            latitude?: number;

            longitude?: number;

            /**
             * The organization number of the customer.
             */
            organization_number?: string;

            /**
             * Type indicating what kind of organization it is.
             */
            organization_type?: string;

            /**
             * mobile number of a person / company, ITU/E.123 format with international prefix
             * (+PPNNNNNNNNN...)
             */
            phone_number?: string;

            /**
             * The zip code / postal code of the address.
             */
            postal_code?: string;

            /**
             * The name of the postal code
             */
            postal_place?: string;
          }

          export interface Split {
            /**
             * The split amount in smalles unit for the currency, e.g. cents.
             */
            amount: number;

            /**
             * An id that identifies the seller
             */
            payout_destination_id: string;
          }

          /**
           * A specified time for delivery to customer
           */
          export interface TimeSlot {
            ends_at?: string;

            starts_at?: string;
          }
        }

        export interface Store {
          id: string;

          address?: Store.Address;

          /**
           * Merchant number associated with the stores payment terminal
           */
          bax?: string;

          /**
           * Official name of the person or entity that owns the store.
           */
          business_name?: string;

          chain?: string;

          email?: string;

          gln?: string;

          /**
           * A four-digit Merchant Category Code (MCC) for the store
           * [ISO 18245:2003](https://www.iso.org/standard/33365.html)
           */
          mcc?: string;

          /**
           * name of the store, aka trade name of the store
           */
          name?: string;

          organization_number?: string;

          phone_number?: string;

          /**
           * Id to a specific point-of-sale (POS) terminal or workstation
           */
          terminal_id?: string;
        }

        export namespace Store {
          export interface Address {
            address_line: string;

            /**
             * ISO 3166-1 country code
             */
            country: string;

            postal_place: string;

            address_line_2?: string;

            postal_code?: string;
          }
        }
      }
    }

    export interface RequestHeaders {
      /**
       * The instance of the checkout that performed the request
       */
      'dintero-checkout-instance-id'?: string;

      /**
       * The name of the ecommerce solution
       */
      'dintero-system-name'?: string;

      /**
       * The name of the ecommerce plugin
       */
      'dintero-system-plugin-name'?: string;

      /**
       * The version number of the ecommerce plugin
       */
      'dintero-system-plugin-version'?: string;

      /**
       * The version number of the ecommerce solution
       */
      'dintero-system-version'?: string;

      /**
       * The user-agent that performed the request
       */
      'user-agent'?: string;
    }
  }

  /**
   * ### Present only for _Express Checkout_ sessions.
   *
   * An _Express Checkout_ session is a session where the end user will submit a
   * shipping address and then select a shipping option before the before a payment
   * method is selected and the payment is initiated.
   *
   * Endpoints used in the _Express Checkout_ flow.
   *
   * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
   * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
   */
  export interface Express {
    /**
     * Shipping options that will be presented to the end user after the end user has
     * submitted a shipping address.
     *
     * To dynamically update the shipping*options when the *`order.shipping_address`_
     * is changed by the end user in the checkout, use the
     * _`url.shipping_address_callback_url`\_.
     *
     * If the merchant is not able to ship the order to the end users shipping address,
     * use an empty array.
     *
     * If there is only one option, a free delivery, the order still has to contain one
     * option with a _`price.amount`_ of 0.
     */
    shipping_options: Array<Express.ShippingOption>;

    /**
     * Limit the lind of customers that can be submitted via the address form in the
     * express checkout.
     */
    customer_types?: Array<'b2c' | 'b2b'>;

    /**
     * Enable discount codes for Express Checkout
     */
    discount_codes?: Express.DiscountCodes;

    /**
     * URL that Checkout will POST to when the end user has submitted/changed a
     * shipping address for an express-session.
     *
     * Dintero will not attempt a retry after a failed delivery attempt. Following
     * situations is considered as failed delivery
     *
     * - HTTP status codes that are not 200.
     * - A request timeout (60 seconds)
     * - Any connection error such as connection timeout, bad certificate, etc
     *
     * The response from the callback will be used to update the shipping options.
     *
     * See
     * [POST example/shipping_address_callback_url](#operation/example_shipping_address_callback_url)
     * for details about the request and response.
     */
    shipping_address_callback_url?: string;

    shipping_mode?: 'shipping_required' | 'shipping_not_required';
  }

  export namespace Express {
    /**
     * A shipping option
     */
    export interface ShippingOption {
      /**
       * Id of this shipping option product.
       *
       * The express checkout will group all products with the same id. Used for grouping
       * delivery to the same address at different time slots, or for grouping deliveries
       * to different pick up points.
       */
      id: string;

      /**
       * The monetary amount of the shipping option, including VAT and discounts.
       *
       * In smallest unit for the currency, e.g. cents
       */
      amount: number;

      /**
       * Unique id of the specific configuration of this shipping product
       */
      line_id: string;

      /**
       * Name of company that provides shipping service
       */
      operator: string;

      /**
       * A shipping option title. Eg. "Standard"
       */
      title: string;

      /**
       * Countries where this shipping option can be used
       */
      countries?: Array<string>;

      delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

      /**
       * A short description of the shipping option product
       */
      description?: string;

      /**
       * Environmental data about the shipping option
       */
      environmental_data?: ShippingOption.EnvironmentalData;

      /**
       * Estimated time of arrival
       */
      eta?: ShippingOption.Eta;

      /**
       * Additional metadata about the shipping_option
       */
      metadata?: unknown;

      /**
       * The operators own id for this shipping product
       */
      operator_product_id?: string;

      pick_up_address?: ShippingOption.PickUpAddress;

      /**
       * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
       * the session. Recommended limitations for the image:
       *
       * - all images should preferrably have the same dimensions
       * - max file size should be less than 2MB
       */
      thumbnail_url?: string;

      /**
       * A specified time for delivery to customer
       */
      time_slot?: ShippingOption.TimeSlot;

      /**
       * The VAT percentage
       */
      vat?: number;

      /**
       * The VAT of the `amount` parameter. Only used for display purposes.
       */
      vat_amount?: number;
    }

    export namespace ShippingOption {
      /**
       * Environmental data about the shipping option
       */
      export interface EnvironmentalData {
        /**
         * A short description of the environmental data, something like
         *
         * - "Fossil free",
         * - "Carbon neutral"
         * - "Low emissions"
         * - "Renewable Energy Sourced"
         * - "Eco-certified Fleet"
         */
        description: string;

        details?: Array<EnvironmentalData.Detail>;
      }

      export namespace EnvironmentalData {
        export interface Detail {
          /**
           * Give context to the value field. Example:
           *
           * - "CO2 emissions"
           * - "Energy consumption"
           * - "Carbon footprint"
           * - "Carbon offset"
           * - "Trees planted"
           * - "Renewable energy percentage"
           */
          label: string;

          value: string;
        }
      }

      /**
       * Estimated time of arrival
       */
      export interface Eta {
        ends_at?: string;

        starts_at?: string;
      }

      export interface PickUpAddress {
        /**
         * Gaustadalleen 21
         */
        address_line?: string;

        /**
         * PB 123
         */
        address_line_2?: string;

        /**
         * Name of the company
         */
        business_name?: string;

        co_address?: string;

        /**
         * Comment about the address
         */
        comment?: string;

        /**
         * For companies that needs to specify a cost center.
         */
        cost_center?: string;

        /**
         * Country of the location
         */
        country?: string;

        /**
         * The customer's reference
         */
        customer_reference?: string;

        /**
         * Distance in kilometers from the shipping_address.
         */
        distance?: number;

        /**
         * The email address of a person or an organization
         */
        email?: string;

        first_name?: string;

        last_name?: string;

        latitude?: number;

        longitude?: number;

        /**
         * The organization number of the customer.
         */
        organization_number?: string;

        /**
         * Type indicating what kind of organization it is.
         */
        organization_type?: string;

        /**
         * mobile number of a person / company, ITU/E.123 format with international prefix
         * (+PPNNNNNNNNN...)
         */
        phone_number?: string;

        /**
         * The zip code / postal code of the address.
         */
        postal_code?: string;

        /**
         * The name of the postal code
         */
        postal_place?: string;
      }

      /**
       * A specified time for delivery to customer
       */
      export interface TimeSlot {
        ends_at?: string;

        starts_at?: string;
      }
    }

    /**
     * Enable discount codes for Express Checkout
     */
    export interface DiscountCodes {
      /**
       * URL that Checkout will POST to when the user has submitted/changed the discount
       * codes for an express session.
       *
       * Dintero will not attempt a retry after a failed delivery attempt. Following
       * situations is considered as failed delivery
       *
       * - HTTP status codes that are not 200.
       * - A request timeout (60 seconds)
       * - Any connection error such as connection timeout, bad certificate, etc
       *
       * The response from the callback will be used to update the order amount, items
       * discount_lines and shipping options.
       *
       * See
       * [POST example/discount_codes_callback_url](#operation/example_discount_codes_callback_url)
       * for details about the request and response.
       */
      callback_url?: string;

      /**
       * Limit how many discount codes can be added by the customer
       */
      max_count?: number;
    }
  }

  export interface InitiatingSystemRequestHeaders {
    /**
     * The name of the ecommerce solution
     */
    'dintero-system-name'?: string;

    /**
     * The name of the ecommerce plugin
     */
    'dintero-system-plugin-name'?: string;

    /**
     * The version number of the ecommerce plugin
     */
    'dintero-system-plugin-version'?: string;

    /**
     * The version number of the ecommerce solution
     */
    'dintero-system-version'?: string;

    /**
     * The user-agent that performed the request
     */
    'user-agent'?: string;
  }

  /**
   * metadata about the session
   */
  export interface Metadata {
    /**
     * Profile Id used when session was created
     */
    'session:profile_id'?: string;
  }
}

export interface ExampleShippingAddressCallbackURLParams {
  configuration: ExampleShippingAddressCallbackURLParams.Configuration;

  order: ExampleShippingAddressCallbackURLParams.Order;

  url: ExampleShippingAddressCallbackURLParams.URL;

  /**
   * The ID of the Checkout
   */
  id?: string;

  /**
   * Configuration for checkboxes that should be part of the checkout
   */
  checkboxes?: Array<ExampleShippingAddressCallbackURLParams.Checkbox>;

  /**
   * Time when the Checkout was created
   */
  created_at?: string;

  customer?: ExampleShippingAddressCallbackURLParams.Customer;

  /**
   * The IP of the customer upon visiting the page. If the page is visited multiple
   * times, the field is always updated with the last known value.
   */
  customer_ip?: string;

  /**
   * Checkout process events
   */
  events?: Array<ExampleShippingAddressCallbackURLParams.Event>;

  /**
   * The session expiration time after which the Checkout page wouldn't be available
   */
  expires_at?: string;

  /**
   * ### Present only for _Express Checkout_ sessions.
   *
   * An _Express Checkout_ session is a session where the end user will submit a
   * shipping address and then select a shipping option before the before a payment
   * method is selected and the payment is initiated.
   *
   * Endpoints used in the _Express Checkout_ flow.
   *
   * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
   * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
   */
  express?: ExampleShippingAddressCallbackURLParams.Express;

  initiating_system_request_headers?: ExampleShippingAddressCallbackURLParams.InitiatingSystemRequestHeaders;

  /**
   * metadata about the session
   */
  metadata?: ExampleShippingAddressCallbackURLParams.Metadata;

  /**
   * Initiated by the merchant or used to generate a token
   */
  payment_operation?: 'unscheduled_purchase' | 'recurring_purchase' | 'generate_payment_token';

  /**
   * Transaction which has been created using the checkout.
   */
  transaction_id?: string;

  /**
   * Last time when the Checkout was updated
   */
  updated_at?: string;

  /**
   * The full user agent of the device the customer used when visiting the checkout
   * page
   */
  user_agent?: string;
}

export namespace ExampleShippingAddressCallbackURLParams {
  export interface Configuration {
    active_payment_types?: Configuration.ActivePaymentTypes;

    /**
     * Allow that the shipping and billing address can be different.
     *
     * An array of strings, the values `b2c` and `b2b` can be used to limit the what
     * types of customer that are allowed to submit different addresses for shipping
     * and billing.
     *
     * By default we limit the shipping and billing addresses to be equal for both B2C
     * and B2B customers.
     */
    allow_different_billing_shipping_address?: Array<'b2c' | 'b2b'>;

    /**
     * If `true` the transaction from the payment session will be captured
     * automatically after the transaction has been `AUTHORIZED`. The checkout sessions
     * `callback_url` will not be called until after the transaction has been
     * `CAPTURED`.
     *
     * If `auto_capture` is not specified it defaults to `false`.
     *
     * A successful auto-capture of a transaction sometimes requires more than one
     * capture attempt. This can be the case if the payment gateway is down or is
     * experiencing heavy traffic.
     *
     * Dintero will attempts capture retries for 48 hours, the `callback_url` will be
     * invoked when capture succeeds.
     *
     * Manual capture of a transaction that is pending auto-capture will stop the
     * auto-capture process from completing the capture.
     */
    auto_capture?: boolean;

    /**
     * Bambora configuration
     */
    bambora?: Configuration.Bambora;

    /**
     * `channel` enables special behaviour for various scenarios.
     *
     * The majority of web integrations will not need to set this property.
     *
     * ### in_app
     *
     * The `in_app` channel is intended for payments done from mobile devices where
     * `url.return_url` can be set to the application's appswitch URL.
     *
     * #### Session deeplink URL
     *
     * Creating a session with `channel=in_app` will return an appswitch deeplink URL
     * if the enabled payment options in the session supports it
     *
     * Appswitch deeplink is currently only supported for sessions that has only Vipps
     * enabled, via Vipps or Swedbank (payex) or Mobilepay enable via Swedbank (payex)
     *
     * - configuration.vipps.enabled
     * - configuration.payex.vipps.enabled
     * - configuration.payex.mobilepay.enabled
     *
     * > `in_app` is currently not supported when express is enabled
     *
     * > `in_app` with deeplink URL is not supported if `publish` is enabled
     *
     * ### in_store
     *
     * The `in_store` channel is intended for payments done in physical stores.
     *
     * Depending on the payment_type, choosing `in_store` will change the behaviour of
     * the payment.
     */
    channel?: 'in_app' | 'in_store';

    /**
     * Collector configuration
     */
    collector?: Configuration.Collector;

    /**
     * Country preferences
     */
    countries?: Configuration.Countries;

    /**
     * Customer type to use as default for the customer.
     */
    default_customer_type?: 'b2c' | 'b2b';

    /**
     * Configure the default payment type, the selected payment when loading the
     * checkout window. The value must be an enabled payment type.
     */
    default_payment_type?:
      | 'bambora.creditcard'
      | 'bambora.vipps'
      | 'dintero.zero'
      | 'dintero_psp.creditcard'
      | 'instabank.finance'
      | 'instabank.invoice'
      | 'instabank.installment'
      | 'instabank.postponement'
      | 'vipps'
      | 'payex.creditcard'
      | 'payex.mobilepay'
      | 'payex.swish'
      | 'payex.vipps'
      | 'payex.applepay'
      | 'payex.clicktopay'
      | 'payex.googlepay'
      | 'collector.finance'
      | 'collector.invoice'
      | 'collector.invoice_b2b'
      | 'collector.invoice_b2b_preapproved'
      | 'collector.installment_b2b_preapproved'
      | 'collector.installment'
      | 'santander.debit_account'
      | 'swish.swish'
      | 'netaxept.creditcard'
      | 'klarna.klarna'
      | 'klarna.billie';

    /**
     * Dintero configuration
     */
    dintero?: Configuration.Dintero;

    /**
     * Dintero PSP configuration
     */
    dintero_psp?: Configuration.DinteroPsp;

    /**
     * Configuration for discounts calculations
     */
    discounts?: Configuration.Discounts;

    instabank?: Configuration.Instabank;

    /**
     * Klarna configuration
     */
    klarna?: Configuration.Klarna;

    merchant?: Configuration.Merchant;

    /**
     * Netaxept configuration
     */
    netaxept?: Configuration.Netaxept;

    payex?: Configuration.Payex;

    /**
     * Payout configuration
     */
    payout?: Configuration.Payout;

    /**
     * Publish checkout message to the customer.
     */
    publish?: SessionsProfilesAPI.PublishConfiguration;

    santander?: Configuration.Santander;

    /**
     * Swish configuration
     */
    swish?: Configuration.Swish;

    /**
     * Customize the appearance of the checkout.
     */
    theme?: Configuration.Theme;

    vipps?: Configuration.Vipps;
  }

  export namespace Configuration {
    export interface ActivePaymentTypes {
      /**
       * Use this flag as wildcard to include all active payment types configured for a
       * given currency when creating a payment session.
       */
      enabled?: boolean;
    }

    /**
     * Bambora configuration
     */
    export interface Bambora {
      creditcard?: Bambora.Creditcard;

      mobilepay?: Bambora.Mobilepay;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';

      vipps?: Bambora.Vipps;
    }

    export namespace Bambora {
      export interface Creditcard {
        /**
         * enable Credit Card Payment
         */
        enabled: boolean;

        /**
         * generate payment token to use for future payments
         *
         * The generated payment token will be made available from the transaction details.
         */
        generate_payment_token?: boolean;

        /**
         * generate recurrence payment token to use for future payments
         *
         * The generated recurrence payment token will be made available from the
         * transaction details.
         */
        generate_recurrence_token?: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Mobilepay {
        /**
         * enable MobilePay Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Vipps {
        /**
         * enable Vipps Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Collector configuration
     */
    export interface Collector {
      /**
       * A textual description max 40 characters of the purchase.
       */
      dynamic_descriptor?: string;

      finance?: Collector.Finance;

      /**
       * Fixed Part Payment
       */
      installment?: Collector.Installment;

      /**
       * Invoice / Part Payment
       */
      invoice?: Collector.Invoice;

      /**
       * Invoice / Part Payment
       */
      invoice_b2b?: Collector.InvoiceB2b;

      /**
       * Invoice for pre-approved B2B-customers
       */
      invoice_b2b_preapproved?: Collector.InvoiceB2bPreapproved;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Collector {
      export interface Finance {
        /**
         * enable Collector Bank Finance Payment
         */
        enabled: boolean;

        countries?: Array<string>;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      /**
       * Fixed Part Payment
       */
      export interface Installment {
        /**
         * enable Collector Bank Installment Payment
         */
        enabled: boolean;

        countries?: Array<string>;

        options?: Installment.Options;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace Installment {
        export interface Options {
          /**
           * Create the collector transaction with status `ON_HOLD` and let the Collector
           * callback update the transaction state from `ON_HOLD` to `AUTHORIZED` or
           * `FAILED`.
           *
           * A callback will be sent to the `callback_url` when the transaction changes state
           * from `ON_HOLD` to any new state.
           *
           * This will override the gateway's `options.enable_on_hold`-setting.
           */
          enable_on_hold?: boolean;
        }
      }

      /**
       * Invoice / Part Payment
       */
      export interface Invoice {
        /**
         * enable Collector Bank Invoice Payment
         */
        enabled: boolean;

        countries?: Array<string>;

        options?: Invoice.Options;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace Invoice {
        export interface Options {
          /**
           * Create the collector transaction with status `ON_HOLD` and let the Collector
           * callback update the transaction state from `ON_HOLD` to `AUTHORIZED` or
           * `FAILED`.
           *
           * A callback will be sent to the `callback_url` when the transaction changes state
           * from `ON_HOLD` to any new state.
           *
           * This will override the payment option `enable_on_hold` and gateway config
           * `options.enable_on_hold`-setting.
           */
          enable_on_hold?: boolean;
        }
      }

      /**
       * Invoice / Part Payment
       */
      export interface InvoiceB2b {
        /**
         * enable Collector Bank Invoice Payment B2B
         */
        enabled: boolean;

        countries?: Array<string>;

        options?: InvoiceB2b.Options;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace InvoiceB2b {
        export interface Options {
          /**
           * For `collector.invoice_b2b`. By default, the shipping_address B2B payments will
           * be restricted to the registered addresses of a company.
           *
           * Setting this on the session will override the
           * `collector_b2b_address_enforcement` in `payment_options` on the checkout
           * configuration.
           */
          disable_collector_b2b_address_enforcement?: boolean;

          /**
           * Create the collector transaction with status `ON_HOLD` and let the Collector
           * callback update the transaction state from `ON_HOLD` to `AUTHORIZED` or
           * `FAILED`.
           *
           * A callback will be sent to the `callback_url` when the transaction changes state
           * from `ON_HOLD` to any new state.
           *
           * This will override the gateway's `options.enable_on_hold`-setting.
           */
          enable_on_hold?: boolean;
        }
      }

      /**
       * Invoice for pre-approved B2B-customers
       */
      export interface InvoiceB2bPreapproved {
        /**
         * enable Collector Bank Invoice Payment B2B
         */
        enabled: boolean;

        /**
         * All Collector B2B accounts configured for the customer's phone number at the
         * merchant.
         */
        accounts?: Array<InvoiceB2bPreapproved.Account>;

        countries?: Array<string>;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace InvoiceB2bPreapproved {
        export interface Account {
          billing_address?: Account.BillingAddress;

          /**
           * Token to represent the company
           */
          company_id?: string;
        }

        export namespace Account {
          export interface BillingAddress {
            /**
             * Gaustadalleen 21
             */
            address_line: string;

            /**
             * ACME Inc
             */
            business_name: string;

            /**
             * Country of the location
             */
            country: string;

            /**
             * The email address of a person or an organisation
             */
            email: string;

            /**
             * The organization number of the customer. For Norway, the length is 9. For
             * Sweden, it's either 10 or 12 digits.
             */
            organization_number: string;

            /**
             * mobile number of a person / company, ITU/E.123 format with international prefix
             * (+PPNNNNNNNNN...)
             */
            phone_number: string;

            /**
             * The zip code / postal code of the address.
             */
            postal_code: string;

            /**
             * The name of the postal code
             */
            postal_place: string;

            /**
             * The unique identification of the address from the available addresses for the
             * business
             */
            address_id?: string;

            /**
             * More details about address.
             */
            address_line_2?: string;

            /**
             * CO-Address if applicable.
             */
            co_address?: string;

            /**
             * For companies that needs to specify a cost center.
             */
            cost_center?: string;

            /**
             * The customer's reference
             */
            customer_reference?: string;

            first_name?: string;

            last_name?: string;
          }
        }
      }
    }

    /**
     * Country preferences
     */
    export interface Countries {
      /**
       * List of countries where the customer is allowed to set their address. If empty,
       * all countries are allowed, except for the ones in `deny_countries`.
       *
       * A country can not be in both `allow_countries` and `deny_countries`.
       */
      allow_countries?: Array<string>;

      /**
       * List of countries where the customer is not allowed to set their address.
       *
       * A country can not be in both `allow_countries` and `deny_countries`.
       */
      deny_countries?: Array<string>;

      /**
       * Country to use as default in address and phone country code
       */
      preferred_country?: string;
    }

    /**
     * Dintero configuration
     */
    export interface Dintero {
      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';

      /**
       * Allow the payment session to be fully or partial authorized with Dintero Wallets
       * gift card.
       */
      wallets?: Dintero.Wallets;

      /**
       * Allow initiating pay on zero amount session, the payability will only be enabled
       * if the session order amount is zero. Initiating a `dintero.zero` payment will
       * result in a transaction with `dintero.zero` payment product type that will be
       * excluded from settlement reports (as it will not have any payout)
       */
      zero?: Dintero.Zero;
    }

    export namespace Dintero {
      /**
       * Allow the payment session to be fully or partial authorized with Dintero Wallets
       * gift card.
       */
      export interface Wallets {
        /**
         * enable gift card
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      /**
       * Allow initiating pay on zero amount session, the payability will only be enabled
       * if the session order amount is zero. Initiating a `dintero.zero` payment will
       * result in a transaction with `dintero.zero` payment product type that will be
       * excluded from settlement reports (as it will not have any payout)
       */
      export interface Zero {
        /**
         * enable zero amount session
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Dintero PSP configuration
     */
    export interface DinteroPsp {
      creditcard?: DinteroPsp.Creditcard;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace DinteroPsp {
      export interface Creditcard {
        /**
         * enable creditcard
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Configuration for discounts calculations
     */
    export interface Discounts {
      express_discount_codes?: Discounts.ExpressDiscountCodes;

      /**
       * Configure discounts calculation on the session order.
       */
      order?: Discounts.Order;
    }

    export namespace Discounts {
      export interface ExpressDiscountCodes {
        /**
         * The discounts will be given by the configured express callback url.
         *
         * The callback URL will be invoked when the session is updated with a discount
         * code, and the response used to update the discounts on the order items and the
         * shipping options.
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }

      /**
       * Configure discounts calculation on the session order.
       */
      export interface Order {
        /**
         * Enable discount calculation on order items eligible for discount
         *
         * - A session that has the `customer.customer_id` set will have its discounts
         *   calculated when the session is created.
         *
         * - A session with no customer_id will only have the discounts calculated when the
         *   customer is identified by the checkout page.
         *
         * - The autorized amount will be the net amount from the original session amount
         *   specified when the session was created.
         */
        enabled: boolean;
      }
    }

    export interface Instabank {
      /**
       * finance payment
       */
      finance?: Instabank.Finance;

      /**
       * Fixed Part Payment
       */
      installment?: Instabank.Installment;

      /**
       * invoice payment
       */
      invoice?: Instabank.Invoice;

      /**
       * Postpone payment
       */
      postponement?: Instabank.Postponement;
    }

    export namespace Instabank {
      /**
       * finance payment
       */
      export interface Finance {
        /**
         * enable finance payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        product?: Finance.Product;
      }

      export namespace Finance {
        export interface Product {
          loan_example: Product.LoanExample;

          /**
           * The minimum monthly installment basis as a percentage of the account balance.
           */
          minimum_monthly_balance_rate: string;

          /**
           * The notification fee for the payment product.
           */
          notification_fee: number;

          /**
           * The startup fee for the payment product.
           */
          origination_fee: number;

          product_code: string;

          /**
           * The interest rate for the payment product.
           */
          annual_interest_rate?: string;

          /**
           * Url for a custom branding image
           */
          branding_image_url?: string;

          /**
           * Minimum order amount for this product. The product option will be excluded in
           * payments where the order amount is less than the minimum amount.
           */
          minimum_amount?: number;
        }

        export namespace Product {
          export interface LoanExample {
            /**
             * The amount loaned in the example.
             */
            amount: number;

            /**
             * The cost of the loan in the example.
             */
            cost: number;

            /**
             * The total amount paid back in the example.
             */
            total_amount: number;

            /**
             * Years of payment in the example.
             */
            years: number;
          }
        }
      }

      /**
       * Fixed Part Payment
       */
      export interface Installment {
        /**
         * enable Instabank Installment Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      /**
       * invoice payment
       */
      export interface Invoice {
        /**
         * enable invoice payment (only for amounts greater than 500 NOK)
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        product?: Invoice.Product;

        require_applicant?: boolean;
      }

      export namespace Invoice {
        export interface Product {
          /**
           * Number of days before the payment is due.
           */
          due_in_days: number;

          /**
           * The fee for the payment product
           */
          invoice_fee: number;

          product_code: string;

          /**
           * The limit for when instabank will require a full applicant during payment.
           */
          require_applicant_amount: number;

          /**
           * Url for a custom branding image
           */
          branding_image_url?: string;

          /**
           * Minimum order amount for this product. The product option will be excluded in
           * payments where the order amount is less than the minimum amount.
           */
          minimum_amount?: number;
        }
      }

      /**
       * Postpone payment
       */
      export interface Postponement {
        /**
         * enable Instabank Postponement Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Klarna configuration
     */
    export interface Klarna {
      billie?: Klarna.Billie;

      klarna?: Klarna.Klarna;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Klarna {
      export interface Billie {
        /**
         * enable Klarna B2B Payment with Billie
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Klarna {
        /**
         * enable Klarna Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    export interface Merchant {
      id?: string;

      logo_url?: string;

      name?: string;
    }

    /**
     * Netaxept configuration
     */
    export interface Netaxept {
      creditcard?: Netaxept.Creditcard;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Netaxept {
      export interface Creditcard {
        /**
         * enable Credit Card Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Use Netaxept terminal instead of Dintero Checkout
         *
         * See https://shop.nets.eu/web/partners/register
         */
        terminal?: Creditcard.Terminal;

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export namespace Creditcard {
        /**
         * Use Netaxept terminal instead of Dintero Checkout
         *
         * See https://shop.nets.eu/web/partners/register
         */
        export interface Terminal {
          terminal: '/Terminal/default.aspx' | '/terminal/mobile/default.aspx';

          /**
           * Set hosted payment window to single page
           */
          terminal_single_page: boolean;

          /**
           * Name of the terminal template to use, created in Netaxept Admin
           */
          terminal_design?: string;

          terminal_layout?: string;
        }
      }
    }

    export interface Payex {
      applepay?: Payex.Applepay;

      clicktopay?: Payex.Clicktopay;

      creditcard?: Payex.Creditcard;

      /**
       * A textual description max 40 characters of the purchase.
       */
      dynamic_descriptor?: string;

      googlepay?: Payex.Googlepay;

      mobilepay?: Payex.Mobilepay;

      swish?: Payex.Swish;

      vipps?: Payex.Vipps;
    }

    export namespace Payex {
      export interface Applepay {
        /**
         * enable PayEx Apple Pay payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Clicktopay {
        /**
         * enable PayEx Click to Pay payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Creditcard {
        /**
         * enable Credit Card Payment
         */
        enabled: boolean;

        /**
         * generate payment token to use for future payments
         *
         * The generated payment token will be made available from the transaction details.
         */
        generate_payment_token?: boolean;

        /**
         * generate recurrence payment token to use for future payments
         *
         * The generated recurrence payment token will be made available from the
         * transaction details.
         */
        generate_recurrence_token?: boolean;

        /**
         * Disable the CVC field for payments where payment token is used.
         *
         * > To use this feature it has to be enabled on the contract with Swedbank Pay.
         */
        no_cvc?: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }

      export interface Googlepay {
        /**
         * enable PayEx Google Pay payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }

      export interface Mobilepay {
        /**
         * enable Payex MobilePay Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }

      export interface Swish {
        /**
         * enable Payex Swish Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }

      export interface Vipps {
        /**
         * enable Payex Vipps Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
      }
    }

    /**
     * Payout configuration
     */
    export interface Payout {
      /**
       * Use the order store id to control what `payout_destination_id` should be use
       *
       * A session created with the option set must have a store id that resolves to a
       * payout_destination_id or have payout_destination_id set
       *
       * A session where both `order.store.id` and `order.payout_destination_id` will not
       * be updated with match from `dynamic_payout_destination`
       */
      dynamic_payout_destination_ids?: Array<Payout.DynamicPayoutDestinationID>;
    }

    export namespace Payout {
      export interface DynamicPayoutDestinationID {
        order_payout_destination_id: string;

        order_store_id: string;

        type: 'order_store_id';
      }
    }

    export interface Santander {
      debit_account?: Santander.DebitAccount;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Santander {
      export interface DebitAccount {
        /**
         * enable Santander Finance Debit Account
         */
        enabled: boolean;

        /**
         * Debit accounts belonging to the customer's phone number
         */
        accounts?: Array<DebitAccount.Account>;

        /**
         * The name of the chain
         */
        branding_name?: string;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: unknown;
      }

      export namespace DebitAccount {
        export interface Account {
          /**
           * Token to represent the account number
           */
          account_number_token?: string;

          /**
           * Representation of the account number for display purposes
           */
          masked_account_number?: string;
        }
      }
    }

    /**
     * Swish configuration
     */
    export interface Swish {
      swish?: Swish.Swish;

      /**
       * Denotes what kind of config parameter this is
       */
      type?: 'payment_type';
    }

    export namespace Swish {
      export interface Swish {
        /**
         * enable Swish Payment
         */
        enabled: boolean;

        /**
         * Determines if the payment_product_type is currently available for payment
         */
        payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';

        /**
         * Denotes what kind of config parameter this is
         */
        type?: 'payment_product_type';
      }
    }

    /**
     * Customize the appearance of the checkout.
     */
    export interface Theme {
      /**
       * Color on backdrop shown in desktop mode
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      backdrop?: string;

      /**
       * **Deprecated** - will be ignored.
       *
       * Color used for errors.
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      error?: string;

      /**
       * **Deprecated** - will be ignored.
       *
       * Fontstack used by the checkout.
       *
       * Default value
       * `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
       */
      'font-family'?: string;

      /**
       * Primary color used on pay button and other buttons.
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      primary?: string;

      /**
       * **Deprecated** - will be ignored.
       *
       * Default text color.
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      text?: string;

      /**
       * **Deprecated** - will be ignored.
       *
       * Color used for warnings.
       *
       * Color, supported formats are
       *
       * - hex: `#ff0000`
       * - rgb: `rgb(255,0,0)`
       * - rgba: `rgba(255,0,0,0.5)`
       */
      warning?: string;
    }

    export interface Vipps {
      /**
       * enable vipps payment
       */
      enabled: boolean;

      /**
       * A short reference / descriptor that can be displayed to the end user
       */
      dynamic_descriptor?: string;

      /**
       * Determines if the payment_product_type is currently available for payment
       */
      payability?: 'payable' | 'disabled_by_gateway' | 'disabled_by_order_amount';
    }
  }

  export interface Order {
    /**
     * A reference by the merchant to identify the corresponding order for the Checkout
     * Session
     */
    merchant_reference: string;

    /**
     * The amount to authorize/capture including VAT and discounts. In smallest unit
     * for the currency, e.g. cents
     *
     * The `amount` should be equal to the sum of the `items.amount` +
     * `shipping_option.amount`.
     */
    amount?: number;

    /**
     * Address
     */
    billing_address?: Order.BillingAddress;

    /**
     * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
     */
    currency?: string;

    discount_codes?: Array<string>;

    /**
     * Discounts given, additions to any items discount_lines.
     */
    discount_lines?: Array<Order.DiscountLine>;

    /**
     * The gift cards selected, the part of `order.amount` that will be authorized
     * using gift cards
     */
    gift_cards?: Array<Order.GiftCard>;

    /**
     * Details about the order items.
     *
     * #### Instabank
     *
     * `required` if Instabank payment is configured in and partial_payment is false.
     * All items must include a unique `line_id`, quantity and amount
     *
     * #### Collector Bank
     *
     * `required` if Collector Bank payment is configured in and partial_payment is
     * false. All items must include a unique `line_id`, quantity and amount
     */
    items?: Array<Order.Item>;

    /**
     * A reference by the merchant to identify the corresponding order for the Checkout
     * Session
     */
    merchant_reference_2?: string;

    /**
     * This is a partial payment where the `order.amount` can be lower or equal to the
     * sum of `order.items.amount`
     */
    partial_payment?: boolean;

    /**
     * An id that identifies the seller, value will be included in the settlement
     * reports
     */
    payout_destination_id?: string;

    /**
     * Address
     */
    shipping_address?: Order.ShippingAddress;

    shipping_option?: Order.ShippingOption;

    store?: Order.Store;

    /**
     * The VAT of the `amount` parameter. Only used for display purposes.
     *
     * In smallest unit for the currency, e.g. cents
     *
     * The `vat_amount` should be equal to the sum of the `items.vat_amount` +
     * `shipping_option.vat_amount`.
     */
    vat_amount?: number;
  }

  export namespace Order {
    /**
     * Address
     */
    export interface BillingAddress {
      /**
       * Gaustadalleen 21
       */
      address_line?: string;

      /**
       * PB 123
       */
      address_line_2?: string;

      /**
       * Name of the company
       */
      business_name?: string;

      co_address?: string;

      /**
       * Comment about the address
       */
      comment?: string;

      /**
       * For companies that needs to specify a cost center.
       */
      cost_center?: string;

      /**
       * Country of the location
       */
      country?: string;

      /**
       * The customer's reference
       */
      customer_reference?: string;

      /**
       * The email address of a person or an organization
       */
      email?: string;

      first_name?: string;

      last_name?: string;

      latitude?: number;

      longitude?: number;

      /**
       * The organization number of the customer.
       */
      organization_number?: string;

      /**
       * Type indicating what kind of organization it is.
       */
      organization_type?: string;

      /**
       * mobile number of a person / company, ITU/E.123 format with international prefix
       * (+PPNNNNNNNNN...)
       */
      phone_number?: string;

      /**
       * The zip code / postal code of the address.
       */
      postal_code?: string;

      /**
       * The name of the postal code
       */
      postal_place?: string;
    }

    export interface DiscountLine {
      /**
       * Monetary amount in smallest unit for the currency
       */
      amount?: number;

      description?: string;

      discount_id?: string;

      discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

      line_id?: number;

      /**
       * Optional, set if the amount given was from a percentage discount
       */
      percentage?: number;
    }

    export interface GiftCard {
      /**
       * Non-negative, minor units. Total amount for the gift card
       */
      amount: number;

      card_id: string;

      type: 'dintero.wallets';

      masked_card_token?: string;
    }

    export interface Item {
      /**
       * The ID or SKU of the product on the line
       */
      id?: string;

      /**
       * The total monetary amount of the line item, including VAT and discounts.
       *
       * In smallest unit for the currency, e.g. cents
       */
      amount?: number;

      /**
       * A short, localized description of the line item
       */
      description?: string;

      discount_lines?: Array<Item.DiscountLine>;

      /**
       * The item is eligible for discount
       */
      eligible_for_discount?: boolean;

      /**
       * Details related to
       * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
       *
       * Some items require extra information to be provided when using Klarna as an
       * enabled payment option.
       */
      emd?: Item.Emd;

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      fee_split?: Item.FeeSplit;

      /**
       * The groups the product on the line belongs to
       */
      groups?: Array<Item.Group>;

      /**
       * Discount applied to amount
       */
      is_changed?: boolean;

      /**
       * the number of the line (or id), must be `unique` between all items. `required`
       * when Instabank payment is configured.
       */
      line_id?: string;

      /**
       * The quantity of the product in the item line.
       */
      quantity?: number;

      /**
       * An array of objects specifying how the amount should be split between sellers
       * when using Dintero Payout
       *
       * Specify an empty array if the splits will be provided during capture.
       * `auto_capture` cannot be enabled when splits are defined as empty array.
       */
      splits?: Array<Item.Split>;

      /**
       * URL to a thumbnail of the item. Will be displayed when redirecting to the
       * session.
       *
       * Recommended limitations for the image:
       *
       * - all images should preferrably have the same dimensions
       * - max file size should be less than 2MB
       */
      thumbnail_url?: string;

      /**
       * The type of order item this is.
       *
       * - **physical** - a physical item which must be delivered or handed over
       * - **digital** - a digital item which doesn't need shipping
       * - **service** - payment for services like maintenance performed in your home
       * - **gift_card** - usage of a gift card, where the amount is usually a negative
       *   number
       * - **shipping** - payment for shipping of the order
       * - **surcharge** - extra incurred costs, like taxes or necessary rounding
       */
      type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

      /**
       * The dimensional weight (also known as volumetric) value unit of one item.
       * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
       */
      unit_dimensional_weight?: number;

      /**
       * The volume of one item in m³ (cubic meters)
       */
      unit_volume?: number;

      /**
       * The volume of one item in kg (kilo grams)
       */
      unit_weight?: number;

      /**
       * The VAT percentage
       */
      vat?: number;

      /**
       * The VAT of the `amount` parameter. Only used for display purposes.
       *
       * In smallest unit for the currency, e.g. cents
       */
      vat_amount?: number;
    }

    export namespace Item {
      export interface DiscountLine {
        /**
         * Monetary amount in smallest unit for the currency
         */
        amount?: number;

        description?: string;

        discount_id?: string;

        discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

        line_id?: number;

        /**
         * Optional, set if the amount given was from a percentage discount
         */
        percentage?: number;
      }

      /**
       * Details related to
       * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
       *
       * Some items require extra information to be provided when using Klarna as an
       * enabled payment option.
       */
      export interface Emd {
        /**
         * Only required if the item is related to an event or multiple events, like for
         * example tickets to a concert.
         *
         * If you are selling an event package as a single ticket or item that includes
         * multiple events, for example a festival, you need to provide information about
         * all the individual events that are part of the package.
         */
        event?: Array<Emd.Event>;

        /**
         * Only required if them item is related to a marketplace order.
         *
         * If that is the case, you need to provide information about both the seller and
         * the winner.
         */
        marketplace_order?: Emd.MarketplaceOrder;

        /**
         * Only required if the item is related to a subscription.
         *
         * If that is the case, you need to provide information about both the subscription
         * and the customer account.
         */
        subscription?: Emd.Subscription;

        /**
         * Only required if the item is part of a travel-related transaction.
         *
         * If that is the case, you need to provide information about the itinerary to be
         * booked.
         */
        travel?: Emd.Travel;
      }

      export namespace Emd {
        export interface Event {
          /**
           * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          end_time: string;

          /**
           * Name of the company arranging the event, e.g. "Happy Parties Ltd."
           */
          event_company: string;

          /**
           * Name of the event, e.g. "Fancy Singer"
           */
          event_name: string;

          /**
           * Category or type of venue, e.g. "Pop"
           */
          genre_of_event: string;

          /**
           * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
           *
           * If a timezone is not specified we assume UTC.
           */
          start_time: string;

          ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

          /**
           * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
           *
           * If email or phone, then use either the email address or the phone number
           * respectively.
           */
          ticket_delivery_recipient: string;

          /**
           * If tickets are digitally checked when entering the venue, e.g. true
           */
          access_controlled_venue?: boolean;

          /**
           * Name of the affiliate that originated the purchase.
           */
          affiliate_name?: string;

          arena_location?: Event.ArenaLocation;

          /**
           * Name of the venue, e.g. "Song Arena"
           */
          arena_name?: string;
        }

        export namespace Event {
          export interface ArenaLocation {
            /**
             * City that the venue is located in, e.g. "Oslo"
             */
            city: string;

            /**
             * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
             */
            country: string;

            /**
             * Postal code for the venue location, e.g. "0185"
             */
            postal_code?: string;

            /**
             * Street address representing the venue location, e.g. "Sonja Henies plass 2"
             */
            street_address?: string;
          }
        }

        /**
         * Only required if them item is related to a marketplace order.
         *
         * If that is the case, you need to provide information about both the seller and
         * the winner.
         */
        export interface MarketplaceOrder {
          /**
           * Details related to the seller involved in the marketplace order.
           */
          seller_info: MarketplaceOrder.SellerInfo;

          /**
           * Details related to the winner involved in the marketplace order.
           */
          winner_info: MarketplaceOrder.WinnerInfo;
        }

        export namespace MarketplaceOrder {
          /**
           * Details related to the seller involved in the marketplace order.
           */
          export interface SellerInfo {
            account_last_modified: SellerInfo.AccountLastModified;

            /**
             * Date and time that the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Number of trades the sub-merchant did in the last 12 months, e.g. 23
             */
            number_of_trades: number;

            /**
             * Name of the category to which the specific good belongs to, according to the
             * selling merchant's categorization, e.g. "Phones".
             */
            product_category: string;

            /**
             * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
             * Ltd."
             */
            sub_merchant_id: string;

            /**
             * Name of the good purchased.
             */
            product_name?: string;

            /**
             * Current rating of the good purchased according to the marketplace's rating
             * scale, e.g. 5
             */
            seller_rating?: number;

            /**
             * Details about the seller.
             */
            unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

            /**
             * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
             */
            volume_of_trades?: number;
          }

          export namespace SellerInfo {
            export interface AccountLastModified {
              /**
               * Date and time that the (physical) address was last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              address: string;

              /**
               * Date and time that the email was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              email: string;

              /**
               * Date and time that the listing details were last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              listing: string;

              /**
               * Date and time that the login details were last changed (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              login: string;

              /**
               * Date and time that the password was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              password: string;
            }

            /**
             * Details about the seller.
             */
            export interface UniqueAccountIdentifierSeller {
              /**
               * Seller's email address, e.g. "seller@mail.com"
               */
              email?: string;

              other?: string;

              /**
               * Seller's phone number, e.g. "97712123"
               */
              phone_number?: string;
            }
          }

          /**
           * Details related to the winner involved in the marketplace order.
           */
          export interface WinnerInfo {
            account_last_modified: WinnerInfo.AccountLastModified;

            /**
             * Date and time that the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Number of trades the winner did in the last 12 months, e.g. 23
             */
            number_of_trades: number;

            /**
             * Details about the winner.
             */
            unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

            /**
             * Volumes of trades the winner did in the last 12 months, e.g. 230
             */
            volume_of_trades?: number;
          }

          export namespace WinnerInfo {
            export interface AccountLastModified {
              /**
               * Date and time that the (physical) address was last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              address: string;

              /**
               * Date and time that the email was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              email: string;

              /**
               * Date and time that the listing details were last modified (ISO 8601 format),
               * e.g. "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              listing: string;

              /**
               * Date and time that the login details were last changed (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              login: string;

              /**
               * Date and time that the password was last modified (ISO 8601 format), e.g.
               * "2023-08-17T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              password: string;
            }

            /**
             * Details about the winner.
             */
            export interface UniqueAccountIdentifierWinner {
              /**
               * Winner's email address, e.g. "winner@mail.com"
               */
              email?: string;

              other?: string;

              /**
               * Winner's phone number, e.g. "97712123"
               */
              phone_number?: string;
            }
          }
        }

        /**
         * Only required if the item is related to a subscription.
         *
         * If that is the case, you need to provide information about both the subscription
         * and the customer account.
         */
        export interface Subscription {
          /**
           * Information related to the customer that wants to purchase the subscription.
           */
          customer_account_info: Subscription.CustomerAccountInfo;

          /**
           * Details related to the subscription.
           */
          subscription: Subscription.Subscription;
        }

        export namespace Subscription {
          /**
           * Information related to the customer that wants to purchase the subscription.
           */
          export interface CustomerAccountInfo {
            /**
             * The date and time the account was last modified (ISO 8601 format), e.g.
             * "2023-10-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_last_modified: string;

            /**
             * The date and time the account was registered (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC.
             */
            account_registration_date: string;

            /**
             * Unique name / number to identify the specific customer account. Max 24
             * characters, e.g. "Adam Adamsson"
             */
            unique_account_identifier: string;
          }

          /**
           * Details related to the subscription.
           */
          export interface Subscription {
            /**
             * Whether the subscription will be auto renewed upon expiry, e.g. true
             */
            auto_renewal_of_subscription: boolean;

            /**
             * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC
             */
            end_time: string;

            /**
             * The start time of the subscription (ISO 8601 format), e.g.
             * "2023-08-16T15:00:00Z".
             *
             * If a timezone is not specified we assume UTC
             */
            start_time: string;

            /**
             * Name of the product on subscription, e.g. "Contact lenses"
             */
            subscription_name: string;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;
          }
        }

        /**
         * Only required if the item is part of a travel-related transaction.
         *
         * If that is the case, you need to provide information about the itinerary to be
         * booked.
         */
        export interface Travel {
          /**
           * Details about the reservation of airline tickets.
           */
          air_reservation_details?: Travel.AirReservationDetails;

          /**
           * Details about the reservation of bus tickets.
           */
          bus_reservation_details?: Travel.BusReservationDetails;

          /**
           * Details about the reservation of rental cars.
           */
          car_rental_reservation_details?: Travel.CarRentalReservationDetails;

          /**
           * Details about the reservation of ferry tickets.
           */
          ferry_reservation_details?: Travel.FerryReservationDetails;

          /**
           * Details about the reservation of hotel rooms.
           */
          hotel_reservation_details?: Travel.HotelReservationDetails;

          /**
           * Details about the reservation of train tickets.
           */
          train_reservation_details?: Travel.TrainReservationDetails;
        }

        export namespace Travel {
          /**
           * Details about the reservation of airline tickets.
           */
          export interface AirReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one flight from Oslo to Munich, and
             * another flight from Munich to Dubai, you need to provide one itinerary object
             * for each of these two flights, and so on.
             */
            itinerary: Array<AirReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<AirReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<AirReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace AirReservationDetails {
            export interface Itinerary {
              /**
               * IATA Airport Code (three letters), e.g. "MUC"
               */
              arrival: string;

              /**
               * IATA Airline standard (two letters or digits), e.g. "LH"
               */
              carrier: string;

              /**
               * IATA Airport Code (three letters), e.g. "OSL"
               */
              departure: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * City the flight arrives in, e.g. "Munich"
               */
              arrival_city?: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * City the flight departs from, e.g. "Oslo"
               */
              departure_city?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the flight in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of bus tickets.
           */
          export interface BusReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one bus journey from Oslo to Munich,
             * and another bus journey from Munich to Rome, you need to provide one itinerary
             * object for each of these two bus journeys, and so on.
             */
            itinerary: Array<BusReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<BusReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<BusReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace BusReservationDetails {
            export interface Itinerary {
              /**
               * City the bus arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Bus Travels Ltd."
               */
              carrier: string;

              /**
               * City the bus departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the bus journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of rental cars.
           */
          export interface CarRentalReservationDetails {
            /**
             * Driver data, one per driver.
             */
            drivers: Array<CarRentalReservationDetails.Driver>;

            /**
             * Car rental itinerary data, one per car rental.
             *
             * If you are selling a package that contains multiple car rentals, you need to
             * provide itinerary data for each of the individual rentals.
             */
            itinerary: Array<CarRentalReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<CarRentalReservationDetails.Insurance>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace CarRentalReservationDetails {
            export interface Driver {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }

            export interface Itinerary {
              /**
               * End time of the car rental reservation (ISO 8601 format), e.g.
               * "2023-08-20T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              end_time: string;

              /**
               * Name of the car rental company, e.g. "Premium Cars Ltd."
               */
              rental_company: string;

              /**
               * Start time of the car rental reservation (ISO 8601 format), e.g.
               * "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              start_time: string;

              /**
               * Price for the car rental reservation in smallest unit of local currency, e.g.
               * 500000
               */
              car_price?: number;

              /**
               * Travel class, e.g. "Premium Cars Premium Class"
               */
              class?: string;

              /**
               * Driver IDs.
               */
              drivers_id?: Array<number>;

              /**
               * Details related to the drop off location.
               */
              drop_off_location?: Itinerary.DropOffLocation;

              /**
               * Details related to the pick up location.
               */
              pick_up_location?: Itinerary.PickUpLocation;
            }

            export namespace Itinerary {
              /**
               * Details related to the drop off location.
               */
              export interface DropOffLocation {
                /**
                 * City where the car should be dropped off, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
                 * "NO"
                 */
                country: string;

                /**
                 * Postal code where the car should be dropped off, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }

              /**
               * Details related to the pick up location.
               */
              export interface PickUpLocation {
                /**
                 * City where the car should be picked up, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
                 * "NO",
                 */
                country: string;

                /**
                 * Postal code where the car should be picked up, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }
          }

          /**
           * Details about the reservation of ferry tickets.
           */
          export interface FerryReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
             * and another ferry journey from Kiel to Gothenburg, you need to provide one
             * itinerary object for each of these two ferry journeys, and so on.
             */
            itinerary: Array<FerryReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<FerryReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<FerryReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace FerryReservationDetails {
            export interface Itinerary {
              /**
               * City the ferry arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Ferry Travels Ltd."
               */
              carrier: string;

              /**
               * City the ferry departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id?: Array<number>;

              /**
               * Price for that specific segment of the ferry journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of hotel rooms.
           */
          export interface HotelReservationDetails {
            /**
             * Hotel itinerary data, one per hotel stay.
             *
             * If you are selling a package that contains multiple hotel stays, you need to
             * provide itinerary data for each of the individual stays.
             */
            itinerary: Array<HotelReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<HotelReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<HotelReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace HotelReservationDetails {
            export interface Itinerary {
              /**
               * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              end_time: string;

              /**
               * Price for the hotel stay in smallest unit of local currency, e.g. 200000
               */
              hotel_price: number;

              /**
               * Number of rooms booked, e.g. 2
               */
              number_of_rooms: number;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id: Array<number>;

              /**
               * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              start_time: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Address details of the hotel.
               */
              address?: Itinerary.Address;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * Name of the hotel, e.g. "Premium Hotel"
               */
              hotel_name?: string;
            }

            export namespace Itinerary {
              /**
               * Address details of the hotel.
               */
              export interface Address {
                /**
                 * City the hotel is located in, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
                 */
                country: string;

                /**
                 * Postal code of the hotel, e.g. "0159"
                 */
                postal_code?: string;

                /**
                 * Street address of the hotel, e.g. "Karl Johans gt. 31"
                 */
                street_address?: string;
              }
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }

          /**
           * Details about the reservation of train tickets.
           */
          export interface TrainReservationDetails {
            /**
             * Itinerary data, one per segment.
             *
             * If you are selling a ticket that contains one train journey from Oslo to Munich,
             * and another train journey from Munich to Rome, you need to provide one itinerary
             * object for each of these two train journeys, and so on.
             */
            itinerary: Array<TrainReservationDetails.Itinerary>;

            /**
             * Name of the affiliate that originated the purchase.
             */
            affiliate_name?: string;

            /**
             * Insurance data, one per segment
             */
            insurance?: Array<TrainReservationDetails.Insurance>;

            /**
             * Passenger data, one per passenger.
             */
            passengers?: Array<TrainReservationDetails.Passenger>;

            /**
             * Trip booking number, e.g. "VH67899"
             */
            pnr?: string;
          }

          export namespace TrainReservationDetails {
            export interface Itinerary {
              /**
               * City the train arrives in, e.g. "Munich"
               */
              arrival_city: string;

              /**
               * Name of transportation company. "Big Train Travels Ltd."
               */
              carrier: string;

              /**
               * City the train departs from, e.g. "Oslo"
               */
              departure_city: string;

              /**
               * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified, we assume UTC.
               */
              departure_date: string;

              /**
               * IDs of all the passengers included in this itinerary.
               */
              passenger_id: Array<number>;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * Travel class, e.g. "First Class"
               */
              class?: string;

              /**
               * Price for that specific segment of the train journey in smallest unit of local
               * currency, e.g. 200000
               */
              segment_price?: number;
            }

            export interface Insurance {
              /**
               * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
               */
              insurance_company?: string;

              /**
               * Price of the insurance in smallest unit of local currency, e.g. 50000
               */
              insurance_price?: number;

              /**
               * Type of insurance, e.g. "travel"
               */
              insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
            }

            export interface Passenger {
              /**
               * First name of the passenger, e.g. "Paul"
               */
              first_name: string;

              /**
               * Last name of the passenger, e.g. "Lamb"
               */
              last_name: string;

              /**
               * Passenger id, e.g. 1
               */
              id?: number;

              /**
               * Passenger title, e.g. "mr".
               *
               * Blank if under 12 years.
               */
              title?: 'mr' | 'mrs' | 'ms' | '';
            }
          }
        }
      }

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      export interface FeeSplit {
        type: 'proportional';

        /**
         * Seller ids that will be debited for the payment fees All destinations must be
         * included in the list of splits
         */
        destinations?: Array<string>;
      }

      export interface Group {
        /**
         * Group ID
         */
        id: string;

        /**
         * Group name
         */
        name?: string;
      }

      export interface Split {
        /**
         * The split amount in smalles unit for the currency, e.g. cents.
         */
        amount: number;

        /**
         * An id that identifies the seller
         */
        payout_destination_id: string;
      }
    }

    /**
     * Address
     */
    export interface ShippingAddress {
      /**
       * Gaustadalleen 21
       */
      address_line?: string;

      /**
       * PB 123
       */
      address_line_2?: string;

      /**
       * Name of the company
       */
      business_name?: string;

      co_address?: string;

      /**
       * Comment about the address
       */
      comment?: string;

      /**
       * For companies that needs to specify a cost center.
       */
      cost_center?: string;

      /**
       * Country of the location
       */
      country?: string;

      /**
       * The customer's reference
       */
      customer_reference?: string;

      /**
       * The email address of a person or an organization
       */
      email?: string;

      first_name?: string;

      last_name?: string;

      latitude?: number;

      longitude?: number;

      /**
       * The organization number of the customer.
       */
      organization_number?: string;

      /**
       * Type indicating what kind of organization it is.
       */
      organization_type?: string;

      /**
       * mobile number of a person / company, ITU/E.123 format with international prefix
       * (+PPNNNNNNNNN...)
       */
      phone_number?: string;

      /**
       * The zip code / postal code of the address.
       */
      postal_code?: string;

      /**
       * The name of the postal code
       */
      postal_place?: string;
    }

    export interface ShippingOption {
      /**
       * Id of this shipping option product.
       *
       * The express checkout will group all products with the same id. Used for grouping
       * delivery to the same address at different time slots, or for grouping deliveries
       * to different pick up points.
       */
      id: string;

      /**
       * The monetary amount of the shipping option, including VAT and discounts.
       *
       * In smallest unit for the currency, e.g. cents
       */
      amount: number;

      /**
       * Unique id of the specific configuration of this shipping product
       */
      line_id: string;

      /**
       * Name of company that provides shipping service
       */
      operator: string;

      /**
       * A shipping option title. Eg. "Standard"
       */
      title: string;

      /**
       * Countries where this shipping option can be used
       */
      countries?: Array<string>;

      delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

      /**
       * A short description of the shipping option product
       */
      description?: string;

      /**
       * Environmental data about the shipping option
       */
      environmental_data?: ShippingOption.EnvironmentalData;

      /**
       * Estimated time of arrival
       */
      eta?: ShippingOption.Eta;

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      fee_split?: ShippingOption.FeeSplit;

      /**
       * Additional metadata about the shipping_option
       */
      metadata?: unknown;

      /**
       * The operators own id for this shipping product
       */
      operator_product_id?: string;

      pick_up_address?: ShippingOption.PickUpAddress;

      /**
       * An array of objects specifying how the amount should be split between sellers
       * when using Dintero Payout
       *
       * Specify an empty array if the splits will be provided during capture.
       * `auto_capture` cannot be enabled when splits are defined as empty array.
       */
      splits?: Array<ShippingOption.Split>;

      /**
       * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
       * the session. Recommended limitations for the image:
       *
       * - all images should preferrably have the same dimensions
       * - max file size should be less than 2MB
       */
      thumbnail_url?: string;

      /**
       * A specified time for delivery to customer
       */
      time_slot?: ShippingOption.TimeSlot;

      /**
       * The VAT percentage
       */
      vat?: number;

      /**
       * The VAT of the `amount` parameter. Only used for display purposes.
       */
      vat_amount?: number;
    }

    export namespace ShippingOption {
      /**
       * Environmental data about the shipping option
       */
      export interface EnvironmentalData {
        /**
         * A short description of the environmental data, something like
         *
         * - "Fossil free",
         * - "Carbon neutral"
         * - "Low emissions"
         * - "Renewable Energy Sourced"
         * - "Eco-certified Fleet"
         */
        description: string;

        details?: Array<EnvironmentalData.Detail>;
      }

      export namespace EnvironmentalData {
        export interface Detail {
          /**
           * Give context to the value field. Example:
           *
           * - "CO2 emissions"
           * - "Energy consumption"
           * - "Carbon footprint"
           * - "Carbon offset"
           * - "Trees planted"
           * - "Renewable energy percentage"
           */
          label: string;

          value: string;
        }
      }

      /**
       * Estimated time of arrival
       */
      export interface Eta {
        ends_at?: string;

        starts_at?: string;
      }

      /**
       * Specify how fees are handled with splits. The default behaviour is to share the
       * fees proportional with all splits destinations
       */
      export interface FeeSplit {
        type: 'proportional';

        /**
         * Seller ids that will be debited for the payment fees All destinations must be
         * included in the list of splits
         */
        destinations?: Array<string>;
      }

      export interface PickUpAddress {
        /**
         * Gaustadalleen 21
         */
        address_line?: string;

        /**
         * PB 123
         */
        address_line_2?: string;

        /**
         * Name of the company
         */
        business_name?: string;

        co_address?: string;

        /**
         * Comment about the address
         */
        comment?: string;

        /**
         * For companies that needs to specify a cost center.
         */
        cost_center?: string;

        /**
         * Country of the location
         */
        country?: string;

        /**
         * The customer's reference
         */
        customer_reference?: string;

        /**
         * Distance in kilometers from the shipping_address.
         */
        distance?: number;

        /**
         * The email address of a person or an organization
         */
        email?: string;

        first_name?: string;

        last_name?: string;

        latitude?: number;

        longitude?: number;

        /**
         * The organization number of the customer.
         */
        organization_number?: string;

        /**
         * Type indicating what kind of organization it is.
         */
        organization_type?: string;

        /**
         * mobile number of a person / company, ITU/E.123 format with international prefix
         * (+PPNNNNNNNNN...)
         */
        phone_number?: string;

        /**
         * The zip code / postal code of the address.
         */
        postal_code?: string;

        /**
         * The name of the postal code
         */
        postal_place?: string;
      }

      export interface Split {
        /**
         * The split amount in smalles unit for the currency, e.g. cents.
         */
        amount: number;

        /**
         * An id that identifies the seller
         */
        payout_destination_id: string;
      }

      /**
       * A specified time for delivery to customer
       */
      export interface TimeSlot {
        ends_at?: string;

        starts_at?: string;
      }
    }

    export interface Store {
      id: string;

      address?: Store.Address;

      /**
       * Merchant number associated with the stores payment terminal
       */
      bax?: string;

      /**
       * Official name of the person or entity that owns the store.
       */
      business_name?: string;

      chain?: string;

      email?: string;

      gln?: string;

      /**
       * A four-digit Merchant Category Code (MCC) for the store
       * [ISO 18245:2003](https://www.iso.org/standard/33365.html)
       */
      mcc?: string;

      /**
       * name of the store, aka trade name of the store
       */
      name?: string;

      organization_number?: string;

      phone_number?: string;

      /**
       * Id to a specific point-of-sale (POS) terminal or workstation
       */
      terminal_id?: string;
    }

    export namespace Store {
      export interface Address {
        address_line: string;

        /**
         * ISO 3166-1 country code
         */
        country: string;

        postal_place: string;

        address_line_2?: string;

        postal_code?: string;
      }
    }
  }

  export interface URL {
    /**
     * URL to page where Checkout will redirect the customer to after the Checkout
     * process has ended.
     *
     * If a transaction was completed successfully, a `transaction_id` will be appended
     * to the URL as a `query` string parameter
     *
     * > A `transaction_id` will be appended to the URL if the Checkout failed with
     * > `error=capture`
     *
     * > A transaction with status `ON_HOLD` must be handled as a payment that is
     * > pending approval, where the transaction will later be updated with a final
     * > payment staus `AUTHORIZED` or `FAILED`. We recommend that `callback_url` is
     * > used to receive the callback when the transaction changes status from
     * > `ON_HOLD` to `AUTHORIZED` or `FAILED`. Alternative is to do an hourly/daily
     * > poll on the transaction to check if the status has changed.
     *
     * _Example_:
     *
     * ```
     * https://example.com/accept?transaction_id=T00000000.3YkJXSdSnUBXcmQSzn7uJj
     * ```
     *
     * | query name         |  type  | description                  | required |
     * | ------------------ | :----: | ---------------------------- | :------: |
     * | transaction_id     | string | Transaction Id               |  false   |
     * | error              | string | Error code identifying cause |  false   |
     * | merchant_reference | string | The merchants reference      |   true   |
     *
     * In case of that something went wrong with the payment flow, an `error` query
     * parameter will be appended to the URL. The value of the error is a code
     * identifying the cause.
     *
     * | error         | Description                                                                                     |
     * | ------------- | ----------------------------------------------------------------------------------------------- |
     * | cancelled     | Customer cancelled the checkout payment                                                         |
     * | authorization | Customer failed to authorize the payment                                                        |
     * | failed        | The transaction has been rejected by us, or an error has occurred during transaction processing |
     *
     * ### configuration.channel=in_app
     *
     * The `in_app` channel is intended for payments done from mobile devices where
     * `url.return_url` can be set to the application's appswitch URL.
     *
     * If the query-param `?initial_recipient=merchant` is appended to the appswitch
     * URL, the payment app will redirect directly to the app, without proxying through
     * Dintero.
     *
     * In that case, the `transaction_id` will be appended to the `return_url`, and you
     * will need to poll [GET /v1/transactions](#operation/transactions_get) with this
     * id until the transaction has been updated with one of these statuses:
     *
     * - AUTHORIZED
     * - CAPTURED
     * - FAILED
     *
     * Example url:
     * `myapp://?initial_recipient=merchant&transaction_id=T12345678.abc&merchant_reference=mref123&session_id=T12345678.abd`
     */
    return_url: string;

    /**
     * URL that Checkout will call when the session payment is complete and the
     * transaction has been authorized.
     *
     * > **Callback is only delivered to HTTPS URLs**
     *
     * > A callback done with a transaction with status `ON_HOLD` will receive an
     * > aditional callback (later) when the transaction state changes status from
     * > `ON_HOLD`.
     *
     * > The callback may be received after the transaction is `CAPTURED` in case when
     * > the transaction was created from a session where `auto_capture` was enabled.
     *
     * Unlike the `return_url` the `callback_url` is system-to-system which means
     * delivery is guaranteed.
     *
     * Once a session payment is complete the callback_url is invoked as a `GET`
     * request to notify your system that the payment has been approved.
     *
     * - A callback_url with `method=POST` query parameter will be invoked as a `POST`
     *   request with the transaction included in the request body.
     *
     * - A callback_url with `report_error=true` will enable the callback_url to be
     *   called if the payment failed with error `cancelled`, `authorization` or
     *   `failed`.
     *
     * - A callback_url with `delay_callback=<seconds>` will delay the callback before
     *   trying to deliver the callback. The **maximum** delay is 60 seconds.
     *
     * - A callback_url with `report_event={EVENT}` will enable the callback_url to be
     *   called if a payment event has been applied to the transaction. Valid values
     *   are `CAPTURE`, `REFUND` and `VOID`. The callback_url can contain multiple
     *   `report_event` query parameters. An `event` query parameter will be included
     *   in the request sent to the callback_url.
     *
     * - A callback_url with `includes=session` will enable the callback_url to include
     *   the session data in the body.
     *
     * - A callback_url with `sid_parameter_name=sid` will change the query param
     *   `session_id` to `sid` to avoid false session fixation alarms in firewalls.
     *   Possible values: `sid`, `session_id`
     *
     * A successful delivery to an HTTPS callback_url sometimes requires more than one
     * attempt. This can be the case, for example, if the server hosting the
     * callback_url is down for maintenance or is experiencing heavy traffic.
     *
     * Dintero attempts a retry only after a failed delivery attempt, following
     * situations is considered as failed delivery
     *
     * - HTTP status code 100 to 101 and 500 to 599 (inclusive) (HTTP status code 400
     *   to 499 is considered as permanent failure)
     * - A request timeout (10 seconds)
     * - Any connection error such as connection timeout, bad certificate, etc
     *
     * Failed delivery will be retried 20 times.
     *
     * | query name         |     type     | description                            | required |
     * | ------------------ | :----------: | :------------------------------------- | :------- |
     * | transaction_id     |    string    | Transaction Id                         | true     |
     * | session_id         |    string    | Session Id                             | true     |
     * | sid                |    string    | Session Id when sid_parameter_name=sid | true     |
     * | merchant_reference |    string    | The merchants reference                | true     |
     * | time               |    string    | ISO 8601 format                        | true     |
     * | error              |    string    | Error code                             | false    |
     * | event              |    string    | event applied                          | false    |
     * | event_id           |    string    | event id for callback                  | false    |
     * | includes           | string array | include additional data                | false    |
     *
     * > The transaction_id is optional when callback_url enables `report_error` where
     * > error query will be included in case where the payment was completed without
     * > creating an authorized transaction.
     *
     * > It is not possible to use `https://localhost` or `http://127.0.0.1` for the
     * > callback URL as Checkout backend would then call itself.
     *
     * See [validating callbacks](https://docs.dintero.com/docs/validating-callbacks)
     * to see how you can verify the integrity of the callbacks,
     */
    callback_url?: string;

    /**
     * URL to a webpage with the merchant's Terms of Service. Will be linked to from
     * the checkout.
     */
    merchant_terms_url?: string;
  }

  export interface Checkbox {
    /**
     * ID to assign to the checkbox so you can reference it later
     */
    id: string;

    /**
     * Label that should be visible next to the checkbox
     */
    label: string;

    /**
     * If the checkbox should be checked by default or not
     */
    checked?: boolean;

    link?: Checkbox.Link;

    /**
     * If the checkbox should be required or not
     */
    required?: boolean;
  }

  export namespace Checkbox {
    export interface Link {
      /**
       * Link text
       */
      text: string;

      /**
       * Link URL
       */
      url: string;
    }
  }

  export interface Customer {
    /**
     * Customer id
     */
    customer_id?: string;

    /**
     * Customer email address
     */
    email?: string;

    gift_cards?: Customer.GiftCards;

    /**
     * Options for myDintero
     */
    my_dintero?: Customer.MyDintero;

    /**
     * Customer phone number, ITU/E.123 format with international prefix
     * (+PPNNNNNNNNN...)
     */
    phone_number?: string;

    tokens?: Customer.Tokens;
  }

  export namespace Customer {
    export interface GiftCards {
      /**
       * Preload checkout with Wallets cards and let the customer use it during checkout
       * by providing PIN to activate the card (e.g. use Wallets card as giftcard)
       *
       * - The `dintero.wallets` must be enabled in the session configuration to activate
       *   the use of the provided gift card tokens
       */
      'dintero.wallets'?: Array<GiftCards.DinteroWallet>;
    }

    export namespace GiftCards {
      export interface DinteroWallet {
        card_id: string;

        masked_card_token?: string;
      }
    }

    /**
     * Options for myDintero
     */
    export interface MyDintero {
      /**
       * Actions to perform on the customer
       */
      actions: Array<'create_user'>;

      /**
       * Terms and conditions accepted
       */
      terms: MyDintero.Terms;
    }

    export namespace MyDintero {
      /**
       * Terms and conditions accepted
       */
      export interface Terms {
        /**
         * id of the myDintero terms and conditions
         */
        id: string;

        /**
         * Url to the terms and conditions accepted by the customer
         */
        url: string;
      }
    }

    export interface Tokens {
      'payex.creditcard'?: Tokens.PayexCreditcard;
    }

    export namespace Tokens {
      export interface PayexCreditcard {}
    }
  }

  export interface Event {
    id?: string;

    created_at?: string;

    details?: Event.Details;

    name?:
      | 'INITIATED'
      | 'VISITED'
      | 'COMPLETED'
      | 'AUTHORIZED'
      | 'DECLINED'
      | 'PAY_LOCK_START'
      | 'PAY_LOCK_META'
      | 'PAY_LOCK_END'
      | 'PAY_FAILED'
      | 'ON_HOLD_CALLBACK_SENT'
      | 'AUTH_CALLBACK_SENT'
      | 'FAILED'
      | 'UNKNOWN'
      | 'PAYMENT_TOKEN_FLOW_START'
      | 'UPDATE_SESSION'
      | 'CANCELLED'
      | 'SET_BILLING_ADDRESS'
      | 'SET_DISCOUNT_CODES'
      | 'SET_SHIPPING_ADDRESS'
      | 'SET_SHIPPING_OPTION'
      | 'SET_GIFT_CARD'
      | 'PUSH_NOTIFICATION_SENT'
      | 'SECRET_CONFIRMATION_CODE_SENT'
      | 'SET_MY_DINTERO'
      | 'ADD_PAYMENT_INFORMATION';

    request_headers?: Event.RequestHeaders;

    request_id?: string;
  }

  export namespace Event {
    export interface Details {
      amount?: number;

      bambora?: Details.Bambora;

      'collector:installment:products'?: Array<Details.CollectorInstallmentProduct>;

      'collector:invoice_b2b:addresses'?: Array<Details.CollectorInvoiceB2bAddress>;

      error?: string;

      gift_card?: Details.GiftCard;

      klarna?: Details.Klarna;

      /**
       * Options for myDintero
       */
      my_dintero?: Details.MyDintero;

      organization_number?: string;

      'payex:payment:id'?: string;

      payment_product_type?: string;

      previous_express?: Details.PreviousExpress;

      previous_order?: Details.PreviousOrder;

      /**
       * Address
       */
      shipping_address?: Details.ShippingAddress;

      shipping_option?: Details.ShippingOption;

      updated_express?: Details.UpdatedExpress;

      updated_order?: Details.UpdatedOrder;
    }

    export namespace Details {
      export interface Bambora {
        session_token?: string;

        session_url?: string;

        wallet_session_id?: string;
      }

      /**
       * Collector payment product
       */
      export interface CollectorInstallmentProduct {
        /**
         * Id for the payment product
         */
        id: string;

        /**
         * The fee for a "Buy now – pay later" Payment product
         */
        campaign_fee: number;

        /**
         * Number of months
         */
        credit_time: number;

        /**
         * The amount to pay in the first invoice. Origantion fee is added to the first
         * invoice.
         */
        first_monthly_amount: number;

        /**
         * The amount to pay pr month
         */
        monthly_amount: number;

        /**
         * The notification fee for the payment product
         */
        notification_fee: number;

        /**
         * The startup fee for the payment product
         */
        origination_fee: number;

        /**
         * The total amount to pay
         */
        total_amount: number;

        type: 'interest_free' | 'annuity';

        /**
         * The interest rate for the payment product.
         */
        annual_interest_rate?: string;

        /**
         * The effective annual interest rate for the payment product
         */
        effective_annual_interest_rate?: string;
      }

      export interface CollectorInvoiceB2bAddress {
        /**
         * Gaustadalleen 21
         */
        address_line: string;

        /**
         * ACME Inc
         */
        business_name: string;

        /**
         * Country of the location
         */
        country: string;

        /**
         * The organization number of the customer. For Norway, the length is 9. For
         * Sweden, it's either 10 or 12 digits.
         */
        organization_number: string;

        /**
         * The zip code / postal code of the address.
         */
        postal_code: string;

        /**
         * The name of the postal code
         */
        postal_place: string;

        /**
         * The unique identification of the address from the available addresses for the
         * business
         */
        address_id?: string;
      }

      export interface GiftCard {
        card_amount?: number;

        card_id?: string;

        currency?: string;

        masked_card_token?: string;
      }

      export interface Klarna {
        client_token: string;

        session_id: string;
      }

      /**
       * Options for myDintero
       */
      export interface MyDintero {
        /**
         * Actions to perform on the customer
         */
        actions: Array<'create_user'>;

        /**
         * Terms and conditions accepted
         */
        terms: MyDintero.Terms;
      }

      export namespace MyDintero {
        /**
         * Terms and conditions accepted
         */
        export interface Terms {
          /**
           * id of the myDintero terms and conditions
           */
          id: string;

          /**
           * Url to the terms and conditions accepted by the customer
           */
          url: string;
        }
      }

      export interface PreviousExpress {
        /**
         * ### Present only for _Express Checkout_ sessions.
         *
         * An _Express Checkout_ session is a session where the end user will submit a
         * shipping address and then select a shipping option before the before a payment
         * method is selected and the payment is initiated.
         *
         * Endpoints used in the _Express Checkout_ flow.
         *
         * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
         * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
         */
        express?: PreviousExpress.Express;
      }

      export namespace PreviousExpress {
        /**
         * ### Present only for _Express Checkout_ sessions.
         *
         * An _Express Checkout_ session is a session where the end user will submit a
         * shipping address and then select a shipping option before the before a payment
         * method is selected and the payment is initiated.
         *
         * Endpoints used in the _Express Checkout_ flow.
         *
         * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
         * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
         */
        export interface Express {
          /**
           * Shipping options that will be presented to the end user after the end user has
           * submitted a shipping address.
           *
           * To dynamically update the shipping*options when the *`order.shipping_address`_
           * is changed by the end user in the checkout, use the
           * _`url.shipping_address_callback_url`\_.
           *
           * If the merchant is not able to ship the order to the end users shipping address,
           * use an empty array.
           *
           * If there is only one option, a free delivery, the order still has to contain one
           * option with a _`price.amount`_ of 0.
           */
          shipping_options: Array<Express.ShippingOption>;

          /**
           * Limit the lind of customers that can be submitted via the address form in the
           * express checkout.
           */
          customer_types?: Array<'b2c' | 'b2b'>;

          /**
           * Enable discount codes for Express Checkout
           */
          discount_codes?: Express.DiscountCodes;

          /**
           * URL that Checkout will POST to when the end user has submitted/changed a
           * shipping address for an express-session.
           *
           * Dintero will not attempt a retry after a failed delivery attempt. Following
           * situations is considered as failed delivery
           *
           * - HTTP status codes that are not 200.
           * - A request timeout (60 seconds)
           * - Any connection error such as connection timeout, bad certificate, etc
           *
           * The response from the callback will be used to update the shipping options.
           *
           * See
           * [POST example/shipping_address_callback_url](#operation/example_shipping_address_callback_url)
           * for details about the request and response.
           */
          shipping_address_callback_url?: string;

          shipping_mode?: 'shipping_required' | 'shipping_not_required';
        }

        export namespace Express {
          /**
           * A shipping option
           */
          export interface ShippingOption {
            /**
             * Id of this shipping option product.
             *
             * The express checkout will group all products with the same id. Used for grouping
             * delivery to the same address at different time slots, or for grouping deliveries
             * to different pick up points.
             */
            id: string;

            /**
             * The monetary amount of the shipping option, including VAT and discounts.
             *
             * In smallest unit for the currency, e.g. cents
             */
            amount: number;

            /**
             * Unique id of the specific configuration of this shipping product
             */
            line_id: string;

            /**
             * Name of company that provides shipping service
             */
            operator: string;

            /**
             * A shipping option title. Eg. "Standard"
             */
            title: string;

            /**
             * Countries where this shipping option can be used
             */
            countries?: Array<string>;

            delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

            /**
             * A short description of the shipping option product
             */
            description?: string;

            /**
             * Environmental data about the shipping option
             */
            environmental_data?: ShippingOption.EnvironmentalData;

            /**
             * Estimated time of arrival
             */
            eta?: ShippingOption.Eta;

            /**
             * Additional metadata about the shipping_option
             */
            metadata?: unknown;

            /**
             * The operators own id for this shipping product
             */
            operator_product_id?: string;

            pick_up_address?: ShippingOption.PickUpAddress;

            /**
             * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
             * the session. Recommended limitations for the image:
             *
             * - all images should preferrably have the same dimensions
             * - max file size should be less than 2MB
             */
            thumbnail_url?: string;

            /**
             * A specified time for delivery to customer
             */
            time_slot?: ShippingOption.TimeSlot;

            /**
             * The VAT percentage
             */
            vat?: number;

            /**
             * The VAT of the `amount` parameter. Only used for display purposes.
             */
            vat_amount?: number;
          }

          export namespace ShippingOption {
            /**
             * Environmental data about the shipping option
             */
            export interface EnvironmentalData {
              /**
               * A short description of the environmental data, something like
               *
               * - "Fossil free",
               * - "Carbon neutral"
               * - "Low emissions"
               * - "Renewable Energy Sourced"
               * - "Eco-certified Fleet"
               */
              description: string;

              details?: Array<EnvironmentalData.Detail>;
            }

            export namespace EnvironmentalData {
              export interface Detail {
                /**
                 * Give context to the value field. Example:
                 *
                 * - "CO2 emissions"
                 * - "Energy consumption"
                 * - "Carbon footprint"
                 * - "Carbon offset"
                 * - "Trees planted"
                 * - "Renewable energy percentage"
                 */
                label: string;

                value: string;
              }
            }

            /**
             * Estimated time of arrival
             */
            export interface Eta {
              ends_at?: string;

              starts_at?: string;
            }

            export interface PickUpAddress {
              /**
               * Gaustadalleen 21
               */
              address_line?: string;

              /**
               * PB 123
               */
              address_line_2?: string;

              /**
               * Name of the company
               */
              business_name?: string;

              co_address?: string;

              /**
               * Comment about the address
               */
              comment?: string;

              /**
               * For companies that needs to specify a cost center.
               */
              cost_center?: string;

              /**
               * Country of the location
               */
              country?: string;

              /**
               * The customer's reference
               */
              customer_reference?: string;

              /**
               * Distance in kilometers from the shipping_address.
               */
              distance?: number;

              /**
               * The email address of a person or an organization
               */
              email?: string;

              first_name?: string;

              last_name?: string;

              latitude?: number;

              longitude?: number;

              /**
               * The organization number of the customer.
               */
              organization_number?: string;

              /**
               * Type indicating what kind of organization it is.
               */
              organization_type?: string;

              /**
               * mobile number of a person / company, ITU/E.123 format with international prefix
               * (+PPNNNNNNNNN...)
               */
              phone_number?: string;

              /**
               * The zip code / postal code of the address.
               */
              postal_code?: string;

              /**
               * The name of the postal code
               */
              postal_place?: string;
            }

            /**
             * A specified time for delivery to customer
             */
            export interface TimeSlot {
              ends_at?: string;

              starts_at?: string;
            }
          }

          /**
           * Enable discount codes for Express Checkout
           */
          export interface DiscountCodes {
            /**
             * URL that Checkout will POST to when the user has submitted/changed the discount
             * codes for an express session.
             *
             * Dintero will not attempt a retry after a failed delivery attempt. Following
             * situations is considered as failed delivery
             *
             * - HTTP status codes that are not 200.
             * - A request timeout (60 seconds)
             * - Any connection error such as connection timeout, bad certificate, etc
             *
             * The response from the callback will be used to update the order amount, items
             * discount_lines and shipping options.
             *
             * See
             * [POST example/discount_codes_callback_url](#operation/example_discount_codes_callback_url)
             * for details about the request and response.
             */
            callback_url?: string;

            /**
             * Limit how many discount codes can be added by the customer
             */
            max_count?: number;
          }
        }
      }

      export interface PreviousOrder {
        /**
         * A reference by the merchant to identify the corresponding order for the Checkout
         * Session
         */
        merchant_reference: string;

        /**
         * The amount to authorize/capture including VAT and discounts. In smallest unit
         * for the currency, e.g. cents
         *
         * The `amount` should be equal to the sum of the `items.amount` +
         * `shipping_option.amount`.
         */
        amount?: number;

        /**
         * Address
         */
        billing_address?: PreviousOrder.BillingAddress;

        /**
         * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
         */
        currency?: string;

        discount_codes?: Array<string>;

        /**
         * Discounts given, additions to any items discount_lines.
         */
        discount_lines?: Array<PreviousOrder.DiscountLine>;

        /**
         * Details about the order items.
         *
         * #### Instabank
         *
         * `required` if Instabank payment is configured in and partial_payment is false.
         * All items must include a unique `line_id`, quantity and amount
         *
         * #### Collector Bank
         *
         * `required` if Collector Bank payment is configured in and partial_payment is
         * false. All items must include a unique `line_id`, quantity and amount
         */
        items?: Array<PreviousOrder.Item>;

        /**
         * A reference by the merchant to identify the corresponding order for the Checkout
         * Session
         */
        merchant_reference_2?: string;

        /**
         * This is a partial payment where the `order.amount` can be lower or equal to the
         * sum of `order.items.amount`
         */
        partial_payment?: boolean;

        /**
         * An id that identifies the seller, value will be included in the settlement
         * reports
         */
        payout_destination_id?: string;

        /**
         * Address
         */
        shipping_address?: PreviousOrder.ShippingAddress;

        shipping_option?: PreviousOrder.ShippingOption;

        store?: PreviousOrder.Store;

        /**
         * The VAT of the `amount` parameter. Only used for display purposes.
         *
         * In smallest unit for the currency, e.g. cents
         *
         * The `vat_amount` should be equal to the sum of the `items.vat_amount` +
         * `shipping_option.vat_amount`.
         */
        vat_amount?: number;
      }

      export namespace PreviousOrder {
        /**
         * Address
         */
        export interface BillingAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface DiscountLine {
          /**
           * Monetary amount in smallest unit for the currency
           */
          amount?: number;

          description?: string;

          discount_id?: string;

          discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

          line_id?: number;

          /**
           * Optional, set if the amount given was from a percentage discount
           */
          percentage?: number;
        }

        export interface Item {
          /**
           * The ID or SKU of the product on the line
           */
          id?: string;

          /**
           * The total monetary amount of the line item, including VAT and discounts.
           *
           * In smallest unit for the currency, e.g. cents
           */
          amount?: number;

          /**
           * A short, localized description of the line item
           */
          description?: string;

          discount_lines?: Array<Item.DiscountLine>;

          /**
           * The item is eligible for discount
           */
          eligible_for_discount?: boolean;

          /**
           * Details related to
           * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
           *
           * Some items require extra information to be provided when using Klarna as an
           * enabled payment option.
           */
          emd?: Item.Emd;

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          fee_split?: Item.FeeSplit;

          /**
           * The groups the product on the line belongs to
           */
          groups?: Array<Item.Group>;

          /**
           * Discount applied to amount
           */
          is_changed?: boolean;

          /**
           * the number of the line (or id), must be `unique` between all items. `required`
           * when Instabank payment is configured.
           */
          line_id?: string;

          /**
           * The quantity of the product in the item line.
           */
          quantity?: number;

          /**
           * An array of objects specifying how the amount should be split between sellers
           * when using Dintero Payout
           *
           * Specify an empty array if the splits will be provided during capture.
           * `auto_capture` cannot be enabled when splits are defined as empty array.
           */
          splits?: Array<Item.Split>;

          /**
           * URL to a thumbnail of the item. Will be displayed when redirecting to the
           * session.
           *
           * Recommended limitations for the image:
           *
           * - all images should preferrably have the same dimensions
           * - max file size should be less than 2MB
           */
          thumbnail_url?: string;

          /**
           * The type of order item this is.
           *
           * - **physical** - a physical item which must be delivered or handed over
           * - **digital** - a digital item which doesn't need shipping
           * - **service** - payment for services like maintenance performed in your home
           * - **gift_card** - usage of a gift card, where the amount is usually a negative
           *   number
           * - **shipping** - payment for shipping of the order
           * - **surcharge** - extra incurred costs, like taxes or necessary rounding
           */
          type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

          /**
           * The dimensional weight (also known as volumetric) value unit of one item.
           * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
           */
          unit_dimensional_weight?: number;

          /**
           * The volume of one item in m³ (cubic meters)
           */
          unit_volume?: number;

          /**
           * The volume of one item in kg (kilo grams)
           */
          unit_weight?: number;

          /**
           * The VAT percentage
           */
          vat?: number;

          /**
           * The VAT of the `amount` parameter. Only used for display purposes.
           *
           * In smallest unit for the currency, e.g. cents
           */
          vat_amount?: number;
        }

        export namespace Item {
          export interface DiscountLine {
            /**
             * Monetary amount in smallest unit for the currency
             */
            amount?: number;

            description?: string;

            discount_id?: string;

            discount_type?:
              | 'customer'
              | 'periodic'
              | 'manual'
              | 'loyalty'
              | 'total'
              | 'employee'
              | 'external';

            line_id?: number;

            /**
             * Optional, set if the amount given was from a percentage discount
             */
            percentage?: number;
          }

          /**
           * Details related to
           * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
           *
           * Some items require extra information to be provided when using Klarna as an
           * enabled payment option.
           */
          export interface Emd {
            /**
             * Only required if the item is related to an event or multiple events, like for
             * example tickets to a concert.
             *
             * If you are selling an event package as a single ticket or item that includes
             * multiple events, for example a festival, you need to provide information about
             * all the individual events that are part of the package.
             */
            event?: Array<Emd.Event>;

            /**
             * Only required if them item is related to a marketplace order.
             *
             * If that is the case, you need to provide information about both the seller and
             * the winner.
             */
            marketplace_order?: Emd.MarketplaceOrder;

            /**
             * Only required if the item is related to a subscription.
             *
             * If that is the case, you need to provide information about both the subscription
             * and the customer account.
             */
            subscription?: Emd.Subscription;

            /**
             * Only required if the item is part of a travel-related transaction.
             *
             * If that is the case, you need to provide information about the itinerary to be
             * booked.
             */
            travel?: Emd.Travel;
          }

          export namespace Emd {
            export interface Event {
              /**
               * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              end_time: string;

              /**
               * Name of the company arranging the event, e.g. "Happy Parties Ltd."
               */
              event_company: string;

              /**
               * Name of the event, e.g. "Fancy Singer"
               */
              event_name: string;

              /**
               * Category or type of venue, e.g. "Pop"
               */
              genre_of_event: string;

              /**
               * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              start_time: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * If tickets are digitally checked when entering the venue, e.g. true
               */
              access_controlled_venue?: boolean;

              /**
               * Name of the affiliate that originated the purchase.
               */
              affiliate_name?: string;

              arena_location?: Event.ArenaLocation;

              /**
               * Name of the venue, e.g. "Song Arena"
               */
              arena_name?: string;
            }

            export namespace Event {
              export interface ArenaLocation {
                /**
                 * City that the venue is located in, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
                 */
                country: string;

                /**
                 * Postal code for the venue location, e.g. "0185"
                 */
                postal_code?: string;

                /**
                 * Street address representing the venue location, e.g. "Sonja Henies plass 2"
                 */
                street_address?: string;
              }
            }

            /**
             * Only required if them item is related to a marketplace order.
             *
             * If that is the case, you need to provide information about both the seller and
             * the winner.
             */
            export interface MarketplaceOrder {
              /**
               * Details related to the seller involved in the marketplace order.
               */
              seller_info: MarketplaceOrder.SellerInfo;

              /**
               * Details related to the winner involved in the marketplace order.
               */
              winner_info: MarketplaceOrder.WinnerInfo;
            }

            export namespace MarketplaceOrder {
              /**
               * Details related to the seller involved in the marketplace order.
               */
              export interface SellerInfo {
                account_last_modified: SellerInfo.AccountLastModified;

                /**
                 * Date and time that the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Number of trades the sub-merchant did in the last 12 months, e.g. 23
                 */
                number_of_trades: number;

                /**
                 * Name of the category to which the specific good belongs to, according to the
                 * selling merchant's categorization, e.g. "Phones".
                 */
                product_category: string;

                /**
                 * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
                 * Ltd."
                 */
                sub_merchant_id: string;

                /**
                 * Name of the good purchased.
                 */
                product_name?: string;

                /**
                 * Current rating of the good purchased according to the marketplace's rating
                 * scale, e.g. 5
                 */
                seller_rating?: number;

                /**
                 * Details about the seller.
                 */
                unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

                /**
                 * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
                 */
                volume_of_trades?: number;
              }

              export namespace SellerInfo {
                export interface AccountLastModified {
                  /**
                   * Date and time that the (physical) address was last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  address: string;

                  /**
                   * Date and time that the email was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  email: string;

                  /**
                   * Date and time that the listing details were last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  listing: string;

                  /**
                   * Date and time that the login details were last changed (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  login: string;

                  /**
                   * Date and time that the password was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  password: string;
                }

                /**
                 * Details about the seller.
                 */
                export interface UniqueAccountIdentifierSeller {
                  /**
                   * Seller's email address, e.g. "seller@mail.com"
                   */
                  email?: string;

                  other?: string;

                  /**
                   * Seller's phone number, e.g. "97712123"
                   */
                  phone_number?: string;
                }
              }

              /**
               * Details related to the winner involved in the marketplace order.
               */
              export interface WinnerInfo {
                account_last_modified: WinnerInfo.AccountLastModified;

                /**
                 * Date and time that the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Number of trades the winner did in the last 12 months, e.g. 23
                 */
                number_of_trades: number;

                /**
                 * Details about the winner.
                 */
                unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

                /**
                 * Volumes of trades the winner did in the last 12 months, e.g. 230
                 */
                volume_of_trades?: number;
              }

              export namespace WinnerInfo {
                export interface AccountLastModified {
                  /**
                   * Date and time that the (physical) address was last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  address: string;

                  /**
                   * Date and time that the email was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  email: string;

                  /**
                   * Date and time that the listing details were last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  listing: string;

                  /**
                   * Date and time that the login details were last changed (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  login: string;

                  /**
                   * Date and time that the password was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  password: string;
                }

                /**
                 * Details about the winner.
                 */
                export interface UniqueAccountIdentifierWinner {
                  /**
                   * Winner's email address, e.g. "winner@mail.com"
                   */
                  email?: string;

                  other?: string;

                  /**
                   * Winner's phone number, e.g. "97712123"
                   */
                  phone_number?: string;
                }
              }
            }

            /**
             * Only required if the item is related to a subscription.
             *
             * If that is the case, you need to provide information about both the subscription
             * and the customer account.
             */
            export interface Subscription {
              /**
               * Information related to the customer that wants to purchase the subscription.
               */
              customer_account_info: Subscription.CustomerAccountInfo;

              /**
               * Details related to the subscription.
               */
              subscription: Subscription.Subscription;
            }

            export namespace Subscription {
              /**
               * Information related to the customer that wants to purchase the subscription.
               */
              export interface CustomerAccountInfo {
                /**
                 * The date and time the account was last modified (ISO 8601 format), e.g.
                 * "2023-10-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_last_modified: string;

                /**
                 * The date and time the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Unique name / number to identify the specific customer account. Max 24
                 * characters, e.g. "Adam Adamsson"
                 */
                unique_account_identifier: string;
              }

              /**
               * Details related to the subscription.
               */
              export interface Subscription {
                /**
                 * Whether the subscription will be auto renewed upon expiry, e.g. true
                 */
                auto_renewal_of_subscription: boolean;

                /**
                 * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC
                 */
                end_time: string;

                /**
                 * The start time of the subscription (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC
                 */
                start_time: string;

                /**
                 * Name of the product on subscription, e.g. "Contact lenses"
                 */
                subscription_name: string;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;
              }
            }

            /**
             * Only required if the item is part of a travel-related transaction.
             *
             * If that is the case, you need to provide information about the itinerary to be
             * booked.
             */
            export interface Travel {
              /**
               * Details about the reservation of airline tickets.
               */
              air_reservation_details?: Travel.AirReservationDetails;

              /**
               * Details about the reservation of bus tickets.
               */
              bus_reservation_details?: Travel.BusReservationDetails;

              /**
               * Details about the reservation of rental cars.
               */
              car_rental_reservation_details?: Travel.CarRentalReservationDetails;

              /**
               * Details about the reservation of ferry tickets.
               */
              ferry_reservation_details?: Travel.FerryReservationDetails;

              /**
               * Details about the reservation of hotel rooms.
               */
              hotel_reservation_details?: Travel.HotelReservationDetails;

              /**
               * Details about the reservation of train tickets.
               */
              train_reservation_details?: Travel.TrainReservationDetails;
            }

            export namespace Travel {
              /**
               * Details about the reservation of airline tickets.
               */
              export interface AirReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one flight from Oslo to Munich, and
                 * another flight from Munich to Dubai, you need to provide one itinerary object
                 * for each of these two flights, and so on.
                 */
                itinerary: Array<AirReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<AirReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<AirReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace AirReservationDetails {
                export interface Itinerary {
                  /**
                   * IATA Airport Code (three letters), e.g. "MUC"
                   */
                  arrival: string;

                  /**
                   * IATA Airline standard (two letters or digits), e.g. "LH"
                   */
                  carrier: string;

                  /**
                   * IATA Airport Code (three letters), e.g. "OSL"
                   */
                  departure: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * City the flight arrives in, e.g. "Munich"
                   */
                  arrival_city?: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * City the flight departs from, e.g. "Oslo"
                   */
                  departure_city?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the flight in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of bus tickets.
               */
              export interface BusReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one bus journey from Oslo to Munich,
                 * and another bus journey from Munich to Rome, you need to provide one itinerary
                 * object for each of these two bus journeys, and so on.
                 */
                itinerary: Array<BusReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<BusReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<BusReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace BusReservationDetails {
                export interface Itinerary {
                  /**
                   * City the bus arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Bus Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the bus departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the bus journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of rental cars.
               */
              export interface CarRentalReservationDetails {
                /**
                 * Driver data, one per driver.
                 */
                drivers: Array<CarRentalReservationDetails.Driver>;

                /**
                 * Car rental itinerary data, one per car rental.
                 *
                 * If you are selling a package that contains multiple car rentals, you need to
                 * provide itinerary data for each of the individual rentals.
                 */
                itinerary: Array<CarRentalReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<CarRentalReservationDetails.Insurance>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace CarRentalReservationDetails {
                export interface Driver {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }

                export interface Itinerary {
                  /**
                   * End time of the car rental reservation (ISO 8601 format), e.g.
                   * "2023-08-20T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  end_time: string;

                  /**
                   * Name of the car rental company, e.g. "Premium Cars Ltd."
                   */
                  rental_company: string;

                  /**
                   * Start time of the car rental reservation (ISO 8601 format), e.g.
                   * "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  start_time: string;

                  /**
                   * Price for the car rental reservation in smallest unit of local currency, e.g.
                   * 500000
                   */
                  car_price?: number;

                  /**
                   * Travel class, e.g. "Premium Cars Premium Class"
                   */
                  class?: string;

                  /**
                   * Driver IDs.
                   */
                  drivers_id?: Array<number>;

                  /**
                   * Details related to the drop off location.
                   */
                  drop_off_location?: Itinerary.DropOffLocation;

                  /**
                   * Details related to the pick up location.
                   */
                  pick_up_location?: Itinerary.PickUpLocation;
                }

                export namespace Itinerary {
                  /**
                   * Details related to the drop off location.
                   */
                  export interface DropOffLocation {
                    /**
                     * City where the car should be dropped off, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
                     * "NO"
                     */
                    country: string;

                    /**
                     * Postal code where the car should be dropped off, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }

                  /**
                   * Details related to the pick up location.
                   */
                  export interface PickUpLocation {
                    /**
                     * City where the car should be picked up, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
                     * "NO",
                     */
                    country: string;

                    /**
                     * Postal code where the car should be picked up, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }
              }

              /**
               * Details about the reservation of ferry tickets.
               */
              export interface FerryReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
                 * and another ferry journey from Kiel to Gothenburg, you need to provide one
                 * itinerary object for each of these two ferry journeys, and so on.
                 */
                itinerary: Array<FerryReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<FerryReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<FerryReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace FerryReservationDetails {
                export interface Itinerary {
                  /**
                   * City the ferry arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Ferry Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the ferry departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the ferry journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of hotel rooms.
               */
              export interface HotelReservationDetails {
                /**
                 * Hotel itinerary data, one per hotel stay.
                 *
                 * If you are selling a package that contains multiple hotel stays, you need to
                 * provide itinerary data for each of the individual stays.
                 */
                itinerary: Array<HotelReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<HotelReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<HotelReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace HotelReservationDetails {
                export interface Itinerary {
                  /**
                   * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  end_time: string;

                  /**
                   * Price for the hotel stay in smallest unit of local currency, e.g. 200000
                   */
                  hotel_price: number;

                  /**
                   * Number of rooms booked, e.g. 2
                   */
                  number_of_rooms: number;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id: Array<number>;

                  /**
                   * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  start_time: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Address details of the hotel.
                   */
                  address?: Itinerary.Address;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * Name of the hotel, e.g. "Premium Hotel"
                   */
                  hotel_name?: string;
                }

                export namespace Itinerary {
                  /**
                   * Address details of the hotel.
                   */
                  export interface Address {
                    /**
                     * City the hotel is located in, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
                     */
                    country: string;

                    /**
                     * Postal code of the hotel, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address of the hotel, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of train tickets.
               */
              export interface TrainReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one train journey from Oslo to Munich,
                 * and another train journey from Munich to Rome, you need to provide one itinerary
                 * object for each of these two train journeys, and so on.
                 */
                itinerary: Array<TrainReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<TrainReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<TrainReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace TrainReservationDetails {
                export interface Itinerary {
                  /**
                   * City the train arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Train Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the train departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id: Array<number>;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * Price for that specific segment of the train journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }
            }
          }

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          export interface FeeSplit {
            type: 'proportional';

            /**
             * Seller ids that will be debited for the payment fees All destinations must be
             * included in the list of splits
             */
            destinations?: Array<string>;
          }

          export interface Group {
            /**
             * Group ID
             */
            id: string;

            /**
             * Group name
             */
            name?: string;
          }

          export interface Split {
            /**
             * The split amount in smalles unit for the currency, e.g. cents.
             */
            amount: number;

            /**
             * An id that identifies the seller
             */
            payout_destination_id: string;
          }
        }

        /**
         * Address
         */
        export interface ShippingAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface ShippingOption {
          /**
           * Id of this shipping option product.
           *
           * The express checkout will group all products with the same id. Used for grouping
           * delivery to the same address at different time slots, or for grouping deliveries
           * to different pick up points.
           */
          id: string;

          /**
           * The monetary amount of the shipping option, including VAT and discounts.
           *
           * In smallest unit for the currency, e.g. cents
           */
          amount: number;

          /**
           * Unique id of the specific configuration of this shipping product
           */
          line_id: string;

          /**
           * Name of company that provides shipping service
           */
          operator: string;

          /**
           * A shipping option title. Eg. "Standard"
           */
          title: string;

          /**
           * Countries where this shipping option can be used
           */
          countries?: Array<string>;

          delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

          /**
           * A short description of the shipping option product
           */
          description?: string;

          /**
           * Environmental data about the shipping option
           */
          environmental_data?: ShippingOption.EnvironmentalData;

          /**
           * Estimated time of arrival
           */
          eta?: ShippingOption.Eta;

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          fee_split?: ShippingOption.FeeSplit;

          /**
           * Additional metadata about the shipping_option
           */
          metadata?: unknown;

          /**
           * The operators own id for this shipping product
           */
          operator_product_id?: string;

          pick_up_address?: ShippingOption.PickUpAddress;

          /**
           * An array of objects specifying how the amount should be split between sellers
           * when using Dintero Payout
           *
           * Specify an empty array if the splits will be provided during capture.
           * `auto_capture` cannot be enabled when splits are defined as empty array.
           */
          splits?: Array<ShippingOption.Split>;

          /**
           * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
           * the session. Recommended limitations for the image:
           *
           * - all images should preferrably have the same dimensions
           * - max file size should be less than 2MB
           */
          thumbnail_url?: string;

          /**
           * A specified time for delivery to customer
           */
          time_slot?: ShippingOption.TimeSlot;

          /**
           * The VAT percentage
           */
          vat?: number;

          /**
           * The VAT of the `amount` parameter. Only used for display purposes.
           */
          vat_amount?: number;
        }

        export namespace ShippingOption {
          /**
           * Environmental data about the shipping option
           */
          export interface EnvironmentalData {
            /**
             * A short description of the environmental data, something like
             *
             * - "Fossil free",
             * - "Carbon neutral"
             * - "Low emissions"
             * - "Renewable Energy Sourced"
             * - "Eco-certified Fleet"
             */
            description: string;

            details?: Array<EnvironmentalData.Detail>;
          }

          export namespace EnvironmentalData {
            export interface Detail {
              /**
               * Give context to the value field. Example:
               *
               * - "CO2 emissions"
               * - "Energy consumption"
               * - "Carbon footprint"
               * - "Carbon offset"
               * - "Trees planted"
               * - "Renewable energy percentage"
               */
              label: string;

              value: string;
            }
          }

          /**
           * Estimated time of arrival
           */
          export interface Eta {
            ends_at?: string;

            starts_at?: string;
          }

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          export interface FeeSplit {
            type: 'proportional';

            /**
             * Seller ids that will be debited for the payment fees All destinations must be
             * included in the list of splits
             */
            destinations?: Array<string>;
          }

          export interface PickUpAddress {
            /**
             * Gaustadalleen 21
             */
            address_line?: string;

            /**
             * PB 123
             */
            address_line_2?: string;

            /**
             * Name of the company
             */
            business_name?: string;

            co_address?: string;

            /**
             * Comment about the address
             */
            comment?: string;

            /**
             * For companies that needs to specify a cost center.
             */
            cost_center?: string;

            /**
             * Country of the location
             */
            country?: string;

            /**
             * The customer's reference
             */
            customer_reference?: string;

            /**
             * Distance in kilometers from the shipping_address.
             */
            distance?: number;

            /**
             * The email address of a person or an organization
             */
            email?: string;

            first_name?: string;

            last_name?: string;

            latitude?: number;

            longitude?: number;

            /**
             * The organization number of the customer.
             */
            organization_number?: string;

            /**
             * Type indicating what kind of organization it is.
             */
            organization_type?: string;

            /**
             * mobile number of a person / company, ITU/E.123 format with international prefix
             * (+PPNNNNNNNNN...)
             */
            phone_number?: string;

            /**
             * The zip code / postal code of the address.
             */
            postal_code?: string;

            /**
             * The name of the postal code
             */
            postal_place?: string;
          }

          export interface Split {
            /**
             * The split amount in smalles unit for the currency, e.g. cents.
             */
            amount: number;

            /**
             * An id that identifies the seller
             */
            payout_destination_id: string;
          }

          /**
           * A specified time for delivery to customer
           */
          export interface TimeSlot {
            ends_at?: string;

            starts_at?: string;
          }
        }

        export interface Store {
          id: string;

          address?: Store.Address;

          /**
           * Merchant number associated with the stores payment terminal
           */
          bax?: string;

          /**
           * Official name of the person or entity that owns the store.
           */
          business_name?: string;

          chain?: string;

          email?: string;

          gln?: string;

          /**
           * A four-digit Merchant Category Code (MCC) for the store
           * [ISO 18245:2003](https://www.iso.org/standard/33365.html)
           */
          mcc?: string;

          /**
           * name of the store, aka trade name of the store
           */
          name?: string;

          organization_number?: string;

          phone_number?: string;

          /**
           * Id to a specific point-of-sale (POS) terminal or workstation
           */
          terminal_id?: string;
        }

        export namespace Store {
          export interface Address {
            address_line: string;

            /**
             * ISO 3166-1 country code
             */
            country: string;

            postal_place: string;

            address_line_2?: string;

            postal_code?: string;
          }
        }
      }

      /**
       * Address
       */
      export interface ShippingAddress {
        /**
         * Gaustadalleen 21
         */
        address_line?: string;

        /**
         * PB 123
         */
        address_line_2?: string;

        /**
         * Name of the company
         */
        business_name?: string;

        co_address?: string;

        /**
         * Comment about the address
         */
        comment?: string;

        /**
         * For companies that needs to specify a cost center.
         */
        cost_center?: string;

        /**
         * Country of the location
         */
        country?: string;

        /**
         * The customer's reference
         */
        customer_reference?: string;

        /**
         * The email address of a person or an organization
         */
        email?: string;

        first_name?: string;

        last_name?: string;

        latitude?: number;

        longitude?: number;

        /**
         * The organization number of the customer.
         */
        organization_number?: string;

        /**
         * Type indicating what kind of organization it is.
         */
        organization_type?: string;

        /**
         * mobile number of a person / company, ITU/E.123 format with international prefix
         * (+PPNNNNNNNNN...)
         */
        phone_number?: string;

        /**
         * The zip code / postal code of the address.
         */
        postal_code?: string;

        /**
         * The name of the postal code
         */
        postal_place?: string;
      }

      export interface ShippingOption {
        /**
         * Id of this shipping option product.
         *
         * The express checkout will group all products with the same id. Used for grouping
         * delivery to the same address at different time slots, or for grouping deliveries
         * to different pick up points.
         */
        id: string;

        /**
         * The monetary amount of the shipping option, including VAT and discounts.
         *
         * In smallest unit for the currency, e.g. cents
         */
        amount: number;

        /**
         * Unique id of the specific configuration of this shipping product
         */
        line_id: string;

        /**
         * Name of company that provides shipping service
         */
        operator: string;

        /**
         * A shipping option title. Eg. "Standard"
         */
        title: string;

        /**
         * Countries where this shipping option can be used
         */
        countries?: Array<string>;

        delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

        /**
         * A short description of the shipping option product
         */
        description?: string;

        /**
         * Environmental data about the shipping option
         */
        environmental_data?: ShippingOption.EnvironmentalData;

        /**
         * Estimated time of arrival
         */
        eta?: ShippingOption.Eta;

        /**
         * Specify how fees are handled with splits. The default behaviour is to share the
         * fees proportional with all splits destinations
         */
        fee_split?: ShippingOption.FeeSplit;

        /**
         * Additional metadata about the shipping_option
         */
        metadata?: unknown;

        /**
         * The operators own id for this shipping product
         */
        operator_product_id?: string;

        pick_up_address?: ShippingOption.PickUpAddress;

        /**
         * An array of objects specifying how the amount should be split between sellers
         * when using Dintero Payout
         *
         * Specify an empty array if the splits will be provided during capture.
         * `auto_capture` cannot be enabled when splits are defined as empty array.
         */
        splits?: Array<ShippingOption.Split>;

        /**
         * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
         * the session. Recommended limitations for the image:
         *
         * - all images should preferrably have the same dimensions
         * - max file size should be less than 2MB
         */
        thumbnail_url?: string;

        /**
         * A specified time for delivery to customer
         */
        time_slot?: ShippingOption.TimeSlot;

        /**
         * The VAT percentage
         */
        vat?: number;

        /**
         * The VAT of the `amount` parameter. Only used for display purposes.
         */
        vat_amount?: number;
      }

      export namespace ShippingOption {
        /**
         * Environmental data about the shipping option
         */
        export interface EnvironmentalData {
          /**
           * A short description of the environmental data, something like
           *
           * - "Fossil free",
           * - "Carbon neutral"
           * - "Low emissions"
           * - "Renewable Energy Sourced"
           * - "Eco-certified Fleet"
           */
          description: string;

          details?: Array<EnvironmentalData.Detail>;
        }

        export namespace EnvironmentalData {
          export interface Detail {
            /**
             * Give context to the value field. Example:
             *
             * - "CO2 emissions"
             * - "Energy consumption"
             * - "Carbon footprint"
             * - "Carbon offset"
             * - "Trees planted"
             * - "Renewable energy percentage"
             */
            label: string;

            value: string;
          }
        }

        /**
         * Estimated time of arrival
         */
        export interface Eta {
          ends_at?: string;

          starts_at?: string;
        }

        /**
         * Specify how fees are handled with splits. The default behaviour is to share the
         * fees proportional with all splits destinations
         */
        export interface FeeSplit {
          type: 'proportional';

          /**
           * Seller ids that will be debited for the payment fees All destinations must be
           * included in the list of splits
           */
          destinations?: Array<string>;
        }

        export interface PickUpAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * Distance in kilometers from the shipping_address.
           */
          distance?: number;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface Split {
          /**
           * The split amount in smalles unit for the currency, e.g. cents.
           */
          amount: number;

          /**
           * An id that identifies the seller
           */
          payout_destination_id: string;
        }

        /**
         * A specified time for delivery to customer
         */
        export interface TimeSlot {
          ends_at?: string;

          starts_at?: string;
        }
      }

      export interface UpdatedExpress {
        /**
         * ### Present only for _Express Checkout_ sessions.
         *
         * An _Express Checkout_ session is a session where the end user will submit a
         * shipping address and then select a shipping option before the before a payment
         * method is selected and the payment is initiated.
         *
         * Endpoints used in the _Express Checkout_ flow.
         *
         * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
         * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
         */
        express?: UpdatedExpress.Express;
      }

      export namespace UpdatedExpress {
        /**
         * ### Present only for _Express Checkout_ sessions.
         *
         * An _Express Checkout_ session is a session where the end user will submit a
         * shipping address and then select a shipping option before the before a payment
         * method is selected and the payment is initiated.
         *
         * Endpoints used in the _Express Checkout_ flow.
         *
         * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
         * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
         */
        export interface Express {
          /**
           * Shipping options that will be presented to the end user after the end user has
           * submitted a shipping address.
           *
           * To dynamically update the shipping*options when the *`order.shipping_address`_
           * is changed by the end user in the checkout, use the
           * _`url.shipping_address_callback_url`\_.
           *
           * If the merchant is not able to ship the order to the end users shipping address,
           * use an empty array.
           *
           * If there is only one option, a free delivery, the order still has to contain one
           * option with a _`price.amount`_ of 0.
           */
          shipping_options: Array<Express.ShippingOption>;

          /**
           * Limit the lind of customers that can be submitted via the address form in the
           * express checkout.
           */
          customer_types?: Array<'b2c' | 'b2b'>;

          /**
           * Enable discount codes for Express Checkout
           */
          discount_codes?: Express.DiscountCodes;

          /**
           * URL that Checkout will POST to when the end user has submitted/changed a
           * shipping address for an express-session.
           *
           * Dintero will not attempt a retry after a failed delivery attempt. Following
           * situations is considered as failed delivery
           *
           * - HTTP status codes that are not 200.
           * - A request timeout (60 seconds)
           * - Any connection error such as connection timeout, bad certificate, etc
           *
           * The response from the callback will be used to update the shipping options.
           *
           * See
           * [POST example/shipping_address_callback_url](#operation/example_shipping_address_callback_url)
           * for details about the request and response.
           */
          shipping_address_callback_url?: string;

          shipping_mode?: 'shipping_required' | 'shipping_not_required';
        }

        export namespace Express {
          /**
           * A shipping option
           */
          export interface ShippingOption {
            /**
             * Id of this shipping option product.
             *
             * The express checkout will group all products with the same id. Used for grouping
             * delivery to the same address at different time slots, or for grouping deliveries
             * to different pick up points.
             */
            id: string;

            /**
             * The monetary amount of the shipping option, including VAT and discounts.
             *
             * In smallest unit for the currency, e.g. cents
             */
            amount: number;

            /**
             * Unique id of the specific configuration of this shipping product
             */
            line_id: string;

            /**
             * Name of company that provides shipping service
             */
            operator: string;

            /**
             * A shipping option title. Eg. "Standard"
             */
            title: string;

            /**
             * Countries where this shipping option can be used
             */
            countries?: Array<string>;

            delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

            /**
             * A short description of the shipping option product
             */
            description?: string;

            /**
             * Environmental data about the shipping option
             */
            environmental_data?: ShippingOption.EnvironmentalData;

            /**
             * Estimated time of arrival
             */
            eta?: ShippingOption.Eta;

            /**
             * Additional metadata about the shipping_option
             */
            metadata?: unknown;

            /**
             * The operators own id for this shipping product
             */
            operator_product_id?: string;

            pick_up_address?: ShippingOption.PickUpAddress;

            /**
             * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
             * the session. Recommended limitations for the image:
             *
             * - all images should preferrably have the same dimensions
             * - max file size should be less than 2MB
             */
            thumbnail_url?: string;

            /**
             * A specified time for delivery to customer
             */
            time_slot?: ShippingOption.TimeSlot;

            /**
             * The VAT percentage
             */
            vat?: number;

            /**
             * The VAT of the `amount` parameter. Only used for display purposes.
             */
            vat_amount?: number;
          }

          export namespace ShippingOption {
            /**
             * Environmental data about the shipping option
             */
            export interface EnvironmentalData {
              /**
               * A short description of the environmental data, something like
               *
               * - "Fossil free",
               * - "Carbon neutral"
               * - "Low emissions"
               * - "Renewable Energy Sourced"
               * - "Eco-certified Fleet"
               */
              description: string;

              details?: Array<EnvironmentalData.Detail>;
            }

            export namespace EnvironmentalData {
              export interface Detail {
                /**
                 * Give context to the value field. Example:
                 *
                 * - "CO2 emissions"
                 * - "Energy consumption"
                 * - "Carbon footprint"
                 * - "Carbon offset"
                 * - "Trees planted"
                 * - "Renewable energy percentage"
                 */
                label: string;

                value: string;
              }
            }

            /**
             * Estimated time of arrival
             */
            export interface Eta {
              ends_at?: string;

              starts_at?: string;
            }

            export interface PickUpAddress {
              /**
               * Gaustadalleen 21
               */
              address_line?: string;

              /**
               * PB 123
               */
              address_line_2?: string;

              /**
               * Name of the company
               */
              business_name?: string;

              co_address?: string;

              /**
               * Comment about the address
               */
              comment?: string;

              /**
               * For companies that needs to specify a cost center.
               */
              cost_center?: string;

              /**
               * Country of the location
               */
              country?: string;

              /**
               * The customer's reference
               */
              customer_reference?: string;

              /**
               * Distance in kilometers from the shipping_address.
               */
              distance?: number;

              /**
               * The email address of a person or an organization
               */
              email?: string;

              first_name?: string;

              last_name?: string;

              latitude?: number;

              longitude?: number;

              /**
               * The organization number of the customer.
               */
              organization_number?: string;

              /**
               * Type indicating what kind of organization it is.
               */
              organization_type?: string;

              /**
               * mobile number of a person / company, ITU/E.123 format with international prefix
               * (+PPNNNNNNNNN...)
               */
              phone_number?: string;

              /**
               * The zip code / postal code of the address.
               */
              postal_code?: string;

              /**
               * The name of the postal code
               */
              postal_place?: string;
            }

            /**
             * A specified time for delivery to customer
             */
            export interface TimeSlot {
              ends_at?: string;

              starts_at?: string;
            }
          }

          /**
           * Enable discount codes for Express Checkout
           */
          export interface DiscountCodes {
            /**
             * URL that Checkout will POST to when the user has submitted/changed the discount
             * codes for an express session.
             *
             * Dintero will not attempt a retry after a failed delivery attempt. Following
             * situations is considered as failed delivery
             *
             * - HTTP status codes that are not 200.
             * - A request timeout (60 seconds)
             * - Any connection error such as connection timeout, bad certificate, etc
             *
             * The response from the callback will be used to update the order amount, items
             * discount_lines and shipping options.
             *
             * See
             * [POST example/discount_codes_callback_url](#operation/example_discount_codes_callback_url)
             * for details about the request and response.
             */
            callback_url?: string;

            /**
             * Limit how many discount codes can be added by the customer
             */
            max_count?: number;
          }
        }
      }

      export interface UpdatedOrder {
        /**
         * A reference by the merchant to identify the corresponding order for the Checkout
         * Session
         */
        merchant_reference: string;

        /**
         * The amount to authorize/capture including VAT and discounts. In smallest unit
         * for the currency, e.g. cents
         *
         * The `amount` should be equal to the sum of the `items.amount` +
         * `shipping_option.amount`.
         */
        amount?: number;

        /**
         * Address
         */
        billing_address?: UpdatedOrder.BillingAddress;

        /**
         * The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
         */
        currency?: string;

        discount_codes?: Array<string>;

        /**
         * Discounts given, additions to any items discount_lines.
         */
        discount_lines?: Array<UpdatedOrder.DiscountLine>;

        /**
         * Details about the order items.
         *
         * #### Instabank
         *
         * `required` if Instabank payment is configured in and partial_payment is false.
         * All items must include a unique `line_id`, quantity and amount
         *
         * #### Collector Bank
         *
         * `required` if Collector Bank payment is configured in and partial_payment is
         * false. All items must include a unique `line_id`, quantity and amount
         */
        items?: Array<UpdatedOrder.Item>;

        /**
         * A reference by the merchant to identify the corresponding order for the Checkout
         * Session
         */
        merchant_reference_2?: string;

        /**
         * This is a partial payment where the `order.amount` can be lower or equal to the
         * sum of `order.items.amount`
         */
        partial_payment?: boolean;

        /**
         * An id that identifies the seller, value will be included in the settlement
         * reports
         */
        payout_destination_id?: string;

        /**
         * Address
         */
        shipping_address?: UpdatedOrder.ShippingAddress;

        shipping_option?: UpdatedOrder.ShippingOption;

        store?: UpdatedOrder.Store;

        /**
         * The VAT of the `amount` parameter. Only used for display purposes.
         *
         * In smallest unit for the currency, e.g. cents
         *
         * The `vat_amount` should be equal to the sum of the `items.vat_amount` +
         * `shipping_option.vat_amount`.
         */
        vat_amount?: number;
      }

      export namespace UpdatedOrder {
        /**
         * Address
         */
        export interface BillingAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface DiscountLine {
          /**
           * Monetary amount in smallest unit for the currency
           */
          amount?: number;

          description?: string;

          discount_id?: string;

          discount_type?: 'customer' | 'periodic' | 'manual' | 'loyalty' | 'total' | 'employee' | 'external';

          line_id?: number;

          /**
           * Optional, set if the amount given was from a percentage discount
           */
          percentage?: number;
        }

        export interface Item {
          /**
           * The ID or SKU of the product on the line
           */
          id?: string;

          /**
           * The total monetary amount of the line item, including VAT and discounts.
           *
           * In smallest unit for the currency, e.g. cents
           */
          amount?: number;

          /**
           * A short, localized description of the line item
           */
          description?: string;

          discount_lines?: Array<Item.DiscountLine>;

          /**
           * The item is eligible for discount
           */
          eligible_for_discount?: boolean;

          /**
           * Details related to
           * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
           *
           * Some items require extra information to be provided when using Klarna as an
           * enabled payment option.
           */
          emd?: Item.Emd;

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          fee_split?: Item.FeeSplit;

          /**
           * The groups the product on the line belongs to
           */
          groups?: Array<Item.Group>;

          /**
           * Discount applied to amount
           */
          is_changed?: boolean;

          /**
           * the number of the line (or id), must be `unique` between all items. `required`
           * when Instabank payment is configured.
           */
          line_id?: string;

          /**
           * The quantity of the product in the item line.
           */
          quantity?: number;

          /**
           * An array of objects specifying how the amount should be split between sellers
           * when using Dintero Payout
           *
           * Specify an empty array if the splits will be provided during capture.
           * `auto_capture` cannot be enabled when splits are defined as empty array.
           */
          splits?: Array<Item.Split>;

          /**
           * URL to a thumbnail of the item. Will be displayed when redirecting to the
           * session.
           *
           * Recommended limitations for the image:
           *
           * - all images should preferrably have the same dimensions
           * - max file size should be less than 2MB
           */
          thumbnail_url?: string;

          /**
           * The type of order item this is.
           *
           * - **physical** - a physical item which must be delivered or handed over
           * - **digital** - a digital item which doesn't need shipping
           * - **service** - payment for services like maintenance performed in your home
           * - **gift_card** - usage of a gift card, where the amount is usually a negative
           *   number
           * - **shipping** - payment for shipping of the order
           * - **surcharge** - extra incurred costs, like taxes or necessary rounding
           */
          type?: 'physical' | 'digital' | 'service' | 'gift_card' | 'shipping' | 'surcharge';

          /**
           * The dimensional weight (also known as volumetric) value unit of one item.
           * [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
           */
          unit_dimensional_weight?: number;

          /**
           * The volume of one item in m³ (cubic meters)
           */
          unit_volume?: number;

          /**
           * The volume of one item in kg (kilo grams)
           */
          unit_weight?: number;

          /**
           * The VAT percentage
           */
          vat?: number;

          /**
           * The VAT of the `amount` parameter. Only used for display purposes.
           *
           * In smallest unit for the currency, e.g. cents
           */
          vat_amount?: number;
        }

        export namespace Item {
          export interface DiscountLine {
            /**
             * Monetary amount in smallest unit for the currency
             */
            amount?: number;

            description?: string;

            discount_id?: string;

            discount_type?:
              | 'customer'
              | 'periodic'
              | 'manual'
              | 'loyalty'
              | 'total'
              | 'employee'
              | 'external';

            line_id?: number;

            /**
             * Optional, set if the amount given was from a percentage discount
             */
            percentage?: number;
          }

          /**
           * Details related to
           * [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
           *
           * Some items require extra information to be provided when using Klarna as an
           * enabled payment option.
           */
          export interface Emd {
            /**
             * Only required if the item is related to an event or multiple events, like for
             * example tickets to a concert.
             *
             * If you are selling an event package as a single ticket or item that includes
             * multiple events, for example a festival, you need to provide information about
             * all the individual events that are part of the package.
             */
            event?: Array<Emd.Event>;

            /**
             * Only required if them item is related to a marketplace order.
             *
             * If that is the case, you need to provide information about both the seller and
             * the winner.
             */
            marketplace_order?: Emd.MarketplaceOrder;

            /**
             * Only required if the item is related to a subscription.
             *
             * If that is the case, you need to provide information about both the subscription
             * and the customer account.
             */
            subscription?: Emd.Subscription;

            /**
             * Only required if the item is part of a travel-related transaction.
             *
             * If that is the case, you need to provide information about the itinerary to be
             * booked.
             */
            travel?: Emd.Travel;
          }

          export namespace Emd {
            export interface Event {
              /**
               * End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              end_time: string;

              /**
               * Name of the company arranging the event, e.g. "Happy Parties Ltd."
               */
              event_company: string;

              /**
               * Name of the event, e.g. "Fancy Singer"
               */
              event_name: string;

              /**
               * Category or type of venue, e.g. "Pop"
               */
              genre_of_event: string;

              /**
               * Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
               *
               * If a timezone is not specified we assume UTC.
               */
              start_time: string;

              ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

              /**
               * Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
               *
               * If email or phone, then use either the email address or the phone number
               * respectively.
               */
              ticket_delivery_recipient: string;

              /**
               * If tickets are digitally checked when entering the venue, e.g. true
               */
              access_controlled_venue?: boolean;

              /**
               * Name of the affiliate that originated the purchase.
               */
              affiliate_name?: string;

              arena_location?: Event.ArenaLocation;

              /**
               * Name of the venue, e.g. "Song Arena"
               */
              arena_name?: string;
            }

            export namespace Event {
              export interface ArenaLocation {
                /**
                 * City that the venue is located in, e.g. "Oslo"
                 */
                city: string;

                /**
                 * Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
                 */
                country: string;

                /**
                 * Postal code for the venue location, e.g. "0185"
                 */
                postal_code?: string;

                /**
                 * Street address representing the venue location, e.g. "Sonja Henies plass 2"
                 */
                street_address?: string;
              }
            }

            /**
             * Only required if them item is related to a marketplace order.
             *
             * If that is the case, you need to provide information about both the seller and
             * the winner.
             */
            export interface MarketplaceOrder {
              /**
               * Details related to the seller involved in the marketplace order.
               */
              seller_info: MarketplaceOrder.SellerInfo;

              /**
               * Details related to the winner involved in the marketplace order.
               */
              winner_info: MarketplaceOrder.WinnerInfo;
            }

            export namespace MarketplaceOrder {
              /**
               * Details related to the seller involved in the marketplace order.
               */
              export interface SellerInfo {
                account_last_modified: SellerInfo.AccountLastModified;

                /**
                 * Date and time that the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Number of trades the sub-merchant did in the last 12 months, e.g. 23
                 */
                number_of_trades: number;

                /**
                 * Name of the category to which the specific good belongs to, according to the
                 * selling merchant's categorization, e.g. "Phones".
                 */
                product_category: string;

                /**
                 * Name or unique number of the selling/delivering merchant, e.g. "Marketbrick
                 * Ltd."
                 */
                sub_merchant_id: string;

                /**
                 * Name of the good purchased.
                 */
                product_name?: string;

                /**
                 * Current rating of the good purchased according to the marketplace's rating
                 * scale, e.g. 5
                 */
                seller_rating?: number;

                /**
                 * Details about the seller.
                 */
                unique_account_identifier_seller?: SellerInfo.UniqueAccountIdentifierSeller;

                /**
                 * Volumes of trades the sub-merchant did in the last 12 months, e.g. 230
                 */
                volume_of_trades?: number;
              }

              export namespace SellerInfo {
                export interface AccountLastModified {
                  /**
                   * Date and time that the (physical) address was last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  address: string;

                  /**
                   * Date and time that the email was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  email: string;

                  /**
                   * Date and time that the listing details were last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  listing: string;

                  /**
                   * Date and time that the login details were last changed (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  login: string;

                  /**
                   * Date and time that the password was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  password: string;
                }

                /**
                 * Details about the seller.
                 */
                export interface UniqueAccountIdentifierSeller {
                  /**
                   * Seller's email address, e.g. "seller@mail.com"
                   */
                  email?: string;

                  other?: string;

                  /**
                   * Seller's phone number, e.g. "97712123"
                   */
                  phone_number?: string;
                }
              }

              /**
               * Details related to the winner involved in the marketplace order.
               */
              export interface WinnerInfo {
                account_last_modified: WinnerInfo.AccountLastModified;

                /**
                 * Date and time that the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Number of trades the winner did in the last 12 months, e.g. 23
                 */
                number_of_trades: number;

                /**
                 * Details about the winner.
                 */
                unique_account_identifier_winner?: WinnerInfo.UniqueAccountIdentifierWinner;

                /**
                 * Volumes of trades the winner did in the last 12 months, e.g. 230
                 */
                volume_of_trades?: number;
              }

              export namespace WinnerInfo {
                export interface AccountLastModified {
                  /**
                   * Date and time that the (physical) address was last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  address: string;

                  /**
                   * Date and time that the email was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  email: string;

                  /**
                   * Date and time that the listing details were last modified (ISO 8601 format),
                   * e.g. "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  listing: string;

                  /**
                   * Date and time that the login details were last changed (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  login: string;

                  /**
                   * Date and time that the password was last modified (ISO 8601 format), e.g.
                   * "2023-08-17T15:00:00Z".
                   *
                   * If a timezone is not specified we assume UTC.
                   */
                  password: string;
                }

                /**
                 * Details about the winner.
                 */
                export interface UniqueAccountIdentifierWinner {
                  /**
                   * Winner's email address, e.g. "winner@mail.com"
                   */
                  email?: string;

                  other?: string;

                  /**
                   * Winner's phone number, e.g. "97712123"
                   */
                  phone_number?: string;
                }
              }
            }

            /**
             * Only required if the item is related to a subscription.
             *
             * If that is the case, you need to provide information about both the subscription
             * and the customer account.
             */
            export interface Subscription {
              /**
               * Information related to the customer that wants to purchase the subscription.
               */
              customer_account_info: Subscription.CustomerAccountInfo;

              /**
               * Details related to the subscription.
               */
              subscription: Subscription.Subscription;
            }

            export namespace Subscription {
              /**
               * Information related to the customer that wants to purchase the subscription.
               */
              export interface CustomerAccountInfo {
                /**
                 * The date and time the account was last modified (ISO 8601 format), e.g.
                 * "2023-10-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_last_modified: string;

                /**
                 * The date and time the account was registered (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC.
                 */
                account_registration_date: string;

                /**
                 * Unique name / number to identify the specific customer account. Max 24
                 * characters, e.g. "Adam Adamsson"
                 */
                unique_account_identifier: string;
              }

              /**
               * Details related to the subscription.
               */
              export interface Subscription {
                /**
                 * Whether the subscription will be auto renewed upon expiry, e.g. true
                 */
                auto_renewal_of_subscription: boolean;

                /**
                 * The end time of the subscription (ISO 8601 format), e.g. "2023-09-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC
                 */
                end_time: string;

                /**
                 * The start time of the subscription (ISO 8601 format), e.g.
                 * "2023-08-16T15:00:00Z".
                 *
                 * If a timezone is not specified we assume UTC
                 */
                start_time: string;

                /**
                 * Name of the product on subscription, e.g. "Contact lenses"
                 */
                subscription_name: string;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;
              }
            }

            /**
             * Only required if the item is part of a travel-related transaction.
             *
             * If that is the case, you need to provide information about the itinerary to be
             * booked.
             */
            export interface Travel {
              /**
               * Details about the reservation of airline tickets.
               */
              air_reservation_details?: Travel.AirReservationDetails;

              /**
               * Details about the reservation of bus tickets.
               */
              bus_reservation_details?: Travel.BusReservationDetails;

              /**
               * Details about the reservation of rental cars.
               */
              car_rental_reservation_details?: Travel.CarRentalReservationDetails;

              /**
               * Details about the reservation of ferry tickets.
               */
              ferry_reservation_details?: Travel.FerryReservationDetails;

              /**
               * Details about the reservation of hotel rooms.
               */
              hotel_reservation_details?: Travel.HotelReservationDetails;

              /**
               * Details about the reservation of train tickets.
               */
              train_reservation_details?: Travel.TrainReservationDetails;
            }

            export namespace Travel {
              /**
               * Details about the reservation of airline tickets.
               */
              export interface AirReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one flight from Oslo to Munich, and
                 * another flight from Munich to Dubai, you need to provide one itinerary object
                 * for each of these two flights, and so on.
                 */
                itinerary: Array<AirReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<AirReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<AirReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace AirReservationDetails {
                export interface Itinerary {
                  /**
                   * IATA Airport Code (three letters), e.g. "MUC"
                   */
                  arrival: string;

                  /**
                   * IATA Airline standard (two letters or digits), e.g. "LH"
                   */
                  carrier: string;

                  /**
                   * IATA Airport Code (three letters), e.g. "OSL"
                   */
                  departure: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * City the flight arrives in, e.g. "Munich"
                   */
                  arrival_city?: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * City the flight departs from, e.g. "Oslo"
                   */
                  departure_city?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the flight in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of bus tickets.
               */
              export interface BusReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one bus journey from Oslo to Munich,
                 * and another bus journey from Munich to Rome, you need to provide one itinerary
                 * object for each of these two bus journeys, and so on.
                 */
                itinerary: Array<BusReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<BusReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<BusReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace BusReservationDetails {
                export interface Itinerary {
                  /**
                   * City the bus arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Bus Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the bus departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the bus journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of rental cars.
               */
              export interface CarRentalReservationDetails {
                /**
                 * Driver data, one per driver.
                 */
                drivers: Array<CarRentalReservationDetails.Driver>;

                /**
                 * Car rental itinerary data, one per car rental.
                 *
                 * If you are selling a package that contains multiple car rentals, you need to
                 * provide itinerary data for each of the individual rentals.
                 */
                itinerary: Array<CarRentalReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<CarRentalReservationDetails.Insurance>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace CarRentalReservationDetails {
                export interface Driver {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }

                export interface Itinerary {
                  /**
                   * End time of the car rental reservation (ISO 8601 format), e.g.
                   * "2023-08-20T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  end_time: string;

                  /**
                   * Name of the car rental company, e.g. "Premium Cars Ltd."
                   */
                  rental_company: string;

                  /**
                   * Start time of the car rental reservation (ISO 8601 format), e.g.
                   * "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  start_time: string;

                  /**
                   * Price for the car rental reservation in smallest unit of local currency, e.g.
                   * 500000
                   */
                  car_price?: number;

                  /**
                   * Travel class, e.g. "Premium Cars Premium Class"
                   */
                  class?: string;

                  /**
                   * Driver IDs.
                   */
                  drivers_id?: Array<number>;

                  /**
                   * Details related to the drop off location.
                   */
                  drop_off_location?: Itinerary.DropOffLocation;

                  /**
                   * Details related to the pick up location.
                   */
                  pick_up_location?: Itinerary.PickUpLocation;
                }

                export namespace Itinerary {
                  /**
                   * Details related to the drop off location.
                   */
                  export interface DropOffLocation {
                    /**
                     * City where the car should be dropped off, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g.
                     * "NO"
                     */
                    country: string;

                    /**
                     * Postal code where the car should be dropped off, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }

                  /**
                   * Details related to the pick up location.
                   */
                  export interface PickUpLocation {
                    /**
                     * City where the car should be picked up, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g.
                     * "NO",
                     */
                    country: string;

                    /**
                     * Postal code where the car should be picked up, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }
              }

              /**
               * Details about the reservation of ferry tickets.
               */
              export interface FerryReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
                 * and another ferry journey from Kiel to Gothenburg, you need to provide one
                 * itinerary object for each of these two ferry journeys, and so on.
                 */
                itinerary: Array<FerryReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<FerryReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<FerryReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace FerryReservationDetails {
                export interface Itinerary {
                  /**
                   * City the ferry arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Ferry Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the ferry departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id?: Array<number>;

                  /**
                   * Price for that specific segment of the ferry journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of hotel rooms.
               */
              export interface HotelReservationDetails {
                /**
                 * Hotel itinerary data, one per hotel stay.
                 *
                 * If you are selling a package that contains multiple hotel stays, you need to
                 * provide itinerary data for each of the individual stays.
                 */
                itinerary: Array<HotelReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<HotelReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<HotelReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace HotelReservationDetails {
                export interface Itinerary {
                  /**
                   * End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  end_time: string;

                  /**
                   * Price for the hotel stay in smallest unit of local currency, e.g. 200000
                   */
                  hotel_price: number;

                  /**
                   * Number of rooms booked, e.g. 2
                   */
                  number_of_rooms: number;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id: Array<number>;

                  /**
                   * Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  start_time: string;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Address details of the hotel.
                   */
                  address?: Itinerary.Address;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * Name of the hotel, e.g. "Premium Hotel"
                   */
                  hotel_name?: string;
                }

                export namespace Itinerary {
                  /**
                   * Address details of the hotel.
                   */
                  export interface Address {
                    /**
                     * City the hotel is located in, e.g. "Oslo"
                     */
                    city: string;

                    /**
                     * Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
                     */
                    country: string;

                    /**
                     * Postal code of the hotel, e.g. "0159"
                     */
                    postal_code?: string;

                    /**
                     * Street address of the hotel, e.g. "Karl Johans gt. 31"
                     */
                    street_address?: string;
                  }
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }

              /**
               * Details about the reservation of train tickets.
               */
              export interface TrainReservationDetails {
                /**
                 * Itinerary data, one per segment.
                 *
                 * If you are selling a ticket that contains one train journey from Oslo to Munich,
                 * and another train journey from Munich to Rome, you need to provide one itinerary
                 * object for each of these two train journeys, and so on.
                 */
                itinerary: Array<TrainReservationDetails.Itinerary>;

                /**
                 * Name of the affiliate that originated the purchase.
                 */
                affiliate_name?: string;

                /**
                 * Insurance data, one per segment
                 */
                insurance?: Array<TrainReservationDetails.Insurance>;

                /**
                 * Passenger data, one per passenger.
                 */
                passengers?: Array<TrainReservationDetails.Passenger>;

                /**
                 * Trip booking number, e.g. "VH67899"
                 */
                pnr?: string;
              }

              export namespace TrainReservationDetails {
                export interface Itinerary {
                  /**
                   * City the train arrives in, e.g. "Munich"
                   */
                  arrival_city: string;

                  /**
                   * Name of transportation company. "Big Train Travels Ltd."
                   */
                  carrier: string;

                  /**
                   * City the train departs from, e.g. "Oslo"
                   */
                  departure_city: string;

                  /**
                   * Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                   *
                   * If a timezone is not specified, we assume UTC.
                   */
                  departure_date: string;

                  /**
                   * IDs of all the passengers included in this itinerary.
                   */
                  passenger_id: Array<number>;

                  ticket_delivery_method: 'pick_up' | 'email' | 'post' | 'phone';

                  /**
                   * Name of the recipient the ticket is delivered to, e.g. "Maximilian".
                   *
                   * If email or phone, then use either the email address or the phone number
                   * respectively.
                   */
                  ticket_delivery_recipient: string;

                  /**
                   * Travel class, e.g. "First Class"
                   */
                  class?: string;

                  /**
                   * Price for that specific segment of the train journey in smallest unit of local
                   * currency, e.g. 200000
                   */
                  segment_price?: number;
                }

                export interface Insurance {
                  /**
                   * Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
                   */
                  insurance_company?: string;

                  /**
                   * Price of the insurance in smallest unit of local currency, e.g. 50000
                   */
                  insurance_price?: number;

                  /**
                   * Type of insurance, e.g. "travel"
                   */
                  insurance_type?: 'cancellation' | 'travel' | 'cancellation_travel' | 'bankruptcy';
                }

                export interface Passenger {
                  /**
                   * First name of the passenger, e.g. "Paul"
                   */
                  first_name: string;

                  /**
                   * Last name of the passenger, e.g. "Lamb"
                   */
                  last_name: string;

                  /**
                   * Passenger id, e.g. 1
                   */
                  id?: number;

                  /**
                   * Passenger title, e.g. "mr".
                   *
                   * Blank if under 12 years.
                   */
                  title?: 'mr' | 'mrs' | 'ms' | '';
                }
              }
            }
          }

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          export interface FeeSplit {
            type: 'proportional';

            /**
             * Seller ids that will be debited for the payment fees All destinations must be
             * included in the list of splits
             */
            destinations?: Array<string>;
          }

          export interface Group {
            /**
             * Group ID
             */
            id: string;

            /**
             * Group name
             */
            name?: string;
          }

          export interface Split {
            /**
             * The split amount in smalles unit for the currency, e.g. cents.
             */
            amount: number;

            /**
             * An id that identifies the seller
             */
            payout_destination_id: string;
          }
        }

        /**
         * Address
         */
        export interface ShippingAddress {
          /**
           * Gaustadalleen 21
           */
          address_line?: string;

          /**
           * PB 123
           */
          address_line_2?: string;

          /**
           * Name of the company
           */
          business_name?: string;

          co_address?: string;

          /**
           * Comment about the address
           */
          comment?: string;

          /**
           * For companies that needs to specify a cost center.
           */
          cost_center?: string;

          /**
           * Country of the location
           */
          country?: string;

          /**
           * The customer's reference
           */
          customer_reference?: string;

          /**
           * The email address of a person or an organization
           */
          email?: string;

          first_name?: string;

          last_name?: string;

          latitude?: number;

          longitude?: number;

          /**
           * The organization number of the customer.
           */
          organization_number?: string;

          /**
           * Type indicating what kind of organization it is.
           */
          organization_type?: string;

          /**
           * mobile number of a person / company, ITU/E.123 format with international prefix
           * (+PPNNNNNNNNN...)
           */
          phone_number?: string;

          /**
           * The zip code / postal code of the address.
           */
          postal_code?: string;

          /**
           * The name of the postal code
           */
          postal_place?: string;
        }

        export interface ShippingOption {
          /**
           * Id of this shipping option product.
           *
           * The express checkout will group all products with the same id. Used for grouping
           * delivery to the same address at different time slots, or for grouping deliveries
           * to different pick up points.
           */
          id: string;

          /**
           * The monetary amount of the shipping option, including VAT and discounts.
           *
           * In smallest unit for the currency, e.g. cents
           */
          amount: number;

          /**
           * Unique id of the specific configuration of this shipping product
           */
          line_id: string;

          /**
           * Name of company that provides shipping service
           */
          operator: string;

          /**
           * A shipping option title. Eg. "Standard"
           */
          title: string;

          /**
           * Countries where this shipping option can be used
           */
          countries?: Array<string>;

          delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

          /**
           * A short description of the shipping option product
           */
          description?: string;

          /**
           * Environmental data about the shipping option
           */
          environmental_data?: ShippingOption.EnvironmentalData;

          /**
           * Estimated time of arrival
           */
          eta?: ShippingOption.Eta;

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          fee_split?: ShippingOption.FeeSplit;

          /**
           * Additional metadata about the shipping_option
           */
          metadata?: unknown;

          /**
           * The operators own id for this shipping product
           */
          operator_product_id?: string;

          pick_up_address?: ShippingOption.PickUpAddress;

          /**
           * An array of objects specifying how the amount should be split between sellers
           * when using Dintero Payout
           *
           * Specify an empty array if the splits will be provided during capture.
           * `auto_capture` cannot be enabled when splits are defined as empty array.
           */
          splits?: Array<ShippingOption.Split>;

          /**
           * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
           * the session. Recommended limitations for the image:
           *
           * - all images should preferrably have the same dimensions
           * - max file size should be less than 2MB
           */
          thumbnail_url?: string;

          /**
           * A specified time for delivery to customer
           */
          time_slot?: ShippingOption.TimeSlot;

          /**
           * The VAT percentage
           */
          vat?: number;

          /**
           * The VAT of the `amount` parameter. Only used for display purposes.
           */
          vat_amount?: number;
        }

        export namespace ShippingOption {
          /**
           * Environmental data about the shipping option
           */
          export interface EnvironmentalData {
            /**
             * A short description of the environmental data, something like
             *
             * - "Fossil free",
             * - "Carbon neutral"
             * - "Low emissions"
             * - "Renewable Energy Sourced"
             * - "Eco-certified Fleet"
             */
            description: string;

            details?: Array<EnvironmentalData.Detail>;
          }

          export namespace EnvironmentalData {
            export interface Detail {
              /**
               * Give context to the value field. Example:
               *
               * - "CO2 emissions"
               * - "Energy consumption"
               * - "Carbon footprint"
               * - "Carbon offset"
               * - "Trees planted"
               * - "Renewable energy percentage"
               */
              label: string;

              value: string;
            }
          }

          /**
           * Estimated time of arrival
           */
          export interface Eta {
            ends_at?: string;

            starts_at?: string;
          }

          /**
           * Specify how fees are handled with splits. The default behaviour is to share the
           * fees proportional with all splits destinations
           */
          export interface FeeSplit {
            type: 'proportional';

            /**
             * Seller ids that will be debited for the payment fees All destinations must be
             * included in the list of splits
             */
            destinations?: Array<string>;
          }

          export interface PickUpAddress {
            /**
             * Gaustadalleen 21
             */
            address_line?: string;

            /**
             * PB 123
             */
            address_line_2?: string;

            /**
             * Name of the company
             */
            business_name?: string;

            co_address?: string;

            /**
             * Comment about the address
             */
            comment?: string;

            /**
             * For companies that needs to specify a cost center.
             */
            cost_center?: string;

            /**
             * Country of the location
             */
            country?: string;

            /**
             * The customer's reference
             */
            customer_reference?: string;

            /**
             * Distance in kilometers from the shipping_address.
             */
            distance?: number;

            /**
             * The email address of a person or an organization
             */
            email?: string;

            first_name?: string;

            last_name?: string;

            latitude?: number;

            longitude?: number;

            /**
             * The organization number of the customer.
             */
            organization_number?: string;

            /**
             * Type indicating what kind of organization it is.
             */
            organization_type?: string;

            /**
             * mobile number of a person / company, ITU/E.123 format with international prefix
             * (+PPNNNNNNNNN...)
             */
            phone_number?: string;

            /**
             * The zip code / postal code of the address.
             */
            postal_code?: string;

            /**
             * The name of the postal code
             */
            postal_place?: string;
          }

          export interface Split {
            /**
             * The split amount in smalles unit for the currency, e.g. cents.
             */
            amount: number;

            /**
             * An id that identifies the seller
             */
            payout_destination_id: string;
          }

          /**
           * A specified time for delivery to customer
           */
          export interface TimeSlot {
            ends_at?: string;

            starts_at?: string;
          }
        }

        export interface Store {
          id: string;

          address?: Store.Address;

          /**
           * Merchant number associated with the stores payment terminal
           */
          bax?: string;

          /**
           * Official name of the person or entity that owns the store.
           */
          business_name?: string;

          chain?: string;

          email?: string;

          gln?: string;

          /**
           * A four-digit Merchant Category Code (MCC) for the store
           * [ISO 18245:2003](https://www.iso.org/standard/33365.html)
           */
          mcc?: string;

          /**
           * name of the store, aka trade name of the store
           */
          name?: string;

          organization_number?: string;

          phone_number?: string;

          /**
           * Id to a specific point-of-sale (POS) terminal or workstation
           */
          terminal_id?: string;
        }

        export namespace Store {
          export interface Address {
            address_line: string;

            /**
             * ISO 3166-1 country code
             */
            country: string;

            postal_place: string;

            address_line_2?: string;

            postal_code?: string;
          }
        }
      }
    }

    export interface RequestHeaders {
      /**
       * The instance of the checkout that performed the request
       */
      'dintero-checkout-instance-id'?: string;

      /**
       * The name of the ecommerce solution
       */
      'dintero-system-name'?: string;

      /**
       * The name of the ecommerce plugin
       */
      'dintero-system-plugin-name'?: string;

      /**
       * The version number of the ecommerce plugin
       */
      'dintero-system-plugin-version'?: string;

      /**
       * The version number of the ecommerce solution
       */
      'dintero-system-version'?: string;

      /**
       * The user-agent that performed the request
       */
      'user-agent'?: string;
    }
  }

  /**
   * ### Present only for _Express Checkout_ sessions.
   *
   * An _Express Checkout_ session is a session where the end user will submit a
   * shipping address and then select a shipping option before the before a payment
   * method is selected and the payment is initiated.
   *
   * Endpoints used in the _Express Checkout_ flow.
   *
   * 1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
   * 2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
   */
  export interface Express {
    /**
     * Shipping options that will be presented to the end user after the end user has
     * submitted a shipping address.
     *
     * To dynamically update the shipping*options when the *`order.shipping_address`_
     * is changed by the end user in the checkout, use the
     * _`url.shipping_address_callback_url`\_.
     *
     * If the merchant is not able to ship the order to the end users shipping address,
     * use an empty array.
     *
     * If there is only one option, a free delivery, the order still has to contain one
     * option with a _`price.amount`_ of 0.
     */
    shipping_options: Array<Express.ShippingOption>;

    /**
     * Limit the lind of customers that can be submitted via the address form in the
     * express checkout.
     */
    customer_types?: Array<'b2c' | 'b2b'>;

    /**
     * Enable discount codes for Express Checkout
     */
    discount_codes?: Express.DiscountCodes;

    /**
     * URL that Checkout will POST to when the end user has submitted/changed a
     * shipping address for an express-session.
     *
     * Dintero will not attempt a retry after a failed delivery attempt. Following
     * situations is considered as failed delivery
     *
     * - HTTP status codes that are not 200.
     * - A request timeout (60 seconds)
     * - Any connection error such as connection timeout, bad certificate, etc
     *
     * The response from the callback will be used to update the shipping options.
     *
     * See
     * [POST example/shipping_address_callback_url](#operation/example_shipping_address_callback_url)
     * for details about the request and response.
     */
    shipping_address_callback_url?: string;

    shipping_mode?: 'shipping_required' | 'shipping_not_required';
  }

  export namespace Express {
    /**
     * A shipping option
     */
    export interface ShippingOption {
      /**
       * Id of this shipping option product.
       *
       * The express checkout will group all products with the same id. Used for grouping
       * delivery to the same address at different time slots, or for grouping deliveries
       * to different pick up points.
       */
      id: string;

      /**
       * The monetary amount of the shipping option, including VAT and discounts.
       *
       * In smallest unit for the currency, e.g. cents
       */
      amount: number;

      /**
       * Unique id of the specific configuration of this shipping product
       */
      line_id: string;

      /**
       * Name of company that provides shipping service
       */
      operator: string;

      /**
       * A shipping option title. Eg. "Standard"
       */
      title: string;

      /**
       * Countries where this shipping option can be used
       */
      countries?: Array<string>;

      delivery_method?: 'delivery' | 'pick_up' | 'unspecified' | 'none';

      /**
       * A short description of the shipping option product
       */
      description?: string;

      /**
       * Environmental data about the shipping option
       */
      environmental_data?: ShippingOption.EnvironmentalData;

      /**
       * Estimated time of arrival
       */
      eta?: ShippingOption.Eta;

      /**
       * Additional metadata about the shipping_option
       */
      metadata?: unknown;

      /**
       * The operators own id for this shipping product
       */
      operator_product_id?: string;

      pick_up_address?: ShippingOption.PickUpAddress;

      /**
       * URL to a thumbnail of the shipping option. Will be displayed when redirecting to
       * the session. Recommended limitations for the image:
       *
       * - all images should preferrably have the same dimensions
       * - max file size should be less than 2MB
       */
      thumbnail_url?: string;

      /**
       * A specified time for delivery to customer
       */
      time_slot?: ShippingOption.TimeSlot;

      /**
       * The VAT percentage
       */
      vat?: number;

      /**
       * The VAT of the `amount` parameter. Only used for display purposes.
       */
      vat_amount?: number;
    }

    export namespace ShippingOption {
      /**
       * Environmental data about the shipping option
       */
      export interface EnvironmentalData {
        /**
         * A short description of the environmental data, something like
         *
         * - "Fossil free",
         * - "Carbon neutral"
         * - "Low emissions"
         * - "Renewable Energy Sourced"
         * - "Eco-certified Fleet"
         */
        description: string;

        details?: Array<EnvironmentalData.Detail>;
      }

      export namespace EnvironmentalData {
        export interface Detail {
          /**
           * Give context to the value field. Example:
           *
           * - "CO2 emissions"
           * - "Energy consumption"
           * - "Carbon footprint"
           * - "Carbon offset"
           * - "Trees planted"
           * - "Renewable energy percentage"
           */
          label: string;

          value: string;
        }
      }

      /**
       * Estimated time of arrival
       */
      export interface Eta {
        ends_at?: string;

        starts_at?: string;
      }

      export interface PickUpAddress {
        /**
         * Gaustadalleen 21
         */
        address_line?: string;

        /**
         * PB 123
         */
        address_line_2?: string;

        /**
         * Name of the company
         */
        business_name?: string;

        co_address?: string;

        /**
         * Comment about the address
         */
        comment?: string;

        /**
         * For companies that needs to specify a cost center.
         */
        cost_center?: string;

        /**
         * Country of the location
         */
        country?: string;

        /**
         * The customer's reference
         */
        customer_reference?: string;

        /**
         * Distance in kilometers from the shipping_address.
         */
        distance?: number;

        /**
         * The email address of a person or an organization
         */
        email?: string;

        first_name?: string;

        last_name?: string;

        latitude?: number;

        longitude?: number;

        /**
         * The organization number of the customer.
         */
        organization_number?: string;

        /**
         * Type indicating what kind of organization it is.
         */
        organization_type?: string;

        /**
         * mobile number of a person / company, ITU/E.123 format with international prefix
         * (+PPNNNNNNNNN...)
         */
        phone_number?: string;

        /**
         * The zip code / postal code of the address.
         */
        postal_code?: string;

        /**
         * The name of the postal code
         */
        postal_place?: string;
      }

      /**
       * A specified time for delivery to customer
       */
      export interface TimeSlot {
        ends_at?: string;

        starts_at?: string;
      }
    }

    /**
     * Enable discount codes for Express Checkout
     */
    export interface DiscountCodes {
      /**
       * URL that Checkout will POST to when the user has submitted/changed the discount
       * codes for an express session.
       *
       * Dintero will not attempt a retry after a failed delivery attempt. Following
       * situations is considered as failed delivery
       *
       * - HTTP status codes that are not 200.
       * - A request timeout (60 seconds)
       * - Any connection error such as connection timeout, bad certificate, etc
       *
       * The response from the callback will be used to update the order amount, items
       * discount_lines and shipping options.
       *
       * See
       * [POST example/discount_codes_callback_url](#operation/example_discount_codes_callback_url)
       * for details about the request and response.
       */
      callback_url?: string;

      /**
       * Limit how many discount codes can be added by the customer
       */
      max_count?: number;
    }
  }

  export interface InitiatingSystemRequestHeaders {
    /**
     * The name of the ecommerce solution
     */
    'dintero-system-name'?: string;

    /**
     * The name of the ecommerce plugin
     */
    'dintero-system-plugin-name'?: string;

    /**
     * The version number of the ecommerce plugin
     */
    'dintero-system-plugin-version'?: string;

    /**
     * The version number of the ecommerce solution
     */
    'dintero-system-version'?: string;

    /**
     * The user-agent that performed the request
     */
    'user-agent'?: string;
  }

  /**
   * metadata about the session
   */
  export interface Metadata {
    /**
     * Profile Id used when session was created
     */
    'session:profile_id'?: string;
  }
}

Examples.SessionURLCallback = SessionURLCallback;

export declare namespace Examples {
  export {
    type DiscountCodesOrderUpdate as DiscountCodesOrderUpdate,
    type ShippingAddressCallbackSessionOrderUpdate as ShippingAddressCallbackSessionOrderUpdate,
    type ExampleDiscountCodeCallbackURLResponse as ExampleDiscountCodeCallbackURLResponse,
    type ExampleShippingAddressCallbackURLResponse as ExampleShippingAddressCallbackURLResponse,
    type ExampleDiscountCodeCallbackURLParams as ExampleDiscountCodeCallbackURLParams,
    type ExampleShippingAddressCallbackURLParams as ExampleShippingAddressCallbackURLParams,
  };

  export {
    SessionURLCallback as SessionURLCallback,
    type SessionURLCallbackCreateResponse as SessionURLCallbackCreateResponse,
    type SessionURLCallbackRetrieveResponse as SessionURLCallbackRetrieveResponse,
    type SessionURLCallbackCreateParams as SessionURLCallbackCreateParams,
    type SessionURLCallbackRetrieveParams as SessionURLCallbackRetrieveParams,
  };
}
