function createNode(value) {
  return {
    value,
    next: null
  }
}

function createList() {
  let head = null;
  let tail = null;
  let length = 0;

  return {
    append(value) {
      const newNode = createNode(value);

      if(!head) {
        head = newNode;
        tail = newNode;
      } else {
        tail.next = newNode;
        tail = newNode
      }

      length++;

      return this;
    },

    prepend(value) {
      const newNode = createNode(value);

      if(!head) {
        head = newNode;
        tail = newNode;
      } else {
        newNode.next = head
        head = newNode
      }

      length++

      return this;
    },

    at(index) {      
      if (typeof index !== 'number') {
        return 'invalid index'
      }

      if (length === 0) {
        return  'array empty' 
      }

      let countIndex = 0;
      let current = head;

      while(current) {
        if (index === countIndex) {
          return current.value
        }
        countIndex++
        current = current.next
      }
      
      return `no value at index ${index}`;
    },

    find(value) {

      if (length === 0) {
        return  'Empty Node' 
      }

      let countIndex = 0;
      let current = head;

      while(current) {
        if (current.value === value){
          return countIndex;
        }
        countIndex++
        current = current.next
      }

      return `${value} not found!`
    },

    pop() {
      if (!head) {
        return 'Empty Node'
      }

      if (length === 1) {
        const value = tail.value;
        head = null;
        tail = null;
        length = 0;
        return value
      }

      let current = head;

      while (current.next !== tail) {
        current = current.next;
      }

      const popValue = tail.value;

      tail = current;
      tail.next = null;

      length--;

      return popValue;
    },

    contains(value) {
      if (!head) {
        return 'Empty Node'
      }

      let current = head;

      while (current) {
        if (current.value === value){
          return true
        }
        current = current.next
      }

      return false
    },

    toString() {

      if(!head) return 'Empty Node'

      if (length === 1) {
        return `( ${head.value})  -> ( ${head.next} )`
      }

      let current = head;

      let result = '';

      while (current) {

        result += `( ${current.value} ) -> `;

        current.next === null ? result += 'null' : '';

        current = current.next
      }

      return result;
    },

    insertAt(value, index) {

      if(!head) return 'Empty Node'

      if ( index === 0) {
        this.prepend(value);
        return
      }

      if ( index > length) {
        this.append(value)
        return
      }

      const newNode = createNode(value);
      let countIndex = 1;
      let current = head;

      while (current) {
        if ( countIndex === index) {
          newNode.next = current.next,
          current.next = newNode;
          length++
          return; 
        }
        current = current.next;
        countIndex++
      }

    },

    removeAt(index) {

      let current = head;

      if (!current) throw new Error('removeAt: Node is empty');

      if (index > length) throw new Error('Invalid input index');

      if (index === 0) {
        head = current.next;
        
        if (length === 1) {
          head = null;
          tail = null;
        }

        length--;
        return
      }

      let countIndex = 1;

      while(current) {
        if (countIndex === index && current.next !== null) {

          if (current.next === tail) {
            tail = current;
            current.next = null
          }

          current.next = current.next.next;
          current = current.next;

          length--
          return
        } 
        current = current.next
        countIndex++
      }

      return this.pop();
      

    },

    size() {
      return length;
    },

    head() {
      return head ? head.value : null
    },

    tail() {
      return tail ? tail.value : null;
    },

    toArray() {
      const array = [];
      let current = head;

      while(current) {
        array.push(current.value);
        current = current.next;
      }

      return array;
    }
  }
}


const list = createList();

// list.prepend('prepend!');
// list.prepend(5);
list.prepend('Learning javascript!');
list.append(10);
list.append('Hello!');
list.append('bartue!');
list.append('Ayah Mutya!');
list.insertAt('something', 0)
//list.removeAt(0)
// const pop1 = list.pop();
// const pop2 = list.pop();

console.log(list.toString());
console.log('Array:',list.toArray());
console.log('Size:',list.size());
console.log('head Method: ', list.head());
console.log('tail Method: ', list.tail());
console.log('Value at index: ',list.at(5));
console.log('Find method: ', list.find('Hello!'));
// console.log('Pop value:',pop1)
// console.log('Pop value:',pop2)
console.log('Contains method:', list.contains('Hello!'))



