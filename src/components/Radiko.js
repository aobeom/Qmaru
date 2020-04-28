import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Badge from '@material-ui/core/Badge'
import { MobileDateTimePicker } from "@material-ui/pickers"
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import Chip from '@material-ui/core/Chip'
import Fade from '@material-ui/core/Fade'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import CircularProgress from '@material-ui/core/CircularProgress'

import radikoLogo from '../static/img/radiko.png'

const mainColor = global.constants.theme

const RadioTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: mainColor.primaryColor,
            },
        },
        MuiPickersYear: {
            yearButton: {
                '&:hover': {
                    backgroundColor: mainColor.otherColor,
                },
            },
            yearSelected: {
                backgroundColor: mainColor.secondaryColor,
                '&:hover': {
                    backgroundColor: mainColor.primaryColor,
                },
                '&:focus': {
                    backgroundColor: mainColor.primaryColor,
                }
            },
            yearDisabled: {
                color: mainColor.otherColor,
            },
        },
        MuiPickersCalendarHeader: {
            monthText: {
                color: mainColor.secondaryColor,
            }
        },
        MuiPickersDay: {
            day: {
                color: mainColor.secondaryColor,
                '&:focus': {
                    backgroundColor: mainColor.primaryColor,
                }
            },
            daySelected: {
                backgroundColor: mainColor.thirdlyColor,
                '&:hover': {
                    backgroundColor: mainColor.primaryColor,
                },
                '&:focus.MuiPickersDay-daySelected': {
                    backgroundColor: mainColor.primaryColor,
                }
            },
            dayDisabled: {
                color: mainColor.otherColor,
            },
            today: {
                color: mainColor.thirdlyColor,
                '&:not(.MuiPickersDay-daySelected)': {
                    border: `1px solid ${mainColor.otherColor}`,
                },
            },
        },
        MuiTypography: {
            root: {
                color: mainColor.secondaryColor
            },
            colorPrimary: {
                color: mainColor.secondaryColor
            }
        },
        MuiPickersSlideTransition: {
            transitionContainer: {
                color: mainColor.thirdlyColor
            }
        },
        MuiPickersClock: {
            clock: {
                backgroundColor: mainColor.otherColor,
            },
            pin: {
                backgroundColor: mainColor.thirdlyColor
            },
        },
        MuiPickersClockPointer: {
            noPoint: {
                backgroundColor: mainColor.thirdlyColor
            },
            thumb: {
                border: `14px solid ${mainColor.secondaryColor}`
            },
            pointer: {
                backgroundColor: mainColor.thirdlyColor
            }
        },
        MuiPickerDTTabs: {
            tabs: {
                backgroundColor: mainColor.primaryColor
            }
        },
        MuiPickersClockNumber: {
            clockNumber: {
                color: mainColor.secondaryColor
            }
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: mainColor.otherColor
                },
                color: mainColor.secondaryColor,
            }
        },
        MuiInputLabel: {
            root: {
                color: mainColor.thirdlyColor,
            }
        },
        MuiInputBase: {
            root: {
                color: mainColor.otherColor,
            },
            input: {
                color: mainColor.tipColor,
                textAlign: 'center'
            }
        },
        MuiPickerDTToolbar: {
            penIcon: {
                display: "none"
            }
        },
        MuiInput: {
            underline: {
                '&:hover:not(disabled):before': {
                    borderBottom: `1px solid ${mainColor.secondaryColor} !important`,
                },
                '&:before': {
                    borderBottomColor: mainColor.thirdlyColor,
                },
                '&:after': {
                    borderBottomColor: mainColor.tipColor,
                }
            }
        },
        MuiFormHelperText: {
            root: {
                color: mainColor.thirdlyColor,
            }
        },
        MuiSelect: {
            icon: {
                color: mainColor.thirdlyColor,
            },
            selectMenu: {
                color: mainColor.tipColor
            }
        },
        MuiButton: {
            textPrimary: {
                '&:hover': {
                    backgroundColor: mainColor.otherColor
                },
                color: mainColor.secondaryColor,
            },
            containedPrimary: {
                '&:hover': {
                    backgroundColor: mainColor.otherColor
                },
            }
        }
    },
    palette: {
        secondary: {
            main: mainColor.otherColor,
        },
    },
})

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
        color: mainColor.otherColor,
        backgroundColor: mainColor.secondaryColor,
        margin: 6,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
    selectBody: {
        minWidth: 240,
        textAlign: 'center'
    },
    dateBody: {
        minWidth: 240,
        padding: 10,
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
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    let D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate())
    let h = (date.getHours() + 1 < 10 ? '0' + (date.getHours()) : date.getHours())
    let m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
    let s = '00'
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
                    <TextField
                        id="station"
                        select
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
                    </TextField>
                </Typography>
                <Typography component='div'>
                    <MobileDateTimePicker
                        className={classes.dateBody}
                        disableFuture
                        ampm={false}
                        autoOk
                        minDate={'2017-02-20'}
                        maxDate={'2027-02-20'}
                        toolbarTitle="Start DateTime"
                        helperText="Start DateTime"
                        inputFormat="yyyy-MM-dd HH:mm"
                        mask="____-__-__ __:__"
                        value={startAt}
                        onChange={event => startAtChange(event)}
                    />
                </Typography>
                <Typography component='div'>
                    <MobileDateTimePicker
                        className={classes.dateBody}
                        disableFuture
                        ampm={false}
                        autoOk
                        minDate={'2017-02-20'}
                        maxDate={'2027-02-20'}
                        toolbarTitle="End DateTime"
                        helperText="End DateTime"
                        inputFormat="yyyy-MM-dd HH:mm"
                        mask="____-__-__ __:__"
                        value={endAt}
                        onChange={event => endAtChange(event)}
                    />
                </Typography>
                <Typography component='div' className={classes.wrapperBtn}>
                    <Button variant="contained" className={classes.customBtn} onClick={() => radioClick()} disabled={loading}>
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
