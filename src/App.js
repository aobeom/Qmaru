import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import IndexPage from './components/Index'
import Picture from './components/Picture'
import Drama from './components/Drama'
import Program from './components/Program'
import Stchannel from './components/Stchannel'
// import Auth from './components/Auth'

import NotFoundPage from './components/NotFoundPage'

import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    header: {
        backgroundColor: theme.tipColor,
    },
    main: {
        flex: "1",
        margin: "0 auto",
        maxWidth: "640px",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        paddingBottom: "30px",
    },
    footer: {
        width: "auto",
        bottom: "0",
        textAlign: "center",
        fontSize: "16px",
        height: "30px",
    },
    footerSpan: {
        height: "50px",
        color: theme.primaryColor,
        cursor: "default",
    },
})

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titles: ["PICTURE", "DRAMA", "PROGRAM", "STCHANNEL"],
            paths: ["picture", "drama", "program", "stchannel"],
            site: {
                color: theme.textColor,
                fontWeight: "1000",
                fontSize: "1.5rem",
                margin: "0",
            },
            width: props.width || -1,
            routers: [
                { "path": "/", "component": IndexPage },
                { "path": "/picture", "component": Picture },
                { "path": "/drama", "component": Drama },
                { "path": "/program", "component": Program },
                { "path": "/stchannel", "component": Stchannel },
                // { "path": "/auth", "component": Auth },
                { "path": "*", "component": NotFoundPage },
            ],
        }
    }
    componentDidMount() {
        this.updateSize()
        window.addEventListener('resize', () => this.updateSize())
        this.updateBar()
    }
    updateBar() {
        let uri = window.location.pathname.split('/')[1]
        let index = ""
        if (this.state.paths.indexOf(uri) !== "-1") {
            index = this.state.paths.indexOf(uri)
        }
        this.setState({
            currentindex: String(index)
        })
    }
    updateSize() {
        let { width } = this.props
        if (!width) {
            width = document.body.clientWidth
            if (width > 450 & width < 640) {
                this.setState({
                    btnUp: {
                        padding: "10px",
                        fontWeight: "600",
                        color: theme.thirdlyColor,
                        minWidth: "32px",
                    },
                    btnDown: {
                        padding: "10px",
                        fontWeight: "600",
                        color: theme.otherColor,
                        minWidth: "32px",
                    },
                    linkUp: {
                        position: "relative",
                        left: "20px",
                        color: theme.thirdlyColor,
                        textDecoration: "none",
                        display: "block",
                    },
                    linkDown: {
                        position: "relative",
                        left: "20px",
                        color: theme.otherColor,
                        textDecoration: "none",
                        display: "block",
                    },
                    site: {
                        color: theme.otherColor,
                        fontWeight: "1000",
                        fontSize: "1.35rem",
                        margin: "0"
                    },
                    titles: [
                        { name: "PICTURE", id: "0" },
                        { name: "DRAMA", id: "1" },
                        { name: "PROGRAM", id: "2" },
                        { name: "STCHANNEL", id: "3" },
                    ],
                })
            } else if (width > 400 & width < 450) {
                this.setState({
                    btnUp: {
                        padding: "8px",
                        fontWeight: "600",
                        color: theme.thirdlyColor,
                        minWidth: "32px",
                    },
                    btnDown: {
                        padding: "8px",
                        fontWeight: "600",
                        color: theme.otherColor,
                        minWidth: "32px",
                    },
                    linkUp: {
                        position: "relative",
                        left: "8px",
                        color: theme.thirdlyColor,
                        textDecoration: "none",
                        display: "block",
                    },
                    linkDown: {
                        position: "relative",
                        left: "8px",
                        color: theme.otherColor,
                        textDecoration: "none",
                        display: "block",
                    },
                    site: {
                        color: theme.otherColor,
                        fontWeight: "1000",
                        fontSize: "1.2rem",
                        margin: "0"
                    },
                    titles: [
                        { name: "PIC", id: "0" },
                        { name: "DRAMA", id: "1" },
                        { name: "PROG", id: "2" },
                        { name: "ST", id: "3" },
                    ],
                })
            } else if (width < 400) {
                this.setState({
                    btnUp: {
                        fontWeight: "600",
                        color: theme.thirdlyColor,
                        minWidth: "32px",
                        padding: "8px",
                    },
                    btnDown: {
                        fontWeight: "600",
                        color: theme.otherColor,
                        minWidth: "32px",
                        padding: "8px",
                    },
                    linkUp: {
                        position: "relative",
                        left: "4px",
                        color: theme.thirdlyColor,
                        textDecoration: "none",
                        display: "block",
                    },
                    linkDown: {
                        position: "relative",
                        left: "4px",
                        color: theme.otherColor,
                        textDecoration: "none",
                        display: "block",
                    },
                    site: {
                        color: theme.otherColor,
                        fontWeight: "1000",
                        fontSize: "1.2rem",
                        margin: "0"
                    },
                    titles: [
                        { name: "PIC", id: "0" },
                        { name: "DRA", id: "1" },
                        { name: "PROG", id: "2" },
                        { name: "ST", id: "3" },
                    ],
                })
            }
            else {
                this.setState({
                    btnUp: {
                        padding: "10px",
                        fontWeight: "600",
                        color: theme.thirdlyColor,
                        minWidth: "32px",
                    },
                    btnDown: {
                        padding: "10px",
                        fontWeight: "600",
                        color: theme.otherColor,
                        minWidth: "32px",
                    },
                    linkUp: {
                        position: "relative",
                        left: "50px",
                        color: theme.thirdlyColor,
                        textDecoration: "none",
                        display: "block",
                    },
                    linkDown: {
                        position: "relative",
                        left: "50px",
                        color: theme.otherColor,
                        textDecoration: "none",
                        display: "block",
                    },
                    site: {
                        color: theme.otherColor,
                        fontWeight: "1000",
                        fontSize: "1.5rem",
                        textDecoration: "none",
                        margin: "0"
                    },
                    titles: [
                        { name: "PICTURE", id: "0" },
                        { name: "DRAMA", id: "1" },
                        { name: "PROGRAM", id: "2" },
                        { name: "STCHANNEL", id: "3" },
                    ],
                })
            }
        }
        this.setState({ width })
    }
    tabChoiced(id) {
        this.setState({
            currentindex: id
        })
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    render() {
        const titles = this.state.titles
        const paths = this.state.paths
        const { classes } = this.props
        const routers = this.state.routers
        let tabs = titles.map(function (t, index) {
            let linkUp = this.state.linkUp
            let linkDown = this.state.linkDown
            let btnUp = this.state.btnUp
            let btnDown = this.state.btnDown
            let linkStyle = t.id === this.state.currentindex ? linkDown : linkUp
            let btnStyle = t.id === this.state.currentindex ? btnDown : btnUp
            return <Link to={paths[index]} style={linkStyle} key={"t" + index} replace>
                <Button style={btnStyle} color="primary" onClick={this.tabChoiced.bind(this, t.id)}>
                    &nbsp;{t.name}
                </Button>
            </Link>
        }.bind(this))
        return (
            <BrowserRouter>
                <Route render={({ location }) => (
                    <div className={classes.wrapper}>
                        <div>
                            <AppBar position="static" color="default" className={classes.header}>
                                <Toolbar>
                                    <Typography variant="title" color="inherit" key="title">
                                        <Typography style={this.state.site} color="inherit">
                                            Qmaru
                                </Typography>
                                    </Typography>
                                    {tabs}
                                </Toolbar>
                            </AppBar>
                        </div>

                        <div className={classes.main}>
                            <TransitionGroup>
                                <CSSTransition
                                    key={location.key}
                                    timeout={300}
                                    classNames="spec"
                                    unmountOnExit
                                    appear
                                >
                                    <div key={location.pathname} >
                                        <Switch key={location.key} location={location}>
                                            {routers.map((route, index) => (
                                                <Route key={"r" + index} path={route.path} exact component={route.component} />
                                            ))}
                                        </Switch>
                                    </div>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>

                        <div className={classes.footer}>
                            <span className={classes.footerSpan}>© 2017-2019 AoBeom v3.0</span>
                        </div>

                    </div>
                )} />
            </BrowserRouter>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)