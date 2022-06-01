import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { 
    Col, 
    Layout,
    Row
} from "antd";
import { USER } from "../../lib/graphql/queries";
import { UserQuery as UserData, UserQueryVariables } from "../../lib/graphql/globalTypes";
import { ErrorBanner, PageSkeleton } from "../../lib/components";
import { Viewer } from "../../lib/types";
import { 
    UserBookings, 
    UserListings, 
    UserProfile 
} from "./components";

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

type MatchParams = {
    id: any;
}

const { Content } = Layout;

const PAGE_LIMIT = 4;

export const User = ({ viewer, setViewer }: Props) => {
    const { id } = useParams<MatchParams>();

    const [listingsPage, setListingsPage] = useState(1);
    const [bookingsPage, setBookingsPage] = useState(1);

    const { data, loading, error, refetch } = useQuery<UserData, UserQueryVariables>(USER, {
        variables: {
            id,
            bookingsPage,
            listingsPage,
            limit: PAGE_LIMIT
        }
    });

    const handleUserRefetch = async () => {
        await refetch();
    }

    const stripeError = new URL(window.location.href).searchParams.get("stripe_error");
    const stripeErrorBanner = stripeError ? (
        <ErrorBanner description="We had an issue connecting with Stripe. Please try again soon." />
    ) : null;
    
    if (loading) {
        return (
            <Content className="user">
                <PageSkeleton />
            </Content>
        );
    }

    if (error) {
        return (
            <Content className="user">
                <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
                <PageSkeleton />
            </Content>
        );
    }

    const user = data ? data.user : null;
    const viewerIsUser = viewer.id === id;

    const userListings = user ? user.listings: null;
    const userBookings = user ? user.bookings : null;

    const userProfileElement = user ? (
        <UserProfile 
            user={user} 
            viewer={viewer} 
            setViewer={setViewer} 
            viewerIsUser={viewerIsUser}
            handleUserRefetch={handleUserRefetch}
        />
    ): null;

    const userListingsElement = user ? (
        <UserListings 
            userListings={userListings}
            listingsPage={listingsPage}
            limit={PAGE_LIMIT}
            setListingsPage={setListingsPage}
        />
    ): null;

    const userBookingsElement = user ? (
        <UserBookings
            userBookings={userBookings}
            bookingsPage={bookingsPage}
            limit={PAGE_LIMIT}
            setBookingsPage={setBookingsPage}
        />
    ): null;

    return (
        <Content className="user">
            {stripeErrorBanner}
            <Row gutter={12} justify="space-between">
                <Col xs={24}>{userProfileElement}</Col>
                <Col xs={24}>
                    {userListingsElement}
                    {userBookingsElement}
                </Col>
            </Row>
        </Content>
    )
};