import React from "react";
import { List, Typography } from "antd";
import { ListingCard } from "../../../../lib/components";
import { ListingsQuery } from "../../../../lib/graphql/globalTypes";

interface Props {
    title: string;
    listings: ListingsQuery["listings"]["result"];
}

const { Title } = Typography;

export const HomeListings = ({ title, listings }: Props) => {
    return(
        <div className="home-listings">
            <Title level={4} className="home-listings__title">
                {title}
            </Title>
            <List grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 4,
                xl: 4,
                xxl: 4
            }}
            dataSource={listings}
            renderItem={listing => (
                <List.Item>
                    <ListingCard listing={listing} />
                </List.Item>
            )}
            />
        </div>
    )
}