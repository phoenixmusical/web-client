import Relay from 'react-relay';

export default class WriteMessageMutation extends Relay.Mutation {
    getMutation () {
        return Relay.QL`mutation { writeMessage }`;
    }

    getVariables () {
        return {
            postId: this.props.post.id,
            content: this.props.content,
        };
    }

    getFatQuery () {
        return Relay.QL`
            fragment on WriteMessagePayload @relay(pattern: true) {
                post {
                    messages
                }
                messageEdge
            }
        `;
    }

    getConfigs () {
        return [
            {
                type: 'RANGE_ADD',
                parentName: 'post',
                parentID: this.props.post.id,
                connectionName: 'messages',
                edgeName: 'messageEdge',
                rangeBehaviors: ({ orderby }) => {
                    if (orderby === 'newest') {
                        return 'prepend';
                    } else {
                        return 'append';
                    }
                },
            },
        ];
    }

    getOptimisticResponse () {
        const { post, viewer, content } = this.props;
        const now = new Date().toISOString();
        const message = {
            content: content,
            addedOn: now,
            updatedOn: now,
            addedBy: viewer,
        };

        return {
            post: {
                id: post.id,
            },
            messageEdge: {
                node: message,
            },
        };
    }
}
