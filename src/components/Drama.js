import React from 'react';

import Button from '@material-ui/core/Button';
import AccessTime from '@material-ui/icons/AccessTime';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import '../config';

const dramaCss = {
    container:{
        paddingTop: "40px",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
    },
    timec:{
      padding: "20px",
      width: "100%",
    },
    hr:{
      width: "100%"
    },
    point:{
      textAlign: "center",
    },
    content:{
        justifyContent: "center",
    },
    dateInfo:{
        flexBasis: '25%',
        flexShrink: 0,
    },
    urlInfo:{
        flexBasis: '60%',
        flexShrink: 0,
    },
    urlfix:{
        flexBasis: '100%',
        flexShrink: 0,
    },
    epInfo:{
        flexBasis: '100%',
        flexShrink: 0,
    }
}

class Drama extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            time: "2000-00-00 00:00:00",
            sectotal: "",
            day: "",
            hour: "00",
            minute: "00",
            second: "00"
        }
    }
    PressButton (site, event) {
        let url = `${global.constants.api}/api/v1/drama/${site}`
        fetch(url, {
            method: 'GET',
            dataType: 'json'
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    values: data.data,
                })
            })
    }
    state = {
        expanded: null,
      };
    
      handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };
    componentWillMount () {
        let url = `${global.constants.api}/api/v1/drama/time`
        fetch(url, {
            method: 'GET',
            dataType: 'json'
        }).then(res => res.json())
            .then(data => {
                let tdata = data.data
                let time = tdata.time
                let sectotal = data.data.second
                this.setState({
                    time: time,
                    sectotal: sectotal
            })
            this.count()
        })
    }
    count = () => {
        let sectotal = this.state.sectotal
        let timeid = setInterval(() => {
            if (sectotal > 0) {
                let day = Math.floor(sectotal / (60 * 60 * 24));
                let hour = Math.floor(sectotal / (60 * 60)) - (day * 24);
                let minute = Math.floor(sectotal / 60) - (day * 24 * 60) - (hour * 60);
                let second = Math.floor(sectotal) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                if (hour <= 9) hour = '0' + hour;
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
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
        }, 1000);
    }
    componentWillUnmount(){
        this.setState = ()=>{
            return
        }
    }
    render() {
        const values = this.state.values
        const time = this.state.time
        const hour = this.state.hour
        const minute = this.state.minute
        const second = this.state.second
        let dramaTmp = []


        let dramaSite = values.name
        let dramaData = values.entities
        const { expanded } = this.state;
        if(dramaSite === "tvbt") {
            for(let i in dramaData) {
                let tvbt_info = dramaData[i] 
                let tvbt_ep = tvbt_info["dlurls"]
                let panel = 'panel' + i
                dramaTmp.push(
                    <div key={"tvbt" + i}>
                    <ExpansionPanel expanded={expanded === panel} onChange={this.handleChange(panel)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={dramaCss.dateInfo} component="p" color="textPrimary">
                            {tvbt_info.date}
                            </Typography>
                            <Typography style={dramaCss.urlInfo} color="textSecondary">
                            <a href={tvbt_info.url} target="_blank">{tvbt_info.title}</a>
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography style={{textAlign: "left"}}>
                                    {tvbt_ep.map((ep, index) => (
                                    <a style={{padding: "5px"}} key={'t' + index} href={ep[1] + '#' + ep[2]} target="_blank">
                                        <Button style={{margin: "5px"}} variant="contained" color="primary">
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
        if(dramaSite === "subpig") {
            for(let j in dramaData) {
                let subpig_info = dramaData[j]
                let subpig_ep = subpig_info["dlurls"]
                let panel = 'panel' + j
                if (typeof (subpig_ep) !== "undefined"){
                    dramaTmp.push(
                        <div key={"subpig" + j} style={{width: "auto"}}>
                            <ExpansionPanel expanded={expanded === panel} onChange={this.handleChange(panel)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography style={dramaCss.dateInfo} component="p" color="textPrimary">
                                    {subpig_info.date}
                                    </Typography>
                                    <Typography style={dramaCss.urlInfo} color="textSecondary">
                                    <a href={subpig_info.url} target="_blank">{subpig_info.title}</a>
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography style={dramaCss.epInfo}>
                                        <a key={'t' + j} href={subpig_ep[0] + '#' + subpig_ep[1]} target="_blank">
                                            <Button variant="contained" color="primary">
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
        if(dramaSite === "fixsub") {
            for(let k in dramaData) {
                let fixsub_info = dramaData[k]
                let fixsub_ep = fixsub_info["dlurls"]
                let panel = 'panel' + k
                dramaTmp.push(
                    <div key={"fixsub" + k}>
                        <ExpansionPanel expanded={expanded === panel} onChange={this.handleChange(panel)}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography style={dramaCss.urlfix} color="textSecondary">
                                    <a href={fixsub_info.url} target="_blank">{fixsub_info.title}</a>
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography component="div" style={dramaCss.epInfo}>
                                        {fixsub_ep.map((ep, index) => (
                                            <span key={"f" + index}>
                                                <p style={{margin: "2px"}}><Button color="primary">{'EP' + ep[0]}</Button></p>
                                                <a href={ep[1]} target="_blank">
                                                    <Button style={{margin: "2px"}} variant="contained" color="primary">BD</Button>
                                                </a>
                                                <a href={ep[2]} target="_blank">
                                                    <Button style={{margin: "2px"}} variant="contained" color="primary">MG</Button>
                                                </a>
                                                <a href={ep[3]} target="_blank">
                                                    <Button style={{margin: "2px"}} variant="contained" color="primary">E2K</Button>
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

        return (
            <div style={dramaCss.container}>
                <p>
                {time}
                </p>
               
                <Button variant="contained" color="primary" size="medium" >
                    <AccessTime  />
                    &nbsp; {hour + ":" + minute + ":" + second }
                </Button>
                <br />
                <br />
                <Button variant="flat" color="primary" onClick={this.PressButton.bind(this, "tvbt")}>
                    tvbt
                </Button>
                <Button variant="flat" color="primary" onClick={this.PressButton.bind(this, "subpig")}>
                    subpig
                </Button>
                <Button variant="flat" color="primary" onClick={this.PressButton.bind(this, "fixsub")}>
                    fixsub
                </Button>
            {dramaTmp}
            </div>
        )

    }
}

export default Drama;