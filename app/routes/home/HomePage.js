import React, { Component } from 'react';
import Relay from 'react-relay';
import HomePageCalendar from './HomePageCalendar';

class HomePage extends Component {
    render () {
        const { app } = this.props;
        return (
            <div>
                <h1>Phoenix Musical</h1>
                <HomePageCalendar app={app} />
            </div>
        );
    }
}

export default Relay.createContainer(HomePage, {
    fragments: {
        app: () => Relay.QL`
            fragment on App {
                ${HomePageCalendar.getFragment('app')}
            }
        `,
    },
});
