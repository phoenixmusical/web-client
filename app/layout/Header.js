import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

export default class Header extends Component {
    render () {
        const { onToggleNavigation } = this.props;
        return (
            <AppBar
                title="Phoenix Musical"
                onLeftIconButtonTouchTap={onToggleNavigation} />
        );
    }
}
