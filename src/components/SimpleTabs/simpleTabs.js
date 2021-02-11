import React, {useState} from 'react';
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
    fontFamily: "Montserrat",
    fontWeight: 'var(--weightBlack);',
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
    const [value, setValue] = useState(0);

    
    let buttonOneDisplay = 'hidden';
    let buttonTwoDisplay = 'hidden';
    let quillHeight = '50rem';

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const foldOut = () =>    {
        quillHeight = '100%';
        buttonOneDisplay = 'hidden';
        buttonTwoDisplay = 'visible';
    };

    const foldDown = () =>{
        quillHeight = '50rem';
        buttonOneDisplay = 'visible';
        buttonTwoDisplay = 'hidden';
    };

    const getMonthName = (month) => {
        switch(month) {
            case 0:
                return 'januari';
            case 1:
                return 'januari';
            case 2:
                return 'januari';
            case 3:
                return 'januari';
            case 4:
                return 'januari';
            case 5:
                return 'januari';
            case 6:
                return 'januari';
            case 7:
                return 'januari';
            case 8:
                return 'januari';
            case 9:
                return 'januari';
            case 10:
                return 'januari';
            case 11:
                return 'januari';
            default:
                return 'januari';
        }
    }

    return (
        <div className={style.tabs__container}>
            <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
            <StyledTab label="Project" {...a11yProps(0)}/>
            <StyledTab label="FAQ" {...a11yProps(1)}/>
            <StyledTab label={`Updates ${data.project.updates.length}`} {...a11yProps(2)}/>
            <StyledTab label="Over ons" {...a11yProps(3)}/>
            </StyledTabs>
            <TabPanel value={value} index={0}>
                <ReactQuill 
                    readOnly={true}
                    modules={{ "toolbar": false }}
                    value={data.description}
                    style={{height: quillHeight, border:"1rem solid transparent", overflow:"hidden", marginTop: '2rem', marginBottom: '6rem'}}
                />
                <button style={{visibility: buttonOneDisplay}} onClick={() => foldOut}>
                    Lees meer
                    <img src='./assests/icons/readMore.svg' alt="icon"/>
                </button>
                <button style={{visibility: buttonTwoDisplay}} onClick={() => foldDown}>
                    Lees minder
                    <img src='./assests/icons/readLess.svg' alt="icon"/>    
                </button>

            </TabPanel>
            <TabPanel value={value} index={1}>
                Item two
            </TabPanel>
            <TabPanel value={value} index={2}>
            {data.project.updates.length > 0 ? 
                <div className={style.updates}>
                    {data.project.updates.map((update, index) => {
                        let date = new Date(update.date)
                        return (<div key={`updateNr${index}`} className={style.update}>
                                    <span className={style.update__bol}></span>
                                    <p className={style.date}>{date.getDate()} {getMonthName(date.getMonth())} {(date.getFullYear())}</p>
                                    <p className={style.description}>{update.content}</p>
                                </div>)
                    })}
                </div>
                :''
                }
            </TabPanel>
            <TabPanel value={value} index={3}>
                {data.project.personalIntroduction}
            </TabPanel>
        </div>
    );
}
