import Relay from 'react-relay';

export default {
    comity: () => Relay.QL`
        query {
            comity (id: $id)
        }
    `,
};
