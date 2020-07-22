import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

// MUI stuff
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    ...theme.spreadThis
});

class SmallLoginAndSignup extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    User not found, please login again!
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>
                        Login
                    </Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'>
                        Signup
                    </Button>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(SmallLoginAndSignup)
