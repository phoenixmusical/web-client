import React, { Component } from 'react';
import Relay from 'react-relay';
import { FormattedDate } from 'react-intl';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

class PostMessage extends Component {
    render () {
        const { message } = this.props;
        return (
            <Card>
                <CardHeader
                    title={message.addedBy.firstname}
                    subtitle={(
                        <FormattedDate
                            year="numeric"
                            month="long"
                            day="numeric"
                            value={new Date(Date.parse(message.addedOn))} />
                    )} />
                <CardText>{message.content}</CardText>
            </Card>
        );
    }
}

export default Relay.createContainer(PostMessage, {
    fragments: {
        message: () => Relay.QL`
            fragment on Message {
                content
                addedOn
                addedBy {
                    firstname
                }
            }
        `,
    },
});
