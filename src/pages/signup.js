
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/iconword.png'
import { Link } from 'react-router-dom'
import { regions } from '../util/Regions'

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
import MenuItem from '@material-ui/core/MenuItem';

// Redux stuff
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'
import { clearErrors } from '../redux/actions/dataActions'

const style = theme => ({
    ...theme.spreadThis
})

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            userName: '',
            type: '',
            location: '',
            errors: {}
        }
    }

    componentDidMount() {
        this.props.clearErrors()
    }

    componentDidUpdate(prevProps) {
        if (this.props.UI.errors !== prevProps.UI.errors) {
            this.setState({
                errors: this.props.UI.errors
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            userName: this.state.userName,
            type: this.state.type,
            location: this.state.location
        }
        this.props.signupUser(newUserData, this.props.history);
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
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                            value={this.state.email} onChange={this.handleChange} fullWidth
                            helperText={errors.email} error={errors.email ? true : false} />

                        <TextField id='userName' name='userName' type='text' label='Username' className={classes.textField}
                            value={this.state.userName} onChange={this.handleChange} fullWidth
                            helperText={errors.userName} error={errors.userName ? true : false} />

                        <TextField id='location' name='location' type='text' label="Location, Region "
                            className={classes.textField} select
                            value={this.state.location} onChange={this.handleChange} fullWidth
                            helperText={errors.location} error={errors.location ? true : false}>
                                {regions.map((option) => (
                                    <MenuItem key={option.regionName} value={option.regionName}>
                                        {option.regionName}
                                    </MenuItem>
                                ))}
                        </TextField>

                        <TextField id='password' name='password' type='password' label='Password' className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth
                            helperText={errors.password} error={errors.password ? true : false} />

                        <TextField id='confirmPassword' name='confirmPassword' type='password' label='Confirm Password'
                            className={classes.textField}
                            value={this.state.confirmPassword} onChange={this.handleChange} fullWidth
                            helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} />

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

                        <hr className={classes.invisibleSeparator}/>
                        {errors.general && <Typography variant='body2' className={classes.customError}>
                            {errors.general}
                        </Typography>}
                        <Button type='submit' variant='contained' color='primary' disabled={loadingUI} className={classes.button}>
                            Sign Up {loadingUI && (<CircularProgress size={30} className={classes.progress} />)}
                        </Button>
                        <br />
                        <small>Already have an account? Login <Link to='/login'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
        // inside the errors received, if there is a field of email means the email is invalid
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser, clearErrors })(withStyles(style)(signup))
