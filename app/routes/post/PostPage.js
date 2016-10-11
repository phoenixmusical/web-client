import React, { Component } from 'react';
import Relay from 'react-relay';
import PostMessages from './messages/PostMessages';

class PostPage extends Component {
    render () {
        const { post } = this.props;
        return (
            <div>
                <h1>{post.name}</h1>
                <PostMessages post={post} />
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
            }
        `,
    },
});
