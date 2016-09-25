import React, { Component } from 'react';
import Relay from 'react-relay';

class ComityPage extends Component {
    render () {
        const { comity } = this.props;
        return (
            <div>
                <h1>{comity.name}</h1>
            </div>
        );
    }
}

export default Relay.createContainer(ComityPage, {
    fragments: {
        comity: () => Relay.QL`
            fragment on Comity {
                id,
                name,
            }
        `,
    },
});
