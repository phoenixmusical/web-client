import React, { Component } from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Header from './Header';
import Navigation from './Navigation';
import style from './Layout.css';

class Layout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            navigationOpen: true,
        };
    }

    toggleNavigation () {
        this.setState(state => ({
            navigationOpen: !state.navigationOpen,
        }));
    }

    render () {
        const { app, children } = this.props;
        const { navigationOpen } = this.state;
        return (
            <div>
                <Header
                    onToggleNavigation={() => this.toggleNavigation()} />
                <div className={style.container}>
                    <Navigation
                        app={app}
                        open={navigationOpen} />
                    <div className={classNames(style.content, { [style.open]: navigationOpen })}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(Layout, {
    fragments: {
        app: () => Relay.QL`
            fragment on App {
                ${Navigation.getFragment('app')}
            }
        `,
    },
});
