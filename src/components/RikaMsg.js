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


const styles = ({
    wrapper: {
        paddingTop: "40px",
    },
    cardSpacing: {
        margin: "15px",
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
            expanded: null ,
            values: [],
            firstPage: 1,
            nextPage: 1,
            loadBtn: false,
            loadDis: false,
        }
    }
    msgTypeChooice (type) {
        this.setState({
            type: type,
            values: [],
            nextPage: 1,
            loadBtn: false,
        })
        let firstPage = this.state.firstPage
        let pageUrl = `${global.constants.api}/api/v1/rikamsg?type=${type}`
        let firstPageUrl = `${global.constants.api}/api/v1/rikamsg?type=${type}&page=${firstPage}`
        fetch(pageUrl, {
            method: 'GET',
            dataType: 'json'
        }).then(res => res.json())
            .then(data => {
                let pageData = data.data.pages
                if (pageData === 0) {
                    this.setState({
                        loadBtn: true,
                        loadDis: true,
                        loadText: "NO DATA",
                    })
                } else {
                    this.setState({
                        pages: pageData,
                    })
                }
        })
        fetch(firstPageUrl, {
            method: 'GET',
            dataType: 'json'
        }).then(res => res.json())
            .then(data => {
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
        })
    }
    loadMoreData () {
        let values = this.state.values
        let currentType = this.state.type
        let totalPage = this.state.pages
        let nextPage = this.state.nextPage
        if (nextPage < totalPage){
            nextPage = nextPage + 1
            let nextPageUrl = `${global.constants.api}/api/v1/rikamsg?type=${currentType}&page=${nextPage}`
            fetch(nextPageUrl, {
                method: 'GET',
                dataType: 'json'
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
        let msgTmp = []
        let loadTmp = []
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
        return(
            <div className={classes.wrapper}>
                
                <Button variant="flat" color="primary" classes={{root: classes.msgBtn}} onClick={this.msgTypeChooice.bind(this, 100)}>
                    All
                </Button>
                <Button variant="flat" color="primary" classes={{root: classes.msgBtn}} onClick={this.msgTypeChooice.bind(this, 0)}>
                    Text
                </Button>
                <Button variant="flat" color="primary" classes={{root: classes.msgBtn}} onClick={this.msgTypeChooice.bind(this, 1)}>
                    Pic
                </Button>
                <Button variant="flat" color="primary" classes={{root: classes.msgBtn}} onClick={this.msgTypeChooice.bind(this, 2)}>
                    Vid
                </Button>
                <Button variant="flat" color="primary" classes={{root: classes.msgBtn}} onClick={this.msgTypeChooice.bind(this, 3)}>
                    Aud
                </Button>

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