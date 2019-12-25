import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import AccessTime from '@material-ui/icons/AccessTime'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import Skeleton from '@material-ui/lab/Skeleton'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        paddingTop: 40,
    },
    errorInfo: {
        margin: 10,
        backgroundColor: theme.tipColor,
    },
    dateInfo: {
        flexBasis: '25%',
        flexShrink: 0,
        color: theme.tipColor,
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
        marginBottom: 10,
        color: theme.tipColor,
        cursor: "default",
    },
    tvbtText: {
        textAlign: "left",
    },
    tvbtAtag: {
        padding: 6,
    },
    fixBtn: {
        color: theme.tipColor,
    },
    btnGroup: {
        paddingBottom: 10,
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
        margin: 6,
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
                { name: "TVBT", value: "tvbt" },
                { name: "SUBPIG", value: "subpig" },
                { name: "FIXSUB", value: "fixsub" },
            ],
            loading: false,
        }
    }
    PressButton(site) {
        this.setState({
            loading: true,
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
                        loading: false,
                    })
                } else {
                    this.setState({
                        status: status,
                        values: "No Data",
                        btndisp: {
                            display: "block",
                        },
                        loading: false,
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
                    loading: false,
                }),
            )
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        })
    }
    componentDidMount() {
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
            } else if (props.site === "subpig") {
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
            } else if (props.site === "fixsub") {
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
            }
        }
        if (status === 0) {
            let dramaSite = values.name
            let dramaData = values.entities
            for (let i in dramaData) {
                let panel = 'panel' + i
                let dramaDetails = dramaData[i]
                let dramaEps = dramaDetails["dlurls"]
                dramaTmp.push(
                    <Typography component='div' key={i} className={classes.panelSty}>
                        <ExpansionPanel expanded={expanded === panel} onChange={this.handleChange(panel)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.dateInfo} component="p" color="textPrimary">
                                    {dramaDetails.date}
                                </Typography>
                                <Typography className={classes.urlInfo} color="textSecondary" component="div">
                                    <Link underline='none' className={classes.aTag} href={dramaDetails.url} target="_blank" rel="noopener noreferrer">
                                        <Typography className={classes.aTag} dangerouslySetInnerHTML={{ __html: dramaDetails.title }} ></Typography>
                                    </Link>
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Eps site={dramaSite} eps={dramaEps} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Typography>
                )
            }
        } else {
            dramaTmp.push(
                <Typography component='div' key="error" style={this.state.btndisp}>
                    <Chip
                        className={classes.errorInfo}
                        label={values}
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
                    &nbsp; {hour + ":" + minute + ":" + second}
                </Button>
                <Divider component='br' />
                <Divider component='br' />
                <Typography component='div' className={classes.btnGroup}>
                    {btnGroup.map((bg, index) => (
                        <Button key={"btn" + index} variant="contained" className={classes.customBtn} onClick={this.PressButton.bind(this, bg.value)}>
                            {bg.name}
                        </Button>
                    ))}
                </Typography>
                {this.state.loading ? <Loading /> : dramaTmp}
            </Typography>
        )
    }
}

Drama.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Drama)
