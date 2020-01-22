import React, { useState, useEffect, useCallback } from 'react'

import { makeStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Info from '@material-ui/icons/Info'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Link from '@material-ui/core/Link'
import Skeleton from '@material-ui/lab/Skeleton'
import LazyLoad from 'react-lazyload'

const mainColor = global.constants.theme

const useStyles = makeStyles(theme => ({
    wrapper: {
        paddingTop: 40,
    },
    stCard: {
        padding: 10,
    },
    stCardTitle: {
        textAlign: "left",
        color: mainColor.textColor,
        cursor: "default",
        padding: 10,
    },
    stText: {
        color: mainColor.textColor,
        cursor: "default",
    },
    subCard: {
        paddingBottom: 16
    },
    subCardContent: {
        '&:last-child': {
            paddingBottom: 12
        }
    },
    errorInfo: {
        margin: 10,
        backgroundColor: mainColor.tipColor,
    },
    resultImg: {
        width: "100%",
    },
    btnTime: {
        backgroundColor: mainColor.tipColor,
    },
    btnLabel: {
        color: "#fff",
    },
    customBtn: {
        color: "#fff",
        backgroundColor: mainColor.secondaryColor,
        fontSize: "0.85rem",
        margin: 4,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
    SkeletonCls: {
        margin: '10px auto'
    },
    placeholderImg: {
        margin: '5px auto',
        width: "90%",
    }
}))

export default function Stchannel() {
    const classes = useStyles()
    const [reqData, setReqData] = useState(null)
    const [time, setTime] = useState("2000-00-00 00:00:00")
    const [btndisp, setBtndisp] = useState({ display: "none" })
    const [loading, setLoading] = useState(true)
    const [reqStatus, setReqStatus] = useState(1)

    const stData = useCallback(() => {
        let url = `${global.constants.api}/api/v1/stchannel`
        fetch(url, {
            method: 'GET',
            dataType: 'json',
        }).then(res => res.json())
            .then(data => {
                let sdata = data.data
                let status = data.status
                if (status === 0) {
                    setReqStatus(status)
                    setReqData(sdata.entities)
                    setTime(sdata.time)
                    setLoading(false)
                } else {
                    setReqStatus(status)
                    setReqData("No Data")
                    setTime("2000-00-00 00:00:00")
                    setBtndisp({ display: "block", padding: 20 })
                    setLoading(false)
                }
            })
            .catch(
                () => {
                    setReqStatus(1)
                    setReqData("Server Error")
                    setTime("2000-00-00 00:00:00")
                    setBtndisp({ display: "block", padding: 20 })
                    setLoading(false)
                }
            )
    }, [])

    useEffect(() => {
        stData()
    }, [stData])

    let stTmp = []
    let stTime = []
    stTime.push(
        <Typography component='div' key="time">
            <Button disabled size="medium" classes={{ label: classes.btnLabel, disabled: classes.btnTime }}>
                <Info />
                &nbsp; {time}
            </Button>
            <br />
            <br />
        </Typography>
    )
    function Loading() {
        return (<Typography component='div'>
            <Box width="100%" >
                <Skeleton width="16%" height={30} className={classes.SkeletonCls} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="80%" height={10} />
                <Skeleton variant="rect" width="100%" height={400} />
                <Skeleton width="16%" height={30} className={classes.SkeletonCls} />
            </Box>
        </Typography>)
    }

    if (reqStatus === 0) {
        for (let s in reqData) {
            let sdata = reqData[s]
            stTmp.push(
                <Typography component='div' className={classes.stCard} key={"s" + s}>
                    <LazyLoad
                        height={200}
                        offset={[-200, 0]}
                        once
                        placeholder={<Loading />}>
                        <Card>
                            <CardContent className={classes.subCard} classes={{ root: classes.subCardContent }}>
                                <Typography component="p" className={classes.stText}>
                                    {sdata.date}
                                </Typography>
                                <Typography className={classes.stCardTitle} dangerouslySetInnerHTML={{ __html: sdata.title }} >
                                </Typography>
                                <Typography>
                                    <img className={classes.resultImg} src={sdata.purl} alt={"i" + s}></img>
                                </Typography>
                                <Typography>
                                    <Link underline='none' href={sdata.path} target="_blank" download rel="noopener noreferrer">
                                        <Button variant="contained" className={classes.customBtn}>Download</Button>
                                    </Link>
                                </Typography>
                            </CardContent>
                        </Card>
                    </LazyLoad>
                </Typography>

            )
        }
    } else {
        stTmp.push(
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
            {stTime}
            {loading ? <Loading /> : stTmp}
        </Typography>
    )
}
