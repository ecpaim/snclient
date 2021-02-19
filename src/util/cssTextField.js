import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'rgba(0,0,0,0.13)',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'rgba(0,0,0,0.13)',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(0,0,0,0.13)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(0,0,0,0.13)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(0,0,0,0.13)',
        },
      },
    },
  })(TextField);

export default CssTextField;

