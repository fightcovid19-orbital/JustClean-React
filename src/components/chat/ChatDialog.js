import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import ChatView from './ChatView'
import ChatTextbox from './ChatTextbox'

// MUI stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase'

// Icons
import CloseIcon from '@material-ui/icons/Close'

const style = (theme) => ({
    ...theme.spreadThis,
    closeButton: {
        color: '#ff3d00',
        left: "15%",
        position: "relative"
    },
    header: {
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        padding: '10px',
    }
})

class ChatDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;

        const button = (this.props.base) ? (
            <ButtonBase onClick={this.handleOpen} >
                {this.props.children}
            </ButtonBase>
        ) : (
                <MyButton
                    onClick={this.handleOpen}
                    tip={`Chat with ${this.props.friendName}`}
                    tipClassName={this.props.chatButtonClassName}
                    btnClassName={this.props.btnClassName}
                >
                    {this.props.children}
                </MyButton>
            )

        return (
            <Fragment>
                {button}
                <Dialog open={this.state.open} onClose={this.handleClose} fullScreen>

                    <DialogTitle>
                        <Paper className={classes.chatHeader}>
                            <Grid container>
                                <Grid item xs />
                                <Grid item xs={9}>
                                    <Typography className={classes.header}>
                                        Your conversation with {this.props.friendName}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                                        <CloseIcon />
                                    </MyButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </DialogTitle>

                    <DialogContent id='chatview-container'>
                        <ChatView friend={this.props.friendName} />
                    </DialogContent>

                    <DialogTitle >
                        <ChatTextbox friend={this.props.friendName} />
                    </DialogTitle>

                </Dialog>
            </Fragment>
        )
    }
}

ChatDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    friendName: PropTypes.string.isRequired,
    chatButtonClassName: PropTypes.object,
    base: PropTypes.bool,
    btnClassName: PropTypes.object,
    children: PropTypes.object.isRequired
}

export default withStyles(style)(ChatDialog)
