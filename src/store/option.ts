import { reactive } from 'vue'

export const editor = reactive<{
  visible: boolean
  create: boolean
  option: [{
    text: string
  }, {
    text: string
  }, {
    text: string
  }]
  optionArr: [string, string, string]
  index?: number
  checkbox?: number
  character: string
  text: string
}>({
  visible: false,
  create: false,
  option: [{
    text: ''
  }, {
    text: ''
  }, {
    text: ''
  }],
  optionArr: ['', '', ''],
  index: undefined,
  checkbox: undefined,
  character: '开拓者',
  text: '[对话选项卡]'
})

export const preview = reactive<{
  visible: boolean
  index: number
  option: [string, string, string]
}>({
  visible: false,
  index: 0,
  option: ['', '', '']
})
