import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import WriteMessageMutation from '../../mutations/WriteMessageMutation';

const CARD_STYLE = {
    marginBottom: 10,
};

class WriteMessage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: '',
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
    }

    handleTextChange (event) {
        this.setState({
            text: event.target.value,
        });
    }

    handleClickSend () {
        const { post, viewer } = this.props;
        const { text } = this.state;
        console.log('save message', text);
        this.setState({
            text: '',
        });
        this.props.relay.commitUpdate(new WriteMessageMutation({
            post: post,
            viewer: viewer,
            content: text,
        }));
    }

    render () {
        const { post, viewer } = this.props;
        return (
            <Card style={CARD_STYLE}>
                <CardHeader
                    title={viewer && viewer.firstname} />
                <CardText>
                    <TextField
                        hintText="Écrivez un message..."
                        value={this.state.text}
                        onChange={this.handleTextChange}
                        fullWidth={true}
                        multiLine={true}
                        rows={1}
                        rowsMax={6} />
                </CardText>
                <CardActions>
                    <FlatButton
                        label="Envoyer"
                        onClick={this.handleClickSend} />
                </CardActions>
            </Card>
        );
    }
}

export default Relay.createContainer(WriteMessage, {
    fragments: {
        post: () => Relay.QL`
            fragment on Post {
                id
            }
        `,
        viewer: () => Relay.QL`
            fragment on User {
                firstname
            }
        `,
    },
});
