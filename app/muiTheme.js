import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orange500, orange700, grey100, grey400, deepOrange500 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: orange500,
        primary2Color: orange700,
        primary3Color: grey400,
        accent1Color: deepOrange500,
        accent2Color: grey100,
        accent3Color: orange500,
    },
});

export default muiTheme;
