import Relay from 'react-relay';

export default class AddPostMutation extends Relay.Mutation {
    getMutation () {
        return Relay.QL`mutation { addPost }`;
    }

    getVariables () {
        return {
            committeeId: this.props.committee.id,
            name: this.props.name,
        };
    }

    getFatQuery () {
        return Relay.QL`
            fragment on AddPostPayload @relay(pattern: true) {
                committee {
                    posts
                }
                postEdge
            }
        `;
    }

    getConfigs () {
        return [
            {
                type: 'RANGE_ADD',
                parentName: 'committee',
                parentID: this.props.committee.id,
                connectionName: 'posts',
                edgeName: 'postEdge',
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
        const { committee, viewer, name } = this.props;
        const now = new Date().toISOString();
        const post = {
            name: name,
            addedOn: now,
            updatedOn: now,
            addedBy: viewer,
        };

        return {
            committee: {
                id: committee.id,
            },
            postEdge: {
                node: post,
            },
        };
    }
}
