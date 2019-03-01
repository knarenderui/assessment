import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/dashboard.actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  },
  flexRow: {
    display: "flex",
    margin: 8
  },
  flex1: {
    flex: 1
  }
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.interval = setInterval(() => {
      this.props.onLoad();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      loading,
      timestamp,
      metric,
      latitude,
      longitude,
      classes
    } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          {loading && <LinearProgress />}
          <CardHeader title="Dashboard Visualization" />
          <CardContent>
            <div className={classes.flexRow}>
              <Typography className={classes.flex1}>Temperature: </Typography>
              <Typography className={classes.flex1}>{metric}</Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.flex1}> Latitude: </Typography>
              <Typography className={classes.flex1}>{latitude}</Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.flex1}> Longitude: </Typography>
              <Typography className={classes.flex1}>{longitude}</Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.flex1}>Last Received:</Typography>
              <Typography className={classes.flex1}>
                {Math.round((new Date().getTime() - timestamp) / 1000 / 1000)}
                &nbsp; second ago
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    timestamp,
    metric,
    latitude,
    longitude,
    accuracy
  } = state.dashboard;
  return {
    loading,
    timestamp,
    metric,
    latitude,
    longitude,
    accuracy
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DASHBOARD
    })
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Dashboard));
