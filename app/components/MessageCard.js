import React, { Component } from 'react';
import { FormattedDate } from 'react-intl';
import Linkify from 'react-linkify';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const CARD_STYLE = {
    marginBottom: 10,
};

export default class MessageCard extends Component {
    render () {
        const { date, author, text, media } = this.props;
        return (
            <Card style={CARD_STYLE}>
                <CardHeader
                    title={author}
                    subtitle={(
                        <FormattedDate
                            year="numeric"
                            month="long"
                            day="numeric"
                            hour="numeric"
                            minute="numeric"
                            value={date} />
                    )} />
                <CardText>
                    {text.split('\n').map((line, index) => (
                        <span key={index}>
                            <Linkify>
                                {line}
                            </Linkify>
                            <br />
                        </span>
                    ))}
                </CardText>
                {media && media.image ? (
                    <CardMedia
                        overlay={(
                            <CardTitle
                                title={media.title}
                                subtitle={media.description} />
                        )}>
                        <img src={media.image.url} />
                    </CardMedia>
                ) : null}
            </Card>
        );
    }
}
