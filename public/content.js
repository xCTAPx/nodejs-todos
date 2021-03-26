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
        this.todos = this.todos.filter(t => t.id !== id)
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