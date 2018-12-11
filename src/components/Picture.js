import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import ImageSearch from '@material-ui/icons/ImageSearch'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Fade from '@material-ui/core/Fade'

import IG from '../static/img/insta.png'
import MDPR from '../static/img/mdpr.png'
import ORICON from '../static/img/oricon.png'
import TPL from '../static/img/tpl.png'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        paddingTop: "40px",
    },
    topLogo: {
        padding: "10px",
    },
    errorInfo: {
        margin: "10px",
        backgroundColor: theme.tipColor,
    },
    resultImg: {
        width: "90%",
        padding: "5px"
    },
    resultVideo: {
        height: "100%",
        width: "90%",
        display: "block",
    },
    customInput: {
        color: theme.secondaryColor,
        minWidth: "220px",
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
    customIcon: {
        '&:hover': {
            backgroundColor: theme.otherColor,
        },
        color: theme.secondaryColor,
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
                    })
                } else {
                    this.setState({
                        error: false,
                        status: status,
                        info: "No Data",
                        btndisp: {
                            display: "block",
                        },
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
                <div key="error">
                    <Fade in={error}>
                        <Chip
                            className={classes.errorInfo}
                            label={info}
                            color="secondary"
                        />
                    </Fade>
                </div>
            )
        } else {
            if (status === 0) {
                if (values.type === "news") {
                    let urls = values.entities
                    for (let u in urls) {
                        if (urls[u].indexOf(".mp4") > 0) {
                            mediaTmp.push(
                                <div key={"video" + u}>
                                    <video className={classes.resultVideo} src={urls[u]} controls="controls" />
                                    <hr />
                                </div>
                            )
                        } else {
                            mediaTmp.push(
                                <div key={"img" + u}>
                                    <img className={classes.resultImg} src={urls[u]} alt="" />
                                    <hr />
                                </div>
                            )
                        }
                    }
                }
                if (values.type === "hls") {
                    let urls = values.entities
                    mediaTmp.push(
                        <div key="hls">
                            <CopyToClipboard text={urls} onCopy={() => this.setState({copied: true, btnSta: "contained"})}>
                                <Button variant={this.state.btnSta} color="primary">
                                    {this.state.btnInfo}
                                </Button>
                            </CopyToClipboard>
                        </div>
                    )
                }
                if (values.type === "twitter") {
                    let urls = values.entities
                    mediaTmp.push(
                        <div key={"video" + urls}>
                            <video className={classes.resultVideo} src={urls} controls="controls" />
                            <hr />
                        </div>
                    )
                }
            } else {
                    mediaTmp.push(
                    <div key="nodata" style={this.state.btndisp}>
                    <Fade in={status}>
                        <Chip
                            className={classes.errorInfo}
                            label={info}
                            color="secondary"
                        />
                    </Fade>  
                    </div>
                )
            }
        }
        return (
            <div className={classes.wrapper}>
                <p>
                    <img className={classes.topLogo} src={IG} alt="ig"/>
                    <img className={classes.topLogo} src={MDPR} alt="mdpr" />
                    <img className={classes.topLogo} src={TPL} alt="tpl" />
                    <img className={classes.topLogo} src={ORICON} alt="oricon" />
                </p>
                <Input
                    classes={{root: classes.customInput, underline: classes.customUnderline}}
                    onChange={event=>this.changeText(event)}
                    placeholder="URL"
                    inputProps={{'aria-label': 'Description'}}
                    autoFocus={false}
                    onKeyUp={this.onKeyUp}
                    disableUnderline={false}
                />
                <IconButton 
                    aria-label="image_search" 
                    onClick={this.picClick.bind(this)}
                    classes={{root: classes.customIcon}}
                >
                    <ImageSearch />
                </IconButton>
                {mediaTmp}
            </div>
        )
    }
}

Picture.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(Picture)