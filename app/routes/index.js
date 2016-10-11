import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../layout/Layout';
import LayoutQuery from '../layout/LayoutQuery';

import NotFoundPage from './error/NotFoundPage';

import HomePage from './home/HomePage';
import HomePageQuery from './home/HomePageQuery';

import CommitteePage from './committee/CommitteePage';
import CommitteeQuery from './committee/CommitteeQuery';

import PostPage from './post/PostPage';
import PostQuery from './post/PostQuery';

export default (
    <Route path="/" component={Layout} queries={LayoutQuery}>
        <IndexRoute component={HomePage} queries={HomePageQuery} />
        <Route path="/committee/:id" component={CommitteePage} queries={CommitteeQuery} />
        <Route path="/post/:id" component={PostPage} queries={PostQuery} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
