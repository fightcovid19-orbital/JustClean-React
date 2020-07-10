
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/iconword.png'
import SignupIcon from '../images/signup.png'
import { Link } from 'react-router-dom'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions'
import { clearErrors } from '../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spreadThis
})

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            type: '',
            errors: {}
        }
    }

    componentDidMount() {
        this.props.clearErrors()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
            type: this.state.type
        }
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loadingUI } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt='JustClean' className={classes.image} />
                    <Typography variant='h3' className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth
                            helperText={errors.email} error={errors.email ? true : false} />
                        <TextField id='password' name='password' type='password' label='Password' className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth
                            helperText={errors.password} error={errors.password ? true : false} />

                        <FormControl component="fieldset" className={classes.textField} >
                            <FormLabel component="legend" >
                                Type
                            </FormLabel>
                            <RadioGroup row aria-label="type" name="type" value={this.state.type} onChange={this.handleChange}>
                                <FormControlLabel value="customer" control={<Radio color='primary' />} label="Customer" />
                                <FormControlLabel value="cleaner" control={<Radio color='primary' />} label="Cleaner" />
                            </RadioGroup>
                            {!loadingUI && errors.type ?
                                <FormHelperText error={errors.type ? true : false}>
                                    {errors.type}
                                </FormHelperText> : null}
                        </FormControl>

                        {errors.general && <Typography variant='body2' className={classes.customError}>
                            {errors.general}
                        </Typography>}
                        <hr />
                        <Button type='submit' variant='contained' color='primary' disabled={loadingUI} className={classes.button}>
                            Login {loadingUI && (<CircularProgress size={30} className={classes.progress} />)}
                        </Button>
                        <br />
                        <small>Don't have an account? Sign up <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
        // inside the errors received, if there is a field of email means the email is invalid
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
