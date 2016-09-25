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
        const { view, children } = this.props;
        const { navigationOpen } = this.state;
        return (
            <div>
                <Navigation
                    view={view}
                    open={navigationOpen} />
                <div className={classNames(style.container, { [style.open]: navigationOpen })}>
                    <Header
                        onToggleNavigation={() => this.toggleNavigation()} />
                    {children}
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(Layout, {
    fragments: {
        view: () => Relay.QL`
            fragment on Query {
                ${Navigation.getFragment('view')}
            }
        `,
    },
});
