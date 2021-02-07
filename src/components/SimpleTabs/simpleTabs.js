import React from 'react';
import PropTypes from 'prop-types';
import {withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ReactQuill from 'react-quill';
import style from "./simpleTabs.module.css";

const StyledTabs = withStyles({
    root: {
        borderBottom: '.5rem solid var(--durfYellow)'
    },

    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: '100%',
        zIndex: '-1',
        '& > span': {
            width: '100%',
            height: '100%',
            borderRadius: '.5rem .5rem 0 0',
            backgroundColor: '#ffed00',
            zIndex: '-1',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontFamily: "Montserrat_black",
    fontSize: '1.6rem',
    color: 'black',
    '&:focus': {
      opacity: 1,
    },
    
  },
}))((props) => <Tab disableRipple {...props} />);

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
          <Box className={style.tabContainer} p={3}>
            {children}
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

export default function CustomizedTabs(data) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div className={style.tabs__container}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="Workflows" {...a11yProps(0)}/>
          <StyledTab label="Datasets" {...a11yProps(1)}/>
          <StyledTab label="Connections" {...a11yProps(2)}/>
          <StyledTab label="Connections" {...a11yProps(3)}/>
        </StyledTabs>
        <TabPanel value={value} index={0}>
            <ReactQuill 
                readOnly={true}
                modules={{ "toolbar": false }}
                value={data.description}
                style={{height: '50rem', border:"1rem solid transparent", overflow:"hidden", marginTop: '2rem', marginBottom: '6rem'}}
            />

        </TabPanel>
        <TabPanel value={value} index={1}>
            Item two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
            Item Four
        </TabPanel>
      </div>
  );
}
