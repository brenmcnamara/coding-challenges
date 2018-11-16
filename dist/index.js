"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

class Model {

  // ---------------------------------------------------------------------------
  // MAY OVERRIDE
  // ---------------------------------------------------------------------------
  equals(that) {
    if (this === that || this.__raw === that.__raw) {
      return true;
    }

    const thisKeys = Object.keys(this.__raw);
    const thatKeys = Object.keys(that.__raw);
    if (thisKeys.length !== thatKeys.length) {
      return false;
    }

    return thisKeys.every(key => this.__raw[key] === that.__raw[key]);
  }

  // ---------------------------------------------------------------------------
  // DO NOT OVERRIDE
  // ---------------------------------------------------------------------------


  constructor(raw) {
    this.__raw = raw;
  }

  static createPointer(id) {
    return createPointer(this.modelName, id);
  }

  createPointer() {
    return createPointer(this.constructor.modelName, this.id);
  }

  static fromRaw(raw) {
    const Ctor = this;
    return new Ctor(raw);
  }

  toRaw() {
    return this.__raw;
  }

  get id() {
    return this.__raw.id;
  }

  get updatedAt() {
    return this.__raw.updatedAt;
  }

  get createdAt() {
    return this.__raw.createdAt;
  }

  get modelType() {
    return this.constructor.modelName;
  }

  get type() {
    return "MODEL";
  }

  merge(props) {
    return this.constructor.fromRaw(_extends({}, this.__raw, props));
  }
}

exports.default = Model;
function createPointer(name, id) {
  return { pointerType: name, refID: id, type: "POINTER" };
}