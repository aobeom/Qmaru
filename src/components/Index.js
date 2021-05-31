import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import '../config'

const mainColor = global.constants.theme

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: 30,
    },
    indexCard: {
        margin: 10,
        cursor: "default",
    },
    indexSpacing: {
        color: mainColor.textColor,
        padding: 6,
    },
    indexCardMainText: {
        color: mainColor.textColor,
        textAlign: "left",
        padding: 8,
    },
    indexBtn: {
        color: mainColor.textColor,
    }
}))


export default function IndexPage() {
    const classes = useStyles()
    const intro = [
        {
            name: "Picture",
            info: "You can get some picture urls from <b style='color:" + mainColor.textColor + "'>instagram, tpl, mdpr, dessart</b>, ameblo, nogi46 & keya46, thetv, mantanweb, natalie, or get a live url from linelive or showroom.",
            path: "/picture",
        },
        {
            name: "Drama",
            info: "You can get some japanese drama's download url from tvbt, subpig, fixsub.",
            path: "/drama",
        },
        {
            name: "STchannel",
            info: "You can get <a href='https://st-channel.jp/' target='_blank'>STchannel</a>'s video.",
            path: "/stchannel",
        },
    ]

    const cardTmp = []
    cardTmp.push(
        <Typography component='div' key="index" className={classes.wrapper}>
            {intro.map((i, index) => (
                <Card key={"c" + index} className={classes.indexCard}>
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.indexSpacing}>
                            {i.name}
                        </Typography>
                        <Typography className={classes.indexCardMainText} dangerouslySetInnerHTML={{ __html: i.info }} ></Typography>
                        <Typography component="p" className={classes.indexSpacing}>
                            <Link to={i.path} replace><Button variant="outlined" size="small" className={classes.indexBtn}>Go to {i.name}</Button></Link>
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Typography>
    )
    return (
        <Typography component='div'>
            {cardTmp}
        </Typography>
    )
}