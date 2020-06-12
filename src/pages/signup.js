
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/iconword.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

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
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            userName: this.state.userName,
            type: this.state.type
        }
        axios.post('/signup', newUserData)
            .then(res => {  //inside got token
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/'); // redirect to home page
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
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
                        <TextField id='password' name='password' type='password' label='Password' className={classes.textField}
                            value={this.state.password} onChange={this.handleChange} fullWidth
                            helperText={errors.password} error={errors.password ? true : false} />

                        <TextField id='confirmPassword' name='confirmPassword' type='password' label='Confirm Password'
                            className={classes.textField}
                            value={this.state.confirmPassword} onChange={this.handleChange} fullWidth
                            helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} />
                        <TextField id='type' name='type' type='text' label="Type, e.g 'cleaner' or 'customer' "
                            className={classes.textField}
                            value={this.state.type} onChange={this.handleChange} fullWidth
                            helperText={errors.type} error={errors.type ? true : false} />
                        <TextField id='userName' name='userName' type='text' label='Username'
                            className={classes.textField}
                            value={this.state.userName} onChange={this.handleChange} fullWidth
                            helperText={errors.userName} error={errors.userName ? true : false} />

                        {errors.general && <Typography variant='body2' className={classes.customError}>
                            {errors.general}
                        </Typography>}
                        <Button type='submit' variant='contained' color='primary' disable={loading} className={classes.button}>
                            Sign Up {loading && (<CircularProgress size={30} className={classes.progress} />)}
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
    classes: PropTypes.object.isRequired
}

export default withStyles(style)(signup)
