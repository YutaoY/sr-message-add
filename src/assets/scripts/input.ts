import { regexText } from '@/store/regex'

document.addEventListener('input', e => {
  const et = (e.target as HTMLInputElement)
  if (et.tagName.toLowerCase() !== 'input') return
  if (et.type === 'text') {
    et.value = regexText(et.value)
  }
})
