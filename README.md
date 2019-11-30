# Popular Movie

contain functions:

* Home page: Lists the main popular movies, category listings, and popular and Upcoming movie entry links.
* Detail Page: Lists the main information of the movie. The tabs below list the reviews, cast information, and trailer videos.
* Search function: header can search movie information.
* Discover page: Refer to the page made by the official Discover page.

### Something need to improve:
* The header searchbar can be supplemented by selecting up and down throught the keyboard, and the scroll bar in the search bar must be moved along with it.


## TODO

* fetch detail for each genre.
* fetch TV show.
* implement personal profile page.
* implement advance search with filter.


## Project setup

1. please install packages from npm.

```
npm install
```

2. copy `config.example.js` as `config.js`，and apply for API_KEY for [themoviedb](https://developers.themoviedb.org/3/getting-started/introduction) and paste it into config.js.


### Compiles and hot-reloads for development

```
npm run serve
```

and visit localhost:8080

### Compiles and minifies for production

```
npm run build
```


## Notes

we can get images by different sizes, such as:

* "w92"
* "w154"
* "w185"
* "w342"
* "w500"
* "w780"
* "original"

