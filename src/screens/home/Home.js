import React, {Component} from 'react';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.min.css';


const styles = theme => ({
    cardRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },

    gridList: {
        width: '100%',

    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },

    media: {
        height: 140,
    },

    content: {
        height: 120,
    },

    name: {
        padding: 10,
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-around',
        height: 50
    },
    ratingBox: {
        display: 'flex',
        justifyContent: 'space-around',
        width: 100,
        backgroundColor: '#ffd03a',
        padding: 10,
        borderRadius: 2

    }

});

class Home extends Component {
    constructor() {
        super();
        this.state = {
            restaurantsList: [{}]
        }
    }
    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({ restaurantsList: JSON.parse(this.responseText).restaurants });
            }
        })

        xhr.open("GET", this.props.baseUrl + "restaurant")
        xhr.setRequestHeader("cache-Control", "no-cache");
        xhr.send(data);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div >
                    <GridList cellHeight={400} className={classes.gridList} cols={4} >
                        {this.state.restaurantsList.map(restaurant => (
                            <GridListTile key={restaurant.id} style={{ padding: 10 }} >
                                <Card className={classes.card} style={{ border: "1px solid #dcdcdc" }}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            alt={restaurant.restaurant_name}
                                            src={restaurant.photo_URL}
                                            title={restaurant.restaurant_name}
                                        />
                                        <CardContent className={classes.content}>
                                            <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
                                                {restaurant.restaurant_name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {restaurant.categories}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className={classes.cardActions} >
                                        <div className={classes.ratingBox} >
                                            <span><i className="fa fa-star" style={{ color: '#fff' }}></i></span>
                                            <span style={{ color: '#fff' }}>{restaurant.customer_rating}</span>
                                            <span style={{ color: '#fff' }}>({restaurant.number_customers_rated})</span>
                                        </div>
                                        <div>
                                            <span><i className="fa fa-inr" ></i></span>
                                            <span>{restaurant.average_price} for two</span></div>
                                    </CardActions>
                                </Card>
                            </GridListTile>

                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);