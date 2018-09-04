import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const indexCSS = {
    root:{
        padding: "40px",
    },
    card:{
        margin: "10px",
    }
}


class IndexPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Intro:[
                {
                    name: "Picture",
                    info: "You can get some picture urls from <b style='color:red'>instagram, tpl, mdpr, oricon</b>, ameblo, nogi46 & keya46, thetv, mantanweb, natalie, or get some live url from linelive and showroom.",
                    path: "/picture",
                },
                {
                    name: "Drama",
                    info: "You can get some japanese drama's download url from tvbt, subpig, fixsub.",
                    path: "/drama",
                },
                {
                    name: "Program",
                    info: "Just a simplified <a href='https://tv.yahoo.co.jp/' target='_blank'>Yahoo</a> tv program search.",
                    path: "/program",
                },
                {
                    name: "STchannel",
                    info: "You can get <a href='https://st-channel.jp/' target='_blank'>STchannel</a>'s video.",
                    path: "/stchannel",
                },
            ]
        }
    }
    render() {
        const intro = this.state.Intro
        const cards = []
        cards.push(
            <div key="index" style={indexCSS.root}>
            {intro.map((i, index) => (
                <Card key={"c" + index} style={indexCSS.card}>
                    <CardContent>
                        <Typography variant="headline" component="h2" style={{padding: "5px"}}>
                        {i.name}
                        </Typography>
                        <Typography style={{textAlign: "left"}} dangerouslySetInnerHTML = {{__html:i.info}} ></Typography>
                        <Typography component="p" style={{padding: "5px"}}>
                            <a href={i.path}><Button variant="outlined" size="small">Go to {i.name}</Button></a>
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            </div>
        )
        return (
            <div>
                {cards}
            </div>
        )
    }
}

export default IndexPage;