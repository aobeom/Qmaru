import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import AccessTime from '@material-ui/icons/AccessTime'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        paddingTop: "40px",
        width: "100%",
    },
    errorInfo: {
        margin: "10px",
        backgroundColor: theme.tipColor,
    },
    dateInfo: {
        flexBasis: '25%',
        flexShrink: 0,
        color: theme.tipColor,
    },
    urlInfo: {
        flexBasis: '60%',
        flexShrink: 0,
        fontWeight: "500",
    },
    aTag: {
        color: theme.thirdlyColor,
        '&:hover': {
            color: theme.tipColor,
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
        color: theme.tipColor,
        cursor: "default",
    },
    tvbtText: {
        textAlign: "left",
    },
    tvbtAtag: {
        padding: "5px",
    },
    fixBtn: {
        color: theme.tipColor,
    },
    btnGroup: {
        paddingBottom: "10px",
    },
    btnTime: {
        backgroundColor: theme.tipColor,
    },
    btnLabel: {
        color: theme.otherColor,
    },
    customBtn: {
        color: theme.otherColor,
        backgroundColor: theme.secondaryColor,
        fontSize: "0.85rem",
        margin: "5px",
        '&:hover': {
            backgroundColor: theme.primaryColor,
        },
    },
})

class Drama extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            day: "",
            time: "2000-00-00 00:00:00",
            hour: "00",
            minute: "00",
            second: "00",
            expanded: null,
            btndisp: {
                display: "none",
            },
            btnGroup: [
                {name: "TVBT", value: "tvbt"},
                {name: "SUBPIG", value: "subpig"},
                {name: "FIXSUB", value: "fixsub"},
            ],
        }
    }
    PressButton(site) {
        this.setState({
            expanded: null,
        })
        let url = `${global.constants.api}/api/v1/drama/${site}`
        fetch(url, {
                method: 'GET',
                dataType: 'json'
            }).then(res => res.json())
            .then(data => {
                let status = data.status
                if (status === 0) {
                    this.setState({
                        status: status,
                        values: data.data,
                    })
                } else {
                    this.setState({
                        status: status,
                        values: "No Data",
                        btndisp: {
                            display: "block",
                        },
                    })
                }
            })
            .catch(
                () => this.setState({
                    status: 1,
                    values: "Server Error",
                    btndisp: {
                        display: "block"
                    },
                }),
            )
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        })
    }
    componentWillMount() {
        let url = `${global.constants.api}/api/v1/drama/time`
        fetch(url, {
                method: 'GET',
                dataType: 'json',
            }).then(res => res.json())
            .then(data => {
                let status = data.status
                let tdata = data.data
                let time = tdata.time
                let sectotal = data.data.second
                if (status === 0) {
                    this.setState({
                        status: status,
                        time: time,
                        sectotal: sectotal,
                    })
                } else {
                    this.setState({
                        status: status,
                        time: "2000-00-00 00:00:00",
                        sectotal: 0,
                    })
                }
                this.count()
            })
            .catch(
                () => this.setState({
                    status: 1,
                    time: "2000-00-00 00:00:00",
                    sectotal: 0,
                })
            )
    }
    count = () => {
        let sectotal = this.state.sectotal
        let timeid = setInterval(() => {
            if (sectotal > 0) {
                let day = Math.floor(sectotal / (60 * 60 * 24))
                let hour = Math.floor(sectotal / (60 * 60)) - (day * 24)
                let minute = Math.floor(sectotal / 60) - (day * 24 * 60) - (hour * 60)
                let second = Math.floor(sectotal) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
                if (hour <= 9) hour = '0' + hour
                if (minute <= 9) minute = '0' + minute
                if (second <= 9) second = '0' + second
                this.setState({
                    sectotal: (sectotal--),
                    day: day,
                    hour: hour,
                    minute: minute,
                    second: second
                })
            } else {
                clearInterval(timeid)
            }
        }, 1000)
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    render() {
        const btnGroup = this.state.btnGroup
        const values = this.state.values
        const time = this.state.time
        const hour = this.state.hour
        const minute = this.state.minute
        const second = this.state.second
        const expanded = this.state.expanded
        const status = this.state.status
        const { classes } = this.props
        let dramaTmp = []
        if (status === 0) {
            let dramaSite = values.name
            let dramaData = values.entities
            if (dramaSite === "tvbt") {
                for (let i in dramaData) {
                    let tvbt_info = dramaData[i]
                    let tvbt_ep = tvbt_info["dlurls"]
                    let panel = 'panel' + i
                    dramaTmp.push(
                        <div key={"tvbt" + i}>
                        <ExpansionPanel expanded={expanded === panel} onChange={this.handleChange(panel)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.dateInfo} component="p" color="textPrimary">
                                    {tvbt_info.date}
                                </Typography>
                                <Typography className={classes.urlInfo} color="textSecondary">
                                    <a className={classes.aTag} href={tvbt_info.url} target="_blank">{tvbt_info.title}</a>
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={classes.tvbtText}>
                                    {tvbt_ep.map((ep, index) => (
                                        <a className={classes.tvbtAtag} key={'t' + index} href={ep[1] + '#' + ep[2]} target="_blank">
                                            <Button variant="contained" className={classNames(classes.customBtn)}>
                                                {'EP' + ep[0]}
                                            </Button>
                                        </a>
                                    ))}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </div>
                    )
                }
            }
            if (dramaSite === "subpig") {
                for (let j in dramaData) {
                    let subpig_info = dramaData[j]
                    let subpig_ep = subpig_info["dlurls"]
                    let panel = 'panel' + j
                    if (typeof (subpig_ep) !== "undefined") {
                        dramaTmp.push(
                            <div key={"subpig" + j} >
                            <ExpansionPanel expanded={expanded === panel} onChange={this.handleChange(panel)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.dateInfo} component="p" color="textPrimary">
                                        {subpig_info.date}
                                    </Typography>
                                    <Typography className={classes.urlInfo} color="textSecondary">
                                        <a className={classes.aTag} href={subpig_info.url} target="_blank">{subpig_info.title}</a>
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className={classes.epInfo}>
                                        <a key={'t' + j} href={subpig_ep[0] + '#' + subpig_ep[1]} target="_blank">
                                            <Button variant="contained" className={classNames(classes.customBtn)}>
                                                BAIDU
                                            </Button>
                                        </a>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            </div>
                        )
                    }
                }
            }
            if (dramaSite === "fixsub") {
                for (let k in dramaData) {
                    let fixsub_info = dramaData[k]
                    let fixsub_ep = fixsub_info["dlurls"]
                    let panel = 'panel' + k
                    dramaTmp.push(
                        <div key={"fixsub" + k}>
                            <ExpansionPanel expanded={expanded === panel} onChange={this.handleChange(panel)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.urlFixsub} color="textSecondary">
                                        <a className={classes.aTag} href={fixsub_info.url} target="_blank">{fixsub_info.title}</a>
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography component="div" className={classes.epInfo}>
                                        {fixsub_ep.map((ep, index) => (
                                            <span key={"f" + index}>
                                                <p className={classes.fixBtn}>
                                                    <Button disabled classes={{label:classes.fixBtn}}>{'EP' + ep[0]}</Button>
                                                </p>
                                                <a href={ep[1]} target="_blank">
                                                    <Button variant="contained" className={classNames(classes.customBtn)}>BD</Button>
                                                </a>
                                                <a href={ep[2]} target="_blank">
                                                    <Button variant="contained" className={classNames(classes.customBtn)}>MG</Button>
                                                </a>
                                                <a href={ep[3]} target="_blank">
                                                    <Button variant="contained" className={classNames(classes.customBtn)}>E2K</Button>
                                                </a>
                                            </span>
                                        ))}
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    )
                }
            } 
        } else {
            dramaTmp.push(
                <div key="error" style={this.state.btndisp}>
                    <Chip
                        className={classes.errorInfo}
                        label={values}
                        color="secondary"
                    />
                </div>
            )
        }
        return (
            <div className={classes.wrapper}>
                <p className={classes.topTime}>
                    {time}
                </p>
                <Button disabled size="medium" classes={{label:classes.btnLabel,disabled: classes.btnTime}}>
                    <AccessTime  />
                    &nbsp; {hour + ":" + minute + ":" + second}
                </Button>
                <br />
                <br />
                <div className={classes.btnGroup}>
                    {btnGroup.map((bg, index) => (
                        <Button key={"btn" + index} variant="contained" className={classNames(classes.customBtn)} onClick={this.PressButton.bind(this, bg.value)}>
                            {bg.name}
                        </Button>
                    ))}
                </div>  
                {dramaTmp}
            </div>
        )
    }
}

Drama.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(Drama)