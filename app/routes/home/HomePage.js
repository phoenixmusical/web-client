import React, { Component } from 'react';
import Relay from 'react-relay';
import HomePageCalendar from './HomePageCalendar';

const styles = {
    colorBlock: color => ({
        backgroundColor: color,
        width: 12,
        height: 12,
        display: 'inline-block',
        margin: '2px 5px',
    }),
    lengendLabel: {
        marginRight: 10,
        fontWeight: 'bold',
    },
};

class HomePage extends Component {
    render () {
        const { app } = this.props;
        return (
            <div>
                <h1>Phoenix Musical</h1>
                <h4>Calendrier</h4>
                <div>
                    <span style={styles.lengendLabel}>
                        <span style={styles.colorBlock('#f83a22')} /> Chant
                    </span>
                    <span style={styles.lengendLabel}>
                        <span style={styles.colorBlock('#16a765')} /> Chorégraphie
                    </span>
                    <span style={styles.lengendLabel}>
                        <span style={styles.colorBlock('#4986e7')} /> Mise en scène
                    </span>
                </div>
                <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=phoenix.musical%40outlook.com&amp;color=%231B887A&amp;src=avdnq1961piusnokel3f5fq8nk%40group.calendar.google.com&amp;color=%23711616&amp;src=dbnrj0l10vs8v1lnvedv2sgn3s%40group.calendar.google.com&amp;color=%23125A12&amp;src=cop471rdbb3atvc54lvhts1un0%40group.calendar.google.com&amp;color=%23182C57&amp;ctz=America%2FToronto" style={{ borderWidth: 0 }} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
            </div>
        );
    }
}

export default Relay.createContainer(HomePage, {
    fragments: {
        app: () => Relay.QL`
            fragment on App {
                ${HomePageCalendar.getFragment('app')}
            }
        `,
    },
});
