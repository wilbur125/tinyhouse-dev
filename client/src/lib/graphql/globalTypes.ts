import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Booking = {
  __typename?: 'Booking';
  checkIn: Scalars['String'];
  checkOut: Scalars['String'];
  id: Scalars['ID'];
  listing: Listing;
  tenant: User;
};

export type Bookings = {
  __typename?: 'Bookings';
  result: Array<Booking>;
  total: Scalars['Int'];
};

export type ConnectStripeInput = {
  code: Scalars['String'];
};

export type CreateBookingInput = {
  checkIn: Scalars['String'];
  checkOut: Scalars['String'];
  id: Scalars['ID'];
  source: Scalars['String'];
};

export type HostListingInput = {
  address: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  numOfGuests: Scalars['Int'];
  price: Scalars['Int'];
  title: Scalars['String'];
  type: ListingType;
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String'];
  admin: Scalars['String'];
  bookings: Maybe<Bookings>;
  bookingsIndex: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  host: User;
  id: Scalars['ID'];
  image: Scalars['String'];
  numOfGuests: Scalars['Int'];
  price: Scalars['Int'];
  title: Scalars['String'];
  type: ListingType;
};


export type ListingBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

export type Listings = {
  __typename?: 'Listings';
  region: Maybe<Scalars['String']>;
  result: Array<Listing>;
  total: Scalars['Int'];
};

export enum ListingsFilter {
  PriceHighToLow = 'PRICE_HIGH_TO_LOW',
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH'
}

export type LogInInput = {
  code: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  connectStripe: Viewer;
  createBooking: Booking;
  disconnectStripe: Viewer;
  hostListing: Listing;
  logIn: Viewer;
  logOut: Viewer;
};


export type MutationConnectStripeArgs = {
  input: ConnectStripeInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationHostListingArgs = {
  input: HostListingInput;
};


export type MutationLogInArgs = {
  input: InputMaybe<LogInInput>;
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String'];
  listing: Listing;
  listings: Listings;
  user: User;
};


export type QueryListingArgs = {
  id: Scalars['ID'];
};


export type QueryListingsArgs = {
  filter: ListingsFilter;
  limit: Scalars['Int'];
  location: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  bookings: Maybe<Bookings>;
  contact: Scalars['String'];
  hasWallet: Scalars['Boolean'];
  id: Scalars['ID'];
  income: Maybe<Scalars['Int']>;
  listings: Listings;
  name: Scalars['String'];
};


export type UserBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Viewer = {
  __typename?: 'Viewer';
  avatar: Maybe<Scalars['String']>;
  didRequest: Scalars['Boolean'];
  hasWallet: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['ID']>;
  token: Maybe<Scalars['String']>;
};

export type ConnectStripeMutationVariables = Exact<{
  input: ConnectStripeInput;
}>;


export type ConnectStripeMutation = { __typename?: 'Mutation', connectStripe: { __typename?: 'Viewer', hasWallet: boolean | null } };

export type CreateBookingMutationVariables = Exact<{
  input: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: string } };

export type DisconnectStripeMutationVariables = Exact<{ [key: string]: never; }>;


export type DisconnectStripeMutation = { __typename?: 'Mutation', disconnectStripe: { __typename?: 'Viewer', hasWallet: boolean | null } };

export type HostListingMutationVariables = Exact<{
  input: HostListingInput;
}>;


export type HostListingMutation = { __typename?: 'Mutation', hostListing: { __typename?: 'Listing', id: string } };

export type LogInMutationVariables = Exact<{
  input: InputMaybe<LogInInput>;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id: string | null, token: string | null, avatar: string | null, hasWallet: boolean | null, didRequest: boolean } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', id: string | null, token: string | null, avatar: string | null, hasWallet: boolean | null, didRequest: boolean } };

export type AuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthUrlQuery = { __typename?: 'Query', authUrl: string };

