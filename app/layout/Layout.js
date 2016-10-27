import React, { Component } from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Header from './Header';
import Navigation from './Navigation';
import style from './Layout.css';

const styles = {
    container: {
        position: 'relative',
    },
    content: {
        marginTop: 50,
        marginLeft: 0,
        padding: '10px 20px',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    },
    contentOpen: {
        marginLeft: 256,
    },
};

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
        const contentStyle = Object.assign({}, styles.content);
        if (navigationOpen) {
            Object.assign(contentStyle, styles.contentOpen);
        }

        return (
            <div>
                <Header
                    onToggleNavigation={() => this.toggleNavigation()} />
                <div style={styles.container}>
                    <Navigation
                        app={app}
                        open={navigationOpen} />
                    <div style={contentStyle}>
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
