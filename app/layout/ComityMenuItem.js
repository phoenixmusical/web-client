import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

class ComityMenuItem extends Component {
    render () {
        const { comity } = this.props;
        return (
            <MenuItem
                containerElement={<Link to={`/comity/${comity.id}`} />}
                primaryText={comity.name} />
        );
    }
}

export default Relay.createContainer(ComityMenuItem, {
    fragments: {
        comity: () => Relay.QL`
            fragment on Comity {
                id,
                name
            }
        `,
    },
});
