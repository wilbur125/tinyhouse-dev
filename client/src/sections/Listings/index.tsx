import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Affix, Layout, List, Typography } from "antd";
import { ErrorBanner, ListingCard } from "../../lib/components";
import { LISTINGS } from "../../lib/graphql/queries";
import { 
    ListingsFilter, 
    ListingsQuery as ListingsData, 
    ListingsQueryVariables 
} from "../../lib/graphql/globalTypes";
import { ListingsFilters, ListingsPagination, ListingsSkeleton } from "./components";

type MatchParams = {
    location: any;
}

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

const PAGE_LIMIT = 8;

export const Listings = () => {   
    const [filter, setFilter] = useState(ListingsFilter.PriceLowToHigh);
    const [page, setPage] = useState(1);

    const { location } = useParams<MatchParams>(); 
    const locationRef = useRef(location);

    const { loading, data, error } = useQuery<ListingsData, ListingsQueryVariables>(LISTINGS, {
        skip: locationRef.current !== location && page !== 1,
        variables: {
            location,
            filter,
            limit: PAGE_LIMIT,
            page
        }
    });

    useEffect(() => {
        setPage(1);
        locationRef.current = location;
    }, [location]);

    if (loading) {
        return (
            <Content className="listings">
                <ListingsSkeleton />
            </Content>
        );
    }

    if (error) {
        return (
            <Content className="listings">
                <ErrorBanner 
                    description="We either coudn't find anything matching your search or encountered an error. 
                    If you're searcing for a unique location, try searching again with more common keywords." 
                />
                <ListingsSkeleton />
            </Content>
        )
    }

    const listings = data ? data.listings : null;
    const listingsRegion = listings ? listings.region : null;

    
    const listingsSectionElement = listings && listings.result.length ? (
        <div> 
            <Affix offsetTop={64}>
                <ListingsPagination 
                    total={listings.total}
                    page={page}
                    limit={PAGE_LIMIT}
                    setPage={setPage}
                />
                <ListingsFilters filter={filter} setFilter={setFilter}/> 
            </Affix>  
            <List 
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 4,
                    xl: 4,
                    xxl: 4
                }}
                dataSource={listings.result}
                renderItem={listing => (
                    <List.Item>
                        <ListingCard listing={listing} />
                    </List.Item>
                )}
            /> 
        </div>
    ) : (
        <div>
            <Paragraph>
                It appears that no listings have yet been created for {" "}
                <Text mark>"{listingsRegion}"</Text>
            </Paragraph>
            <Paragraph>
                Be the first person to create a <Link to="/host">listing in this area</Link>
            </Paragraph>
        </div>
    );

    const listingsRegionElement = listingsRegion ? (
        <Title level={3} className="listings__title">
            Results for "{listingsRegion}"
        </Title>
    ) : null;

    return (
        <Content className="listings">
            {listingsRegionElement}
            {listingsSectionElement}
        </Content>
    )
};