'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Discord = require('discord.js');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function ModalData(data) {
  const modal = new Discord.ModalBuilder(data);
  return modal.data;
}
__name(ModalData, "ModalData");
var Modal = class {
};
__name(Modal, "Modal");

exports.ModalData = ModalData;
exports.default = Modal;
