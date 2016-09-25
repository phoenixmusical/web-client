import Relay from 'react-relay';

export default {
    comities: () => Relay.QL`query {
      comities {
        id,
        name,
      }
    }`,
};
