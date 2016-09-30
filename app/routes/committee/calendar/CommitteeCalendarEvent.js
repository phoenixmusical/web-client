import React, { Component } from 'react';
import { FormattedTime } from 'react-intl';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

export default class CommitteeCalendarEvent extends Component {
    render () {
        const { event } = this.props;
        const startDate = new Date(Date.parse(event.startDate));
        const endDate = new Date(Date.parse(event.endDate));
        return (
            <Card>
                <CardHeader
                    title={event.name}
                    subtitle={(
                        <span>
                            <FormattedTime value={startDate} /> - <FormattedTime value={endDate} />
                        </span>
                    )}
                    textStyle={{ padding: 0 }}
                    actAsExpander />
                    <CardText expandable>
                        {event.description}
                    </CardText>
            </Card>
        );
    }
}
