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
        display: 'inline-block',
    },
};

const calendarURL = '';

class HomePage extends Component {
    render () {
        const { app } = this.props;
        return (
            <div>
                <h1>Phoenix Musical</h1>
                <h4>Calendrier</h4>
                <div>
                    {[
                        {
                            label: 'Chant',
                            color: 'rgb(173, 45, 45)',
                        },
                        {
                            label: 'Chorégraphie',
                            color: 'rgb(60, 153, 91)',
                        },
                        {
                            label: 'Mise en scène',
                            color: '#4986e7',
                        },
                        {
                            label: 'Comité Accessoires',
                            color: 'rgb(230, 115, 153)',
                        },
                        {
                            label: 'Comité Costumes',
                            color: 'rgb(224, 194, 64)',
                        },
                        {
                            label: 'Comité Décors',
                            color: 'rgb(167, 184, 40)',
                        },
                        {
                            label: 'Comité Maquillage/Coiffure',
                            color: 'rgb(96, 63, 153)',
                        },
                        {
                            label: 'Comité Marketing',
                            color: 'rgb(126, 194, 37)',
                        },
                        {
                            label: 'Comité Social',
                            color: 'rgb(199, 86, 30)',
                        },
                    ].map((item, index) => (
                        <span key={index} style={styles.lengendLabel}>
                            <span style={styles.colorBlock(item.color)} /> {item.label}
                        </span>
                    ))}
                </div>
                <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=phoenix.musical%40outlook.com&amp;color=%231B887A&amp;src=avdnq1961piusnokel3f5fq8nk%40group.calendar.google.com&amp;color=%23711616&amp;src=dbnrj0l10vs8v1lnvedv2sgn3s%40group.calendar.google.com&amp;color=%23125A12&amp;src=s11osvmsi83v2i178c6pqqreps%40group.calendar.google.com&amp;color=%23B1365F&amp;src=10nmjrfph9ldc412bujagm8gbc%40group.calendar.google.com&amp;color=%23AB8B00&amp;src=k5jspkogt531i127pspb3303vk%40group.calendar.google.com&amp;color=%235F6B02&amp;src=r83i1rb2t9dqqbn11mis4n6ans%40group.calendar.google.com&amp;color=%2323164E&amp;src=v8c77k9kpojdelabhumccslapg%40group.calendar.google.com&amp;color=%232F6309&amp;src=2s30njikqv0djbm7u3g0tjkqes%40group.calendar.google.com&amp;color=%23853104&amp;src=cop471rdbb3atvc54lvhts1un0%40group.calendar.google.com&amp;color=%23182C57&amp;ctz=America%2FToronto" style={{ borderWidth: 0 }} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
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
