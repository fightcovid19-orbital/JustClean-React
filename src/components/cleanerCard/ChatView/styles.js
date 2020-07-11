const styles = theme => ({

    content: {
        height: 'calc(100vh - 100px)',
        overflow: 'auto',
        padding: '75px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: '50px',
        width: '100%'
    },

    userSent: {
        float: 'left',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#ffb74d',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
    },

    friendSent: {
        float: 'right',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#f57c00',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
    },

    chatHeader: {
        width: '100%',
        height: '50px',
        backgroundColor: '#ff9800',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '10px',
        boxSizing: 'border-box'
    }

});

export default styles;