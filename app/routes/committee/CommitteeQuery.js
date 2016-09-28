import Relay from 'react-relay';

export default {
    committee: () => Relay.QL`
        query {
            committee (id: $id)
        }
    `,
};
