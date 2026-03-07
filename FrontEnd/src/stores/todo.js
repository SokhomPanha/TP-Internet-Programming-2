import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
    pendingTodos: (state) => state.todos.filter(t => t.completedAt === null),
    completedTodos: (state) => state.todos.filter(t => t.completedAt !== null),
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:3100/tasks');
        this.todos = response.data;
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },

    async addTodo(todoName) {
      try {
        const newTask = {
          name: todoName,
          description: "Task created from Vue",
          userId: 1 
        };
        
        const response = await axios.post('http://localhost:3100/tasks', newTask);
        this.todos.push(response.data);
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    },

    
    async toggleStatus(id) {
      try {
        const todo = this.todos.find((t) => t.id == id);
        if (!todo) return;

        const isNowCompleted = todo.completedAt === null;
        const completedAtValue = isNowCompleted ? new Date().toISOString() : null;

      
        const endpoint = isNowCompleted ? 'done' : 'pending';
        await axios.patch(`http://localhost:3100/tasks/${id}/${endpoint}`, {
          completedAt: completedAtValue
        });

      
        todo.completedAt = completedAtValue;
      } catch (error) {
        console.error('Failed to update status:', error);
      }
    },

    
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:3100/tasks/${id}`);
        this.todos = this.todos.filter((t) => t.id !== id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    },

    clearAll() {
      this.todos = [];
    },
  },
});