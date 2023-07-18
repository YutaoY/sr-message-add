<template>
  <div class="editor" v-show="editor.visible">
    <div class="option">
      <div class="close" @click="closeOptionBox"></div>
      <div class="content">
        <div class="background">
          <div class="three">
            <div><span> {{ editor.create ? '创建' : '修改' }} 对话选项框</span></div>
            <div v-for=" (       iten, index       ) in        editor.option       " :key="index">
              <div class="list">
                <input type="text" class="input" v-model="editor.option[index].text"
                  :placeholder="'填写 对话选项卡-' + (index + 1)" maxlength="10" @input="updateOptionText($event, index)" />
                <input type="checkbox" :disabled="checkboxDisabled(index)" :checked="checkboxIs(index)"
                  @click.stop="checkboxUpdateClick($event, index)" :title="checkboxTitle(index)" />
              </div>
            </div>
            <div class="menu">
              <div class="btn" v-if="editor.create" @click.stop="handelOptionClick">
                <div class="icon">
                  <svg t="1688366029165" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4002" width="60" height="60">
                    <path
                      d="M910.7 302.7L408.4 805c-23.1 23.1-60.6 23.1-83.7 0l-41.9-41.9L826.9 219c23.1-23.1 60.6-23.1 83.7 0 23.2 23.1 23.2 60.6 0.1 83.7z"
                      p-id="4003" fill="#707070"></path>
                    <path
                      d="M324.6 805L115.3 595.7c-23.1-23.1-23.1-60.6 0-83.7s60.6-23.1 83.7 0l251.2 251.2-41.8 41.8c-23.2 23.1-60.6 23.1-83.8 0z"
                      p-id="4004" fill="#707070"></path>
                  </svg>
                </div>
                <span>完成</span>
              </div>
              <div class="btn" @click.stop="closeOptionBox">
                <div class="icon">
                  <svg t="1688366770237" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4854" width="60" height="60">
                    <path
                      d="M343.2 196.6v93.6c-85.5 53.7-142.3 147.4-142.3 254.1 0 166.7 138.6 301.9 309.5 301.9 171 0 309.5-135.2 309.5-301.9 0-105.3-55.3-198.1-139.1-252.1v-95.6c133.1 61.7 225.1 194 225.1 347.2 0 212.3-176.4 384.3-393.9 384.3s-393.9-172-393.9-384.3c0-153.2 92-285.5 225.1-347.2zM512 98.2c31.1 0 56.3 25.2 56.3 56.3v281.4c0 31.1-25.2 56.3-56.3 56.3-31.1 0-56.3-25.2-56.3-56.3V154.4c0-31.1 25.2-56.2 56.3-56.2z"
                      p-id="4855" fill="#707070"></path>
                  </svg>
                </div>
                <span>关闭</span>
              </div>
              <div class="btn" @click.stop="deletOptionText">
                <div class="icon">
                  <svg t="1688366591194" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4702" width="60" height="60">
                    <path
                      d="M258.4 332.8c-99.6 140.1-66.8 334.4 73.2 434 108 76.8 252.8 76.8 360.8 0l-434-434z m73.2-73.3l434 434c99.6-140.1 66.9-334.4-73.2-434-108-76.8-252.8-76.8-360.8 0zM512 928.1c-229.2 0-414.9-185.8-414.9-414.9s185.7-415 414.9-415 414.9 185.8 414.9 415S741.2 928.1 512 928.1z"
                      p-id="4703" fill="#707070"></path>
                  </svg>
                </div>
                <span>全部清空</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { input } from '@/store/input'
import { editor } from '@/store/option'
import { message } from '@/store/message'
import { setting } from '@/store/setting'
import { computed } from 'vue'
import { regexOption } from '@/store/regex'
import { checkboxDisabled, checkboxTitle, checkboxIs } from '@/store/chekbox'

const messageIndex = computed(() => {
  if (setting.index) {
    return message.list.findIndex(item => {
      return item.id === setting.index
    })
  } else {
    return -1
  }
})

const closeOptionBox = () => {
  editor.visible = false
  if (editor.index !== undefined && editor.create === false) {
    const key = editor.index as number

    let optionLength = 0
    for (let index = 0; index < editor.option.length; index++) {
      const ot = editor.option[index]
      editor.optionArr[index] = ot.text
      if (ot.text.trim() !== '') {
        optionLength = optionLength + 1
      }
    }
    if (optionLength === 0) {
      editor.optionArr[0] = '愿此行，终抵群星'

      if (editor.character === '开拓者') {
        message.list[messageIndex.value].list[key].chekbox = 0
      }

      message.list[messageIndex.value].list[key].option = editor.optionArr
      message.list[messageIndex.value].time = Date.now()
    }
  }
  editor.index = undefined
}

const updateOptionText = (e: Event, index: number) => {
  regexOption((e.target as HTMLInputElement).value, index)
  if (editor.create === false && editor.index !== undefined) {
    const key = editor.index as number
    editor.optionArr[index] = (e.target as HTMLInputElement).value
    message.list[messageIndex.value].list[key].option = editor.optionArr

    if (editor.character === '开拓者') {
      if (editor.option[editor.checkbox as number].text.trim() === '') {
        for (let index = 0; index < editor.option.length; index++) {
          const ot = editor.option[index]
          editor.optionArr[index] = ot.text
          if (ot.text.trim() !== '') {
            message.list[messageIndex.value].list[key].chekbox = index
            message.list[messageIndex.value].time = Date.now()
          }
        }
      }
    }
  }
}

const checkboxUpdateClick = (e: Event, index: number) => {
  console.log((e.target as HTMLInputElement).checked)
  editor.checkbox = index

  if (editor.create === false) {
    message.list[messageIndex.value].list[editor.index as number].chekbox = index
    message.list[messageIndex.value].list[editor.index as number].text = editor.optionArr[index]
  }
}

const deletOptionText = () => {
  editor.option = [{
    text: ''
  }, {
    text: ''
  }, {
    text: ''
  }]
}

const emit = defineEmits<{(event: 'option'): void}>()

const handelOptionClick = () => {
  let optionLength = 0
  for (let index = 0; index < editor.option.length; index++) {
    const ot = editor.option[index]
    editor.optionArr[index] = ot.text
    if (ot.text.trim() !== '') {
      optionLength = optionLength + 1
    }
  }
  if (optionLength === 0) {
    editor.optionArr[0] = '愿此行，终抵群星'
  }
  editor.visible = false
  deletOptionText()
  if (input.character === '开拓者') {
    if (!editor.checkbox) {
      editor.checkbox = 0
    }
    editor.text = editor.optionArr[editor.checkbox]
  } else {
    editor.checkbox = undefined
    editor.text = '[对话选项卡]'
  }
  emit('option')
}

</script>

<style lang="stylus" scoped>
@import '../Message.styl'
</style>
