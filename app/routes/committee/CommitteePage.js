import React, { Component } from 'react';
import Relay from 'react-relay';
import CommitteeCalendar from './calendar/CommitteeCalendar';
import CommitteePosts from './posts/CommitteePosts';

class CommitteePage extends Component {
    render () {
        const { committee } = this.props;
        return (
            <div>
                <h1>{committee.name}</h1>
                <CommitteeCalendar committee={committee} />
                <h3>Messages</h3>
                <CommitteePosts committee={committee} />
            </div>
        );
    }
}

export default Relay.createContainer(CommitteePage, {
    fragments: {
        committee: () => Relay.QL`
            fragment on Committee {
                id
                name
                ${CommitteeCalendar.getFragment('committee')}
                ${CommitteePosts.getFragment('committee')}
            }
        `,
    },
});
