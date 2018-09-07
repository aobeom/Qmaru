import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import YoutubeSearchedFor from '@material-ui/icons/YoutubeSearchedFor';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import yahooLogo from '../static/img/yahoo.png';

const styles = ({
    topLogo:{
        paddingTop: "40px",
    },
    progCard:{
        padding: "5px",
    },
    progLabel:{
        color: "#cc61cc",
        cursor: "default",
    },
    errorInfo:{
        margin: "10px",
        backgroundColor: "#9941ac",
    },
    customInput: {
        minWidth: "150px",
        '&:hover': {
            borderBottomColor: "#f9e8fd",
        },
    },
    customUnderline: {
        color: "#9941ac",
        '&:hover:not($disabled):before': {
            borderBottom: "2px solid #c36bd6 !important",
        },
        '&:before': {
            borderBottomColor: "#CD96CD",
        },
        '&:after': {
            borderBottomColor: "#800080",
        },
    },
    customIcon: {
        '&:hover': {
            backgroundColor: "#f9e8fd",
        },
        color: "#c36bd6",
    },
    customBtn: {
        color: "#fff",
        backgroundColor: "#cc61cc",
        fontSize: "0.85rem",
        margin: "5px",
        '&:hover': {
            backgroundColor: "#800080",
        },
    },
})

