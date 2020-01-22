import React from 'react'
import { makeStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const mainColor = global.constants.theme

const useStyles = makeStyles(theme => ({
    wrapper: {
        paddingTop: 20,
    },
    errorCode: {
        color: mainColor.primaryColor,
    },
    errorText: {
        margin: 6,
    },
    customBtn: {
        color: "#fff",
        backgroundColor: mainColor.secondaryColor,
        margin: 6,
        '&:hover': {
            backgroundColor: mainColor.primaryColor,
        },
    },
}))

export default function NotFoundPage() {
    const classes = useStyles()
    return (
        <Typography component='div' className={classes.wrapper}>
            <Typography component='div' className={classes.errorCode}>
                <Typography component="p" variant="h3" className={classes.errorText}>
                    404
                </Typography>
                <Typography component="p" variant="h3" className={classes.errorText}>
                    Not
                </Typography>
                <Typography component="p" variant="h3" className={classes.errorText}>
                    Found
                </Typography>
            </Typography>
            <Link underline='none' href="/">
                <Button variant="contained" className={classes.customBtn}>
                    BACK
                    </Button>
            </Link>
        </Typography>
    )
}
