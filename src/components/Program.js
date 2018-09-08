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
    progItem:{
        color: "#552b55",
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
        '&:hover:not(disabled):before': {
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
            districtName:[
                {code: '', name: "地区", division: "title", status: true},
                {code: '23', name: "東京", division: "regular", status: false},
                {code: '23', name: "東京", division: "regular", status: false},
                {code: '40', name: "大阪", division: "regular", status: false},
                {code: '24', name: "神奈川", division: "regular", status: false},
                {code: '33', name: "愛知", division: "regular", status: false},
                {code: '55', name: "福岡", division: "regular", status: false},
                {code: '10', name: "北海道（札幌）", division: "北海道", status: false},
                {code: '11', name: "北海道（函館）", division: "北海道", status: false},
                {code: '12', name: "北海道（旭川）", division: "北海道", status: false},
                {code: '13', name: "北海道（帯広）", division: "北海道", status: false},
                {code: '14', name: "北海道（釧路）", division: "北海道", status: false},
                {code: '15', name: "北海道（北見）", division: "北海道", status: false},
                {code: '16', name: "北海道（室蘭）", division: "北海道", status: false},
                {code: '22', name: "青森", division: "東北地方", status: false},
                {code: '20', name: "岩手", division: "東北地方", status: false},
                {code: '18', name: "秋田", division: "東北地方", status: false},
                {code: '17', name: "宮城", division: "東北地方", status: false},
                {code: '19', name: "山形", division: "東北地方", status: false},
                {code: '21', name: "福島", division: "東北地方", status: false},
                {code: '26', name: "茨城", division: "関東地方", status: false},
                {code: '28', name: "栃木", division: "関東地方", status: false},
                {code: '25', name: "群馬", division: "関東地方", status: false},
                {code: '29', name: "埼玉", division: "関東地方", status: false},
                {code: '27', name: "千葉", division: "関東地方", status: false},
                {code: '23', name: "東京", division: "関東地方", status: false},
                {code: '24', name: "神奈川", division: "関東地方", status: false},
                {code: '32', name: "山梨", division: "関東地方", status: false},
                {code: '30', name: "長野", division: "関東地方", status: false},
                {code: '31', name: "新潟", division: "関東地方", status: false},
                {code: '37', name: "富山", division: "関東地方", status: false},
                {code: '34', name: "石川", division: "関東地方", status: false},
                {code: '36', name: "福井", division: "関東地方", status: false},
                {code: '35', name: "静岡", division: "関東地方", status: false},
                {code: '33', name: "愛知", division: "関東地方", status: false},
                {code: '39', name: "岐阜", division: "関東地方", status: false},
                {code: '38', name: "三重", division: "関東地方", status: false},
                {code: '45', name: "滋賀", division: "近畿地方", status: false},
                {code: '41', name: "京都", division: "近畿地方", status: false},
                {code: '40', name: "大阪", division: "近畿地方", status: false},
                {code: '42', name: "兵庫", division: "近畿地方", status: false},
                {code: '44', name: "奈良", division: "近畿地方", status: false},
                {code: '43', name: "和歌山", division: "近畿地方", status: false},
                {code: '49', name: "鳥取", division: "中国地方", status: false},
                {code: '48', name: "島根", division: "中国地方", status: false},
                {code: '47', name: "岡山", division: "中国地方", status: false},
                {code: '46', name: "広島", division: "中国地方", status: false},
                {code: '50', name: "山口", division: "中国地方", status: false},
                {code: '52', name: "香川", division: "四国地方", status: false},
                {code: '51', name: "愛媛", division: "四国地方", status: false},
                {code: '53', name: "徳島", division: "四国地方", status: false},
                {code: '54', name: "高知", division: "四国地方", status: false},
                {code: '55', name: "福岡", division: "九州地方", status: false},
                {code: '61', name: "佐賀", division: "九州地方", status: false},
                {code: '57', name: "長崎", division: "九州地方", status: false},
                {code: '56', name: "熊本", division: "九州地方", status: false},
                {code: '60', name: "大分", division: "九州地方", status: false},
                {code: '59', name: "宮崎", division: "九州地方", status: false},
                {code: '58', name: "鹿児島", division: "九州地方", status: false},
                {code: '62', name: "沖縄", division: "沖縄", status: false},    
            ]
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
        const districtName = this.state.districtName
        const { classes } = this.props
        let progTmp = []
        let progTitle = []
        let districtTmp = []
        let url = values.ori_url
        for (let i in districtName){
            let dn = districtName[i]
            districtTmp.push(
                <MenuItem 
                    key={"d" + i}  
                    value={dn.code}
                    className={classes.progItem}
                >
                    {dn.name}
                </MenuItem>
            )
        }
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
                    {districtTmp}
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