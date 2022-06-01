import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  ApolloClient, 
  ApolloProvider, 
  createHttpLink,
  InMemoryCache, 
  useMutation 
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Affix, Layout, Spin } from "antd";
import { AppHeaderSkeleton, ErrorBanner } from './lib/components';
import { 
  AppHeader,
  Home, 
  Host, 
  Listing, 
  Listings, 
  Login, 
  Stripe,
  NotFound, 
  User 
} from './sections';
import { LOG_IN } from './lib/graphql/mutations';
import { LogInMutation as LogInData, LogInMutationVariables } from './lib/graphql/globalTypes';
import { Viewer } from "./lib/types"
import reportWebVitals from './reportWebVitals';
import "./styles/index.css";

const httpLink = createHttpLink({
  uri: "/api",
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      ...headers,
      "X-CSRF-TOKEN": token || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  const [logIn, { error }] = useMutation<LogInData, LogInMutationVariables>(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    }
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if(!viewer.didRequest && !error) {
    return (
      <Layout className='app-skeleton'>
        <AppHeaderSkeleton />
        <div className='app-skeleton__spin-section'>
          <Spin size='large' tip="Launching TinyHouse"/>
        </div>
    </Layout>
    )
  }

  const logInErrorBannerElement = error ? (
  <ErrorBanner description="We weren't able to verify if you were logged in. Please tray again later." /> 
  ) : null;

  return (
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />          
        </Affix>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/host' element={<Host viewer={viewer} />} />
            <Route path='/listing/:id' element={<Listing viewer={viewer} />} />
            <Route path='/listings/*' element={<Listings />} />
            <Route path='/listings/:location' element={<Listings />} />
            <Route 
              path='/login' 
              element = {<Login setViewer={setViewer} />} 
            />
            <Route 
              path='/stripe' 
              element = {<Stripe viewer={viewer} setViewer={setViewer} />} 
            />
            <Route path='/user/:id' element={<User viewer={viewer} setViewer={setViewer} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </Layout>
    </Router>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
