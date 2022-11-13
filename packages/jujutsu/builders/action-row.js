'use strict';

var Discord = require('discord.js');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var ActionRow = class {
  constructor() {
    this.row = new Discord.ActionRowBuilder();
  }
  build() {
    this.row.addComponents(this.components);
    return this.row;
  }
};
__name(ActionRow, "ActionRow");

module.exports = ActionRow;
