import React from 'react';

import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import ImageSearch from '@material-ui/icons/ImageSearch';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import IG from '../static/img/insta.png'
import MDPR from '../static/img/mdpr.png'
import ORICON from '../static/img/oricon.png'
import TPL from '../static/img/tpl.png'

const picCSS = {
    container:{
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "40px",
    },
    logo:{
        padding: "10px",
    },
    input:{
        minWidth: "220px",
    },
    error:{
        margin: "10px"
    },
    img:{
        width: "90%",
        padding: "5px"
    },
    video:{
        height: "100%",
        width: "90%",
        display: "block",
    }
}


class Picture extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            error: "",
            btnSta: "outlined",
            btnInfo: "Copy to potplayer",
            btndisp: {display: "none"},
        }
    }

    changeText(event){
        this.setState({
            url: event.target.value
        })
    }
    onKeyUp = (e) => {
        e.keyCode === 13 && this.picClick()
    }
    picClick () {
        let url = this.state.url
        let uri = ""
        if (url === "undefined") {
            this.setState({
                error: true,
                info: "URL ERROR / NO RESULT FOUND"
            })
            return false;
        }
        var regex = /http(s)?:\/\/([\w-]+.)+[\w-]+(\/[\w- ./?%&=]*)?/
        if (regex.test(url) !== true) {
            this.setState({
                error: true,
                info: "URL ERROR / NO RESULT FOUND"
            })
            return false;
        } else  {
            if (url.indexOf("showroom") !== -1 || url.indexOf("line") !== -1){
                uri = "/hls"
            } else {
                uri = "/news"
            }
        }
        url = `${global.constants.api}/api/v1/media${uri}?url=${encodeURIComponent(url)}`
        fetch(url, {
            method: 'GET',
            dataType: 'json'
        }).then(res => res.json())
            .then(data => {
                let status = data.status
                if (status === 0) {
                    this.setState({
                        error: false,
                        values: data.data,
                        status: status,
                    })
                } else {
                    this.setState({
                        error: false,
                        status: status,
                        btndisp: {display: "block"},
                    })
                }
            })
    }
    render() {
        const values = this.state.values
        const error = this.state.error
        const info = this.state.info
        const status = this.state.status
        let mediaTmp = []
        if ( error === true){
            mediaTmp.push(
                <div key="error">
                    <Chip
                        style={picCSS.error}
                        label={info}
                        color="secondary"
                    />
                </div>
            )
        } else {
            if ( status === 0) {
                if(values.type === "news") {
                    let urls = values.entities
                    for (let u in urls) {
                        if (urls[u].indexOf(".mp4") > 0) {
                            mediaTmp.push(
                                <div key={"video" + u}>
                                    <video style={picCSS.video} src={urls[u]} controls="controls" />
                                    <hr />
                                </div>
                            )
                        } else {
                            mediaTmp.push(
                                <div key={"img" + u}>
                                    <img style={picCSS.img} src={urls[u]} alt="" />
                                    <hr />
                                </div>
                            )
                        }
                    }
                }
                if (values.type === "hls") {
                    let urls = values.entities
                    mediaTmp.push(
                        <div key="hls">
                            <CopyToClipboard text={urls} onCopy={() => this.setState({copied: true, btnSta: "contained"})}>
                                <Button variant={this.state.btnSta} color="primary">
                                    {this.state.btnInfo}
                                </Button>
                            </CopyToClipboard>
                        </div>
                    )
                }
            } else {
                    mediaTmp.push(
                    <div key="nodata" style={this.state.btndisp}>
                        <Chip
                            style={picCSS.error}
                            label="No data"
                            color="secondary"
                        />
                    </div>
                )
            }
        }
        return (
            <div style={picCSS.container}>
                <p>
                    <img style={picCSS.logo} src={IG} alt="ig"/>
                    <img style={picCSS.logo} src={MDPR} alt="mdpr" />
                    <img style={picCSS.logo} src={TPL} alt="tpl" />
                    <img style={picCSS.logo} src={ORICON} alt="oricon" />
                </p>
                <Input
                    style={picCSS.input}
                    onChange={event=>this.changeText(event)}
                    placeholder="URL"
                    inputProps={{'aria-label': 'Description'}}
                    autoFocus={false}
                    onKeyUp={this.onKeyUp}
                />
                <IconButton 
                    aria-label="image_search" 
                    onClick={this.picClick.bind(this)}
                >
                    <ImageSearch />
                </IconButton>
                {mediaTmp}
            </div>
        );
    }
}

export default Picture;