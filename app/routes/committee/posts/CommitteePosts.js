import React, { Component } from 'react';
import Relay from 'react-relay';
import { FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { darkBlack } from 'material-ui/styles/colors';

function ellipsis(text, length) {
    if (text.length <= length) {
        return text;
    } else {
        return text.substr(0, length) + '...';
    }
}

class CommitteePosts extends Component {
    render () {
        const { committee } = this.props;
        const posts = committee.posts.edges.map(edge => {
            const post = edge.node;
            const message = post.messages.edges[0].node;
            return {
                id: post.id,
                name: post.name,
                addedOn: new Date(Date.parse(message.addedOn)),
                addedBy: message.addedBy,
                content: message.content,
            };
        });
        const daysMap = {};
        posts.forEach(function (post) {
            const day = moment(post.addedOn).format('YYYY-MM-DD');
            if (daysMap[day]) {
                daysMap[day].posts.push(post);
            } else {
                daysMap[day] = {
                    date: post.addedOn,
                    posts: [post],
                };
            }
        });

        return (
            <div style={{ maxWidth: 360, width: '100%', border: 'solid 1px #d9d9d9' }}>
                <List>
                    {Object.keys(daysMap).sort().map(day => [
                        <Subheader key="date">
                            <FormattedRelative
                                units="day"
                                value={daysMap[day].date} />
                        </Subheader>,
                        daysMap[day].posts.map(post => (
                            <ListItem
                                key={post.id}
                                href={`/post/${post.id}`}
                                primaryText={post.name}
                                secondaryText={(
                                    <p>
                                        <span style={{ color: darkBlack }}>
                                            {post.addedBy.firstname}
                                        </span> -- {ellipsis(post.content, 50)}
                                    </p>
                                )}
                                secondaryTextLines={2} />
                        )),
                        <Divider />,
                    ])}
                </List>
            </div>
        );
    }
}

export default Relay.createContainer(CommitteePosts, {
    fragments: {
        committee: () => Relay.QL`
            fragment on Committee {
                posts (last: 10) {
                    edges {
                        node {
                            id
                            name
                            messages (last: 1) {
                                edges {
                                    node {
                                        content
                                        addedOn
                                        addedBy {
                                            firstname
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
    },
});