export type ListingQueryVariables = Exact<{
  id: Scalars['ID'];
  bookingsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ListingQuery = { __typename?: 'Query', listing: { __typename?: 'Listing', id: string, title: string, description: string, image: string, type: ListingType, address: string, city: string, bookingsIndex: string, price: number, numOfGuests: number, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, bookings: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, tenant: { __typename?: 'User', id: string, name: string, avatar: string } }> } | null } };

export type ListingsQueryVariables = Exact<{
  location: InputMaybe<Scalars['String']>;
  filter: ListingsFilter;
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type ListingsQuery = { __typename?: 'Query', listings: { __typename?: 'Listings', region: string | null, total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, image: string, address: string, price: number, numOfGuests: number }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
  bookingsPage: Scalars['Int'];
  listingsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, contact: string, hasWallet: boolean, income: number | null, bookings: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, listing: { __typename?: 'Listing', id: string, title: string, image: string, address: string, price: number, numOfGuests: number } }> } | null, listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, image: string, address: string, price: number, numOfGuests: number }> } | null } };


export const ConnectStripeDocument = gql`
    mutation ConnectStripe($input: ConnectStripeInput!) {
  connectStripe(input: $input) {
    hasWallet
  }
}
    `;
export type ConnectStripeMutationFn = Apollo.MutationFunction<ConnectStripeMutation, ConnectStripeMutationVariables>;

