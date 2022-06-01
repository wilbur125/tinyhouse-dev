import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Layout } from "antd";
import { Viewer } from "../../lib/types";
import { MenuItems } from "./components/MenuItems";

//Images
import logo from "./assets/tinyhouse-logo.png";
import { displayErrorMessage } from "../../lib/utils";

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;
const { Search } = Input;

export const AppHeader = ({ viewer, setViewer }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState("");

    useEffect(() => {
        const { pathname } = location;
        const pathnameSubStrings = pathname.split("/");

        if (!pathname.includes("/listings")) {
            setSearch("");
            return;
        }

        if (pathname.includes("/listings") && pathnameSubStrings.length === 3) {
            setSearch(pathnameSubStrings[2]);
            return;
          }
    }, [location]);
    const onSearch = (value: string) => {
        const trimmedValue = value.trim();

        if (trimmedValue) {
            navigate(`/listings/${trimmedValue}`);
        } else {
            displayErrorMessage("Please enter a valid search!");
        }
    }

    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                    <Link to="/">
                        <img src={logo} alt="App logo" />
                    </Link>
                </div>
                <div className="app-header__search-input">
                    <Search 
                        placeholder="Search 'San Francisco'"
                        enterButton
                        value={search}
                        onChange={evt => setSearch(evt.target.value)}
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div className="app-header__menu-section">
                <MenuItems viewer={viewer} setViewer={setViewer} />
            </div>
        </Header>
    );
};