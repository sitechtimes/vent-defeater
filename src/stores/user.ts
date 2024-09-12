import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    theme: 'light'
  })
})
