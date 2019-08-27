import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

import Input from '@material-ui/core/Input'
import ImageSearch from '@material-ui/icons/ImageSearch'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Typography from '@material-ui/core/Typography'
import LazyLoad from 'react-lazyload'
import Divider from '@material-ui/core/Divider'
import Skeleton from '@material-ui/lab/Skeleton'

import IG from '../static/img/insta.png'
import MDPR from '../static/img/mdpr.png'
import DESSART from '../static/img/dessart.png'
import TPL from '../static/img/tpl.png'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        paddingTop: 40,
    },
    topLogo: {
        padding: 10,
    },
    errorInfo: {
        margin: 10,
        backgroundColor: theme.tipColor,
    },
    resultImg: {
        width: "90%",
        padding: 5
    },
    resultVideo: {
        height: "100%",
        width: "90%",
        margin: "0 auto",
        display: "block",
    },
    customInput: {
        color: theme.secondaryColor,
        minWidth: 220,
        position: "relative",
        left: 4,
    },
    customUnderline: {
        '&:hover:not(disabled):before': {
            borderBottom: `1px solid ${theme.secondaryColor} !important`,
        },
        '&:before': {
            borderBottomColor: theme.thirdlyColor,
        },
        '&:after': {
            borderBottomColor: theme.tipColor,
        },
    },
    customBtn: {
        color: "#fff",
        backgroundColor: theme.thirdlyColor,
        margin: 6,
        '&:hover': {
            backgroundColor: theme.primaryColor,
        },
    },
    customLine: {
        border: 0,
        backgroundColor: theme.otherColor,
        height: 1,
    },
    progressRoot: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    progressWrapper: {
        margin: 10,
        position: 'relative',
    },
    progressFab: {
        color: theme.secondaryColor,
        position: 'absolute',
        left: 0,
        zIndex: 1,
    },
    progressBtn: {
        width: 48,
        height: 48,
        backgroundColor: "transparent",
        boxShadow: "0 0",
        color: theme.secondaryColor,
        '&:hover': {
            backgroundColor: theme.otherColor,
        },
        
    },
    placeholderImg: {
        margin: '5px auto',
        width: "90%",
    }
})


