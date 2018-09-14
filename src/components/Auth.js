import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import Chip from '@material-ui/core/Chip'
import Fade from '@material-ui/core/Fade'

const styles = ({
wrapper: {
        paddingTop: "60px",
    },
    errorInfo: {
        margin: "10px",
        backgroundColor: "#9941ac",
    },
    authInput: {
        margin: "10px auto",
        maxWidth: "250px",
        display: "flex",
    },
    authLabel: {
        color: "#c36bd6",
        '&:focus': {
            color: "red",
        },
    },
    customUnderline: {
        color: "#c36bd6",
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
        color: "#c36bd6",
    },
    customBtn: {
        color: "#fff",
        maxWidth: "100px",
        backgroundColor: "#CD96CD",
        fontSize: "0.85rem",
        margin: "10px auto",
        '&:hover': {
            backgroundColor: "#800080",
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
        }
    }
    componentWillMount() {
        let token = sessionStorage.getItem("token")
        if (token) {
            this.props.history.push('/rikamsg')
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
                    sessionStorage.setItem("token", token)
                    this.props.history.push('/rikamsg')
                } else {
                    this.setState({
                        btndisp: {
                            visibility: "visible",
                        },
                        error: true,
                    })
                }
            })
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
        return (
            <div className={classes.wrapper}>
                <FormControl >
                    <Fade in={this.state.error}>
                        <Chip
                            label="username or password is Invalid"
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
                    <Button variant="contained" className={classNames(classes.customBtn)} onClick={this.loginBtn.bind(this)}>
                        Submit
                    </Button>
                </FormControl>
            </div>
        )
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(Auth)