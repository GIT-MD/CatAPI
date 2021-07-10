import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [names, setNames] = React.useState([]);
  const [images, setImages] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  React.useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("x-api-key", "e09fcefe-5083-4be3-bb07-0e0cee77dda2");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://api.thecatapi.com/v1/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => setNames(result))
      .catch((error) => console.log("error", error));

    var formdata = new FormData();
    formdata.append("limit", "10");

    fetch("https://api.thecatapi.com/v1/images/search?limit=10", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return setImages(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              names.find((element) => element.id === value).name
                            }
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name.id} value={name.id}>
                        {name.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button variant="contained" color="primary">
                    Primary
                  </Button>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ImageList
                  rowHeight={160}
                  className={classes.imageList}
                  cols={2}
                >
                  {images.map((item) => (
                    <ImageListItem key={item.id} cols={item.cols || 1}>
                      <img src={item.url} alt={item.id} />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={
                          <span>
                            by: {item.id}{" "}
                            {
									 
									 item.categories && (
                              categorises 
											{
													item.categories.map((category) => (
														<span>
													{category.name} {JSON.stringify(category)}
														</span>
													))
												  }
										  )
										  }
                          </span>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default App;
