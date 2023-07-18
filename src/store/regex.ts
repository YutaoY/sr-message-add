import { reactive } from 'vue'
import { editor } from '@/store/option'

interface RegeArr {
  find: RegExp
  replace: string
}

const regex = reactive<{
  forArr: RegeArr[]
}>({
  forArr: [{
    find: /#NAME#/gi,
    replace: localStorage.getItem('sr-message-name') || '开拓者'
  }, {
    find: /#SEX#/gi,
    replace: localStorage.getItem('sr-message-type') === '星' ? '女' : '男'
  }, {
    find: /#TYPE#/gi,
    replace: localStorage.getItem('sr-message-type') || '开拓者'
  }]
})

export const regexText = (str: string) => {
  let strNew = str
  for (let index = 0; index < regex.forArr.length; index++) {
    strNew = strNew.replace(regex.forArr[index].find, regex.forArr[index].replace)
  }
  return strNew
}

export const regexOption = (str: string, index: number) => {
  if (str.length === 4) {
    if (/===/.test(str) && /[1-3]/.test(str)) {
      const regexNub: unknown = /[1-3]/.exec(str)
      if (regexNub !== null) {
        editor.option[index].text = editor.option[regexNub as number - 1].text
      }
    }
  }
}
