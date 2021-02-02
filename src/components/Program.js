import React, { useState, forwardRef } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'

import yahooLogo from '../static/img/yahoo.png'

const mainColor = global.constants.theme


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
        }
    }
})(TextField)

const useStyles = makeStyles(theme => ({
    topLogo: {
        paddingTop: 80,
        paddingBottom: 40,
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
    customForm: {
        width: 80
    },
    customKeyword: {
        left: 4,
        position: "relative"
    },
    customInput: {
        width: 140,
        '&:hover': {
            borderBottomColor: mainColor.secondaryColor,
        },
    },
    customList: {
        color: mainColor.thirdlyColor
    },
    customListItem: {
        color: mainColor.primaryColor
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
    customSel: {
        color: mainColor.primaryColor,
        minHeight: "0",
        textAlign: "center"
    },
    customSelIcon: {
        color: mainColor.thirdlyColor
    },
    customHelper: {
        color: mainColor.thirdlyColor
    },
    customBtn: {
        color: mainColor.otherColor,
        backgroundColor: mainColor.secondaryColor,
        fontSize: "0.85rem",
        margin: 5,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
    progressRoot: {
        justifyContent: "center",
        alignItems: "center"
    },
    progressWrapper: {
        margin: 10,
        position: 'relative',
        top: 10
    },
    progressFab: {
        color: mainColor.secondaryColor,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    progressBtn: {
        color: mainColor.otherColor,
        backgroundColor: mainColor.thirdlyColor,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
    logoCls: {
        width: 200
    },
    cMain: {
        color: mainColor.textColor
    },
    cSub: {
        color: mainColor.thirdlyColor
    },
    cBtn: {
        color: mainColor.secondaryColor,
        fontSize: "0.8rem",
        '&:hover': {
            backgroundColor: mainColor.otherColor,
        },
    },
    subCardContent: {
        '&:last-child': {
            paddingBottom: 14
        }
    }
}))

export default function Program() {
    const normal = [{
        code: '23',
        name: "東京",
        status: false
    },
    {
        code: '40',
        name: "大阪",
        status: false
    },
    {
        code: '24',
        name: "神奈川",
        status: false
    },
    {
        code: '33',
        name: "愛知",
        status: false
    },
    {
        code: '55',
        name: "福岡",
        status: false
    },
    ]

    const hokaido = [{
        code: '10',
        name: "札幌",
        status: false
    },
    {
        code: '11',
        name: "函館",
        status: false
    },
    {
        code: '12',
        name: "旭川",
        status: false
    },
    {
        code: '13',
        name: "帯広",
        status: false
    },
    {
        code: '14',
        name: "釧路",
        status: false
    },
    {
        code: '15',
        name: "北見",
        status: false
    },
    {
        code: '16',
        name: "室蘭",
        status: false
    }]

    const tohoku = [
        {
            code: '17',
            name: "宮城",
            status: false
        },
        {
            code: '18',
            name: "秋田",
            status: false
        },
        {
            code: '19',
            name: "山形",
            status: false
        },
        {
            code: '20',
            name: "岩手",
            status: false
        },
        {
            code: '21',
            name: "福島",
            status: false
        },
        {
            code: '22',
            name: "青森",
            status: false
        },
    ]

    const kanto = [
        {
            code: '23',
            name: "東京",
            status: false
        },
        {
            code: '24',
            name: "神奈川",
            status: false
        },
        {
            code: '25',
            name: "群馬",
            status: false
        },
        {
            code: '26',
            name: "茨城",
            status: false
        },
        {
            code: '27',
            name: "千葉",
            status: false
        },
        {
            code: '28',
            name: "栃木",
            status: false
        },
        {
            code: '29',
            name: "埼玉",
            status: false
        },
        {
            code: '30',
            name: "長野",
            status: false
        },
        {
            code: '31',
            name: "新潟",
            status: false
        },
        {
            code: '32',
            name: "山梨",
            status: false
        },
        {
            code: '33',
            name: "愛知",
            status: false
        },
        {
            code: '34',
            name: "石川",
            status: false
        },
        {
            code: '35',
            name: "静岡",
            status: false
        },
        {
            code: '36',
            name: "福井",
            status: false
        },
        {
            code: '37',
            name: "富山",
            status: false
        },
        {
            code: '38',
            name: "三重",
            status: false
        },
        {
            code: '39',
            name: "岐阜",
            status: false
        },

    ]

    const kinki = [

        {
            code: '40',
            name: "大阪",
            status: false
        },
        {
            code: '41',
            name: "京都",
            status: false
        },

        {
            code: '42',
            name: "兵庫",
            status: false
        },
        {
            code: '43',
            name: "和歌山",
            status: false
        },
        {
            code: '44',
            name: "奈良",
            status: false
        },
        {
            code: '45',
            name: "滋賀",
            status: false
        },

    ]

    const chugoku = [
        {
            code: '46',
            name: "広島",
            status: false
        },
        {
            code: '47',
            name: "岡山",
            status: false
        },
        {
            code: '48',
            name: "島根",
            status: false
        },
        {
            code: '49',
            name: "鳥取",
            status: false
        },
        {
            code: '50',
            name: "山口",
            status: false
        },
    ]

    const shikoku = [
        {
            code: '51',
            name: "愛媛",
            status: false
        },
        {
            code: '52',
            name: "香川",
            status: false
        },

        {
            code: '53',
            name: "徳島",
            status: false
        },
        {
            code: '54',
            name: "高知",
            status: false
        },
    ]

    const kyushu = [
        {
            code: '55',
            name: "福岡",
            status: false
        },
        {
            code: '56',
            name: "熊本",
            status: false
        },
        {
            code: '57',
            name: "長崎",
            status: false
        },

        {
            code: '58',
            name: "鹿児島",
            status: false
        },
        {
            code: '59',
            name: "宮崎",
            status: false
        },
        {
            code: '60',
            name: "大分",
            status: false
        },
        {
            code: '61',
            name: "佐賀",
            status: false
        },
    ]

    const okinawa = [
        {
            code: '62',
            name: "沖縄",
            status: false
        }
    ]

    const [reqData, setReqData] = useState([])
    const [origin, setOrigin] = useState("")
    const [btndisp, setBtndisp] = useState({ display: "none" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [info, setInfo] = useState("")
    let [city, setCity] = useState("")

    const changeText = (event) => {
        setKeyword(event.target.value)
    }

    const selectChange = (event) => {
        setCity(event.target.value)
    }

    const onKeyUp = (e) => {
        e.keyCode === 13 && progClick()
    }

    const progClick = () => {
        if (keyword === undefined || keyword === "") {
            setError(true)
            setInfo("KEYWORD ERROR")
            return false
        }
        if (city === "") {
            city = '23'
        }
        let url = `${global.constants.api}/api/v1/program?kw=${encodeURIComponent(keyword)}&ac=${city}`
        setLoading(true)
        fetch(url, {
            method: 'GET',
            dataType: 'json',
        }).then(res => res.json())
            .then(data => {
                let prog_info = data.data.entities
                let prog_info_obj = Object.keys(prog_info)
                if (prog_info_obj.length === 0) {
                    setReqData([])
                    setError(true)
                    setLoading(false)
                    setInfo("No Data")
                } else {
                    setReqData(data.data)
                    setOrigin("yahoo")
                    setBtndisp({ display: "block", padding: 20 })
                    setError(false)
                    setLoading(false)
                }
            })
            .catch(
                () => {
                    setReqData([])
                    setInfo("Server Error")
                    setError(true)
                    setLoading(false)
                }
            )
    }

    const cityList = (region) => {
        let cTmp = []
        for (let i in region) {
            let data = region[i]
            let code = data.code
            let name = data.name
            cTmp.push(
                <MenuItem
                    key={i}
                    classes={{
                        root: classes.customListItem
                    }}
                    value={code}
                >
                    {name}
                </MenuItem>
            )
        }
        return cTmp
    }
    const classes = useStyles()
    let progTmp = []
    let progTitle = []
    let url = reqData.ori_url

    if (error === true) {
        progTitle.push(
            <Typography component='div' key="error">
                <Chip
                    className={classes.errorInfo}
                    label={info}
                    color="secondary"
                />
            </Typography>
        )
    } else {
        progTitle.push(
            <Typography component='div' key="title" style={btndisp}>
                <Link underline='none' href={url} target="_blank" rel="noopener noreferrer">
                    <Button
                        variant="contained" className={classes.customBtn}
                    >
                        {origin}
                    </Button>
                </Link>
            </Typography>
        )
        if (reqData !== 0) {
            let prog_info = reqData.entities
            for (let p in prog_info) {
                let pinfo = prog_info[p]
                progTmp.push(
                    <Typography component='div' className={classes.progCard} key={"prog" + p}>
                        <Card>
                            <CardContent classes={{ root: classes.subCardContent }}>
                                <Typography variant="h5" component="h2" className={classes.cMain}>
                                    {pinfo.date}
                                </Typography>
                                <Typography color="textSecondary" className={classes.cSub}>
                                    {pinfo.time}
                                </Typography>
                                <Typography color="textSecondary" className={classes.cSub}>
                                    {pinfo.station}
                                </Typography>
                                <Typography dangerouslySetInnerHTML={{ __html: pinfo.title }} className={classes.cMain}></Typography>
                                <Typography >
                                    <a href={pinfo.url} target="_blank" rel="noopener noreferrer"><Button size="small" className={classes.cBtn}>Learn More</Button></a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Typography>
                )
            }
        }
    }

    const MyListHeader = forwardRef((props, ref) => (
        <ListSubheader
            ref={ref}
            disableSticky
            classes={{
                root: classes.customList
            }}
        >
            {props.name}
        </ListSubheader>
    ))


    return (
        <Typography component='div'>
            <Typography component='p' className={classes.topLogo}>
                <Link underline='none' href="https://tv.yahoo.co.jp/" target="_blank" rel="noopener noreferrer">
                    <img src={yahooLogo} className={classes.logoCls} alt="" />
                </Link>
            </Typography>
            <Typography component='div' className={classes.progressRoot}>
                <Typography component='div'>
                    <FormControl className={classes.customForm}>
                        <Select
                            onChange={event => selectChange(event)}
                            classes={{
                                select: classes.customSel,
                                icon: classes.customSelIcon
                            }}
                            className={classes.customUnderline}
                            value={city}
                            displayEmpty
                        >
                            <MyListHeader name="主要" />
                            {cityList(normal)}
                            <MyListHeader name="北海道" />
                            {cityList(hokaido)}
                            <MyListHeader name="東北地方" />
                            {cityList(tohoku)}
                            <MyListHeader name="関東地方" />
                            {cityList(kanto)}
                            <MyListHeader name="近畿地方" />
                            {cityList(kinki)}
                            <MyListHeader name="中国地方" />
                            {cityList(chugoku)}
                            <MyListHeader name="四国地方" />
                            {cityList(shikoku)}
                            <MyListHeader name="九州地方" />
                            {cityList(kyushu)}
                            <MyListHeader name="沖縄" />
                            {cityList(okinawa)}
                        </Select>
                        <FormHelperText className={classes.customHelper}>region</FormHelperText>
                    </FormControl>
                    <MyTextField
                        className={classes.customKeyword}
                        variant="standard"
                        onChange={event => changeText(event)}
                        helperText="keyword"
                        onKeyUp={onKeyUp}
                    />
                </Typography>
                <Typography component='div' className={classes.progressWrapper}>
                    <Button
                        variant="contained"
                        disabled={loading}
                        className={classes.progressBtn}
                        onClick={() => progClick()}
                    >
                        Search
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.progressFab} />}
                </Typography>
            </Typography>
            {progTitle}
            {progTmp}
        </Typography>
    )
}
