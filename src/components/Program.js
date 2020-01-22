import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Input from '@material-ui/core/Input'
import YoutubeSearchedFor from '@material-ui/icons/YoutubeSearchedFor'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import Link from '@material-ui/core/Link'

import yahooLogo from '../static/img/yahoo.png'

const mainColor = global.constants.theme

const useStyles = makeStyles(theme => ({
    topLogo: {
        paddingTop: 40,
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
        position: "relative",
        top: 10,
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
    customSel: {
        minHeight: "0",
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
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    progressWrapper: {
        margin: 10,
        position: 'relative',
    },
    progressFab: {
        color: mainColor.secondaryColor,
        position: 'absolute',
        left: 0,
        zIndex: 1,
    },
    progressBtn: {
        width: 48,
        height: 48,
        backgroundColor: "transparent",
        boxShadow: "0 0",
        color: mainColor.secondaryColor,
        '&:hover': {
            backgroundColor: mainColor.otherColor,
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
    const districtName = [{
        code: '',
        name: "東京",
        division: "title",
        status: true
    },
    {
        code: '23',
        name: "東京",
        division: "regular",
        status: false
    },
    {
        code: '40',
        name: "大阪",
        division: "regular",
        status: false
    },
    {
        code: '24',
        name: "神奈川",
        division: "regular",
        status: false
    },
    {
        code: '33',
        name: "愛知",
        division: "regular",
        status: false
    },
    {
        code: '55',
        name: "福岡",
        division: "regular",
        status: false
    },
    {
        code: '10',
        name: "北海道（札幌）",
        division: "北海道",
        status: false
    },
    {
        code: '11',
        name: "北海道（函館）",
        division: "北海道",
        status: false
    },
    {
        code: '12',
        name: "北海道（旭川）",
        division: "北海道",
        status: false
    },
    {
        code: '13',
        name: "北海道（帯広）",
        division: "北海道",
        status: false
    },
    {
        code: '14',
        name: "北海道（釧路）",
        division: "北海道",
        status: false
    },
    {
        code: '15',
        name: "北海道（北見）",
        division: "北海道",
        status: false
    },
    {
        code: '16',
        name: "北海道（室蘭）",
        division: "北海道",
        status: false
    },
    {
        code: '22',
        name: "青森",
        division: "東北地方",
        status: false
    },
    {
        code: '20',
        name: "岩手",
        division: "東北地方",
        status: false
    },
    {
        code: '18',
        name: "秋田",
        division: "東北地方",
        status: false
    },
    {
        code: '17',
        name: "宮城",
        division: "東北地方",
        status: false
    },
    {
        code: '19',
        name: "山形",
        division: "東北地方",
        status: false
    },
    {
        code: '21',
        name: "福島",
        division: "東北地方",
        status: false
    },
    {
        code: '26',
        name: "茨城",
        division: "関東地方",
        status: false
    },
    {
        code: '28',
        name: "栃木",
        division: "関東地方",
        status: false
    },
    {
        code: '25',
        name: "群馬",
        division: "関東地方",
        status: false
    },
    {
        code: '29',
        name: "埼玉",
        division: "関東地方",
        status: false
    },
    {
        code: '27',
        name: "千葉",
        division: "関東地方",
        status: false
    },
    {
        code: '23',
        name: "東京",
        division: "関東地方",
        status: false
    },
    {
        code: '24',
        name: "神奈川",
        division: "関東地方",
        status: false
    },
    {
        code: '32',
        name: "山梨",
        division: "関東地方",
        status: false
    },
    {
        code: '30',
        name: "長野",
        division: "関東地方",
        status: false
    },
    {
        code: '31',
        name: "新潟",
        division: "関東地方",
        status: false
    },
    {
        code: '37',
        name: "富山",
        division: "関東地方",
        status: false
    },
    {
        code: '34',
        name: "石川",
        division: "関東地方",
        status: false
    },
    {
        code: '36',
        name: "福井",
        division: "関東地方",
        status: false
    },
    {
        code: '35',
        name: "静岡",
        division: "関東地方",
        status: false
    },
    {
        code: '33',
        name: "愛知",
        division: "関東地方",
        status: false
    },
    {
        code: '39',
        name: "岐阜",
        division: "関東地方",
        status: false
    },
    {
        code: '38',
        name: "三重",
        division: "関東地方",
        status: false
    },
    {
        code: '45',
        name: "滋賀",
        division: "近畿地方",
        status: false
    },
    {
        code: '41',
        name: "京都",
        division: "近畿地方",
        status: false
    },
    {
        code: '40',
        name: "大阪",
        division: "近畿地方",
        status: false
    },
    {
        code: '42',
        name: "兵庫",
        division: "近畿地方",
        status: false
    },
    {
        code: '44',
        name: "奈良",
        division: "近畿地方",
        status: false
    },
    {
        code: '43',
        name: "和歌山",
        division: "近畿地方",
        status: false
    },
    {
        code: '49',
        name: "鳥取",
        division: "中国地方",
        status: false
    },
    {
        code: '48',
        name: "島根",
        division: "中国地方",
        status: false
    },
    {
        code: '47',
        name: "岡山",
        division: "中国地方",
        status: false
    },
    {
        code: '46',
        name: "広島",
        division: "中国地方",
        status: false
    },
    {
        code: '50',
        name: "山口",
        division: "中国地方",
        status: false
    },
    {
        code: '52',
        name: "香川",
        division: "四国地方",
        status: false
    },
    {
        code: '51',
        name: "愛媛",
        division: "四国地方",
        status: false
    },
    {
        code: '53',
        name: "徳島",
        division: "四国地方",
        status: false
    },
    {
        code: '54',
        name: "高知",
        division: "四国地方",
        status: false
    },
    {
        code: '55',
        name: "福岡",
        division: "九州地方",
        status: false
    },
    {
        code: '61',
        name: "佐賀",
        division: "九州地方",
        status: false
    },
    {
        code: '57',
        name: "長崎",
        division: "九州地方",
        status: false
    },
    {
        code: '56',
        name: "熊本",
        division: "九州地方",
        status: false
    },
    {
        code: '60',
        name: "大分",
        division: "九州地方",
        status: false
    },
    {
        code: '59',
        name: "宮崎",
        division: "九州地方",
        status: false
    },
    {
        code: '58',
        name: "鹿児島",
        division: "九州地方",
        status: false
    },
    {
        code: '62',
        name: "沖縄",
        division: "沖縄",
        status: false
    },
    ]
    const [reqData, setReqData] = useState([])
    const [origin, setOrigin] = useState("")
    const [btndisp, setBtndisp] = useState({ display: "none" })
    let [district, setDistrict] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [info, setInfo] = useState("")

    const changeText = (event) => {
        setKeyword(event.target.value)
    }

    const handleChange = (event) => {
        setDistrict(event.target.value)
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
        if (district === "") {
            district = '23'
        }
        let url = `${global.constants.api}/api/v1/program?kw=${encodeURIComponent(keyword)}&ac=${district}`
        setSuccess(false)
        setLoading(true)
        console.log(url)
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
                    setSuccess(false)
                    setLoading(false)
                    setInfo("No Data")
                } else {
                    setReqData(data.data)
                    setOrigin("yahoo")
                    setBtndisp({ display: "block", padding: 20 })
                    setError(false)
                    setSuccess(true)
                    setLoading(false)
                }
            })
            .catch(
                () => {
                    setReqData([])
                    setInfo("Server Error")
                    setError(true)
                    setSuccess(false)
                    setLoading(false)
                }
            )
    }
    const classes = useStyles()
    let progTmp = []
    let progTitle = []
    let districtTmp = []
    let url = reqData.ori_url
    for (let i in districtName) {
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
    return (
        <Typography component='div'>
            <Typography component='p' className={classes.topLogo}>
                <Link underline='none' href="https://tv.yahoo.co.jp/" target="_blank" rel="noopener noreferrer">
                    <img src={yahooLogo} className={classes.logoCls} alt="" />
                </Link>
            </Typography>
            <Typography component='div' className={classes.progressRoot}>
                <FormControl className={classes.customForm}>
                    <Select
                        value={district}
                        onChange={event => handleChange(event)}
                        name="district"
                        displayEmpty
                        className={classes.customUnderline}
                        classes={{ select: classes.customSel }}
                    >
                        {districtTmp}
                    </Select>
                    <FormHelperText className={classes.progLabel}>District</FormHelperText>
                </FormControl>
                <Input
                    classes={{ root: classes.customInput, underline: classes.customUnderline, }}
                    onChange={event => changeText(event)}
                    placeholder="keyword"
                    inputProps={{ 'aria-label': 'Description' }}
                    onKeyUp={onKeyUp}
                />
                <Typography component='div' className={classes.progressWrapper}>
                    <Fab classes={{ root: classes.progressBtn }} onClick={() => progClick()}>
                        {success ? <CheckIcon /> : <YoutubeSearchedFor />}
                    </Fab>
                    {loading && <CircularProgress size={48} className={classes.progressFab} />}
                </Typography>
            </Typography>
            {progTitle}
            {progTmp}
        </Typography>
    )
}
