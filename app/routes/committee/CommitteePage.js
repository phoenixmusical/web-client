import React, { Component } from 'react';
import Relay from 'react-relay';

class CommitteePage extends Component {
    render () {
        const { committee } = this.props;
        return (
            <div>
                <h1>{committee.name}</h1>
            </div>
        );
    }
}

export default Relay.createContainer(CommitteePage, {
    fragments: {
        committee: () => Relay.QL`
            fragment on Committee {
                id,
                name,
            }
        `,
    },
});
