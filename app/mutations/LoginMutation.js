import Relay from 'react-relay';

export default class LoginMutation extends Relay.Mutation {
    getMutation () {
        return Relay.QL`mutation { login }`;
    }

    getVariables () {
        return {
            email: this.props.email,
            password: this.props.password,
        };
    }

    getFatQuery () {
        return Relay.QL`
            fragment on LoginMutationPayload {
                user
            }
        `;
    }

    getConfigs () {
        return [
            {
                type: 'REQUIRED_CHILDREN',
                children: [
                    Relay.QL`
                        fragment on LoginMutationPayload {
                            user
                        }
                    `,
                ],
            },
        ];
    }
}
