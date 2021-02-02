import React, { useState } from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Badge from '@material-ui/core/Badge'
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import Chip from '@material-ui/core/Chip'
import Fade from '@material-ui/core/Fade'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import CircularProgress from '@material-ui/core/CircularProgress'

import radikoLogo from '../static/img/radiko.png'

const mainColor = global.constants.theme

const RadioTheme = createMuiTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                label: {
                    color: mainColor.textColor,
                }
            }
        },
        PrivateTabIndicator: {
            styleOverrides: {
                colorSecondary: {
                    backgroundColor: mainColor.thirdlyColor,
                }
            }
        }
    }
})

const MyMobileDateTimePicker = withStyles({
    root: {
        // 顶部
        '& .MuiPickersToolbar-root': {
            backgroundColor: mainColor.primaryColor,
        },
        '& .MuiPickersToolbarText-root': {
            color: mainColor.thirdlyColor,
        },
        '& .MuiPickersToolbarText-root.Mui-selected': {
            color: mainColor.otherColor
        },
        '& .MuiSvgIcon-root': {
            color: mainColor.otherColor
        },
        // 中部
        '& .MuiDateTimePickerTabs-tabs': {
            backgroundColor: mainColor.primaryColor,
        },
        // 主体
        '& .MuiPickersCalendarHeader-switchView': {
            color: mainColor.secondaryColor
        },
        '& .MuiPickersCalendarHeader-labelItem': {
            color: mainColor.secondaryColor
        },
        '& .MuiPickersYear-yearButton.Mui-selected': {
            color: mainColor.otherColor,
            backgroundColor: mainColor.textColor,
        },
        '& .MuiPickersDay-root.Mui-selected': {
            color: mainColor.otherColor,
            backgroundColor: mainColor.textColor,
        },
        '& .MuiClock-pin': {
            backgroundColor: mainColor.textColor
        },
        '& .MuiClockPointer-root': {
            backgroundColor: mainColor.textColor,
        },
        '& .MuiClockPointer-noPoint': {
            backgroundColor: mainColor.textColor,
        },
        '& .MuiClockPointer-thumb': {
            border: `16px solid ${mainColor.textColor}`
        },
        '& .MuiInput-root': {
            color: mainColor.primaryColor,
        },
        '& .MuiFormHelperText-root': {
            color: mainColor.thirdlyColor,
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: mainColor.thirdlyColor,
        },
        '& .MuiInput-underline:hover:not(disabled):before': {
            borderBottom: `1px solid ${mainColor.secondaryColor} !important`,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: mainColor.tipColor
        }
    }
})(MobileDateTimePicker)

const MyTextField = withStyles({
    root: {
        '& .MuiInput-root': {
            color: mainColor.primaryColor,
        },
        '& .MuiFormHelperText-root': {
            color: mainColor.thirdlyColor,
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: mainColor.thirdlyColor,
        },
        '& .MuiInput-underline:hover:not(disabled):before': {
            borderBottom: `1px solid ${mainColor.secondaryColor} !important`,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: mainColor.tipColor
        },
        '& .MuiSelect-icon': {
            color: mainColor.thirdlyColor,
        }
    }
})(TextField)


