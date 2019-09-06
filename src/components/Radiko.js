import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Badge from '@material-ui/core/Badge'
import { DateTimePicker } from "@material-ui/pickers"
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import Chip from '@material-ui/core/Chip'
import Fade from '@material-ui/core/Fade'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import CircularProgress from '@material-ui/core/CircularProgress'


import radikoLogo from '../static/img/radiko.png'

const theme = global.constants.theme

const RadioTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: theme.primaryColor,
            },
        },
        MuiPickersCalendarHeader: {
            dayLabel: {
                color: theme.thirdlyColor,
            }
        },
        MuiPickersDay: {
            day: {
                color: theme.secondaryColor,
            },
            daySelected: {
                backgroundColor: theme.thirdlyColor,
                '&:hover': {
                    backgroundColor: theme.primaryColor,
                }
            },
            dayDisabled: {
                color: theme.otherColor,
            },
            current: {
                color: theme.thirdlyColor,
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: theme.thirdlyColor,
            },
        },
        MuiPickersSlideTransition: {
            transitionContainer: {
                color: theme.thirdlyColor
            }
        },
        MuiPickersClock: {
            clock: {
                backgroundColor: theme.otherColor,
            },
            pin: {
                backgroundColor: theme.thirdlyColor
            },
        },
        MuiPickersClockPointer: {
            noPoint: {
                backgroundColor: theme.thirdlyColor
            },
            thumb: {
                border: `14px solid ${theme.secondaryColor}`
            },
            pointer: {
                backgroundColor: theme.thirdlyColor
            }
        },
        MuiPickerDTTabs: {
            tabs: {
                backgroundColor: theme.primaryColor
            }
        },
        MuiPickersClockNumber: {
            clockNumber: {
                color: theme.secondaryColor
            }
        },
        MuiPickersYear: {
            root: {
                color: theme.thirdlyColor
            },
            yearSelected: {
                color: theme.secondaryColor
            },
            yearDisabled: {
                color: theme.otherColor,
            },
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: theme.otherColor
                }
            }
        },
        MuiInputLabel: {
            root: {
                color: theme.thirdlyColor,
            }
        },
        MuiInputBase: {
            root: {
                color: theme.otherColor,
            },
            input: {
                color: theme.tipColor,
                textAlign: 'center'
            }
        },
        MuiInput: {
            underline: {
                '&:hover:not(disabled):before': {
                    borderBottom: `1px solid ${theme.secondaryColor} !important`,
                },
                '&:before': {
                    borderBottomColor: theme.thirdlyColor,
                },
                '&:after': {
                    borderBottomColor: theme.tipColor,
                }
            }
        },
        MuiFormHelperText: {
            root: {
                color: theme.thirdlyColor,
            }
        },
        MuiSelect: {
            icon: {
                color: theme.thirdlyColor,
            },
            selectMenu: {
                color: theme.tipColor
            }
        },
    },
    palette: {
        secondary: {
            main: theme.otherColor,
        },
    },
})

