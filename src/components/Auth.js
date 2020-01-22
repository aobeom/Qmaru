import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import Chip from '@material-ui/core/Chip'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'

const mainColor = global.constants.theme

const useStyles = makeStyles(theme => ({
    wrapper: {
        paddingTop: 60,
    },
    errorInfo: {
        margin: 10,
        backgroundColor: mainColor.tipColor,
    },
    authInput: {
        margin: "10px auto",
        maxWidth: 250,
        display: "flex",
    },
    authLabel: {
        color: mainColor.secondaryColor,
        '&:focus': {
            color: "red",
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
            borderBottomColor: mainColor.primaryColor,
        },
    },
    customIcon: {
        color: mainColor.secondaryColor,
    },
    customBtn: {
        color: "#fff",
        maxWidth: 100,
        backgroundColor: mainColor.secondaryColor,
        margin: "10px auto",
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
}))


export default function Auth(props) {
    const classes = useStyles()
    const [userCheck, setUserCheck] = useState(true)
    const [passCheck, setPassCheck] = useState(true)
    const [btndisp, setBtndisp] = useState({ visibility: "hidden" })
    const [reqError, setReqError] = useState(false)
    const [reqInfo, setInfo] = useState("")

    const [username, setUser] = useState()
    const [password, setPass] = useState()

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            props.history.replace('/rikamsg')
        }
    })

    const changeUser = (event) => {
        setUser(event.target.value)
    }
    const changePass = (event) => {
        setPass(event.target.value)
    }

    const loginBtn = () => {
        setReqError(false)
        if (username === undefined || username === "") {
            setUserCheck(false)
        } else {
            setUserCheck(true)
        }
        if (password === undefined || password === "") {
            setPassCheck(false)
        } else {
            setPassCheck(true)
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
                    props.history.replace('/rikamsg')
                } else {
                    setBtndisp({ visibility: "visible" })
                    setReqError(true)
                    setInfo("username or password is Invalid")
                }
            }).catch(
                () => {
                    setBtndisp({ visibility: "visible" })
                    setReqError(true)
                    setInfo("Server Error")
                }
            )
    }
    const onKeyUp = (e) => {
        e.keyCode === 13 && loginBtn()
    }

    return (
        <Typography component='div' className={classes.wrapper}>
            <FormControl >
                <Fade in={reqError}>
                    <Chip
                        label={reqInfo}
                        className={classes.errorInfo}
                        color="primary"
                        style={btndisp}
                    />
                </Fade>

                <TextField
                    required={userCheck}
                    error={!userCheck}
                    placeholder="Username"
                    classes={{ root: classes.authInput }}
                    onChange={event => changeUser(event)}
                    InputProps={
                        {
                            startAdornment: (
                                <InputAdornment position="start" className={classes.customIcon}><AccountCircle /></InputAdornment>
                            ),
                        }
                    }
                />

                <TextField
                    required={passCheck}
                    error={!passCheck}
                    placeholder="Password"
                    className={classes.authInput}
                    type="password"
                    onChange={event => changePass(event)}
                    onKeyUp={onKeyUp}
                    InputProps={
                        {
                            startAdornment: (
                                <InputAdornment position="start" className={classes.customIcon}><Lock /></InputAdornment>
                            ),
                        }
                    }
                />
                <Button variant="contained" className={classes.customBtn} onClick={loginBtn}>
                    Submit
                    </Button>
            </FormControl>
        </Typography>
    )
}