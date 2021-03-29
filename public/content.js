new Vue({
    el: '#app',
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created() {
      fetch('api/todo', {
        method: 'get'
      })
      .then(res => res.json())
      .then(data => {
        if(data.length) this.todos = data
      })
      .catch(e => console.error(e))
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }

        fetch('/api/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({title})
        })
        .then(res => res.json())
        .then(res => {
          this.todos.push({
            title: res.title,
            id: res.id,
            done: res.done,
            date: res.date
          })

          this.todoTitle = ''
        })
        .catch(e => console.error(e))
      },
      removeTodo(id) {
        fetch('/api/todo/' + id, { method: 'delete' })
        .then(res => res.json())
        .catch(e => console.log(e))
        this.todos = this.todos.filter(t => t.id !== id)
      },
      completeTodo(id) {
        fetch('api/todo/' + id, { method: 'put' })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value) {
        return new Intl.DateTimeFormat('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }).format(new Date(value))
      }
    }
  })