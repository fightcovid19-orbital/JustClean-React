export default {
    palette: {
        primary: {
            light: '#ffb74d',
            main: '#ff9800', // orange colour Navbar
            dark: '#f57c00',
            contrastText: '#000', // black colour font
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff', // white colour font
        },
    },
    typography: {
        useNextVariants: true
    },
    spreadThis: {
        form: {
            textAlign: 'center'
        },
        image: {
            margin: '20px auto 20px auto'
        },
        pageTitle: {
            margin: '10px auto 10px auto'
        },
        textField: {
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative' // relative to progress
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        progress: {
            position: 'absolute'
        },
        card: {
            display: 'flex',
            marginBottom: 20
        },
        cardContent: {
            width: '100%',
            flexDirection: 'column',
            padding: 25
        },
        paper: {
            padding: 20,
            marginRight: '20px'
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#ff9800'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        },
        cover: {
            width: 100,
            height: 100,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
            margin: 15
        },
        handle: {
            width: 100,
            height: 20,
            backgroundColor: '#ff9800',
            marginBottom: 10,
            marginTop: 15
        },
        date: {
            height: 14,
            width: 140,
            backgroundColor: 'rgba(0,0,0,0.3)',
            marginBottom: 10
        },
        fullLine: {
            height: 15,
            width: 500,
            marginBottom: 10,
            backgroundColor: 'rgba(0,0,0,0.6)'
        },
        invisibleSeparator: {
            border: 'none',
            margin: 1
        },
        visibleSeparator: {

        }
    }
}