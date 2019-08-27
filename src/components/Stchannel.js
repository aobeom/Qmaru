import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Info from '@material-ui/icons/Info'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Link from '@material-ui/core/Link'
import Skeleton from '@material-ui/lab/Skeleton'
import LazyLoad from 'react-lazyload'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        paddingTop: "40px",
    },
    stCard: {
        padding: "10px",
    },
    stCardTitle: {
        textAlign: "left",
        color: theme.textColor,
        cursor: "default",
        padding: "10px",
    },
    stText: {
        color: theme.textColor,
        cursor: "default",
    },
    errorInfo: {
        margin: "10px",
        backgroundColor: theme.tipColor,
    },
    resultImg: {
        width: "100%",
    },
    btnTime: {
        backgroundColor: theme.tipColor,
    },
    btnLabel: {
        color: "#fff",
    },
    customBtn: {
        color: "#fff",
        backgroundColor: theme.secondaryColor,
        fontSize: "0.85rem",
        margin: "5px",
        '&:hover': {
            backgroundColor: theme.primaryColor,
        },
    },
    SkeletonCls: {
        margin: '10px auto'
    },
    placeholderImg: {
        margin: '5px auto',
        width: "90%",
    }
})

class Stchannel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            time: "2000-00-00 00:00:00",
            btndisp: {
                display: "none",
            },
            loading: true,
        }
    }
    componentDidMount() {
        let url = `${global.constants.api}/api/v1/stchannel`
        fetch(url, {
                method: 'GET',
                dataType: 'json',
            }).then(res => res.json())
            .then(data => {
                let sdata = data.data
                let status = data.status
                if (status === 0) {
                    this.setState({
                        status: status,
                        values: sdata.entities,
                        time: sdata.time,
                        loading: false,
                    })
                } else {
                    this.setState({
                        status: status,
                        values: "No data",
                        time: "2000-00-00 00:00:00",
                        btndisp: {
                            display: "block",
                            padding: "20px",
                        },
                        loading: false,
                    })
                }
            })
            .catch(
                () => this.setState({
                    status: 1,
                    values: "Server Error",
                    time: "2000-00-00 00:00:00",
                    btndisp: {
                        display: "block",
                        padding: "20px",
                    },
                    loading: false,
                })
            )
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    render() {
        const st_info = this.state.values
        const time = this.state.time
        const status = this.state.status
        const { classes } = this.props
        let stTmp = []
        let stTime = []
        stTime.push(
            <Typography component='div' key="time">
                <Button disabled size="medium" classes={{label:classes.btnLabel,disabled: classes.btnTime}}>
                    <Info  />
                    &nbsp; {time}
                </Button>
                <br />
                <br />
            </Typography>
        )
        function Loading() {
            return (<Typography component='div'>
                <Box width="100%" >
                <Skeleton width="16%" height={30} className={classes.SkeletonCls} />
                <Skeleton width="100%" height={10}/>
                <Skeleton width="100%" height={10}/>
                <Skeleton width="80%" height={10}/>
                <Skeleton variant="rect" width="100%" height={400} />
                <Skeleton width="16%" height={30} className={classes.SkeletonCls} />
                </Box>
            </Typography>)
        }
        if (status === 0) {
            for (let s in st_info) {
                let sdata = st_info[s]
                stTmp.push(
                    <Typography component='div' className={classes.stCard} key={"s" + s}>
                        <LazyLoad 
                            height={200} 
                            offset={[-200, 0]} 
                            once 
                            placeholder={<Loading />}>
                        <Card>
                            <CardContent style={{paddingBottom: "16px"}}>
                                <Typography component="p" className={classes.stText}>
                                    {sdata.date}
                                </Typography>
                                <Typography className={classes.stCardTitle} dangerouslySetInnerHTML = {{__html:sdata.title}} >
                                </Typography>
                                <Typography>
                                    <img className={classes.resultImg} src={sdata.purl} alt={"i" + s}></img>
                                </Typography>
                                <Typography>
                                    <Link underline='none' href={sdata.path} target="_blank" download rel="noopener noreferrer">
                                        <Button variant="contained" className={classes.customBtn}>Download</Button>
                                    </Link>
                                </Typography>
                            </CardContent>
                        </Card>
                        </LazyLoad>
                    </Typography>
                    
                )
            }
        } else {
            stTmp.push(
                <Typography component='div' key="error" style={this.state.btndisp}>
                    <Chip
                        className={classes.errorInfo}
                        label={st_info}
                        color="secondary"
                    />
                </Typography>
            )
        }
        return (
            <Typography component='div' className={classes.wrapper}>
                {stTime}
                {this.state.loading ? <Loading /> : stTmp}
            </Typography> 
        )
    }
}

Stchannel.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(Stchannel)