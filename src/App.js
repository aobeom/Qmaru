import React, { useState } from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { withStyles, makeStyles } from '@material-ui/core/styles'

import Picture from './components/Picture'
import Drama from './components/Drama'
import Program from './components/Program'
import Stchannel from './components/Stchannel'
import Radiko from './components/Radiko'

import PicIcon from '@material-ui/icons/Instagram'
import DramaIcon from '@material-ui/icons/Tv'
import ProgramIcon from '@material-ui/icons/PlaylistAddCheck'
import STIcon from '@material-ui/icons/YouTube'
import RadikoIcon from '@material-ui/icons/Radio'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import DateFnsUtils from '@date-io/date-fns'

const mainColor = global.constants.theme

const MyTab = withStyles({
    root: {
        color: mainColor.fourthColor,
        "&:hover": {
            color: mainColor.otherColor
        },
        '&$selected': {
            color: mainColor.otherColor,
        }
    },
    selected: {
        "&:hover": {
            color: mainColor.otherColor,
        }
    }
})(Tab)

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    header: {
        backgroundColor: mainColor.textColor,
        top: "auto",
        bottom: 0,
    },
    tabsWrapper: {
        justifyContent: "center"
    },
    tabsIndicator: {
        backgroundColor: mainColor.otherColor,
    },
    main: {
        flex: "1",
        margin: "0 auto",
        maxWidth: 640,
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        paddingBottom: 30,
    },
    footer: {
        width: "auto",
        bottom: 0,
        textAlign: "center",
        fontSize: 16,
        height: 80,
    },
    footerSpan: {
        height: 50,
        color: mainColor.primaryColor,
        cursor: "default",
    },
}))

export default function App() {
    const classes = useStyles()
    const titles = [
        { "title": "PICTURE", "icon": <PicIcon /> },
        { "title": "DRAMA", "icon": <DramaIcon /> },
        { "title": "PROGRAM", "icon": <ProgramIcon /> },
        { "title": "STCHANNEL", "icon": <STIcon /> },
        { "title": "RADIKO", "icon": <RadikoIcon /> }
    ]
    const routers = [
        { "path": "/picture", "component": Picture },
        { "path": "/drama", "component": Drama },
        { "path": "/program", "component": Program },
        { "path": "/stchannel", "component": Stchannel },
        { "path": "/radiko", "component": Radiko },
    ]
    const [tabValue, setTabValue] = useState(0)

    const tabSwitch = (e, newValue) => {
        setTabValue(newValue)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <BrowserRouter>
                <Route render={({ location }) => (
                    <Typography component='div' className={classes.wrapper}>
                        <Typography component='div'>
                            <AppBar position="fixed" className={classes.header}>
                                <Tabs
                                    classes={{
                                        flexContainer: classes.tabsWrapper,
                                        indicator: classes.tabsIndicator
                                    }}
                                    value={tabValue}
                                    onChange={tabSwitch}
                                >
                                    {titles.map((title, index) => (
                                        <MyTab
                                            key={"r" + index}
                                            icon={title.icon}
                                            component={Link}
                                            to={title.title.toLowerCase()}
                                            replace
                                        />
                                    ))}
                                </Tabs>
                            </AppBar>
                        </Typography>

                        <Typography component='div' className={classes.main}>
                            {/* <TransitionGroup>
                                <CSSTransition
                                    key={location.key}
                                    timeout={300}
                                    classNames="spec"
                                    unmountOnExit
                                    appear
                                > */}
                                    <Typography component='div' key={location.pathname} >
                                        <Switch>
                                            {routers.map((route, index) => (
                                                <Route
                                                    key={"r" + index}
                                                    path={route.path}
                                                    exact
                                                    component={route.component}
                                                />
                                            ))}
                                            <Redirect to="/picture" />
                                        </Switch>
                                    </Typography>
                                {/* </CSSTransition>
                            </TransitionGroup> */}
                        </Typography>
                        <Typography component='div' className={classes.footer}>
                            <Typography component='span' className={classes.footerSpan}>
                                © 2017-2020
                            </Typography>
                        </Typography>
                    </Typography>
                )} />
            </BrowserRouter>
        </MuiPickersUtilsProvider>
    )
}
