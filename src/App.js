import React, { Component } from 'react';
import { BrowserRouter, Route,Link, Switch} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IndexPage from './components/Index';
import Picture from './components/Picture';
import Drama from './components/Drama';
import Program from './components/Program';
import Stchannel from './components/Stchannel';
import RikaMsg from './components/RikaMsg';
import Auth from './components/Auth'

import NotFoundPage from './components/NotFoundPage';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = ({
  wrapper:{
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header:{
    backgroundColor: "#800080",
  },
  main:{
    flex: "1",
    margin: "0 auto",
    maxWidth: "640px",
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    paddingBottom: "30px",
  },
  footer:{
    width: "auto",
    bottom: "0",
    textAlign: "center",
    fontSize: "16px",
    height: "30px" ,
  },
  footerSpan:{
    height: "50px",
    color: "#800080",
    cursor: "default",
  },
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titles: ["PICTURE", "DRAMA", "PROGRAM", "STCHANNEL", "RIKAMSG"],
      paths: ["picture", "drama", "program", "stchannel", "rikamsg"],
      site:{
        color: "#FCFCFC",
        fontWeight: "1000",
        fontSize: "1.5rem",
        margin: "0"
      },
      width: props.width || -1,
      routers: [
        {"path": "/", "component": IndexPage},
        {"path": "/picture", "component": Picture},
        {"path": "/drama", "component": Drama},
        {"path": "/program", "component": Program},
        {"path": "/stchannel", "component": Stchannel},
        {"path": "/rikamsg", "component": RikaMsg},
        {"path": "/auth", "component": Auth},
        {"path": "*", "component": NotFoundPage},
      ]
    }
  }
  componentDidMount() {
    let uri = window.location.href.split("/")
    let aid = uri[uri.length - 1]
    let index = ""
    if (this.state.paths.indexOf(aid) !== "-1"){
      index = this.state.paths.indexOf(aid)
    }
    this.setState({
      currentindex: String(index)
    })
    this.updateSize();
    window.addEventListener('resize', () => this.updateSize());
  }
  updateSize() {
    let { width } = this.props;
    if (!width) {
      width = document.body.clientWidth;
      if( width > 450 & width < 640) {
        this.setState({
          btnUp: {
            padding: "10px",
            fontWeight: "600", 
            color: "#CD96CD",
            minWidth: "32px",
          },
          btnDown: {
            padding: "10px",
            fontWeight: "600", 
            color: "#FFFAFA",
            minWidth: "32px",
          },
          linkUp:{
            position: "relative", 
            left: "20px",
            color: "#CD96CD",
            textDecoration: "none",
            display: "block",
          },
          linkDown: {
            position: "relative", 
            left: "20px",
            color: "#FFFAFA",
            textDecoration: "none",
            display: "block",
          },
          site:{
            color: "#FCFCFC",
            fontWeight: "1000",
            fontSize: "1.35rem",
            margin: "0"
          },
          titles: [
            {name: "PICTURE", id: "0"},
            {name: "DRAMA", id: "1"},
            {name: "PROGRAM", id: "2"},
            {name: "STCHANNEL", id: "3"},
            {name: "RIKAMSG", id: "4"},
          ],
        })
      } else if ( width > 400 & width < 450) {
        this.setState({
          btnUp: {
            padding: "8px",
            fontWeight: "600", 
            color: "#CD96CD",
            minWidth: "32px",
          },
          btnDown: {
            padding: "8px",
            fontWeight: "600", 
            color: "#FFFAFA",
            minWidth: "32px",
          },
          linkUp:{
            position: "relative", 
            left: "8px",
            color: "#CD96CD",
            textDecoration: "none",
            display: "block",
          },
          linkDown: {
            position: "relative", 
            left: "8px",
            color: "#FFFAFA",
            textDecoration: "none",
            display: "block",
          },
          site:{
            color: "#FCFCFC",
            fontWeight: "1000",
            fontSize: "1.2rem",
            margin: "0"
          },
          titles: [
            {name: "PIC", id: "0"},
            {name: "DRAMA", id: "1"},
            {name: "PROG", id: "2"},
            {name: "ST", id: "3"},
            {name: "RIKA", id: "4"},
          ],
        })
      } else if ( width < 400) {
        this.setState({
          btnUp: {
            fontWeight: "600", 
            color: "#CD96CD",
            minWidth: "32px",
            padding: "8px",
          },
          btnDown: {
            fontWeight: "600", 
            color: "#FFFAFA",
            minWidth: "32px",
            padding: "8px",
          },
          linkUp:{
            position: "relative", 
            left: "4px",
            color: "#CD96CD",
            textDecoration: "none",
            display: "block",
          },
          linkDown: {
            position: "relative", 
            left: "4px",
            color: "#FFFAFA",
            textDecoration: "none",
            display: "block",
          },
          site:{
            color: "#FCFCFC",
            fontWeight: "1000",
            fontSize: "1.2rem",
            margin: "0"
          },
          titles: [
            {name: "PIC", id: "0"},
            {name: "DRA", id: "1"},
            {name: "PROG", id: "2"},
            {name: "ST", id: "3"},
            {name: "RIKA", id: "4"},
          ],
        })
      }
      else {
        this.setState({
          btnUp: {
            padding: "10px",
            fontWeight: "600", 
            color: "#CD96CD",
            minWidth: "32px",
          },
          btnDown: {
            padding: "10px",
            fontWeight: "600", 
            color: "#FFFAFA",
            minWidth: "32px",
          },
          linkUp:{
            position: "relative", 
            left: "50px",
            color: "#CD96CD",
            textDecoration: "none",
            display: "block",
          },
          linkDown: {
            position: "relative", 
            left: "50px",
            color: "#FFFAFA",
            textDecoration: "none",
            display: "block",
          },
          site:{
            color: "#FCFCFC",
            fontWeight: "1000",
            fontSize: "1.5rem",
            textDecoration: "none",
            margin: "0"
          },
          titles: [
            {name: "PICTURE", id: "0"},
            {name: "DRAMA", id: "1"},
            {name: "PROGRAM", id: "2"},
            {name: "STCHANNEL", id: "3"},
            {name: "RIKAMSG", id: "4"},
          ],
        })
      }
    }
    this.setState({width});
  }
  tabChoiced(id) {
    this.setState({
      currentindex: id
    })
  }
  render() {
    const titles = this.state.titles
    const paths = this.state.paths
    const { classes } = this.props
    const routers = this.state.routers
    const routeKey = window.location.pathname.split('/')[1] || '/'
    let tabs = titles.map(function(t, index) {
    let linkUp = this.state.linkUp
    let linkDown = this.state.linkDown
    let btnUp = this.state.btnUp
    let btnDown = this.state.btnDown
    let linkStyle = t.id === this.state.currentindex ? linkDown : linkUp
    let btnStyle = t.id === this.state.currentindex ? btnDown : btnUp
      return <Link to={paths[index]} style={linkStyle} key={"t" + index}>
                <Button style={btnStyle} color="primary" onClick={this.tabChoiced.bind(this, t.id)}>
                &nbsp;{t.name}
                </Button>
             </Link>
    }.bind(this))
    return (
      <BrowserRouter>
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
                      timeout={300}
                      classNames="spec"
                      unmountOnExit
                      appear
                      key={routeKey}
                    >
                 <Switch > 
                  {routers.map((route, index) => (
                        <Route key={"r" + index} path={route.path} exact component={route.component}/>
                  ))}
                </Switch>
                </CSSTransition>
              </TransitionGroup>
        </div>

        <div className={classes.footer}>
          <span className={classes.footerSpan}>© 2017-2018 AoBeom v3.0</span>
        </div>

      </div>
      
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);