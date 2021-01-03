import { makeStyles } from '@material-ui/core/styles'

const useStylesForm = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(14, 6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '90%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '70%',
      },
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(6, 0, 2),
      color: '#ffffff',
      backgroundColor: '#0097a7',
      '&:hover': {
        background: "#0097a7",
     },
     outline: 'none'
    },
    outlineInput: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#bdbdbd",
        borderWidth: '1px',
        borderRadius: '0px'
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#757575",
        borderWidth: '1px',
        borderRadius: '0px'
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#777777",
        borderWidth: '1px',
        borderRadius: '0px'
      }
    }
  })) ;

  export default useStylesForm