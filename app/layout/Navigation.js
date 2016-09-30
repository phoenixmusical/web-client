import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommitteeMenuItem from './CommitteeMenuItem';

class Navigation extends Component {
    render () {
        const { open, app } = this.props;
        return (
            <Drawer
                dock={true}
                open={open}
                containerStyle={{
                    top: 50,
                }}>
                <MenuItem
                    containerElement={<Link to="/" />}
                    primaryText="Accueil" />
                <Divider />
                <Subheader>Comités</Subheader>
                {app.committees.map((committee, index) => (
                    <CommitteeMenuItem
                        key={index}
                        committee={committee} />
                ))}
            </Drawer>
        );
    }
}

export default Relay.createContainer(Navigation, {
    fragments: {
        app: () => Relay.QL`
            fragment on App {
                committees {
                    ${CommitteeMenuItem.getFragment('committee')}
                }
            }
        `,
    },
});
