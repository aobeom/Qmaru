import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        paddingTop: 20,
    },
    errorCode: {
        color: theme.primaryColor,
    },
    errorText: {
        margin: 6,
    },
    customBtn: {
        color: "#fff",
        backgroundColor: theme.secondaryColor,
        margin: 6,
        '&:hover': {
            backgroundColor: theme.primaryColor,
        },
    },
})

class NotFoundPage extends React.Component {
    render() {
        const { classes } = this.props
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
}

NotFoundPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotFoundPage)