export default {
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#ff9800', // orange colour Navbar
            dark: '#008394',
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
        }
    }
}