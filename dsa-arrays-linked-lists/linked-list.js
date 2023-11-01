/** Node: node for a singly linked list. */
class Node {
  constructor(val) {
    this.val = val; // Value stored in the node
    this.next = null; // Pointer to the next node in the list
  }
}

/** LinkedList: chained together nodes. */
class LinkedList {
  // Constructor: initializes the linked list with optional values passed as an array
  constructor(vals = []) {
    this.head = null; // Points to the first node in the list
    this.tail = null; // Points to the last node in the list
    this.length = 0; // Number of nodes in the list

    // Loop through the input array and push each value into the linked list
    for (let val of vals) this.push(val);
  }

  // Helper function to get the node at a specific index in the list
  _get(idx) {
    let cur = this.head; // Start at the head of the list
    let count = 0;

    // Traverse the list until reaching the specified index or the end of the list
    while (cur !== null && count !== idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }

  /** push(val): add new value to the end of the list. */
  push(val) {
    let newNode = new Node(val); // Create a new node with the given value

    // If the list is empty, set both head and tail to the new node
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode; // Update the current tail's next pointer to the new node
      this.tail = newNode; // Update the tail to the new node
    }

    this.length += 1; // Increase the length of the list
  }

  /** unshift(val): add new value to the start of the list. */
  unshift(val) {
    let newNode = new Node(val); // Create a new node with the given value

    // If the list is empty, set both head and tail to the new node
    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head; // Update the new node's next pointer to the current head
      this.head = newNode; // Update the head to the new node
    }

    this.length += 1; // Increase the length of the list
  }

  /** pop(): return and remove the last item in the list. */
  pop() {
    return this.removeAt(this.length - 1); // Call the removeAt method with the last index
  }

  /** shift(): return and remove the first item in the list. */
  shift() {
    return this.removeAt(0); // Call the removeAt method with the first index
  }

  /** getAt(idx): get the value at the specified index. */
  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid Index"); // Throw an error if the index is out of bounds
    }

    return this._get(idx).val; // Get the value of the node at the specified index
  }

  /** setAt(idx, val): set the value at the specified index to the given value. */
  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid Index"); // Throw an error if the index is out of bounds
    }

    let cur = this._get(idx); // Get the node at the specified index
    cur.val = val; // Update the value of the node
  }

  /** insertAt(idx, val): add a new node with the given value before the specified index. */
  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid Index"); // Throw an error if the index is out of bounds
    }

    if (idx === 0) return this.unshift(val); // If inserting at the beginning, call unshift
    if (idx === this.length) return this.push(val); // If inserting at the end, call push

    let prev = this._get(idx - 1); // Get the node before the specified index
    let newNode = new Node(val); // Create a new node with the given value
    newNode.next = prev.next; // Update the new node's next pointer to the node at the specified index
    prev.next = newNode; // Update the previous node's next pointer to the new node

    this.length += 1; // Increase the length of the list
  }

  /** removeAt(idx): return and remove the item at the specified index. */
  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid Index"); // Throw an error if the index is out of bounds
    }

    if (idx === 0) {
      let val = this.head.val; // Store the value of the first node
      this.head = this.head.next; // Update the head to the next node
      this.length -= 1; // Decrease the length of the list
      if (this.length < 2) this.tail = this.head; // If there are 0 or 1 nodes, update the tail
      return val; // Return the removed value
    }

    let prev = this._get(idx - 1); // Get the node before the specified index

    if (idx === this.length - 1) {
      let val = prev.next.val; // Store the value of the last node
      prev.next = null; // Update the previous node's next pointer to null (removing the last node)
      this.tail = prev; // Update the tail to the previous node
      this.length -= 1; // Decrease the length of the list
      return val; // Return the removed value
    }

    let val = prev.next.val; // Store the value of the node at the specified index
    prev.next = prev.next.next; // Update the previous node's next pointer to skip the removed node
    this.length -= 1; // Decrease the length of the list
    return val; // Return the removed value
  }

  /** average(): return the average of all values in the list. */
  average() {
    if (this.length === 0) return 0; // Return 0 if the list is empty

    let total = 0; // Variable to store the sum of all values
    let current = this.head; // Start at the head of the list

    // Traverse the list and calculate the total sum of all values
    while (current) {
      total += current.val; // Add the current node's value to the total
      current = current.next; // Move to the next node
    }

    return total / this.length; // Return the average (total sum divided by the number of nodes)
  }
}

module.exports = LinkedList; // Export the LinkedList class
