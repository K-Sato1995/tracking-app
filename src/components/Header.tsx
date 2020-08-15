import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import LocalAirportSharpIcon from '@material-ui/icons/LocalAirportSharp'
import { useAuth0 } from '@auth0/auth0-react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const { logout } = useAuth0()
  const classes = useStyles()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <LocalAirportSharpIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          PLOGress
        </Typography>

        <Button color="inherit" onClick={() => logout()}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
