# Popular Movie

### 串接 themoviedb 的 API 做一個簡單的 Vue Project，主要功能有:

* 首頁: 列出主要的熱門電影、電影分類列表、Popular 以及 Upcoming 電影的入口連結。
* 電影內頁: 列出電影的主要資訊，下方 Tab 分別列出評論、演員資訊以及預告影片列表。
* 搜尋功能: header 可以搜尋電影資訊。
* Discover 頁面: 參考官方 Discover 頁面所做出來的頁面。

### 練習主要示範為:

* Vuex 儲存全站需要知道狀態的資料，最基本的例如登入狀態、使用者的基本資訊，例如帳號。 (登入狀態僅作簡單的 DEMO)
* Header 搜尋功能用 RxJS 示範，偵測 input 延遲並發送 API。 (現為 RxJS 嫩鳥，沒寫好請包涵 Orz)
* 部分 API 在載入時有做 Loading 效果 (content loader)，增進使用體驗。
* i18n 切換。
* 分頁功能，以及 Discover 頁面在做分頁或 filter 時更新網址 Query 參數，搜尋結果可分享。


### 需改進之處:
* header search 功能補做可以透過鍵盤選擇上下搜尋結果，且 searchbar 裡面的卷軸要可以跟著移動。
* 首頁電影分類卡片呈現方式可再調整。


## TODO

* fetch detail by genre (https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28).
* fetch TV show.
* personal profile page.
* [inprogress] advance search with filter.
* notification window and scroll to load more demo. (hope like pinterest)

## Project setup

1. 先執行 npm install 或 npm i 將此專案所需的相依套件下載

```
npm install
```

2. 將 `config.example.js` 複製為 `config.js`，並申請好 API_KEY 貼到 config.js。


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

從 api 取得的圖片可以從參數決定要拿哪些 size:

* "w92"
* "w154"
* "w185"
* "w342"
* "w500"
* "w780"
* "original"

