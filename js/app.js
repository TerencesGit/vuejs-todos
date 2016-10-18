(function(exports) {
    var filters = {
        all: function(todos) {
            return todos;
        },
        active: function(todos) {
            return todos.filter(function(todo) {
                return !todo.completed;
            })
        },
        completed: function(todos) {
            return todos.filter(function(todo) {
                return todo.completed;
            })
        }
    }
    exports.app = new Vue({
        el: '.todoapp',
        data: {
            todos: todoStorage.fetch(),
            newTodo: '',
            editedTodo: null,
            visibility: 'all'
        },
        watch: {
        	todos: {
        		handler: function(todos){
        			todoStorage.save(todos)
        		},
        		deep: true 
        	}
        },
        methods: {
            addTodo: function(todo) {
                var todo = this.newTodo && this.newTodo.trim();
                if (!todo) {
                    return }
                this.todos.push({
                    title: todo,
                    completed: false
                })
                this.newTodo = ""
            },
            removeTodo: function(todo) {
                this.todos.$remove(todo)
            },
            editTodo: function(todo) {
                this.beforeEditCache == todo.title;
                this.editedTodo = todo;
            },
            doneEdit: function(todo) {
                if (!this.editedTodo) {
                    return }
                this.editedTodo = null;
                todo.title = todo.title.trim();
                if (!todo.title) {
                    this.todos.$remove(todo)
                }
            },
            removeCompleted: function() {
                this.todos = filters.active(this.todos)
            }
        },
        computed: {
        		filteredTodos: function(){
        			return filters[this.visibility](this.todos);
        		},
            remaining: function() {
                return filters.active(this.todos).length;
            },
            completed: function(){
            	return filters.completed(this.todos).length;
            },
            allDone: {
                get: function() {
                    return this.remaining === 0
                },
                set: function(value) {
                	console.log(value)
                    this.todos.forEach(function(todo) {
                        todo.completed = value;
                    });
                }
            }
        }
    })
})(window)
