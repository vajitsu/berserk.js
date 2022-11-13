'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Discord = require('discord.js');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function ButtonData(data) {
  const button = new Discord.ButtonBuilder();
  switch (data.style) {
    case "primary":
      button.setStyle(1);
      break;
    case "secondary":
      button.setStyle(2);
      break;
    case "success":
      button.setStyle(3);
      break;
    case "danger":
      button.setStyle(4);
      break;
  }
  button.setLabel(data.label);
  if (data.emoji)
    button.setEmoji(data.emoji);
  if (typeof data.disabled === "boolean")
    button.setDisabled(data.disabled);
  return button.data;
}
__name(ButtonData, "ButtonData");
var InteractiveButton = class {
};
__name(InteractiveButton, "InteractiveButton");

exports.ButtonData = ButtonData;
exports.default = InteractiveButton;