/**
 * __useConnectStripeMutation__
 *
 * To run a mutation, you first call `useConnectStripeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectStripeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectStripeMutation, { data, loading, error }] = useConnectStripeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConnectStripeMutation(baseOptions?: Apollo.MutationHookOptions<ConnectStripeMutation, ConnectStripeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectStripeMutation, ConnectStripeMutationVariables>(ConnectStripeDocument, options);
      }
export type ConnectStripeMutationHookResult = ReturnType<typeof useConnectStripeMutation>;
export type ConnectStripeMutationResult = Apollo.MutationResult<ConnectStripeMutation>;
export type ConnectStripeMutationOptions = Apollo.BaseMutationOptions<ConnectStripeMutation, ConnectStripeMutationVariables>;
export const CreateBookingDocument = gql`
    mutation CreateBooking($input: CreateBookingInput!) {
  createBooking(input: $input) {
    id
  }
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const DisconnectStripeDocument = gql`
    mutation DisconnectStripe {
  disconnectStripe {
    hasWallet
  }
}
    `;
export type DisconnectStripeMutationFn = Apollo.MutationFunction<DisconnectStripeMutation, DisconnectStripeMutationVariables>;

/**
 * __useDisconnectStripeMutation__
 *
 * To run a mutation, you first call `useDisconnectStripeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectStripeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectStripeMutation, { data, loading, error }] = useDisconnectStripeMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisconnectStripeMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectStripeMutation, DisconnectStripeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectStripeMutation, DisconnectStripeMutationVariables>(DisconnectStripeDocument, options);
      }
export type DisconnectStripeMutationHookResult = ReturnType<typeof useDisconnectStripeMutation>;
export type DisconnectStripeMutationResult = Apollo.MutationResult<DisconnectStripeMutation>;
export type DisconnectStripeMutationOptions = Apollo.BaseMutationOptions<DisconnectStripeMutation, DisconnectStripeMutationVariables>;
export const HostListingDocument = gql`
    mutation HostListing($input: HostListingInput!) {
  hostListing(input: $input) {
    id
  }
}
    `;
export type HostListingMutationFn = Apollo.MutationFunction<HostListingMutation, HostListingMutationVariables>;

/**
 * __useHostListingMutation__
 *
 * To run a mutation, you first call `useHostListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHostListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hostListingMutation, { data, loading, error }] = useHostListingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useHostListingMutation(baseOptions?: Apollo.MutationHookOptions<HostListingMutation, HostListingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HostListingMutation, HostListingMutationVariables>(HostListingDocument, options);
      }
export type HostListingMutationHookResult = ReturnType<typeof useHostListingMutation>;
export type HostListingMutationResult = Apollo.MutationResult<HostListingMutation>;
export type HostListingMutationOptions = Apollo.BaseMutationOptions<HostListingMutation, HostListingMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($input: LogInInput) {
  logIn(input: $input) {
    id
    token
    avatar
    hasWallet
    didRequest
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut {
    id
    token
    avatar
    hasWallet
    didRequest
  }
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const AuthUrlDocument = gql`
    query AuthUrl {
  authUrl
}
    `;

/**
 * __useAuthUrlQuery__
 *
 * To run a query within a React component, call `useAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthUrlQuery(baseOptions?: Apollo.QueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
      }
export function useAuthUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthUrlQuery, AuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthUrlQuery, AuthUrlQueryVariables>(AuthUrlDocument, options);
        }
export type AuthUrlQueryHookResult = ReturnType<typeof useAuthUrlQuery>;
export type AuthUrlLazyQueryHookResult = ReturnType<typeof useAuthUrlLazyQuery>;
export type AuthUrlQueryResult = Apollo.QueryResult<AuthUrlQuery, AuthUrlQueryVariables>;
export const ListingDocument = gql`
    query Listing($id: ID!, $bookingsPage: Int!, $limit: Int!) {
  listing(id: $id) {
    id
    title
    description
    image
    host {
      id
      name
      avatar
      hasWallet
    }
    type
    address
    city
    bookings(limit: $limit, page: $bookingsPage) {
      total
      result {
        id
        tenant {
          id
          name
          avatar
        }
        checkIn
        checkOut
      }
    }
    bookingsIndex
    price
    numOfGuests
  }
}
    `;

/**
 * __useListingQuery__
 *
 * To run a query within a React component, call `useListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingQuery({
 *   variables: {
 *      id: // value for 'id'
 *      bookingsPage: // value for 'bookingsPage'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListingQuery(baseOptions: Apollo.QueryHookOptions<ListingQuery, ListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
      }
export function useListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingQuery, ListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingQuery, ListingQueryVariables>(ListingDocument, options);
        }
export type ListingQueryHookResult = ReturnType<typeof useListingQuery>;
export type ListingLazyQueryHookResult = ReturnType<typeof useListingLazyQuery>;
export type ListingQueryResult = Apollo.QueryResult<ListingQuery, ListingQueryVariables>;
export const ListingsDocument = gql`
    query Listings($location: String, $filter: ListingsFilter!, $limit: Int!, $page: Int!) {
  listings(location: $location, filter: $filter, limit: $limit, page: $page) {
    region
    total
    result {
      id
      title
      image
      address
      price
      numOfGuests
    }
  }
}
    `;

/**
 * __useListingsQuery__
 *
 * To run a query within a React component, call `useListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingsQuery({
 *   variables: {
 *      location: // value for 'location'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useListingsQuery(baseOptions: Apollo.QueryHookOptions<ListingsQuery, ListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
      }
export function useListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingsQuery, ListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingsQuery, ListingsQueryVariables>(ListingsDocument, options);
        }
export type ListingsQueryHookResult = ReturnType<typeof useListingsQuery>;
export type ListingsLazyQueryHookResult = ReturnType<typeof useListingsLazyQuery>;
export type ListingsQueryResult = Apollo.QueryResult<ListingsQuery, ListingsQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!, $bookingsPage: Int!, $listingsPage: Int!, $limit: Int!) {
  user(id: $id) {
    id
    name
    avatar
    contact
    hasWallet
    income
    bookings(limit: $limit, page: $bookingsPage) {
      total
      result {
        id
        listing {
          id
          title
          image
          address
          price
          numOfGuests
        }
        checkIn
        checkOut
      }
    }
    listings(limit: $limit, page: $listingsPage) {
      total
      result {
        id
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      bookingsPage: // value for 'bookingsPage'
 *      listingsPage: // value for 'listingsPage'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;