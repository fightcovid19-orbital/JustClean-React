// all tooltips change to MyButton

import React from 'react'

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'

export default ({ children, onClick, tip, btnClassName, tipClassName, disable }) => (
    <Tooltip title={tip} className={tipClassName} placement='top'>
        <IconButton onClick={onClick} className={btnClassName} disabled={disable}>
            {children}
        </IconButton>
    </Tooltip>
)