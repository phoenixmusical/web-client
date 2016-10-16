import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddPostMutation from '../../../mutations/AddPostMutation';

const CREATE_BUTTON_CONTAINER_STYLE = {
    position: 'relative',
};

const CREATE_BUTTON_STYLE = {
    position: 'absolute',
    left: 330,
    top: -27,
};

class AddPost extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isCreating: false,
            name: '',
        };

        this.handleClickStartCreating = this.handleClickStartCreating.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClickCreate = this.handleClickCreate.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
    }

    handleClickStartCreating () {
        this.setState({
            isCreating: true,
        });
    }

    handleNameChange (event) {
        this.setState({
            name: event.target.value,
        });
    }

    handleClickCreate () {
        console.log('create post', this.state.name);
        this.setState({
            isCreating: false,
            name: '',
        });
        this.props.relay.commitUpdate(new AddPostMutation({
            committee: this.props.committee,
            viewer: this.props.viewer,
            name: this.state.name,
        }));
    }

    handleClickCancel () {
        this.setState({
            isCreating: false,
            name: '',
        });
    }

    render () {
        if (!this.state.isCreating) {
            return (
                <div style={CREATE_BUTTON_CONTAINER_STYLE}>
                    <FloatingActionButton
                        style={CREATE_BUTTON_STYLE}
                        secondary={true}
                        onClick={this.handleClickStartCreating}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            );
        }

        return (
            <div>
                <TextField
                    floatingLabelText="Nom de la conversation"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    rows={1}
                    rowsMax={6} />
                <FlatButton
                    label="Créer"
                    onClick={this.handleClickCreate} />
                <FlatButton
                    label="Annuler"
                    onClick={this.handleClickCancel} />
            </div>
        );
    }
}

export default Relay.createContainer(AddPost, {
    fragments: {
        committee: () => Relay.QL`
            fragment on Committee {
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
