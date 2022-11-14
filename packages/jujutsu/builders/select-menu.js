'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Discord = require('discord.js');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function SelectMenuData(data) {
  const _ = new Discord.SelectMenuBuilder(data);
  return _.data;
}
__name(SelectMenuData, "SelectMenuData");
var SelectMenu = class {
};
__name(SelectMenu, "SelectMenu");

exports.SelectMenuData = SelectMenuData;
exports.default = SelectMenu;
