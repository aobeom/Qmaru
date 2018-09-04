import React from 'react';

import Button from '@material-ui/core/Button';
import Info from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const stCSS = {
    container:{
        paddingTop: "40px",
    },
    card:{
        padding: "10px",
    },
    img:{
        width: "100%",
    }
}

class Stchannel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entities: [],
            time: "2000-00-00 00:00:00",
        }
    }
    componentWillMount () {
        let url = `${global.constants.api}/api/v1/stchannel`
        fetch(url, {
            method: 'GET',
            dataType: 'json'
        }).then(res => res.json())
            .then(data => {
                let sdata = data.data
                this.setState({
                    entities: sdata.entities,
                    time: sdata.time
            })
        })
    }
    render() {
        const st_info = this.state.entities
        const time = this.state.time
        let stTmp = []
        let stTime = []
        stTime.push(
            <div key="time">
                <Button variant="contained" color="primary" size="medium" >
                    <Info  />
                    &nbsp; {time}
                </Button>
                <br />
                <br />
            </div>
        )
        for(let s in st_info){
            let sdata = st_info[s]
            stTmp.push(
                <div style={stCSS.card} key={"s" + s}>
                    <Card>
                        <CardContent style={{paddingBottom: "16px"}}>
                        <Typography component="p">
                            {sdata.date}
                        </Typography>
                        <Typography style={{textAlign: "left"}} dangerouslySetInnerHTML = {{__html:sdata.title}} >
                        </Typography>
                        <Typography>
                            <img style={stCSS.img} src={sdata.purl} alt={"i" + s}></img>
                        </Typography>
                        <Typography>
                            <a href={sdata.path} target="_blank" download><Button variant="contained" color="primary">Download</Button></a>
                        </Typography>
                        </CardContent>
                    </Card>
                </div>
                
            )
        }
        return (
            <div style={stCSS.container}>
                {stTime}
                {stTmp}
            </div> 
        );
    }
}
export default Stchannel;