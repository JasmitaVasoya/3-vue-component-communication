//props :
//“Props” is a special keyword which stands for properties. It can be registered on a component to pass data from a parent component to one of its children components.
//Props are read-only and cannot be modified by the child component because the parent component "owns" that value.


//How to Validate Props in Vue
props: {
    name: {
      type: String,
      required: true,
      default: 'John Doe'
    },
    img: {
      type: String,
      default: '../image-path/image-name.jpg',
     },
  }

   // Custom validator function
   props: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },




//Static vs. Dynamic Props

// static :
<BlogPost title="My journey with Vue" />

//Dynamically assign the value of a variable :
<BlogPost :title="post.title" />

//  Even though `42` is static, we need v-bind to tell Vue that 
// this is a JavaScript expression rather than a string.       
<BlogPost :likes="42" />



// Including the prop with no value will imply `true`. 
<BlogPost is-published />

// Even though `false` is static, we need v-bind to tell Vue that 
//  this is a JavaScript expression rather than a string.       
<BlogPost :is-published="false" />



//emits :
// $emit() is used to pass information from the child component to the parent.


//child component : 
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>



//parent component :
<MyButton @increase-by="increaseCount" />

methods: {
  increaseCount(n) {
    this.count += n
  }
}

// Declaring Emitted Events:
export default {
  emits: ['click', 'submit']
}


//validate emit :
export default {
  emits: {
    // No validation
    click: null,

    // Validate submit event
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}


// provide-inject : 
// Using the provide and inject pair, parent components can send data to their children components regardless of how deep the component hierarchy is. The parent component has a provide function to supply data, and the child component has an inject function to start using this data.


//provide : 

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    // use function syntax so that we can access `this`
    return {
      message: this.message
    }
  }
}


//inject :

export default {
  inject: ['message'],
  created() {
    console.log(this.message) // injected value
  }
}