class Picture extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            error: "",
            btnSta: "outlined",
            btnInfo: "Copy to potplayer",
            btndisp: {
                display: "none",
            },
            loading: false,
            success: false,
        }
    }
    changeText(event) {
        this.setState({
            url: event.target.value,
        })
    }
    onKeyUp = (e) => {
        e.keyCode === 13 && this.picClick()
    }
    picClick() {
        let url = this.state.url
        let uri = ""
        if (url === "undefined") {
            this.setState({
                error: true,
                info: "URL ERROR / NO RESULT FOUND",
            })
            return false
        }
        var regex = /http(s)?:\/\/([\w-]+.)+[\w-]+(\/[\w- ./?%&=]*)?/
        if (regex.test(url) !== true) {
            this.setState({
                error: true,
                info: "URL ERROR / NO RESULT FOUND",
            })
            return false
        } else {
            if (url.indexOf("showroom") !== -1 || url.indexOf("linelive") !== -1) {
                uri = "/hls"
            } else if (url.indexOf("twitter") !== -1) {
                uri = "/twitter"
            } else {
                uri = "/news"
            }
        }
        this.setState({
            success: false,
            loading: true,
            values: "",
            error: false,
        })
        url = `${global.constants.api}/api/v1/media${uri}?url=${encodeURIComponent(url)}`
        fetch(url, {
                method: 'GET',
                dataType: 'json',
            }).then(res => res.json())
            .then(data => {
                let status = data.status
                if (status === 0) {
                    this.setState({
                        error: false,
                        values: data.data,
                        status: status,
                        success: true,
                        loading: false,
                    })
                } else {
                    this.setState({
                        error: false,
                        status: status,
                        info: "No Data",
                        btndisp: {
                            display: "block",
                        },
                        success: false,
                        loading: false,
                    })
                }
            })
            .catch(
                () => this.setState({
                    error: false,
                    status: 1,
                    info: "Server Error",
                    btndisp: {
                        display: "block",
                    },
                    success: false,
                    loading: false,
                })
            )
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    render() {
        const values = this.state.values
        const error = this.state.error
        const info = this.state.info
        const status = this.state.status
        const { classes } = this.props
        let mediaTmp = []
        if (error === true) {
            mediaTmp.push(
                <Typography component='div' key="error">
                    <Fade in={error}>
                        <Chip
                            className={classes.errorInfo}
                            label={info}
                            color="secondary"
                        />
                    </Fade>
                </Typography>
            )
        } else {
            if (status === 0) {
                if (values.type === "news") {
                    let urls = values.entities
                    for (let u in urls) {
                        if (urls[u].indexOf(".mp4") > 0) {
                            mediaTmp.push(
                                <Typography component='div' key={"video" + u}>
                                    <video className={classes.resultVideo} src={urls[u]} controls="controls" />
                                    <Divider className={classes.customLine} />
                                </Typography>
                            )
                        } else {
                            mediaTmp.push(
                                <Typography component='div' key={"img" + u}>
                                     <LazyLoad 
                                        height={200} 
                                        offset={[-200, 0]} 
                                        once 
                                        placeholder={
                                            <Skeleton variant="rect" height={200} className={classes.placeholderImg}/>
                                        }>
                                     <img className={classes.resultImg} src={urls[u]} alt="" />
                                     </LazyLoad>
                                    <Divider className={classes.customLine} />
                                </Typography>
                            )
                        }
                    }
                }
                if (values.type === "hls") {
                    let urls = values.entities
                    mediaTmp.push(
                        <Typography component='div' key="hls">
                            <CopyToClipboard text={urls} onCopy={() => this.setState({copied: true, btnSta: "contained"})}>
                                <Button variant="contained" className={classes.customBtn}>
                                    {this.state.btnInfo}
                                </Button>
                            </CopyToClipboard>
                        </Typography>
                    )
                }
                if (values.type === "twitter") {
                    let urls = values.entities
                    mediaTmp.push(
                        <Typography component='div' key={"video" + urls}>
                            <video className={classes.resultVideo} src={urls} controls="controls" />
                            <Divider className={classes.customLine} />
                        </Typography>
                    )
                }
            } else {
                    mediaTmp.push(
                    <Typography component='div' key="nodata" style={this.state.btndisp}>
                    <Fade in={status}>
                        <Chip
                            className={classes.errorInfo}
                            label={info}
                            color="secondary"
                        />
                    </Fade>  
                    </Typography>
                )
            }
        }
        return (
            <Typography component='div' className={classes.wrapper}>
                <Typography component="p">
                    <img className={classes.topLogo} src={IG} alt="ig"/>
                    <img className={classes.topLogo} src={MDPR} alt="mdpr" />
                    <img className={classes.topLogo} src={TPL} alt="tpl" />
                    <img className={classes.topLogo} src={DESSART} alt="dessart" />
                </Typography>
                <Typography component='div' className={classes.progressRoot}>
                    <Input
                        classes={{root: classes.customInput, underline: classes.customUnderline}}
                        onChange={event=>this.changeText(event)}
                        placeholder="URL[?update]"
                        inputProps={{'aria-label': 'Description'}}
                        autoFocus={false}
                        onKeyUp={this.onKeyUp}
                        disableUnderline={false}
                    />
                    <Typography component='div' className={classes.progressWrapper}>
                        <Fab classes={{ root: classes.progressBtn }} onClick={this.picClick.bind(this)}>
                            {this.state.success ? <CheckIcon /> : <ImageSearch />}
                        </Fab>
                        {this.state.loading && <CircularProgress size={48} className={classes.progressFab} />}
                    </Typography>
                </Typography>
                {mediaTmp}
            </Typography>
        )
    }
}

Picture.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(Picture)