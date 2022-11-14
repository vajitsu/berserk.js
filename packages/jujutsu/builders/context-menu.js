'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Discord = require('discord.js');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function ContextMenuData({
  nameLocalizations,
  defaultMemberPermissions,
  dmPermission
}) {
  const _ = new Discord.ContextMenuCommandBuilder();
  if (nameLocalizations)
    _.setNameLocalizations(nameLocalizations);
  if (typeof dmPermission === "boolean")
    _.setDMPermission(dmPermission);
  if (typeof defaultMemberPermissions === "boolean")
    _.setDefaultMemberPermissions(defaultMemberPermissions);
  return _;
}
__name(ContextMenuData, "ContextMenuData");
var ContextMenu = class {
};
__name(ContextMenu, "ContextMenu");

exports.ContextMenuData = ContextMenuData;
exports.default = ContextMenu;
