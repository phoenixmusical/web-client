import React, { Component } from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import Calendar from '../../components/calendar/Calendar';

function getSunday() {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay());
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

function getEndOfWeek(baseDate) {
    const date = new Date(baseDate.getTime());
    date.setDate(date.getDate() + 7);
    date.setTime(date.getTime() - 1);
    return date;
}

class HomePageCalendar extends Component {
    offsetDate (offset) {
        const { relay } = this.props;
        const newDate = new Date(Date.parse(relay.variables.startDate));
        newDate.setDate(newDate.getDate() + offset);
        relay.setVariables({
            startDate: newDate,
            endDate: getEndOfWeek(newDate),
        });
    }

    render () {
        const { app, relay } = this.props;
        return (
            <Calendar
                events={app.events}
                startDate={new Date(Date.parse(relay.variables.startDate.split(' ').shift()))}
                onNextWeek={() => this.offsetDate(+7)}
                onPreviousWeek={() => this.offsetDate(-7)} />
        );
    }
}

export default Relay.createContainer(HomePageCalendar, {
    initialVariables: {
        startDate: getSunday(),
        endDate: getEndOfWeek(getSunday()),
    },
    prepareVariables: vars => ({
        startDate: moment(vars.startDate).format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(vars.endDate).format('YYYY-MM-DD HH:mm:ss'),
    }),
    fragments: {
        app: () => Relay.QL`
            fragment on App {
                events (startDate: $startDate, endDate: $endDate) {
                    id
                    name
                    description
                    startDate
                    endDate
                    committee {
                        name
                    }
                }
            }
        `,
    },
});
