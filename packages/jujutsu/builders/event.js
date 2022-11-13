'use strict';

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// builders/event.ts
var Event = class {
  constructor(instance, name) {
    this.instance = instance;
    this.name = name;
  }
};
__name(Event, "Event");

module.exports = Event;
