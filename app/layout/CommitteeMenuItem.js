import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

class CommitteeMenuItem extends Component {
    render () {
        const { committee } = this.props;
        return (
            <MenuItem
                containerElement={<Link to={`/committee/${committee.id}`} />}
                primaryText={committee.name} />
        );
    }
}

export default Relay.createContainer(CommitteeMenuItem, {
    fragments: {
        committee: () => Relay.QL`
            fragment on Committee {
                id,
                name
            }
        `,
    },
});
