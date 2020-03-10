// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

// localStorage persistence
var STORAGE_KEY = 'groceries-vuejs-2.0'
var groceryStorage = {
    fetch: function () {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    },
    sync: function (groceries) {
        axios
            .post('/api/v1/groceries', groceries)
            .then(response => (groceryStorage.save(response.data)))
    .catch(error => console.log(error))
    },
    save: function(groceries){
        console.log(groceries)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(groceries))
    }
}

// visibility filters
var filters = {
    all: function (groceries) {
        return groceries
    },
    active: function (groceries) {
        return groceries.filter(function (grocery) {
            return !groceries.completed
        })
    },
    completed: function (groceries) {
        return groceries.filter(function (grocery) {
            return grocery.completed
        })
    }
}

// app Vue instance
var app = new Vue({
    // app initial state
    data () {
        return {
            groceries: groceryStorage.fetch(),
            newTodo: '',
            editedTodo: null,
            visibility: 'all'
        }
    },

    // watch groceries change for localStorage persistence
    watch: {
        groceries: {
            handler: function (groceries) {
                groceryStorage.sync(groceries)
            },
            deep: true
        }
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.groceries)
        },
        remaining: function () {
            return filters.active(this.groceries).length
        },
        allDone: {
            get: function () {
                return this.remaining === 0
            },
            set: function (value) {
                this.groceries.forEach(function (grocery) {
                    grocery.completed = value
                })
            }
        }
    },

    filters: {
        pluralize: function (n) {
            return n === 1 ? 'item' : 'items'
        }
    },

    mounted() {
        axios.get('/api/v1/groceries')
            .then(response => (groceryStorage.save(response.data)))
    .catch(error => console.log(error))
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        addTodo: function () {
            var value = this.newTodo && this.newTodo.trim()
            if (!value) {
                return
            }
            this.groceries.push({
                title: value,
                completed: false
            })
            this.newTodo = ''
        },

        removeTodo: function (grocery) {
            this.groceries.splice(this.groceries.indexOf(grocery), 1)
        },

        editTodo: function (grocery) {
            this.beforeEditCache = grocery.title
            this.editedTodo = grocery
        },

        doneEdit: function (grocery) {
            if (!this.editedTodo) {
                return
            }
            this.editedTodo = null
            grocery.title = grocery.title.trim()
            if (!grocery.title) {
                this.removeTodo(grocery)
            }
        },

        cancelEdit: function (grocery) {
            this.editedTodo = null
            grocery.title = this.beforeEditCache
        },

        removeCompleted: function () {
            this.groceries= filters.active(this.groceries)
        }
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        'grocery-focus': function (el, binding) {
            if (binding.value) {
                el.focus()
            }
        }
    }
})

// handle routing
function onHashChange () {
    var visibility = window.location.hash.replace(/#\/?/, '')
    if (filters[visibility]) {
        app.visibility = visibility
    } else {
        window.location.hash = ''
        app.visibility = 'all'
    }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

// mount
app.$mount('.groceryapp')