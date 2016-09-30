import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import frLocale from 'react-intl/locale-data/fr';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './muiTheme';
import routes from './routes';

addLocaleData([...frLocale]);

injectTapEventPlugin();

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('/graphql')
);

export default class App extends Component {
    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <IntlProvider locale="fr" defaultLocale="fr">
                    <Router
                        history={browserHistory}
                        render={applyRouterMiddleware(useRelay)}
                        environment={Relay.Store}>
                        {routes}
                    </Router>
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}
