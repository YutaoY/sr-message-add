import { input } from '@/store/input'
import { editor } from '@/store/option'

export const checkboxDisabled = (index: number) => {
  if (editor.create === true) {
    if (input.character !== '开拓者') {
      return true
    }
  } else {
    if (editor.character !== '开拓者') {
      return true
    }
  }

  if (editor.option[index].text.trim() === '') {
    return true
  }

  if (editor.checkbox === index) {
    return true
  }

  return false
}

export const checkboxIs = (index: number) => {
  if (editor.create === true) {
    if (input.character !== '开拓者') {
      return false
    }
  } else {
    if (editor.character !== '开拓者') {
      return false
    }
  }

  if (editor.option[index].text.trim() === '' && editor.checkbox === index) {
    editor.checkbox = 0
    return false
  }

  if (editor.checkbox === index) {
    return true
  }
}

export const checkboxTitle = (index: number) => {
  if (editor.create === true) {
    if (input.character !== '开拓者') {
      return '当前非开拓者角色状态下'
    }
  } else {
    if (editor.character !== '开拓者') {
      return '此消息不是开拓者所发出'
    }
  }

  if (editor.option[index].text.trim() === '') {
    return '此行选项卡内容为空'
  }

  if (editor.option[index].text.trim() !== '' && editor.checkbox !== index) {
    return '选择此内容为默认消息文本'
  }

  if (editor.checkbox === index) {
    return '已选择为默认消息文本'
  }
}
