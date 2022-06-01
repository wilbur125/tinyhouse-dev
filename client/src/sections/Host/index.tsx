import React, { useState} from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate } from "react-router-dom";
import { 
    Button,
    Form, 
    Input,
    InputNumber,
    Layout, 
    Radio,
    Typography,
    Upload 
} from "antd";
import { BankOutlined, HomeOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { UploadChangeParam } from "antd/lib/upload";
import { displayErrorMessage, displaySuccessNotification, iconColor } from "../../lib/utils";
import { Viewer } from "../../lib/types";
import { HOST_LISTING } from "../../lib/graphql/mutations";
import { HostListingMutation as HostListingData, HostListingMutationVariables } from "../../lib/graphql/globalTypes";
import { ListingType } from "../../lib/graphql/globalTypes"

interface Props {
    viewer: Viewer;
}

const { Item } = Form;
const { Content } = Layout;
const { Text, Title } = Typography;

export const Host = ({ viewer }: Props) => {    
    const [form] = Form.useForm();

    const [imageLoading, setImageLoading] = useState(false);
    const [imageBase64Value, setImageBase64Value] = useState<string | null>(null);

    const [hostListing, { loading, data }] = useMutation<
        HostListingData,
        HostListingMutationVariables
    >(HOST_LISTING, {
        onCompleted: () => {
            displaySuccessNotification("You've successfully created your listing!")
        },
        onError: () => {
            displayErrorMessage("Sorry! We weren't able to create your listing. Please try again later.")
        }
    });

    const dummyRequest = (options: any) => {
        const { onSuccess } = options;
            setTimeout(() => {
            onSuccess("ok");
            }, 0);
        };

    const handleImageUpload = (info: UploadChangeParam) => {
        const { file } = info;

        if (file.status === 'uploading') {
            setImageLoading(true);
            return;
        }

        if (file.status === 'done' && file.originFileObj) {
            getBase64Value(
                file.originFileObj, imageBase64Value => {
                    setImageBase64Value(imageBase64Value);
                    setImageLoading(false);
            });
        }
    };

    const imageLoadingIcon = imageLoading ? (
                <div>
                    <LoadingOutlined />
                    <div className="ant-upload-text">Upload</div>
                </div>
    ) : null;

    const handleHostListingFailed = (errors: any) => {
        if (errors.errorFields && errors.errorFields.length) {
            displayErrorMessage("Please complete all required form fields!");
            return;
        }
    };

    if (!viewer.id || !viewer.hasWallet) {
        return (
            <Content className="host-content">
                <div className="host__form-header">
                    <Title level={4} className="host__form-title">
                        You'll have to be signed in and connected with Stripe to host a listing!
                    </Title>
                    <Text type="secondary">
                        We only allow users who've signed in to our application and have connected with Stripe to host new listings.
                        you can sign in at the <Link to="/login">/login</Link> page and connect with Strpe shortly after.
                    </Text>
                </div>
            </Content>
        );
    }

    if (loading) {
        return (
            <Content className="host-content">
                <div className="host__form-header">
                    <Title level={4} className="host__form-title">
                        Please wait!
                    </Title>
                    <Text type="secondary">
                        We're creating your listing now.
                    </Text>
                </div>
            </Content>
        );
    }

    if (data && data.hostListing) {
        return (
            <Navigate to={`/listing/${data.hostListing.id}`} replace={true} />
        )
    }

    const handleHostListing = (values: any) => {
            const fullAddress = `${values.address}, ${values.city}, ${values.state}, ${values.postalCode}`;

            const input = {
                ...values,
                address: fullAddress,
                image: imageBase64Value,
                price: values.price * 100
            };
            delete input.city;
            delete input.state;
            delete input.postalCode;

            hostListing({
                variables: {
                    input
                }
            });
    };

    return (
        <Content className="host-content">
            <Form 
                form={form}
                onFinish={handleHostListing}
                onFinishFailed={handleHostListingFailed}
                layout="vertical">
                <div className="host__form-header">
                    <Title level={3} className="host__form-title">
                        Hi! Let's get started listing your place.
                    </Title>
                    <Text type="secondary">
                        In this form, we'll collect some basic and additional information about your listing.
                    </Text>
                </div>

                <Item  
                    label="Home Type"
                    name="type"
                    rules={[{ 
                        required: true,
                        message:"Please select a home type!"
                    }]}
                >
                    <Radio.Group >
                        <Radio.Button value={ListingType.Apartment}>
                            <BankOutlined style={{ color: iconColor }} /> <span>Apartment</span> 
                        </Radio.Button>
                        <Radio.Button value={ListingType.House}>
                           <HomeOutlined style={{ color: iconColor }} /> <span>House</span>
                        </Radio.Button>
                    </Radio.Group>
                </Item>

                <Item 
                    label="Max # of Guests"
                    name="numOfGuests"
                    rules={[{ 
                        required: true,
                        message:"Please enter the max number of guests!"
                    }]}
                >
                    <InputNumber min={1} placeholder="4" />
                </Item>

                <Item 
                    label="Title" 
                    name="title"
                    extra="Max character count of 45"
                    rules={[{ 
                        required: true,
                        message:"Please enter a title!"
                    }]}
                >
                    <Input maxLength={45} placeholder="The iconic and luxurious Bel-air mansion"/>
                </Item>

                <Item 
                    label="Description" 
                    name="description"
                    extra="Max character count of 400"
                    rules={[{ 
                        required: true,
                        message:"Please enter a description!"
                    }]}
                >
                    <Input.TextArea 
                        rows={3} 
                        maxLength={400} 
                        placeholder="Modern, clean, and iconic home of the Fresh Prince. Situated in the heart of Bel-Air, Los Angeles. "/>
                </Item>

                <Item 
                    label="Address"
                    name="address"
                    rules={[{ 
                        required: true,
                        message:"Please enter an address!"
                    }]}
                >
                    <Input placeholder="251 North Bristol Avenue"/>
                </Item>

                <Item 
                    label="City/Town"
                    name="city"
                    rules={[{ 
                        required: true,
                        message:"Please enter a city or town!"
                    }]}
                >
                    <Input placeholder="Los Angeles"/>
                </Item>

                <Item 
                    label="State/Province"
                    name="state"
                    rules={[{ 
                        required: true,
                        message:"Please enter a state or province!"
                    }]}
                >
                    <Input placeholder="California"/>
                </Item>

                <Item 
                    label="Zip/Postal Code"
                    name="postalCode"
                    rules={[{ 
                        required: true,
                        message:"Please enter a zip code!"
                    }]}
                >
                    <Input placeholder="Please enter a zip code for your listing!"/>
                </Item>

                <Item 
                    label="Image"
                    name="image" 
                    extra="Images have to be under 1 MB in size and of type JPG or PNG"
                    rules={[{ 
                        required: true,
                        message:"Please upload an image!"
                    }]}
                >
                    <div className="host__form-image-upload">
                        <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList={false}
                            customRequest={dummyRequest}
                            beforeUpload={beforeImageUpload}
                            onChange={handleImageUpload}
                        >
                            {imageBase64Value ? (
                                <img src={imageBase64Value} alt="Listing" />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            )}
                            {imageLoadingIcon}
                        </Upload>
                    </div>
                </Item>

                <Item 
                    label="Price" 
                    name="price"
                    extra="All prices in $USD/day"
                    rules={[{ 
                        required: true,
                        message:"Please enter a price per day!"
                    }]}
                >
                    <InputNumber min={0} placeholder="120"/>
                </Item>

                <Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Item>
            </Form>
        </Content>
    );
};


const beforeImageUpload = (file: File) => {
    const fileIsValidImage = file.type === "image/jpeg" || "image/png";
    const fileIsValidSize = file.size / 1024 / 1024 < 1;

    if (!fileIsValidImage) {
        displayErrorMessage("You're only able to upload vaild JPG or PNG files!");
        return false;
    }

    if (!fileIsValidSize) {
        displayErrorMessage("You're only able to upload valid image files of under 1MB in size!");
        return false;
    }

    return fileIsValidImage && fileIsValidSize;
};

const getBase64Value = (
    img: File | Blob,
    callback: (imageBase64Value: string) => void
) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
        callback(reader.result as string);
    }
};
