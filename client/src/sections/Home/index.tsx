import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Col, Row, Layout, Typography } from "antd";
import { LISTINGS } from "../../lib/graphql/queries";
import { ListingsFilter, ListingsQuery as ListingsData, ListingsQueryVariables } from "../../lib/graphql/globalTypes";
import { displayErrorMessage } from "../../lib/utils";
import { HomeHero, HomeListings, HomeListingsSkeleton } from "./components";

//Images
import mapBackground from "./assets/map-background.jpeg";
import sanFranciscoImage from "./assets/san-francisco.jpeg";
import cancunImage from "./assets/cancun.jpeg";

type MatchParams = {
    location: any;
}

const { Content } = Layout;
const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home = () => {
    const { location } = useParams<MatchParams>();
    const { loading, data } = useQuery<ListingsData, ListingsQueryVariables>(LISTINGS, {
        variables: {
            location,
            filter: ListingsFilter.PriceHighToLow,
            limit: PAGE_LIMIT,
            page: PAGE_NUMBER
        }
    });
    const navigate = useNavigate();
    const onSearch = (value: string) => {
        const trimmedValue = value.trim();

        if(trimmedValue) {
            navigate(`/listings/${trimmedValue}`)
        } else {
            displayErrorMessage("Please enter a valid search");
        }
    };

    const renderListingsSection = () => {
        if (loading) {
            return (
                <HomeListingsSkeleton />
            )
        }

        if (data) {
            return (
                <HomeListings title="Premium Listings" listings={data.listings.result} />
            )
        }

        return null;
    }

    return (
        <Content className="home" style={{ backgroundImage: `url(${mapBackground})` }}>
            <HomeHero onSearch={onSearch} />

            <div className="home__cta-section">
                <Title level={2} className="home__cta-section-title">
                    Your guide to all things rental
                </Title>
                <Paragraph>
                    Helping you make the best decisions in renting your last minute locations.
                </Paragraph>
                <Link to="listings/united%20states" className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button">
                    Popular listings in the United States
                </Link>
            </div>

            {renderListingsSection()}

            <div className="home__listings">
                <Title level={4} className="home__listings-title">
                    Listings of any kind
                </Title>
                <Row gutter={12}>
                    <Col xs={24} sm={12}>
                        <Link to="listings/san%20francisco">
                            <div className="home__listings-img-cover">
                                <img alt="San Francisco" src={sanFranciscoImage} className="home__listings-img"/>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Link to="listings/cancún">
                            <div className="home__listings-img-cover">
                                <img alt="Cancún" src={cancunImage} className="home__listings-img"/>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Content>
    )
};