import React, { Component } from 'react';
import Relay from 'react-relay';
import { FormattedDate } from 'react-intl';
import Linkify from 'react-linkify';
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';

const CARD_STYLE = {
    marginBottom: 10,
};

class PostMessage extends Component {
    render () {
        const { message } = this.props;
        return (
            <Card style={CARD_STYLE}>
                <CardHeader
                    title={message.addedBy.firstname}
                    subtitle={(
                        <FormattedDate
                            year="numeric"
                            month="long"
                            day="numeric"
                            hour="numeric"
                            minute="numeric"
                            value={new Date(Date.parse(message.addedOn))} />
                    )} />
                <CardText>
                    {message.content.split('\n').map((line, index) => (
                        <span key={index}>
                            <Linkify>
                                {line}
                            </Linkify>
                            <br />
                        </span>
                    ))}
                </CardText>
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