class Program extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            origin: "",
            btndisp: {display: "none"},
            district: '',
            error: "",
        }
    }
    changeText(event){
        this.setState({
            keyword: event.target.value
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onKeyUp = (e) => {
        e.keyCode === 13 && this.progClick()
    }

    progClick () {
        let kw = this.state.keyword
        if (kw === undefined || kw === "") {
            this.setState({
                error: true,
                info: "KEYWORD ERROR"
            })
            return false
        }
        let district = this.state.district
        if (district === ""){
            district = '23'
        }
        let url = `${global.constants.api}/api/v1/program?kw=${encodeURIComponent(kw)}&ac=${district}`
        fetch(url, {
            method: 'GET',
            dataType: 'json'
        }).then(res => res.json())
            .then(data => {
                let prog_info = data.data.entities
                let prog_info_obj = Object.keys(prog_info)
                if (prog_info_obj.length === 0) {
                    this.setState({
                        values: 0,
                        error: true,
                        info: "No Data",
                    })
                } else {
                    this.setState({
                        values: data.data,
                        origin: "yahoo",
                        btndisp: {display: "block", padding: "20px"},
                        error: false,
                    })
                }
                
            })
    }
    render() {
        const values = this.state.values;
        const origin = this.state.origin
        const error = this.state.error
        const info = this.state.info
        const { classes } = this.props
        let progTmp = []
        let progTitle = []
        let url = values.ori_url
        if ( error === true) {
            progTitle.push(
                <div key="error">
                    <Chip
                        className={classes.errorInfo}
                        label={info}
                        color="secondary"
                    />
                </div>
            )
        } else {
            progTitle.push(
                <div key="title" style={this.state.btndisp}>
                    <a href={url} target="_blank">
                    <Button 
                        variant="contained" className={classNames(classes.customBtn)}
                    >
                        {origin}
                    </Button>
                    </a>
                </div>
            )
            if (values !== 0) {
                let prog_info = values.entities
                for(let p in prog_info) {
                    let pinfo = prog_info[p]
                    progTmp.push(
                        <div className={classes.progCard} key={"prog" + p}>
                            <Card>
                                <CardContent>
                                <Typography variant="headline" component="h2">
                                    {pinfo.date}
                                </Typography>
                                <Typography color="textSecondary" >
                                    {pinfo.time}
                                </Typography>
                                <Typography color="textSecondary">
                                    {pinfo.station}
                                </Typography>
                                <Typography dangerouslySetInnerHTML = {{__html:pinfo.title}} ></Typography>
                                <Typography >
                                    <a href={pinfo.url} target="_blank"><Button size="small">Learn More</Button></a>
                                </Typography>
                                </CardContent>
                        </Card>
                        </div>
                    )
                }
            }
        }
        return (
            <div>
                <p className={classes.topLogo}>
                    <a href="https://tv.yahoo.co.jp/" target="_blank" rel="noopener noreferrer">
                        <img src={yahooLogo} style={{width: "200px"}} alt="" />
                    </a>
                </p>
                <FormControl >
                    <Select
                        value={this.state.district}
                        onChange={this.handleChange}
                        name="district"
                        displayEmpty
                        className={classes.customUnderline}
                    >
                        <MenuItem value="" disabled>地区</MenuItem>
                            <MenuItem value={23}>東京</MenuItem>
                            <MenuItem value={40}>大阪</MenuItem>
                            <MenuItem value={24}>神奈川</MenuItem>
                            <MenuItem value={33}>愛知</MenuItem>
                            <MenuItem value={55}>福岡</MenuItem>
                        {/* <MenuItem value="" disabled>北海道</MenuItem> */}
                            <MenuItem value={10}>北海道（札幌）</MenuItem>
                            <MenuItem value={11}>北海道（函館）</MenuItem>
                            <MenuItem value={12}>北海道（旭川）</MenuItem>
                            <MenuItem value={13}>北海道（帯広）</MenuItem>
                            <MenuItem value={14}>北海道（釧路）</MenuItem>
                            <MenuItem value={15}>北海道（北見）</MenuItem>
                            <MenuItem value={16}>北海道（室蘭）</MenuItem>
                        {/* <MenuItem value="" disabled>東北地方</MenuItem> */}
                            <MenuItem value={22}>青森</MenuItem>
                            <MenuItem value={20}>岩手</MenuItem>
                            <MenuItem value={18}>秋田</MenuItem>
                            <MenuItem value={17}>宮城</MenuItem>
                            <MenuItem value={19}>山形</MenuItem>
                            <MenuItem value={21}>福島</MenuItem>
                        {/* <MenuItem value="" disabled>関東地方</MenuItem> */}
                            <MenuItem value={26}>茨城</MenuItem>
                            <MenuItem value={28}>栃木</MenuItem>
                            <MenuItem value={25}>群馬</MenuItem>
                            <MenuItem value={29}>埼玉</MenuItem>
                            <MenuItem value={27}>千葉</MenuItem>
                            <MenuItem value={23}>東京</MenuItem>
                            <MenuItem value={24}>神奈川</MenuItem>
                        {/* <MenuItem value="" disabled>中部地方</MenuItem> */}
                            <MenuItem value={32}>山梨</MenuItem>
                            <MenuItem value={30}>長野</MenuItem>
                            <MenuItem value={31}>新潟</MenuItem>
                            <MenuItem value={37}>富山</MenuItem>
                            <MenuItem value={34}>石川</MenuItem>
                            <MenuItem value={36}>福井</MenuItem>
                            <MenuItem value={35}>静岡</MenuItem>
                            <MenuItem value={33}>愛知</MenuItem>
                            <MenuItem value={39}>岐阜</MenuItem>
                            <MenuItem value={38}>三重</MenuItem>
                        {/* <MenuItem value="" disabled>近畿地方</MenuItem> */}
                            <MenuItem value={45}>滋賀</MenuItem>
                            <MenuItem value={41}>京都</MenuItem>
                            <MenuItem value={40}>大阪</MenuItem>
                            <MenuItem value={42}>兵庫</MenuItem>
                            <MenuItem value={44}>奈良</MenuItem>
                            <MenuItem value={43}>和歌山</MenuItem>
                        {/* <MenuItem value="" disabled>中国地方</MenuItem> */}
                            <MenuItem value={49}>鳥取</MenuItem>
                            <MenuItem value={48}>島根</MenuItem>
                            <MenuItem value={47}>岡山</MenuItem>
                            <MenuItem value={46}>広島</MenuItem>
                            <MenuItem value={50}>山口</MenuItem>
                        {/* <MenuItem value="" disabled>四国地方</MenuItem> */}
                            <MenuItem value={52}>香川</MenuItem>
                            <MenuItem value={51}>愛媛</MenuItem>
                            <MenuItem value={53}>徳島</MenuItem>
                            <MenuItem value={54}>高知</MenuItem>
                        {/* <MenuItem value="" disabled>九州地方</MenuItem> */}
                            <MenuItem value={55}>福岡</MenuItem>
                            <MenuItem value={61}>佐賀</MenuItem>
                            <MenuItem value={57}>長崎</MenuItem>
                            <MenuItem value={56}>熊本</MenuItem>
                            <MenuItem value={60}>大分</MenuItem>
                            <MenuItem value={59}>宮崎</MenuItem>
                            <MenuItem value={58}>鹿児島</MenuItem>
                        {/* <MenuItem value="" disabled>沖縄</MenuItem> */}
                            <MenuItem value={62}>沖縄</MenuItem>
                    </Select>
                    <FormHelperText className={classes.progLabel}>District</FormHelperText>
                    </FormControl>
                    <Input
                    classes={{root: classes.customInput, underline: classes.customUnderline,}}
                    onChange={event=>this.changeText(event)}
                    placeholder="keyword"
                    inputProps={{'aria-label': 'Description'}}
                    autoFocus={true}
                    onKeyUp={this.onKeyUp}
                />
                <IconButton 
                    aria-label="youtube_searched_for" 
                    onClick={this.progClick.bind(this)}
                    classes={{root: classes.customIcon}}
                >
                    <YoutubeSearchedFor />
                </IconButton>
                {progTitle}
                {progTmp}
            </div>
        );
    }
}

Program.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Program);