import React, { Component } from 'react';
import Relay from 'react-relay';
import PostMessage from './PostMessage';

class PostMessages extends Component {
    render () {
        const { post } = this.props;
        return (
            <div>
                {post.messages.edges.map((edge, index) => (
                    <PostMessage
                        key={index}
                        message={edge.node} />
                ))}
            </div>
        );
    }
}

export default Relay.createContainer(PostMessages, {
    fragments: {
        post: () => Relay.QL`
            fragment on Post {
                messages (first: 100) {
                    edges {
                        node {
                            ${PostMessage.getFragment('message')}
                        }
                    }
                }
            }
        `,
    },
});
