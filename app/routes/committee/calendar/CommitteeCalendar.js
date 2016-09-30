import React, { Component } from 'react';
import Relay from 'react-relay';
import CommitteeCalendarDay from './CommitteeCalendarDay';

class CommitteeCalendar extends Component {
    constructor (props) {
        super(props);
        const date = new Date();
        date.setDate(date.getDate() - date.getDay());
        this.state = {
            startDate: date,
        };
    }

    render () {
        const { committee } = this.props;
        const { startDate } = this.state;
        const dates = [];
        const daysMap = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate.getTime());
            date.setDate(date.getDate() + i);
            dates.push(date);
            daysMap[i] = [];
        }

        committee.events.edges.forEach(edge => {
            const event = edge.node;
            const date = new Date(Date.parse(event.startDate));
            daysMap[date.getDay()].push(event);
        });

        return (
            <div>
                {dates.map(date => (
                    <CommitteeCalendarDay
                        key={date.getDay()}
                        date={date}
                        events={daysMap[date.getDay()]} />
                ))}
            </div>
        );
    }
}

export default Relay.createContainer(CommitteeCalendar, {
    fragments: {
        committee: () => Relay.QL`
            fragment on Committee {
                events (first: 50) {
                    edges {
                        node {
                            id
                            name
                            description
                            startDate
                            endDate
                        }
                    }
                }
            }
        `,
    },
});
