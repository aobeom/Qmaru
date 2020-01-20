import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import IndexPage from './components/Index'
import Picture from './components/Picture'
import Drama from './components/Drama'
import Program from './components/Program'
import Stchannel from './components/Stchannel'
import Radiko from './components/Radiko'
import NotFoundPage from './components/NotFoundPage'

import PicIcon from '@material-ui/icons/Instagram';
import DramaIcon from '@material-ui/icons/Tv'
import ProgramIcon from '@material-ui/icons/PlaylistAddCheck';
import STIcon from '@material-ui/icons/YouTube';
import RadikoIcon from '@material-ui/icons/Radio'


import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'


const theme = global.constants.theme


const MyTab = withStyles({
    root: {
        color: theme.fourthColor,
        "&:hover": {
            color: theme.otherColor
        },
        '&$selected': {
            color: theme.otherColor,
        }
    },
    selected: {
        "&:hover": {
            color: theme.otherColor,
        }
    }
})(Tab)


const styles = ({
    wrapper: {
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    header: {
        backgroundColor: theme.textColor,
        top: "auto",
        bottom: 0,
    },
    tabsWrapper: {
        justifyContent: "center"
    },
    tabsIndicator: {
        backgroundColor: theme.otherColor,
    },
    main: {
        flex: "1",
        margin: "0 auto",
        maxWidth: "640px",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        paddingBottom: "30px",
    }
})

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabValue: undefined,
            titles: [
                { "title": "PICTURE", "icon": <PicIcon />, "id": 0},
                { "title": "DRAMA", "icon": <DramaIcon />, "id": 1},
                { "title": "PROGRAM", "icon": <ProgramIcon />, "id": 2},
                { "title": "STCHANNEL", "icon": <STIcon />, "id": 3},
                { "title": "RADIKO", "icon": <RadikoIcon />, "id": 4}
            ],
            width: props.width || -1,
            routers: [
                { "path": "/picture", "component": Picture },
                { "path": "/drama", "component": Drama },
                { "path": "/program", "component": Program },
                { "path": "/stchannel", "component": Stchannel },
                { "path": "/radiko", "component": Radiko },
            ],
        }
    }
    componentDidMount() {
        this.updateBar()
    }
    updateBar() {
        let titles = this.state.titles
        let uri = window.location.pathname.split('/')[1]
        for (let i in titles) {
            let data = titles[i]
            let title = data["title"].toLowerCase()
            if (title === uri) {
                this.setState({
                    tabValue: parseInt(i)
                })
            }
        }
        if (uri === "") {
            this.setState({
                tabValue: undefined
            })
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    tabSwitch(e, newValue) {
        this.setState({
            tabValue: newValue
        })
    }
    render() {
        const titles = this.state.titles
        const tabValue = this.state.tabValue
        const { classes } = this.props
        const routers = this.state.routers
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
                                        onChange={this.tabSwitch.bind(this)}
                                    >
                                        {titles.map((title, index) => (
                                            <MyTab
                                                key={"r" + index}
                                                // label={title.title}
                                                icon={title.icon}
                                                component={Link}
                                                to={title.title.toLowerCase()}
                                            />
                                        ))}
                                    </Tabs>
                                </AppBar>
                            </Typography>

                            <Typography component='div' className={classes.main}>
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.key}
                                        timeout={300}
                                        classNames="spec"
                                        unmountOnExit
                                        appear
                                    >
                                        <Typography component='div' key={location.pathname} >
                                            <Switch>
                                                <Route path="/" exact component={IndexPage} />
                                                {routers.map((route, index) => (
                                                    <Route
                                                        key={"r" + index}
                                                        path={route.path}
                                                        exact
                                                        component={route.component}
                                                        id={`scrollable-prevent-tabpanel-${index}`}
                                                        aria-labelledby={`scrollable-prevent-tab-${index}`}
                                                    />
                                                ))}
                                                <Route path="*" exact component={NotFoundPage} />
                                            </Switch>
                                        </Typography>
                                    </CSSTransition>
                                </TransitionGroup>
                            </Typography>
                        </Typography>
                    )} />
                </BrowserRouter>
            </MuiPickersUtilsProvider>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
