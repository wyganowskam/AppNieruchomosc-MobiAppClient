import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '../../styles/appColors';
import SurveyFill from './SurveyFillScreen';
import SurveyResults from './SurveyResultsScreen';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: grey,
    },
  },
});


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar:{
      backgroundColor: '#ffffff',
      color: '#444444',
      textTransform: 'none'
  },
  tab: {
    textTransform: 'none'
  }
}));

export default function Survey(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const surveyId = props.route.params.surveyId;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <ThemeProvider theme={theme}>
      <AppBar className={classes.appBar} position="static" elevation={1}>
        <Tabs variant="fullWidth" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab className={classes.tab} label="Ankieta" {...a11yProps(0)} />
          <Tab className={classes.tab} label="Wyniki" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <SurveyFill surveyId={surveyId}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SurveyResults surveyId={surveyId}/>
      </TabPanel>
      </ThemeProvider>
    </div>
  );
}
