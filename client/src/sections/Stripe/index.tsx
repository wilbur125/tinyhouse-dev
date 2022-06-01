import React, { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Layout, Spin } from "antd";
import { Viewer } from "../../lib/types";
import { displaySuccessNotification } from "../../lib/utils";
import { CONNECT_STRIPE } from "../../lib/graphql/mutations";
import { ConnectStripeMutation as ConnectStripeData, ConnectStripeMutationVariables } from "../../lib/graphql/globalTypes";

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;

export const Stripe = ({ viewer, setViewer }: Props) => {
    const navigate = useNavigate();

    const [connectStripe, { data, loading, error }] = useMutation<
        ConnectStripeData, 
        ConnectStripeMutationVariables
    >(CONNECT_STRIPE, {
        onCompleted: data => {
            if (data && data.connectStripe) {
                setViewer({ ...viewer, hasWallet: data.connectStripe.hasWallet }); 
                displaySuccessNotification(
                    "You've successfully connected your Stripe Account!", 
                    "You can now begin to create listings in the Host page."
                );
            }
            
        }
    });

    const connectStripeRef = useRef(connectStripe);

    useEffect(() => {
            const code = new URL(window.location.href).searchParams.get("code");
            
            if (code) {
                connectStripeRef.current({
                    variables: {
                        input: { code }
                    }
                })
            } else {
                navigate("/login", { replace: true })
            }
        }, [viewer, navigate]);

        if (data && data.connectStripe) {
            return (
                <Navigate to={`/user/${viewer.id}`} replace={true} />
            )
        }

        if (loading) {
            return (
                <Content>
                    <Spin size="large" tip="Connecting your Stripe Account" />
                </Content>
            );
        }

        if (error) {
            return (
                <Navigate to={`/user/${viewer.id}?stripe_error=true`} />
            )
        }

        return null;
}