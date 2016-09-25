import React, { Component } from 'react';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export default class Navigation extends Component {
    render () {
        const { open } = this.props;
        return (
            <Drawer
                dock={true}
                open={open}>
                <MenuItem
                    containerElement={<Link to="/" />}
                    primaryText="Accueil" />
                <Divider />
                <Subheader>Comités</Subheader>
            </Drawer>
        );
    }
}
