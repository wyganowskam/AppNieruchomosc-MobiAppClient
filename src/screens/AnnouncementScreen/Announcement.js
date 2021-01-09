import React, { useState, useEffect } from 'react'
import announcementService from '../../services/announcement.service'
import AnnouncementDetails from './AnnouncementDetails'
import AnnouncementComments from './AnnouncementComments'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {grey} from '../../styles/appColors';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  theme.palette.primary.main= grey;
  const [value, setValue] = React.useState(0);
  const announcementId = props.route.params.announcementId;
  const [announcement, setAnnouncement] = useState({});

  useEffect(() => {

      const redirectToAnnouncementList = () => {          
          props.navigation.push('announcements');
      }

      announcementService.getAnnouncementDetails(announcementId).then(
          res => {         
              setAnnouncement(res.data); 
          },
          (error) => {
              redirectToAnnouncementList();
          }
        ).catch(e => { redirectToAnnouncementList() });
  }, [announcementId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Ogłoszenie" {...a11yProps(0)} />
          <Tab label="Komentarze" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <AnnouncementDetails announcement={announcement} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <AnnouncementComments announcement={announcement} announcementId={announcementId} />
        </TabPanel>

      </SwipeableViews>
    </div>
  );
}
