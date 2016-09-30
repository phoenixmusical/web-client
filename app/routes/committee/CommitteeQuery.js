import Relay from 'react-relay';

export default {
    committee: () => Relay.QL`
        query {
            node (id: $id)
        }
    `,
};
