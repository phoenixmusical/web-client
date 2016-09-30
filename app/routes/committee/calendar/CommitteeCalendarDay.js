import React, { Component } from 'react';
import { FormattedDate } from 'react-intl';
import Subheader from 'material-ui/Subheader';
import CommitteeCalendarEvent from './CommitteeCalendarEvent';

export default class CommitteeCalendarDay extends Component {
    render () {
        const { date, events } = this.props;
        return (
            <div style={{ float: 'left', width: (100 / 7) + '%', height: 340 }}>
                <div style={{
                    border: 'solid 1px #f0f0f0',
                    background: '#fdfdfd',
                    margin: 2,
                }}>
                    <Subheader>
                        <FormattedDate
                            weekday="long"
                            value={date} />
                    </Subheader>
                    <div style={{ fontSize: 12, paddingLeft: 16, color: 'rgba(0, 0, 0, 0.54)' }}>
                        <FormattedDate
                            month="short"
                            day="2-digit"
                            value={date} />
                    </div>
                    <div style={{ overflow: 'auto', height: 250, padding: '12px 6px' }}>
                        {events.map(event => (
                            <CommitteeCalendarEvent
                                key={event.id}
                                event={event} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
