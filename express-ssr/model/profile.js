const mongoose = require("mongoose");
const baseModel = require("./base-model");
const Schema = mongoose.Schema

const articleSchema = new mongoose.Schema({
  ...baseModel,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tagList: {
    type: [String],
    default: null,
  },
  favoritesCount: {
    type: Number,
    default: 0,
  },
  author: {
    // 根据author的id从user表查出具体的用户信息，映射
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = articleSchema;
