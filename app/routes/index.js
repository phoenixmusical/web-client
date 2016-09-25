import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../layout/Layout';
import LayoutQuery from '../layout/LayoutQuery';

import HomePage from './home/HomePage';
import NotFoundPage from './error/NotFoundPage';

import ComityPage from './comity/ComityPage';
import ComityQuery from './comity/ComityQuery';

export default (
    <Route path="/" component={Layout} queries={LayoutQuery}>
        <IndexRoute component={HomePage} />
        <Route path="/comity/:id" component={ComityPage} queries={ComityQuery} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
