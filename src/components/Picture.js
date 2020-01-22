import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Input from '@material-ui/core/Input'
import ImageSearch from '@material-ui/icons/ImageSearch'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Typography from '@material-ui/core/Typography'
import LazyLoad from 'react-lazyload'
import Divider from '@material-ui/core/Divider'
import Skeleton from '@material-ui/lab/Skeleton'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

import IG from '../static/img/insta.png'
import MDPR from '../static/img/mdpr.png'
import DESSART from '../static/img/dessart.png'
import TPL from '../static/img/tpl.png'

import '../config'

const mainColor = global.constants.theme

const useStyles = makeStyles(theme => ({
    wrapper: {
        paddingTop: 40,
    },
    topLogo: {
        padding: 10,
    },
    errorInfo: {
        margin: 10,
        backgroundColor: mainColor.tipColor,
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
    tipCls: {
        position: "relative",
        right: 120,
        padding: 0,
        margin: 0,
        color: mainColor.tipColor,
        '&:hover': {
            backgroundColor: mainColor.otherColor,
        },
    },
    tipWidth: {
        maxWidth: 250,
        color: mainColor.otherColor,
        backgroundColor: mainColor.primaryColor
    },
    customInput: {
        color: mainColor.secondaryColor,
        minWidth: 220,
        position: "relative",
        left: 4,
    },
    customUnderline: {
        '&:hover:not(disabled):before': {
            borderBottom: `1px solid ${mainColor.secondaryColor} !important`,
        },
        '&:before': {
            borderBottomColor: mainColor.thirdlyColor,
        },
        '&:after': {
            borderBottomColor: mainColor.tipColor,
        },
    },
    customBtn: {
        color: "#fff",
        backgroundColor: mainColor.thirdlyColor,
        margin: 6,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
    customLine: {
        border: 0,
        backgroundColor: mainColor.otherColor,
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
        color: mainColor.secondaryColor,
        position: 'absolute',
        left: 0,
        zIndex: 1,
    },
    progressBtn: {
        width: 48,
        height: 48,
        backgroundColor: "transparent",
        boxShadow: "0 0",
        color: mainColor.secondaryColor,
        '&:hover': {
            backgroundColor: mainColor.otherColor,
        },
    },
    placeholderImg: {
        margin: '5px auto',
        width: "90%",
    }
}))


export default function Picture() {
    let [url, setURL] = useState("")
    const [reqError, setReqError] = useState(false)
    const [reqInfo, setReqInfo] = useState("")
    const [reqData, setReqData] = useState([])
    const [loading, setLoding] = useState(false)
    const [success, setSuccess] = useState(false)
    const [reqStatus, setReqStatus] = useState(0)
    const [btnSta, setBtnSta] = useState({copied: false, btnSta: "contained"})
    const [btnInfo, setBtnInfo] = useState("")
    const [btndisp, setBtnDisp] = useState({ display: "none" })

    const classes = useStyles()

    const changeText = (event, newValue) => {
        setURL(event.target.value)
    }

    const onKeyUp = (e) => {
        e.keyCode === 13 && picClick()
    }

    const picClick = () => {
        let uri = ""
        if (url === "undefined") {
            setReqError(true)
            setReqInfo("URL ERROR / NO RESULT FOUND")
            return false
        }
        var regex = /http(s)?:\/\/([\w-]+.)+[\w-]+(\/[\w- ./?%&=]*)?/
        if (regex.test(url) !== true) {
            setReqError(true)
            setReqInfo("URL ERROR / NO RESULT FOUND")
            return false
        } else {
            if (url.indexOf("www.showroom-live.com") !== -1 || url.indexOf("live.line.me") !== -1) {
                uri = "/hls"
                setBtnInfo("Copy to potplayer")
                setBtnSta({copied: true, btnSta: "outlined"})
            } else if (url.indexOf("twitter") !== -1) {
                uri = "/twitter"
            } else {
                uri = "/news"
            }
        }
        setSuccess(false)
        setLoding(true)
        setReqData("")
        setReqError(false)
        url = `${global.constants.api}/api/v1/media${uri}?url=${encodeURIComponent(url)}`
        fetch(url, {
            method: 'GET',
            dataType: 'json',
        }).then(res => res.json())
            .then(data => {
                let status = data.status
                if (status === 0) {
                    setReqError(false)
                    setReqData(data.data)
                    setReqStatus(status)
                    setSuccess(true)
                    setLoding(false)
                } else {
                    setReqError(false)
                    setReqStatus(status)
                    setReqInfo(data.message)
                    setBtnDisp({ display: "block" })
                    setSuccess(false)
                    setLoding(false)
                }
            })
            .catch(
                () => {
                    setReqError(false)
                    setReqStatus(1)
                    setReqInfo("Server Error")
                    setBtnDisp({ display: "block" })
                    setSuccess(false)
                    setLoding(false)
                }
            )
    }
    let mediaTmp = []
    if (reqError === true) {
        mediaTmp.push(
            <Typography component='div' key="error">
                <Fade in={reqError}>
                    <Chip
                        className={classes.errorInfo}
                        label={reqInfo}
                        color="secondary"
                    />
                </Fade>
            </Typography>
        )
    } else {
        if (reqStatus === 0) {
            if (reqData.type === "news") {
                let urls = reqData.entities
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
                                        <Skeleton variant="rect" height={200} className={classes.placeholderImg} />
                                    }>
                                    <img className={classes.resultImg} src={urls[u]} alt="" />
                                </LazyLoad>
                                <Divider className={classes.customLine} />
                            </Typography>
                        )
                    }
                }
            }
            if (reqData.type === "hls") {
                let urls = reqData.entities
                mediaTmp.push(
                    <Typography component='div' key="hls">
                        <CopyToClipboard
                            text={urls}
                            onCopy={() => btnSta}
                        >
                            <Button variant="contained" className={classes.customBtn}>
                                {btnInfo}
                            </Button>
                        </CopyToClipboard>
                    </Typography>
                )
            }
            if (reqData.type === "twitter") {
                let urls = reqData.entities
                mediaTmp.push(
                    <Typography component='div' key={"video" + urls}>
                        <video className={classes.resultVideo} src={urls} controls="controls" />
                        <Divider className={classes.customLine} />
                    </Typography>
                )
            }
        } else {
            mediaTmp.push(
                <Typography component='div' key="nodata" style={btndisp}>
                    <Fade in={reqStatus}>
                        <Chip
                            className={classes.errorInfo}
                            label={reqInfo}
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
                <img className={classes.topLogo} src={IG} alt="ig" />
                <img className={classes.topLogo} src={MDPR} alt="mdpr" />
                <img className={classes.topLogo} src={TPL} alt="tpl" />
                <img className={classes.topLogo} src={DESSART} alt="dessart" />
            </Typography>
            <Typography component='div' className={classes.progressRoot}>
                <Input
                    classes={{ root: classes.customInput, underline: classes.customUnderline }}
                    onChange={event => changeText(event)}
                    placeholder="URL"
                    autoFocus={false}
                    onKeyUp={onKeyUp}
                    disableUnderline={false}
                />
                <Typography component='div' className={classes.progressWrapper}>
                    <Fab classes={{ root: classes.progressBtn }} onClick={() => picClick()}>
                        {success ? <CheckIcon /> : <ImageSearch />}
                    </Fab>
                    {loading && <CircularProgress size={48} className={classes.progressFab} />}
                </Typography>
            </Typography>
            <Tooltip
                className={classes.tipCls}
                classes={{
                    tooltip: classes.tipWidth
                }}
                title="For unfinished news(mdpr) you can append ?update at the end of the URL to get the latest content."
                placement="right"
                TransitionComponent={Zoom}
                enterTouchDelay={50}
                leaveTouchDelay={3000}
                interactive
            >
                <Button>TIPS</Button>
            </Tooltip>
            {mediaTmp}
        </Typography>
    )
}