import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Input from '@material-ui/core/Input'
import ImageSearch from '@material-ui/icons/ImageSearch'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Typography from '@material-ui/core/Typography'
import LazyLoad from 'react-lazyload'
import Divider from '@material-ui/core/Divider'
import Skeleton from '@material-ui/core/Skeleton'

import MDPR from '../static/img/mdpr.png'
import DESSART from '../static/img/dessart.png'
import AMEBLO from '../static/img/ameblo.png'
import LINEBLOG from '../static/img/lineblog.png'
import THETV from '../static/img/thetv.png'

import '../config'

const mainColor = global.constants.theme

const useStyles = makeStyles(theme => ({
    wrapper: {
        paddingTop: 60,
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
    const [btndisp, setBtnDisp] = useState({ display: "none" })

    const classes = useStyles()

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
            if (url.indexOf("youtube.com") !== -1 || url.indexOf("youtu.be") !== -1) {
                uri = "/y2b"
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
        let urlClear = url.split(" ")
        let newurl = urlClear[urlClear.length-1]
        url = `${global.constants.api}/api/v1/media${uri}?url=${encodeURIComponent(newurl)}`
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
                                        <Skeleton variant="rectangular" height={200} className={classes.placeholderImg} />
                                    }>
                                    <img className={classes.resultImg} src={urls[u]} alt="" />
                                </LazyLoad>
                                <Divider className={classes.customLine} />
                            </Typography>
                        )
                    }
                }
            }
            if (reqData.type === "y2b") {
                let url = "/media/y2b/" + reqData.entities
                mediaTmp.push(
                    <Typography component='div' key="y2b">
                        <Button
                            variant="contained"
                            className={classes.customBtn}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            download
                        >
                            下载
                        </Button>
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
                    <Fade in={true}>
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
            <Typography component="p" className={classes.topLogoGroup}>
                <img className={classes.topLogo} src={MDPR} alt="mdpr" />
                <img className={classes.topLogo} src={DESSART} alt="dessart" />
                <br />
                <img className={classes.topLogo} src={AMEBLO} alt="ameblo" />
                <img className={classes.topLogo} src={LINEBLOG} alt="lineblog" />
                <img className={classes.topLogo} src={THETV} alt="thetv" />
            </Typography>
            <Typography component='div' className={classes.progressRoot}>
                <Input
                    classes={{ root: classes.customInput, underline: classes.customUnderline }}
                    onChange={event => setURL(event.target.value)}
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
            {mediaTmp}
        </Typography>
    )
}