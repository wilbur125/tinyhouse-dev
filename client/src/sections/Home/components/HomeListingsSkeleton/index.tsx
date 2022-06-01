import React from "react";
import { Card, Skeleton, List } from "antd";

import listingLoadingCardCover from "../../assets/listing-loading-card-cover.jpeg";

export const HomeListingsSkeleton = () => {
    const emptyData = [{}, {}, {}, {}]
    
    return(
        <div className="home-listings-skeleton">
            <Skeleton paragraph={{ rows: 0 }} />
            <List grid={{
                gutter: 8,
                xs: 1,
                sm: 1,
                lg: 4
            }}
            dataSource={emptyData}
            renderItem={() => (
                <List.Item>
                    <Card 
                        cover={
                            <div 
                                style={{ backgroundImage: `url(${listingLoadingCardCover})` }} 
                                className="home-listings-skeleton__card-cover-img"
                            ></div>
                        }
                        loading
                        className="home-listings-skeleton__card"  
                    />
                </List.Item>
            )}
            />
        </div>
    )
}