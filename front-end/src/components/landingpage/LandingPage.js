import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import backgroundImg from '../../static/media/backgrounds/landingPageBg.jpg';

const styles = theme => ({
  landing: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    backgroundImage: `url(${backgroundImg})`,
  },
  loginContainer: {
    minWidth: 450,
  },
});

class LandingPage extends React.Component {

  render() {
      const { redirectToSpotify, classes } = this.props;

      return (
        <Grid
          container
          className={classes.landing}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid className={classes.loginContainer} item xs={6}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Spotify Analyzer
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Analyzes your Spotify data!
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary" onClick={redirectToSpotify}>
                  Log in with Spotify
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
  }
}

export default withStyles(styles)(LandingPage);