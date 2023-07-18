import { input } from '@/store/input'

document.addEventListener('click', e => {
  if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return
  if (input.emoticon) {
    input.emoticon = false
  }
  if (input.select) {
    input.select = false
  }
})
