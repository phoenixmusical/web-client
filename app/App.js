import React, { Component } from 'react';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './muiTheme';
import routes from './routes';

injectTapEventPlugin();

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('/graphql')
);

export default class App extends Component {
    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router
                    history={browserHistory}
                    render={applyRouterMiddleware(useRelay)}
                    environment={Relay.Store}>
                    {routes}
                </Router>
            </MuiThemeProvider>
        );
    }
}
