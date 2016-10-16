import React, { Component } from 'react';
import Relay from 'react-relay';
import querystring from 'querystring';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';
import MessageCard from '../../../components/MessageCard';

const linkify = new LinkifyIt();
linkify.tlds(tlds);

class PostMessage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            mediaLoading: false,
            media: null,
        };
    }

    componentDidMount () {
        const { message } = this.props;
        if (message && message.content) {
            this.checkMedia(message.content);
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.message && nextProps.message.content) {
            this.checkMedia(nextProps.message.content);
        }
    }

    checkMedia (text) {
        console.log('checkMedia', text);
        const matches = linkify.match(text);
        if (matches && matches[0]) {
            this.loadMedia(matches[0].url);
        }
    }

    loadMedia (url) {
        console.log('loadMedia', url);
        this.setState({
            mediaLoading: true,
            media: null,
        });
        fetch('/scraper?' + querystring.stringify({ url }))
            .then(result => result.json())
            .then(result => {
                console.log('result', result);
                this.setState({
                    mediaLoading: false,
                    media: result.meta,
                });
            })
            .catch(error => {
                console.error(error.stack || error);
                this.setState({
                    mediaLoading: false,
                    media: null,
                });
            });
    }

    render () {
        const { message } = this.props;
        const { media } = this.state;
        return (
            <MessageCard
                text={message.content}
                author={message.addedBy.firstname}
                date={new Date(Date.parse(message.addedOn))}
                media={media} />
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
