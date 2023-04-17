
const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null
  }
  root() {
    return this._root
  }

  add(data) {
    const node = new Node(data)
    if (!this._root) {
      this._root = node
    } else {
      this._addNode(this._root, node)
    }
  }

  _addNode(parent, node) {
    if (node.data < parent.data) {
      if (!parent.left) {
        parent.left = node
      } else {
        this._addNode(parent.left, node)
      }
    } else {
      if (!parent.right) {
        parent.right = node
      } else {
        this._addNode(parent.right, node)
      }
    }
  }

  has(data) {
    return this._hasNode(this._root, data)
  }

  _hasNode(node, data) {
    if (!node) {
      return false
    } else if (node.data === data) {
      return true
    } else if (data < node.data) {
      return this._hasNode(node.left, data)
    } else {
      return this._hasNode(node.right, data)
    }
  }

  find(data) {
    return this._findNode(this._root, data)
  }

  _findNode(node, data) {
    if (!node) {
      return null
    } else if (node.data === data) {
      return node
    } else if (data < node.data) {
      return this._findNode(node.left, data)
    } else {
      return this._findNode(node.right, data)
    }
  }

  remove(data) {
    this._root = this._removeNode(this._root, data)
  }

  _removeNode(node, data) {
    if (!node) {
      return null
    } else if (data === node.data) {
      if (!node.left && !node.right) {
        return null
      } else if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      } else {
        const minRightSide = this._findMin(node.right)
        node.data = minRightSide.data
        node.right = this._removeNode(node.right, minRightSide.data)
        return node
      }
    } else if (data < node.data) {
      node.left = this._removeNode(node.left, data)
      return node
    } else {
      node.right = this._removeNode(node.right, data)
      return node
    }
  }

  min() {
    if (!this._root) {
      return null
    } else {
      return this._findMin(this._root).data
    }
  }

  _findMin(node) {
    if (!node.left) {
      return node
    } else {
      return this._findMin(node.left)
    }
  }

  max() {
    if (!this._root) {
      return null
    } else {
      return this._findMax(this._root).data
    }
  }

  _findMax(node) {
    if (!node.right) {
      return node
    } else {
      return this._findMax(node.right)
    }
  }
}

module.exports = {
  BinarySearchTree
};