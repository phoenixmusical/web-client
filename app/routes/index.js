import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../layout/Layout';
import LayoutQuery from '../layout/LayoutQuery';

import HomePage from './home/HomePage';
import NotFoundPage from './error/NotFoundPage';

import CommitteePage from './committee/CommitteePage';
import CommitteeQuery from './committee/CommitteeQuery';

export default (
    <Route path="/" component={Layout} queries={LayoutQuery}>
        <IndexRoute component={HomePage} />
        <Route path="/committee/:id" component={CommitteePage} queries={CommitteeQuery} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
