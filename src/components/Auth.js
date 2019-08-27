import React from 'react'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import Chip from '@material-ui/core/Chip'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        paddingTop: 60,
    },
    errorInfo: {
        margin: 10,
        backgroundColor: theme.tipColor,
    },
    authInput: {
        margin: "10px auto",
        maxWidth: 250,
        display: "flex",
    },
    authLabel: {
        color: theme.secondaryColor,
        '&:focus': {
            color: "red",
        },
    },
    customUnderline: {
        color: theme.secondaryColor,
        '&:hover:not(disabled):before': {
            borderBottom: `1px solid ${theme.secondaryColor} !important`,
        },
        '&:before': {
            borderBottomColor: theme.thirdlyColor,
        },
        '&:after': {
            borderBottomColor: theme.primaryColor,
        },
    },
    customIcon: {
        color: theme.secondaryColor,
    },
    customBtn: {
        color: "#fff",
        maxWidth: 100,
        backgroundColor: theme.secondaryColor,
        margin: "10px auto",
        '&:hover': {
            backgroundColor: theme.primaryColor,
        },
    },
})


class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            userCheck: true,
            passCheck: true,
            btndisp: {
                visibility: "hidden",
            },
            error: false,
            info: "",
        }
    }
    componentDidMount() {
        let token = localStorage.getItem("token")
        if (token) {
            this.props.history.replace('/rikamsg')
        }
    }
    changeUser(event) {
        this.setState({
            username: event.target.value,
        })
    }
    changePass(event) {
        this.setState({
            password: event.target.value,
        })
    }
    loginBtn() {
        this.setState({
            error: false,
        })
        let username = this.state.username
        let password = this.state.password
        if (username === undefined || username === "") {
            this.setState({
                userCheck: false,
            })
        } else {
            this.setState({
                userCheck: true,
            })
        }
        if (password === undefined || password === "") {
            this.setState({
                passCheck: false,
            })
        } else {
            this.setState({
                passCheck: true,
            })
        }
        let url = `${global.constants.api}/api/v1/auth/token`
        let authData = {
            "username": username,
            "password": password,
        }
        fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authData),
                dataType: 'json',
            }).then(res => res.json())
            .then(data => {
                let status = data.status
                if (status === 0) {
                    let token = data.data.token
                    localStorage.setItem("token", token)
                    this.props.history.replace('/rikamsg')
                } else {
                    this.setState({
                        status: status,
                        btndisp: {
                            visibility: "visible",
                        },
                        error: true,
                        info: "username or password is Invalid",
                    })
                }
            }).catch(
                () => this.setState({
                    status: 1,
                    btndisp: {
                        visibility: "visible",
                    },
                    error: true,
                    info: "Server Error",
                })
            )
    }
    onKeyUp = (e) => {
        e.keyCode === 13 && this.loginBtn()
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    render (){
        const { classes } = this.props
        const userCheck = this.state.userCheck
        const passCheck = this.state.passCheck
        const info = this.state.info
        return (
            <Typography component='div' className={classes.wrapper}>
                <FormControl >
                    <Fade in={this.state.error}>
                        <Chip
                            label={info}
                            className={classes.errorInfo}
                            color="primary"
                            style={this.state.btndisp}
                        />
                    </Fade>

                    <TextField
                        required={userCheck}
                        error={!userCheck}
                        placeholder="Username"
                        classes={{ root: classes.authInput }}
                        onChange={event => this.changeUser(event)}
                        InputProps={
                            {
                                startAdornment: (
                                    <InputAdornment position="start" className={classes.customIcon}><AccountCircle /></InputAdornment>
                                ),
                                className: this.props.classes.customUnderline
                            }
                        }
                    />

                    <TextField
                        required={passCheck}
                        error={!passCheck}
                        placeholder="Password"
                        className={classes.authInput}
                        type="password"
                        onChange={event => this.changePass(event)}
                        onKeyUp={this.onKeyUp}
                        InputProps={
                            {
                                startAdornment: (
                                    <InputAdornment position="start" className={classes.customIcon}><Lock /></InputAdornment>
                                ),
                                className: this.props.classes.customUnderline
                            }
                        }
                    />
                    <Button variant="contained" className={classes.customBtn} onClick={this.loginBtn.bind(this)}>
                        Submit
                    </Button>
                </FormControl>
            </Typography>
        )
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withRouter(withStyles(styles)(Auth))