const styles = ({
    topLogo: {
        paddingTop: "40px",
    },
    progCard: {
        padding: "5px",
    },
    progLabel: {
        color: theme.tipColor,
        cursor: "default",
    },
    progItem: {
        color: theme.tipColor,
        cursor: "default",
    },
    errorInfo: {
        margin: "10px",
        backgroundColor: theme.tipColor,
    },
    customInput: {
        width: "140px",
        '&:hover': {
            borderBottomColor: theme.secondaryColor,
        },
    },
    customUnderline: {
        color: theme.secondaryColor,
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
        color: theme.otherColor,
        backgroundColor: theme.secondaryColor,
        margin: "5px",
        '&:hover': {
            backgroundColor: theme.primaryColor,
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
        color: theme.tipColor
    },
    selectHelp: {
        color: theme.thirdlyColor
    },
    badgeCls: {
        color: '#00a7e9'
    },
    chipCls: {
        paddingTop: 20,
    },
    chip: {
        color: theme.textColor,
        backgroundColor: theme.otherColor
    },
    customBtnLink: {
        color: theme.otherColor,
        backgroundColor: theme.thirdlyColor,
        '&:hover': {
            backgroundColor: theme.primaryColor,
        },
    },
    customLink: {
        color: theme.otherColor,
    },
    customLinkIcon: {
        marginRight: 6
    },
    wrapperBtn: {
        position: 'relative'
    },
    buttonProgress: {
        color: theme.primaryColor,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
})

function date2string(date) {
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    let D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate())
    let h = (date.getHours() + 1 < 10 ? '0' + (date.getHours()) : date.getHours())
    let m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
    let s = '00'
    return (Y + M + D + h + m + s)
}

class Radiko extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tipStatus: false,
            loading: false,
            tipData: '',
            radioData: [],
            station: '',
            start_at: new Date(),
            end_at: new Date(),
            stationName: [
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
        }
    }

    stationChange(e) {
        this.setState({
            station: e.target.value
        })
    }

    startAtChange(e) {
        this.setState({
            start_at: e
        })
    }

    endAtChange(e) {
        this.setState({
            end_at: e
        })
    }

    onKeyUp = (e) => {
        e.keyCode === 13 && this.radioClick()
    }

    radioClick() {
        this.setState({
            radioData: [],
            loading: true,
            tipStatus: false,
        })
        let station = this.state.station
        if (station === undefined || station === "") {
            this.setState({
                tipData: 'No Station',
                tipStatus: true,
                loading: false,
            })
            return false
        }
        let start_at = this.state.start_at
        let end_at = this.state.end_at
        if (start_at >= end_at) {
            this.setState({
                tipData: 'Date Time Error',
                tipStatus: true,
                loading: false,
            })
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
                    this.setState({
                        tipStatus: false,
                        radioData: data.data.entities,
                        loading: false,
                    })
                } else {
                    this.setState({
                        radioData: [],
                        tipStatus: true,
                        tipData: data.message,
                        loading: false,
                    })
                }
            })
            .catch(
                () => this.setState({
                    radioData: [],
                    tipData: 'No Data',
                    tipStatus: true,
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
        const { classes } = this.props
        const radioData = this.state.radioData
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
                <Fade in={this.state.tipStatus} key='chip'>
                    <Chip
                        className={classes.chip}
                        label={this.state.tipData}
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
                                <img src={radikoLogo} style={{ width: "148px" }} alt="" />
                            </Badge>
                        </Link>
                    </Typography>
                    <Typography component='div'>
                        <TextField
                            id="station"
                            select
                            value={this.state.station}
                            onChange={this.stationChange.bind(this)}
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
                            {this.state.stationName.map((station) => (
                                <MenuItem key={station.id} value={station.id}>
                                    {station.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Typography>
                    <Typography component='div'>
                        <DateTimePicker
                            className={classes.dateBody}
                            disableFuture
                            ampm={false}
                            autoOk
                            minDate={'2010-12-01'}
                            variant="inline"
                            helperText="Start DateTime"
                            format="Y-MM-dd HH:mm"
                            value={this.state.start_at}
                            onChange={this.startAtChange.bind(this)}
                        />
                    </Typography>
                    <Typography component='div'>
                        <DateTimePicker
                            className={classes.dateBody}
                            disableFuture
                            ampm={false}
                            autoOk
                            variant="inline"
                            helperText="End DateTime"
                            format="Y-MM-dd HH:mm"
                            value={this.state.end_at}
                            onChange={this.endAtChange.bind(this)}
                        />
                    </Typography>
                    <Typography component='div' className={classes.wrapperBtn}>
                        <Button variant="contained" className={classes.customBtn} onClick={this.radioClick.bind(this)} disabled={this.state.loading}>
                            {this.state.loading ? 'loading' : 'start'}
                        </Button>
                        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Typography>
                    <Typography component='div' className={classes.chipCls}>
                        {radioTmp}
                        {tipTmp}
                    </Typography>
                </Typography>
            </ThemeProvider>
        )
    }
}

Radiko.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Radiko)