import Relay from 'react-relay';

export default {
    post: () => Relay.QL`
        query {
            node (id: $id)
        }
    `,
    viewer: () => Relay.QL`
        query {
            viewer
        }
    `,
};
