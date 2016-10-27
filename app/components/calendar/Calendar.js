import React, { Component } from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/IconButton';
import CalendarDay from './CalendarDay';

export default class Calendar extends Component {
    render () {
        const { events, startDate, onNextWeek, onPreviousWeek } = this.props;
        const dates = [];
        const daysMap = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate.getTime());
            date.setDate(date.getDate() + i);
            dates.push(date);
            daysMap[i] = [];
        }

        events.forEach(event => {
            const date = new Date(Date.parse(event.startDate));
            daysMap[date.getDay()].push(event);
        });

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <IconButton
                        iconClassName="mdi mdi-arrow-left-bold"
                        onClick={onPreviousWeek} />
                    <IconButton
                        iconClassName="mdi mdi-arrow-right-bold"
                        onClick={onNextWeek} />
                </div>
                {dates.map(date => (
                    <CalendarDay
                        key={date.getDay()}
                        date={date}
                        events={daysMap[date.getDay()] || []} />
                ))}
            </div>
        );
    }
}
