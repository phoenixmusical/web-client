import React, { Component } from 'react';
import Relay from 'react-relay';
import CommitteePosts from './posts/CommitteePosts';
import AddPost from './posts/AddPost';

class CommitteePage extends Component {
    render () {
        const { committee, viewer } = this.props;
        return (
            <div>
                <h1>{committee.name}</h1>
                <h3>Messages</h3>
                <AddPost
                    viewer={viewer}
                    committee={committee} />
                <CommitteePosts
                    committee={committee} />
            </div>
        );
    }
}

export default Relay.createContainer(CommitteePage, {
    fragments: {
        committee: () => Relay.QL`
            fragment on Committee {
                name
                ${AddPost.getFragment('committee')}
                ${CommitteePosts.getFragment('committee')}
            }
        `,
        viewer: () => Relay.QL`
            fragment on User {
                ${AddPost.getFragment('viewer')}
            }
        `,
    },
});
