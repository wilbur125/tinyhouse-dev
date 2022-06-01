import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Divider, Modal, Typography } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment"
import { CREATE_BOOKING } from "../../../../lib/graphql/mutations";
import { CreateBookingMutation as CreateBookingData, CreateBookingMutationVariables } from "../../../../lib/graphql/globalTypes";
import { formatListingPrice, displayErrorMessage, displaySuccessNotification } from "../../../../lib/utils";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


interface Props {
    id: string;
    price: number;
    modalVisible: boolean;
    checkInDate: Moment;
    checkOutDate: Moment;
    setModalVisible: (modalVisible: boolean) => void;
    clearBookingData: () => void;
    handleListingRefetch: () => Promise<void>;
}

const { Paragraph, Text, Title } = Typography;

export const ListingCreateBookingModal = ({ 
    id,
    price, 
    modalVisible, 
    checkInDate, 
    checkOutDate, 
    setModalVisible,
    clearBookingData,
    handleListingRefetch
}: Props) => {
    const [createBooking, { loading }] = useMutation<
        CreateBookingData, 
        CreateBookingMutationVariables
    >(CREATE_BOOKING, {
        onCompleted: () => {
            clearBookingData();
            displaySuccessNotification(
                "You've successfully booked the listing!",
                "Booking history can always be found in your User page."
            );
            handleListingRefetch();
        },
        onError: () => {
            displayErrorMessage("Sorry! We weren't able to successfully book the listing. Please try again later.")
        }
    });

    const handleCreateBooking = async () => {
        if (!stripe) {
            return displayErrorMessage("Sorry! We weren't able to connect with Stripe.")
        }

        const cardElement = elements?.getElement("card");
        let { token: stripeToken, error } = await stripe!.createToken(cardElement!);

        if (stripeToken) {
            createBooking({
                variables: {
                    input: {
                        id,
                        source: stripeToken.id,
                        checkIn: moment(checkInDate).format("YYYY-MM-DD"),
                        checkOut: moment(checkOutDate).format("YYYY-MM-DD")
                    }
                }
            });
        } else {
            displayErrorMessage(
                error && error.message 
                ? error.message 
                : "Sorry! We weren't able to book the listing. Please try again later.")
        }
    }

    const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
    const listingPrice = price * daysBooked;

    const elements = useElements();
    const stripe = useStripe();

    return (
        <Modal
            visible={modalVisible}
            centered
            footer={null}
            onCancel={() => setModalVisible(false)}
        >
            <div className="listing-booking-modal">
                <div className="listing-booking-modal__intro">
                    <Title className="listing-booking-modal__intro-title">
                        <KeyOutlined />
                    </Title>
                    <Title className="listing-booking-modal__intro-title">
                        Book your trip
                    </Title>
                    <Paragraph>
                        Enter your payment information to book the listing from the dates bewteen{" "}
                        <Text mark strong>
                        {moment(checkInDate).format("MMMM Do YYYY")}
                        </Text> and{" "}
                        <Text mark strong>
                        {moment(checkOutDate).format("MMMM Do YYYY")}
                        </Text>
                        , inclusive.
                    </Paragraph>
                </div>

                <Divider />

                <div className="listing-booking-modal__charge-summary">
                    <Paragraph>
                        {formatListingPrice(price, false)} * {daysBooked} days ={" "}
                        <Text strong>{formatListingPrice(listingPrice, false)}</Text>
                    </Paragraph>
                    <Paragraph className="listing-booking-modal__charge-sumary-total">
                        Total = <Text mark>{formatListingPrice(listingPrice, false)}</Text>
                    </Paragraph>

                    <Divider />

                    <div className="listing-booking-modal__stripe-card-section">
                        <CardElement
                            options={{ hidePostalCode: true }}
                            className="listing-booking-modal__stripe-card"
                        />
                        <Button 
                            size="large" 
                            type="primary" 
                            className="listin-booking-modal__cta"
                            onClick={handleCreateBooking}
                            loading={loading}
                        >
                            Book
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}