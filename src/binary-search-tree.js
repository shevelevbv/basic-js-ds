const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  /**
   * @returns the tree's root element
   */

  root() {
    return this.rootNode; 
  }

  /**
   * Adds a new node into the tree.
   * @param {*} data 
   * @returns updated tree
   */

  add(data) {

    let newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return this;
    } else {
      let sliderNode = this.rootNode;
      while (sliderNode) {
        if (newNode.data === sliderNode.data) {
          return;
        }
        if (newNode.data < sliderNode.data) {
          if (!sliderNode.left) {
            sliderNode.left = newNode;
            return this;
          }
          sliderNode = sliderNode.left;
        } else {
          if (!sliderNode.right) {
            sliderNode.right = newNode;
            return this;
          }
          sliderNode = sliderNode.right;
        }
      }
    }
  }

  /**
   * Checks if the value is in the tree.
   * @param {*} data 
   */
  has(data) {
    return this.find(data) ? true : false;
  }

  /**
   * Returns the node if the value exists in the list, null otherwise.
   * @param {*} data 
   */

  find(data) {
    let sliderNode = this.rootNode;
    while (sliderNode) {
      if (data === sliderNode.data) {
        return sliderNode;
      } else if (data < sliderNode.data) {
        sliderNode = sliderNode.left;
      } else {
        sliderNode = sliderNode.right;
      }
    }
    return null;
  }

  remove(data) {
    let nodeToBeRemoved = this.find(data);
    if (nodeToBeRemoved === null) {
      return;
    }
    let sliderNode = this.rootNode;
    if (this.rootNode === nodeToBeRemoved) {
      if (!(this.rootNode.left || this.rootNode.right)) {
        this.rootNode = null;
      } else {
        if (this.rootNode.right) {
          this.rootNode = this.rootNode.right;
          sliderNode = this.rootNode;
          while(sliderNode.left) {
            sliderNode = sliderNode.left;
          }
          sliderNode.left = nodeToBeRemoved.left;
        } else {
          this.rootNode = this.rootNode.left;
        } 
      }
      nodeToBeRemoved = null;
      return this;
    }

    while (sliderNode.left !== nodeToBeRemoved 
          && sliderNode.right !== nodeToBeRemoved) {
      if (data < sliderNode.data) {
        sliderNode = sliderNode.left;
      } else if (data > sliderNode.data) {
        sliderNode = sliderNode.right;
      }
    }
    if (sliderNode.left === nodeToBeRemoved) {
      if (!(nodeToBeRemoved.left || nodeToBeRemoved.right)) {
        sliderNode.left = null;
      } else {
        if (nodeToBeRemoved.right) {
          sliderNode.left = nodeToBeRemoved.right;
          while(sliderNode.left) {
            sliderNode = sliderNode.left;
          }
        } 
        sliderNode.left = nodeToBeRemoved.left;
      }
    } else if (sliderNode.right === nodeToBeRemoved) {
      if (!(nodeToBeRemoved.left || nodeToBeRemoved.right)) {
      sliderNode.right = null;
      } else {
        if (nodeToBeRemoved.right) {
          sliderNode.right = nodeToBeRemoved.right;
          while(sliderNode.left) {
            sliderNode = sliderNode.left;
          }
        } 
        sliderNode.left = nodeToBeRemoved.left;
      }
    }
    nodeToBeRemoved = null;
    return this;
  }

  min() {
    let sliderNode = this.rootNode;
    while(sliderNode.left) {
      sliderNode = sliderNode.left;
    }
    return sliderNode.data;
  }

  max() {
    let sliderNode = this.rootNode;
    while(sliderNode.right) {
      sliderNode = sliderNode.right;
    }
    return sliderNode.data;
  }
}

module.exports = {
  BinarySearchTree
};