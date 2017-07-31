let TorrentSearch = require("torrent-search-api");
let config = require("../../config");
let search = new TorrentSearch();

search.enableProvider("Torrent9");
search.search('House of Cards S01E01', "", 20)
    .then(console.log)
    .catch(console.log);
