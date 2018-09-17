import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'

const theme = global.constants.theme

const styles = ({
    wrapper: {
        paddingTop: "60px",
    },
    errorCode: {
        color: theme.primaryColor,
        fontSize: "4rem",
    },
    errorText: {
        margin: "5px",
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
})

class NotFoundPage extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.wrapper}>
                <div className={classes.errorCode}>
                    <p className={classes.errorText}>404</p> 
                    <p className={classes.errorText}>Not</p> 
                    <p className={classes.errorText}>Found</p>
                </div>
                <a href="/">
                    <Button variant="contained" className={classNames(classes.customBtn)}>
                        BACK
                    </Button>
                </a>
            </div>
        )
    }
}

NotFoundPage.propTypes = {
    classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(NotFoundPage)