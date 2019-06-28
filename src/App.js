import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './containers/Layout/Layout';

const Home = lazy(() => import('./containers/Home/Home'));
const Article = lazy(() => import('./containers/Article/Article'));
const ErrorNotFound = lazy(() => import('./components/ErrorNotFound/ErrorNotFound'));

const App = () => {
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path='/' component={ Home } exact/>
                    <Route path='/article/:id' component={ Article } />
                    <Route component={ ErrorNotFound } />
                </Switch>
            </Suspense>
        </Layout>
    );
};

export default App;
