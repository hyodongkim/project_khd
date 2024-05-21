const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    "inner":{
        "type":String,
    },
    "author":{
        "type":String
    },
    "title":{
        "type":String
    },
    "writedate":{
        "type":Date
    },
    "type":{
        "type":String,
        "enum":["images", "video", "none"]
    },
    "mediapath":{
        "type":String
    }
});