const useStyles = makeStyles(theme => ({
    topLogo: {
        paddingTop: 90,
    },
    progCard: {
        padding: 5,
    },
    progLabel: {
        color: mainColor.tipColor,
        cursor: "default",
    },
    progItem: {
        color: mainColor.tipColor,
        cursor: "default",
    },
    errorInfo: {
        margin: 10,
        backgroundColor: mainColor.tipColor,
    },
    customInput: {
        width: 140,
        '&:hover': {
            borderBottomColor: mainColor.secondaryColor,
        },
    },
    customUnderline: {
        color: mainColor.secondaryColor,
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
        margin: 6,
        // '&:hover': {
        //     backgroundColor: mainColor.otherColor,
        // },
    },
    // customBtnOutline: {
    //     border: `16px solid ${mainColor.textColor}`
    // },
    selectBody: {
        minWidth: 240,
        textAlign: 'center'
    },
    selectMenu: {
        color: mainColor.tipColor
    },
    selectHelp: {
        color: mainColor.thirdlyColor
    },
    badgeCls: {
        color: '#00a7e9'
    },
    chipCls: {
        paddingTop: 20,
    },
    chip: {
        color: mainColor.textColor,
        backgroundColor: mainColor.otherColor
    },
    customBtnLink: {
        color: mainColor.otherColor,
        backgroundColor: mainColor.thirdlyColor,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
    customLink: {
        color: mainColor.otherColor,
    },
    customLinkIcon: {
        marginRight: 6
    },
    wrapperBtn: {
        position: 'relative'
    },
    buttonProgress: {
        color: mainColor.primaryColor,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    logoCls: {
        width: 148
    }
}))

function date2string(date) {
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1).toString().padStart(2, '0')
    let D = (date.getDate()).toString().padStart(2, '0')
    let h = (date.getHours()).toString().padStart(2, '0')
    let m = (date.getMinutes()).toString().padStart(2, '0')
    let s = "00"
    return (Y + M + D + h + m + s)
}

export default function Radiko() {
    const stationName = [
        { 'id': 'TBS', 'name': 'TBSラジオ', 'area_id': 'JP13' },
        { 'id': 'QRR', 'name': '文化放送', 'area_id': 'JP13' },
        { 'id': 'LFR', 'name': 'ニッポン放送', 'area_id': 'JP13' },
        { 'id': 'INT', 'name': 'InterFM897', 'area_id': 'JP13' },
        { 'id': 'FMT', 'name': 'TOKYO FM', 'area_id': 'JP13' },
        { 'id': 'FMJ', 'name': 'J-WAVE', 'area_id': 'JP13' },
        { 'id': 'JORF', 'name': 'ラジオ日本', 'area_id': 'JP13' },
        { 'id': 'JOAK', 'name': 'NHKラジオ第1（東京）', 'area_id': 'JP13' },
        { 'id': 'RN1', 'name': 'ラジオNIKKEI第1 ', 'area_id': 'JP13' },
        { 'id': 'RN2', 'name': 'ラジオNIKKEI第2', 'area_id': 'JP13' },
        { 'id': 'JOAB', 'name': 'NHKラジオ第2', 'area_id': 'JP13' },
        { 'id': 'JOAK-FM', 'name': 'NHK-FM（東京）', 'area_id': 'JP13' }
    ]
    const [startAt, setStartAt] = useState(new Date())
    const [endAt, setEndAt] = useState(new Date())
    const [radioData, setRadioData] = useState([])
    const [tipStatus, setTipStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [station, setStation] = useState("")
    const [tipData, setTipData] = useState("")


    const stationChange = (e) => {
        setStation(e.target.value)
    }

    const startAtChange = (e) => {
        setStartAt(e)
    }

    const endAtChange = (e) => {
        setEndAt(e)
    }

    const radioClick = () => {
        setRadioData([])
        setLoading(true)
        setTipData(false)
        if (station === undefined || station === "") {
            setTipData('No Station')
            setTipStatus(true)
            setLoading(false)
            return false
        }
        let start_at = startAt
        let end_at = endAt
        if (start_at >= end_at) {
            setTipData("Date Time Error")
            setTipStatus(true)
            setLoading(false)
            return false
        }
        let start_at_str = date2string(start_at)
        let end_at_str = date2string(end_at)
        let radio_body = {
            "station": station,
            "start_at": start_at_str,
            "end_at": end_at_str
        }

        let url = `${global.constants.api}/api/v1/radiko`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(radio_body),
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {
                if (data.status === 0) {
                    setTipStatus(false)
                    setRadioData(data.data.entities)
                    setLoading(false)
                } else {
                    setRadioData([])
                    setTipStatus(true)
                    setTipData(data.message)
                    setLoading(false)
                }
            })
            .catch(
                () => {
                    setRadioData([])
                    setTipData("No Data")
                    setTipStatus(true)
                    setLoading(false)
                }
            )
    }

    const classes = useStyles()
    let radioTmp = []
    let tipTmp = []
    if (radioData.length !== 0) {
        radioTmp.push(
            <Link
                key='data'
                className={classes.customLink}
                underline='none'
                href={radioData.url}
                target="_blank"
                download
                rel="noopener noreferrer"
            >
                <Button variant="contained" className={classes.customBtnLink}>
                    <CloudDownloadIcon className={classes.customLinkIcon} />
                    download
                        </Button>
            </Link>
        )
    } else {
        tipTmp.push(
            <Fade in={tipStatus} key='chip'>
                <Chip
                    className={classes.chip}
                    label={tipData}
                />
            </Fade>
        )
    }
    return (
        <ThemeProvider theme={RadioTheme}>
            <Typography component='div'>
                <Typography component='p' className={classes.topLogo}>
                    <Link underline='none' href="https://radiko.jp" target="_blank" rel="noopener noreferrer">
                        <Badge badgeContent={'Tokyo'} className={classes.badgeCls}>
                            <img src={radikoLogo} className={classes.logoCls} alt="" />
                        </Badge>
                    </Link>
                </Typography>
                <Typography component='div'>
                    <MyTextField
                        id="station"
                        select
                        variant="standard"
                        value={station}
                        onChange={event => stationChange(event)}
                        className={classes.selectBody}
                        FormHelperTextProps={{
                            classes: {
                                root: classes.selectHelp
                            }
                        }}
                        SelectProps={{
                            MenuProps: {
                                classes: {
                                    list: classes.selectMenu
                                }
                            }
                        }}
                        helperText="Station"
                        margin="normal"
                    >
                        {stationName.map((station) => (
                            <MenuItem key={station.id} value={station.id}>
                                {station.name}
                            </MenuItem>
                        ))}
                    </MyTextField>
                </Typography>
                <Typography component='div'>
                    <MyMobileDateTimePicker
                        disableFuture
                        ampm={false}
                        autoOk
                        inputVariant="standard"
                        minDate={'2017-02-20'}
                        maxDate={'2027-02-20'}
                        toolbarTitle="Start DateTime"
                        inputFormat="yyyy-MM-dd HH:mm"
                        mask="____-__-__ __:__"
                        value={startAt}
                        onChange={event => startAtChange(event)}
                        renderInput={props => <MyTextField
                            variant="standard"
                            className={classes.selectBody}
                            helperText="Start DateTime"
                            {...props}
                        />}
                    />
                </Typography>
                <Typography component='div'>
                    <MyMobileDateTimePicker
                        disableFuture
                        ampm={false}
                        autoOk
                        minDate={'2017-02-20'}
                        maxDate={'2027-02-20'}
                        toolbarTitle="End DateTime"
                        inputFormat="yyyy-MM-dd HH:mm"
                        mask="____-__-__ __:__"
                        value={endAt}
                        onChange={event => endAtChange(event)}
                        renderInput={props => <MyTextField
                            variant="standard"
                            className={classes.selectBody}
                            helperText="End DateTime"
                            {...props}
                        />}
                    />
                </Typography>
                <Typography component='div' className={classes.wrapperBtn}>
                    <Button className={classes.customBtn} onClick={() => radioClick()} disabled={loading}>
                        {loading ? 'loading' : 'start'}
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Typography>
                <Typography component='div' className={classes.chipCls}>
                    {radioTmp}
                    {tipTmp}
                </Typography>
            </Typography>
        </ThemeProvider>
    )
}
