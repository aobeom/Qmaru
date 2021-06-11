import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import AccessTime from '@material-ui/icons/AccessTime'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import Skeleton from '@material-ui/core/Skeleton'

const mainColor = global.constants.theme

const useStyles = makeStyles(theme => ({
    wrapper: {
        paddingTop: 80,
    },
    errorInfo: {
        margin: 10,
        backgroundColor: mainColor.tipColor,
    },
    dateInfo: {
        flexBasis: '25%',
        flexShrink: 0,
        color: mainColor.tipColor,
    },
    panelSty: {
        padding: 4,
    },
    urlInfo: {
        flexBasis: '60%',
        flexShrink: 0,
        fontWeight: 500,
    },
    aTag: {
        color: mainColor.thirdlyColor,
        '&:hover': {
            color: mainColor.tipColor,
        }
    },
    urlFixsub: {
        flexBasis: '100%',
        flexShrink: 0,
    },
    epInfo: {
        flexBasis: '100%',
        flexShrink: 0,
    },
    topTime: {
        marginBottom: 10,
        color: mainColor.tipColor,
        cursor: "default",
    },
    tvbtText: {
        textAlign: "left",
    },
    tvbtAtag: {
        padding: 6,
    },
    fixBtn: {
        color: mainColor.tipColor,
    },
    btnGroup: {
        marginBottom: 10,
    },
    btnGroupBtn: {
        color: mainColor.otherColor,
        backgroundColor: mainColor.secondaryColor,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
    customBtnHorizontal: {
        '&:not(:last-child)': {
            borderRight: `1px solid ${mainColor.primaryColor}`,
        }
    },
    btnTime: {
        backgroundColor: mainColor.tipColor,
    },
    btnLabel: {
        color: mainColor.otherColor,
    },
    customBtn: {
        color: mainColor.otherColor,
        backgroundColor: mainColor.secondaryColor,
        margin: 6,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
}))

export default function Drama() {
    const classes = useStyles()
    const [reqData, setReqData] = useState([])

    const [time, setTime] = useState("2000-00-00 00:00:00")
    let [sectotal, setSectotal] = useState(0)

    const [expanded, setExpanded] = useState(null)
    const [btndisp, setBtndisp] = useState({ display: "none" })
    const [loading, setLoading] = useState(false)
    const [reqStatus, setReqStatus] = useState("")

    const btnGroup = [
        { name: "TVBT", value: "tvbt" },
        { name: "SUBPIG", value: "subpig" },
        { name: "FIXSUB", value: "fixsub" },
    ]

    const [dhms, setDHMS] = useState({
        "D": "",
        "H": "00",
        "M": "00",
        "S": "00",
    })

    const PressButton = (site) => {
        setLoading(true)
        setExpanded(null)
        let url = `${global.constants.api}/api/v1/drama/${site}`
        fetch(url, {
            method: 'GET',
            dataType: 'json'
        }).then(res => res.json())
            .then(data => {
                let status = data.status
                if (status === 0) {
                    setReqStatus(status)
                    setReqData(data.data)
                    setLoading(false)
                } else {
                    setReqStatus(status)
                    setReqData("No Data")
                    setBtndisp({ display: "block" })
                    setLoading(false)
                }
            })
            .catch(
                () => {
                    setReqStatus(1)
                    setReqData("Server Error")
                    setBtndisp({ display: "block" })
                    setLoading(false)
                }
            )
    }

    const handleChange = panel => (event, expanded) => {
        setExpanded(expanded ? panel : false)
    }

    const dramaTime = useCallback(() => {
        let url = `${global.constants.api}/api/v1/drama/time`
        fetch(url, {
            method: 'GET',
            dataType: 'json',
        }).then(res => res.json())
            .then(data => {
                let status = data.status
                if (status === 0) {
                    let tdata = data.data
                    let time = tdata.time
                    let sectotal = data.data.second
                    setReqStatus(status)
                    setTime(time)
                    setSectotal(sectotal)
                } else {
                    setReqStatus(status)
                    setTime("2000-00-00 00:00:00")
                    setSectotal(0)
                }
            })
            .catch(
                () => {
                    setReqStatus(1)
                    setTime("2000-00-00 00:00:00")
                    setSectotal(0)
                }
            )
                return () => {}
    }, [])

    useEffect(() => {
        dramaTime()
    }, [dramaTime])

    useEffect(() => {
        let timeid = setInterval(() => {
            if (sectotal > 0) {
                setSectotal(sectotal - 1)
                let day = Math.floor(sectotal / (60 * 60 * 24))
                let hour = Math.floor(sectotal / (60 * 60)) - (day * 24)
                let minute = Math.floor(sectotal / 60) - (day * 24 * 60) - (hour * 60)
                let second = Math.floor(sectotal) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
                if (hour <= 9) hour = '0' + hour
                if (minute <= 9) minute = '0' + minute
                if (second <= 9) second = '0' + second
                setDHMS({
                    D: day,
                    H: hour,
                    M: minute,
                    S: second
                })
            } else {
                clearInterval(timeid)
            }
        }, 1000)
        return () => clearInterval(timeid)
    })

    const dramaTmp = []
    function Loading() {
        return (
            <Typography component='div'>
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
            </Typography>
        )
    }
    function Eps(props) {
        if (props.site === "tvbt") {
            if (props.eps !== null) {
                return (
                    <Typography className={classes.tvbtText}>
                        {props.eps.map((ep) => (
                            <Link underline='none' className={classes.tvbtAtag} key={"tvbt" + ep.ep} href={ep.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="contained" className={classes.customBtn}>
                                    {'EP' + ep.ep}
                                </Button>
                            </Link>
                        ))}
                    </Typography>
                )
            } else {
                return <div></div>
            }
        } else if (props.site === "subpig") {
            if (props.eps !== null) {
                return (
                    <Typography className={classes.epInfo}>
                        {props.eps.map((ep) => (
                            <Link underline='none' className={classes.tvbtAtag} key={"subpig" + ep.ep} href={ep.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="contained" className={classes.customBtn}>
                                    BAIDU
                                    </Button>
                            </Link>
                        ))}
                    </Typography>
                )
            } else {
                return <div></div>
            }
        } else if (props.site === "fixsub") {
            if (props.eps !== null) {
                return (
                    <Typography component="div" className={classes.epInfo}>
                        {props.eps.map((ep) => (
                            <Typography component="span" key={"fixsub" + ep.ep}>
                                <Typography component="p" className={classes.fixBtn}>
                                    <Button disabled classes={{ label: classes.fixBtn }}>{'EP' + ep.ep}</Button>
                                </Typography>
                                <Link underline='none' href={ep.url.split(",")[0]} target="_blank" rel="noopener noreferrer">
                                    <Button variant="contained" className={classes.customBtn}>BD</Button>
                                </Link>
                                <Link underline='none' href={ep.url.split(",")[1]} target="_blank" rel="noopener noreferrer">
                                    <Button variant="contained" className={classes.customBtn}>MG</Button>
                                </Link>
                                <Link underline='none' href={ep.url.split(",")[2]} target="_blank" rel="noopener noreferrer">
                                    <Button variant="contained" className={classes.customBtn}>E2K</Button>
                                </Link>
                            </Typography>))}
                    </Typography>
                )
            } else {
                return <div></div>
            }
        }
    }
    if (reqStatus === 0) {
        let dramaSite = reqData.name
        let dramaData = reqData.entities
        for (let i in dramaData) {
            let panel = 'panel' + i
            let dramaDetails = dramaData[i]
            let dramaEps = dramaDetails["dlurls"]
            dramaTmp.push(
                <Typography component='div' key={i} className={classes.panelSty}>
                    <Accordion expanded={expanded === panel} onChange={handleChange(panel)} TransitionProps={{ unmountOnExit: true }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.dateInfo} component="p" color="textPrimary">
                                {dramaDetails.date}
                            </Typography>
                            <Typography className={classes.urlInfo} color="textSecondary" component="div">
                                <Link underline='none' className={classes.aTag} href={dramaDetails.url} target="_blank" rel="noopener noreferrer">
                                    <Typography className={classes.aTag} dangerouslySetInnerHTML={{ __html: dramaDetails.title }} ></Typography>
                                </Link>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Eps site={dramaSite} eps={dramaEps} />
                        </AccordionDetails>
                    </Accordion>
                </Typography>
            )
        }
    } else {
        dramaTmp.push(
            <Typography component='div' key="error" style={btndisp}>
                <Chip
                    className={classes.errorInfo}
                    label={reqData}
                    color="secondary"
                />
            </Typography>
        )
    }

    return (
        <Typography component='div' className={classes.wrapper}>
            <Typography className={classes.topTime} component="p">
                {time}
            </Typography>
            <Button disabled size="medium" classes={{ label: classes.btnLabel, disabled: classes.btnTime }}>
                <AccessTime />
                &nbsp; {dhms.H + ":" + dhms.M + ":" + dhms.S}
            </Button>
            <Divider component='br' />
            <Divider component='br' />
            <ButtonGroup
                variant="contained"
                className={classes.btnGroup}
                classes={{
                    groupedContained: classes.btnGroupBtn,
                    groupedContainedHorizontal: classes.customBtnHorizontal
                }}
                aria-label="Drama List"
            >
                {btnGroup.map((bg, index) => (
                    <Button key={"btn" + index} onClick={() => PressButton(bg.value)}>
                        {bg.name}
                    </Button>
                ))}
            </ButtonGroup>
            {loading ? <Loading /> : dramaTmp}
        </Typography>
    )
}
