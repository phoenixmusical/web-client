import React, { Component } from 'react';
import Relay from 'react-relay';
import PostMessages from './messages/PostMessages';
import WriteMessage from './WriteMessage';

class PostPage extends Component {
    render () {
        const { post, viewer } = this.props;
        return (
            <div>
                <h1>{post.name}</h1>
                <PostMessages post={post} />
                <WriteMessage post={post} viewer={viewer} />
            </div>
        );
    }
}

export default Relay.createContainer(PostPage, {
    fragments: {
        post: () => Relay.QL`
            fragment on Post {
                name
                ${PostMessages.getFragment('post')}
                ${WriteMessage.getFragment('post')}
            }
        `,
        viewer: () => Relay.QL`
            fragment on User {
                ${WriteMessage.getFragment('viewer')}
            }
        `,
    },
});
