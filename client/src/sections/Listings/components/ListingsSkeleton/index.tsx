import React from "react";
import { Card, Skeleton, List } from "antd";

import listingLoadingCardCover from "../../assets/listing-loading-card-cover.jpeg";

export const ListingsSkeleton = () => {
    const emptyData = [{}, {}, {}, {}, {}, {}, {}, {}]
    
    return(
        <div className="listings-skeleton">
            <Skeleton paragraph={{ rows: 1 }} />
            <List grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 4,
                xl: 4,
                xxl: 4
            }}
            dataSource={emptyData}
            renderItem={() => (
                <List.Item>
                    <Card 
                        cover={
                            <div 
                                style={{ backgroundImage: `url(${listingLoadingCardCover})` }} 
                                className="listings-skeleton__card-cover-img"
                            ></div>
                        }
                        loading
                        className="listings-skeleton__card" 
                    />
                </List.Item>
            )}
            />
        </div>
    )
}