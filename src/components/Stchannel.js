import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Info from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = ({
    wrapper: {
        paddingTop: "40px",
    },
    stCard: {
        padding: "10px",
    },
    stCardTitle: {
        textAlign: "left",
    },
    resultImg: {
        width: "100%",
    },
    btnTime: {
        backgroundColor: "#cc3399",
    },
    btnLabel: {
        color: "#fff",
    },
    customBtn: {
        color: "#fff",
        backgroundColor: "#33cc00",
        fontSize: "0.85rem",
        margin: "5px",
        '&:hover': {
            backgroundColor: "#339900",
        },
    },
})

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
        const { classes } = this.props
        let stTmp = []
        let stTime = []
        stTime.push(
            <div key="time">
                <Button disabled size="medium" classes={{label:classes.btnLabel,disabled: classes.btnTime}}>
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
                <div className={classes.stCard} key={"s" + s}>
                    <Card>
                        <CardContent style={{paddingBottom: "16px"}}>
                            <Typography component="p">
                                {sdata.date}
                            </Typography>
                            <Typography className={classes.stCardTitle} dangerouslySetInnerHTML = {{__html:sdata.title}} >
                            </Typography>
                            <Typography>
                                <img className={classes.resultImg} src={sdata.purl} alt={"i" + s}></img>
                            </Typography>
                            <Typography>
                                <a href={sdata.path} target="_blank" download>
                                    <Button variant="contained" className={classNames(classes.customBtn)}>Download</Button>
                                </a>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                
            )
        }
        return (
            <div className={classes.wrapper}>
                {stTime}
                {stTmp}
            </div> 
        );
    }
}

Stchannel.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Stchannel);