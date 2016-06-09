function createDoubleLinkedList(doublelinkedlistbase, inherit) {
  'use strict';

  var ListItemCtor = doublelinkedlistbase.Item,
    ListMixin = doublelinkedlistbase.Mixin;

  function DoubleLinkedListItem(content) {
    ListItemCtor.call(this, content);
  }
  inherit(DoubleLinkedListItem, ListItemCtor);
  DoubleLinkedListItem.prototype.apply = function(func) {
    return func(this.content);
  };

  function DoubleLinkedList(){
    ListMixin.call(this);
  }
  ListMixin.addMethods(DoubleLinkedList);
  DoubleLinkedList.prototype.push = function(content){
    var newItem = new DoubleLinkedListItem(content);
    this.assureForController();
    this.controller.addToBack(newItem);
    return newItem;
  };
  DoubleLinkedList.prototype.unshift = function(content){
    var newItem = new DoubleLinkedListItem(content);
    this.assureForController();
    this.controller.addToFront(newItem);
    return newItem;
  };
  DoubleLinkedList.prototype.shift = function(){
    var tail = this.tail,
      ret;
    if (!tail) {
      return;
    }
    ret = tail.content;
    this.assureForController();
    this.controller.remove(tail);
    tail.destroy();
    return ret;
  };
  DoubleLinkedList.prototype.pop = function(){
    var head = this.head,
      ret;
    if (!head) {
      return;
    }
    ret = head.content;
    this.assureForController();
    this.controller.remove(head);
    head.destroy();
    return ret;
  };
  DoubleLinkedList.prototype.traverse = function(func){
    var head = this.head;
    if (!head) {
      return;
    }
    this.assureForController();
    this.controller.traverse(func);
  };
  DoubleLinkedList.prototype.traverseConditionally = function(func){
    var head = this.head;
    if (!head) {
      return;
    }
    this.assureForController();
    return this.controller.traverseConditionally(func);
  };
  DoubleLinkedList.prototype.getDoubleLinkedListLength = function () {
    return this.length;
  };

  return DoubleLinkedList;
}

module.exports = createDoubleLinkedList;

