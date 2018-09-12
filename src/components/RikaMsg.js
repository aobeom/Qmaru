import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import SettingsVoice from '@material-ui/icons/SettingsVoice';
import Chip from '@material-ui/core/Chip';

const styles = ({
    wrapper: {
        paddingTop: "40px",
    },
    cardSpacing: {
        margin: "15px",
    },
    errorInfo:{
        margin: "10px",
        backgroundColor: "#9941ac",
    },
    avatarImg: {
        width: "100%",
        height: "100%",
    },
    avatarTitle: {
      fontSize:'1rem',
      color: "#71C671",
      cursor: "default",
    },
    cardContent: {
        textAlign: "left",
    },
    msgBtn: {
        color: "#698B69",
        minWidth: "16px",
    },
    msgText: {
        color: "#698B69",
    },
    mediaAuto: {
        width: "100%",
    },
    loadBtn: {
        padding: "10px",
    },
    customBtn: {
        color: "#fff",
        backgroundColor: "#71C671",
        fontSize: "0.85rem",
        margin: "5px",
        '&:hover': {
            backgroundColor: "#698B69",
        },
    },
})

class RikaMsg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            btnGroup: [
                {"name": "All", "type": 100},
                {"name": "Text", "type": 0},
                {"name": "Pic", "type": 1},
                {"name": "Vid", "type": 2},
                {"name": "Aud", "type": 3},
            ],
            expanded: null ,
            values: [],
            firstPage: 1,
            nextPage: 1,
            loadBtn: false,
            loadDis: false,
            btndisp: {display: "none"},
        }
    }
    componentWillMount() {
        let token = sessionStorage.getItem("token")
        if (!token) {
            // this.props.history.push('/auth')
            window.location.href="/auth"
        }
    }
    msgTypeChooice (type) {
        this.setState({
            type: type,
            values: [],
            nextPage: 1,
            loadBtn: false,
            btndisp: {display: "none"},
        })
        let firstPage = this.state.firstPage
        let pageUrl = `${global.constants.api}/api/v1/rikamsg?type=${type}`
        let firstPageUrl = `${global.constants.api}/api/v1/rikamsg?type=${type}&page=${firstPage}`
        let token = sessionStorage.getItem("token")
        if (token) {
        fetch(pageUrl, {
            method: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + token},
        }).then(
            function(res){
                if(res.status === 401) {
                    sessionStorage.removeItem('token')
                    window.history.go(0)
                } else {
                    return res.json()
                }
            })
            .then(data => {
                let pageData = data.data.pages
                let status = data.status
                if ( status === 0) {
                    if (pageData === 0) {
                        this.setState({
                            status: status,
                            loadBtn: true,
                            loadDis: true,
                            loadText: "NO DATA",
                        })
                    } else {
                        this.setState({
                            status: status,
                            pages: pageData,
                        })
                    }
                } else {
                    this.setState({
                        status: status,
                        values: "No Data",
                        btndisp: {display: "block"},
                    })
                }
            })
            .catch(
                () => this.setState({
                    status: 1,
                    values: "Network Error",
                    btndisp: {display: "block"},
                })
            )
        } else {
            // this.props.history.push('/auth')
            window.location.href="/auth"
        }
        fetch(firstPageUrl, {
            method: 'GET',
            dataType: 'json',
            headers: {Authorization: 'Bearer ' + token},
        }).then(
            function(res){
                if(res.status === 401) {
                    sessionStorage.removeItem('token')
                    window.history.go(0)
                } else {
                    return res.json()
                }
            })
            .then(data => {
                let status = data.status
                if ( status === 0) {
                    let msgData = data.data.entities
                    if(msgData !== undefined){
                        if(msgData.length < 10){
                            this.setState({
                                values: msgData,
                                loadBtn: true,
                                loadText: "NO MORE",
                                loadDis: true,
                            })
                        } else {
                            this.setState({
                                values: msgData,
                                loadBtn: true,
                                loadText: "LOAD",
                                loadDis: false,
                            })
                        }
                    }
                }
            })
    }
    loadMoreData () {
        let values = this.state.values
        let currentType = this.state.type
        let totalPage = this.state.pages
        let nextPage = this.state.nextPage
        let token = sessionStorage.getItem("token")
        if(token){
            if (nextPage < totalPage){
                nextPage = nextPage + 1
                let nextPageUrl = `${global.constants.api}/api/v1/rikamsg?type=${currentType}&page=${nextPage}`
                fetch(nextPageUrl, {
                    method: 'GET',
                    dataType: 'json',
                    headers: {Authorization: 'Bearer ' + token},
                }).then(res => res.json())
                    .then(data => {
                        let msgData = data.data.entities
                        this.setState({
                            values: values.concat(msgData),
                            nextPage: nextPage,
                        })
                })
            } else {
                this.setState({
                    loadText: "NO MORE",
                    loadDis: true,
                })
            }
        } else {
            window.location.href="/auth"
        }
    }
    handleExpandClick(panel) {
        let panelMode
        if (this.state.expanded === null) {
            panelMode = panel
        } else if  (this.state.expanded === panel) {
            panelMode = null
        } else {
            panelMode = panel
        }
        this.setState({
            expanded: panelMode,
        })
    }
    render(){
        const entities = this.state.values
        const expanded = this.state.expanded
        const loadBtn = this.state.loadBtn
        const loadText = this.state.loadText
        const { classes } = this.props
        const status = this.state.status
        const btnGroup = this.state.btnGroup
        let msgTmp = []
        let loadTmp = []
        if ( status === 0) {
            if (loadBtn === true) {
                loadTmp.push(
                    <div key="load" className={classes.loadBtn}>
                        <Button disabled={this.state.loadDis} variant="contained" className={classNames(classes.customBtn)} onClick={this.loadMoreData.bind(this)}>
                        {loadText} 
                        </Button>
                    </div>
                )
            }
            for (let e in entities) {
                let message = entities[e]
                let panel = "panel" + e
                let mediaType = message.type
                let mediaIcon = []
                let mediaUrl = []
                if ( mediaType === 1) {
                    mediaIcon.push(
                        <IconButton
                                onClick={this.handleExpandClick.bind(this, panel)}
                                aria-expanded={expanded === panel}
                                aria-label="Show more"
                                key={"imgPart" + e}
                            >
                        <InsertPhoto />
                        </IconButton>
                    )
                    mediaUrl.push(
                        <img key={"img" + e} src={"/media" + message.media} className={classes.mediaAuto} alt={message.tid}/>
                    )
                } else if (mediaType === 2) {
                    mediaIcon.push(
                        <IconButton
                                onClick={this.handleExpandClick.bind(this, panel)}
                                aria-expanded={expanded === panel}
                                aria-label="Show more"
                                key={"videoPart" + e}
                            >
                        <VideoLibrary />
                        </IconButton>
                    )
                    mediaUrl.push(
                        <video key={"video" + e} src={"/media" + message.media} className={classes.mediaAuto} controls="controls"></video>
                    )
                } else if (mediaType === 3 ) {
                    mediaIcon.push(
                        <IconButton
                                onClick={this.handleExpandClick.bind(this, panel)}
                                aria-expanded={expanded === panel}
                                aria-label="Show more"
                                key={"audioPart" + e}
                            >
                        <SettingsVoice />
                        </IconButton>
                    )
                    mediaUrl.push(
                        <video key={"audio" + e} src={"/media" + message.media} className={classes.mediaAuto} controls="controls"></video>
                    )
                } else {
                    mediaIcon.push(
                        <span key={"null" + e}></span>
                    )
                }
                msgTmp.push(
                    <div key={"msg" + e} className={classes.cardSpacing}>
                        <Card>
                            <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" classes={{root: classes.avatarImg}}>
                                    <img src={require('./../static/img/avatar.png')} alt="rikaAvatar"/>
                                </Avatar>
                            }
                            title={message.date}
                            classes={{title: classes.avatarTitle}}
                            />
                        
                            <CardContent className={classes.cardContent}>
                                <Typography component="p" className={classes.msgText}>
                                {message.text}
                                </Typography>
                            </CardContent>
                        
                            <CardActions disableActionSpacing style={{padding: "4px"}}>
                                {mediaIcon}
                            </CardActions>
                        
                            <Collapse in={expanded === panel} timeout="auto" unmountOnExit>
                                <CardContent>
                                    {mediaUrl}
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                )
            }
        } else {
            msgTmp.push(
                <div key="error" style={this.state.btndisp}>
                    <Chip
                        className={classes.errorInfo}
                        label={this.state.values}
                        color="secondary"
                    />
                </div>
            )
        }
        return(
            <div className={classes.wrapper}>
                {btnGroup.map((btn, index) => (
                    <Button variant="flat" color="primary" classes={{root: classes.msgBtn}} onClick={this.msgTypeChooice.bind(this, btn.type)}>
                        {btn.name}
                    </Button>
                ))}
                <div>
                    {msgTmp}
                </div>
                {loadTmp}
            </div>  
        )
    }
}

RikaMsg.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(RikaMsg);