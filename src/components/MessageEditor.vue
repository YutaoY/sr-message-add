<template>
  <template v-if="setting.index">
    <div class="message-editor">
      <div class="box">
        <div class="circle">
          <div></div>
        </div>
        <div class="header">
          <div class="title" contenteditable @input="updateTitle($event)">
            {{ title }}
          </div>
          <div class="info">{{ info }}</div>
        </div>
        <div class="message-list" ref="messageListDom">
          <draggable v-model="message.list[messageIndex].list"
            :item-key="(item: any) => 'message' + message.list[messageIndex].list.indexOf(item)">
            <template #item="{ element, index }: { element: Message, index: number }">
              <div v-if=" element.notice " class="notice">
                <img src="@/assets/images/通知.png" alt="" />
                <span contenteditable @input="updateText($event, index)">
                  {{ element.text }}
                </span>
                <div>
                  <div @click="handelDelClick(index)">×</div>
                </div>
              </div>
              <div v-else class="message" :class=" { right: element.key === '开拓者',} ">
                <transition name="avatar" appear>
                  <div class="avatar" @click.stop="handelAvatarClick(index)">
                    <img :src=" getUserAvatar(element.key, element.avatar) " alt="" />
                  </div>
                </transition>
                <div class="message-item">
                  <transition name="message" appear>
                    <div class="name">
                      <span>
                        {{
                        element.key === "开拓者" ? setting.name : element.name
                        }}
                      </span>
                      <div class="del" @click="handelDelClick(index)">×</div>
                    </div>
                  </transition>
                  <transition name="message" appear>
                    <div class="img" v-if=" element.img " :style=" { width: element.emoticon ? '320px' : '' } ">
                      <img :src=" element.img " alt="" @click.stop="handelImageClick(index)" />
                    </div>
                    <div class="option" v-else-if=" element.option " @click.stop="showOptionText(index)">
                      <div class="title">对话选项卡</div>
                      <div class="list" v-for="(        item, index        ) in         element.option        "
                        :key=" index ">
                        {{ index + 1 }}、{{ item === ''?'(空)':item }}&nbsp;&nbsp;{{ index === element.chekbox?'>(默认回复)':''
                        }}
                      </div>
                    </div>
                    <div class="text" v-else contenteditable @input="updateText($event, index)">
                      {{ element.text }}
                    </div>
                  </transition>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div class="bottom">
          <div class="btn" @click.stop=" handelSelectClick " title="选择角色">
            <img :src=" getUserAvatar(input.character, getAvatar(input.character)) " alt="" />
          </div>
          <input type="text" class="input" v-model=" input.input " @keydown.enter="handelAddClick()" />
          <div class="btn" @click=" optionVisibleClick() " title="添加选项卡">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3373" width="55"
              height="55">
              <path
                d="M332.9024 203.6736h602.8288c26.4192 0 47.8208-21.2992 47.8208-47.8208v-71.68c0-26.4192-21.2992-47.8208-47.8208-47.8208H332.9024c-26.4192 0-47.8208 21.2992-47.8208 47.8208v71.68c0 26.5216 21.2992 47.8208 47.8208 47.8208zM940.544 428.3392H337.6128c-26.4192 0-47.8208 21.2992-47.8208 47.8208v71.68c0 26.4192 21.2992 47.8208 47.8208 47.8208h602.8288c26.4192 0 47.8208-21.2992 47.8208-47.8208v-71.68c0.1024-26.4192-21.4016-47.8208-47.7184-47.8208zM940.544 820.3264H337.6128c-26.4192 0-47.8208 21.2992-47.8208 47.8208v71.68c0 26.4192 21.2992 47.8208 47.8208 47.8208h602.8288c26.4192 0 47.8208-21.2992 47.8208-47.8208v-71.68c0.1024-26.5216-21.4016-47.8208-47.7184-47.8208zM155.2384 36.4544h-71.68C57.1392 36.4544 35.84 57.7536 35.84 84.1728v71.68c0 26.4192 21.2992 47.8208 47.8208 47.8208h71.68c26.4192 0 47.8208-21.2992 47.8208-47.8208v-71.68c0-26.4192-21.504-47.7184-47.9232-47.7184zM155.2384 428.3392h-71.68C57.1392 428.3392 35.84 449.7408 35.84 476.16v71.68c0 26.4192 21.2992 47.8208 47.8208 47.8208h71.68c26.4192 0 47.8208-21.2992 47.8208-47.8208v-71.68c0-26.4192-21.504-47.8208-47.9232-47.8208z m-9.5232 109.9776H93.0816v-52.6336h52.6336v52.6336zM155.2384 820.3264h-71.68c-26.4192 0-47.8208 21.2992-47.8208 47.8208v71.68c0 26.4192 21.2992 47.8208 47.8208 47.8208h71.68c26.4192 0 47.8208-21.2992 47.8208-47.8208v-71.68c0.1024-26.5216-21.4016-47.8208-47.8208-47.8208z m-9.5232 109.9776H93.0816v-52.6336h52.6336v52.6336z"
                p-id="3165" fill="#575B66"></path>
            </svg>
          </div>
          <div class="btn" @click=" handelImageAddClick " title="发送图片">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3373" width="80"
              height="80">
              <path
                d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z"
                fill="#575B66"></path>
              <path
                d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"
                fill="#575B66"></path>
            </svg>
          </div>
          <div class="btn" title="发送表情" @click.stop=" handelEmoticonClick ">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
              <path
                d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 960C265 960 64 759 64 512S265 64 512 64s448 201 448 448-201 448-448 448z"
                fill="#575B66"></path>
              <path d="M320 405.3m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#575B66"></path>
              <path d="M704 405.3m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#575B66"></path>
              <path d="M512 810.7c117.8 0 213.3-95.5 213.3-213.3H298.7c0 117.8 95.5 213.3 213.3 213.3z" fill="#575B66">
              </path>
            </svg>
          </div>
          <div class="btn" @click=" handelNoticeClick " title="发送通知">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
              <path
                d="M889.828994 749.637494c-1.204099-1.548127-119.205779-166.165631-119.205779-287.435579 0-168.401814-76.202251-254.752898-162.725349-286.919536L607.897867 159.973123c0-52.980346-43.175542-95.983874-95.983874-95.983874S415.930119 107.164791 415.930119 159.973123l0 16.685369c-10.836889 7.912649-16.169326 21.845792-11.868974 35.262893 5.332437 16.857383 23.393919 25.974131 40.251302 20.641693 17.717453-5.676466 36.983034-8.428691 56.936671-8.428691l21.32975 0c115.249454 0 184.055098 89.103309 184.055098 238.239543 0 108.024861 72.933983 235.315303 110.261045 293.456073-57.452713 26.146145-183.023014 76.202251-304.809004 76.202251-121.441962 0-247.356291-50.400134-304.809004-76.546279 37.327062-57.968755 110.089031-184.915169 110.089031-293.112044 0-62.441122 11.524945-114.217369 34.574836-153.952629 8.77272-15.309256 3.612296-34.918864-11.69696-43.691584-15.48127-8.944734-34.918864-3.612296-43.691584 11.69696-28.554342 49.540064-43.175542 112.1532-43.175542 185.947253 0 121.269948-118.00168 285.199395-119.205779 286.919536-5.332437 7.568621-7.396607 16.857383-5.332437 25.974131 2.064169 8.944734 7.912649 16.685369 15.997312 20.985721 5.676466 3.096254 107.336805 57.280699 233.423148 84.458928 21.32975 66.397447 73.966068 111.29313 133.654964 111.29313s112.325214-44.895683 133.654964-111.29313c126.086343-27.178229 227.746682-81.018646 233.423148-83.942886 8.084663-4.472367 13.933143-12.040988 16.169326-20.985721C897.225601 766.666891 895.333445 757.206115 889.828994 749.637494zM501.249118 159.973123c-7.224593 0-14.277171 1.032085-21.32975 1.548127L479.919368 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625 17.545439 0 31.994625 14.449185 31.994625 31.994625l0 0.860071c-7.224593-0.516042-14.277171-0.860071-21.32975-0.860071L501.249118 159.973123zM511.913993 928.016126c-22.361834 0-43.175542-13.417101-57.968755-35.262893 19.26558 2.064169 38.531161 3.268268 57.968755 3.268268s38.875189-1.376113 57.968755-3.268268C555.089535 914.599026 534.275827 928.016126 511.913993 928.016126z"
                fill="#575B66"></path>
            </svg>
          </div>
          <div class="btn" @click="handelAddClick()" title="发送消息">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
              <path
                d="M950.784 73.187556H73.130667C32.796444 73.187556 0 113.237333 0 162.503111v551.367111c0 49.265778 32.796444 89.344 73.130667 89.344h280.433777l158.350223 147.598222 158.350222-147.598222h280.462222c40.362667 0 73.130667-40.049778 73.130667-89.344V162.503111c0.056889-49.265778-32.711111-89.315556-73.073778-89.315555z m24.348444 640.711111c0 18.346667-10.865778 33.223111-24.348444 33.223111H658.232889v0.568889l-0.341333-0.398223-145.948445 135.992889-145.948444-135.992889-0.341334 0.398223v-0.568889H73.130667c-13.454222 0-24.376889-14.876444-24.376889-33.223111V162.503111c0-18.289778 10.951111-33.166222 24.376889-33.166222h877.624889c13.511111 0 24.348444 14.876444 24.348444 33.166222v551.395556z"
                fill="#575B66"></path>
              <path
                d="M781.368889 304.298667H242.488889c-14.876444 0-26.936889 12.544-26.936889 28.017777 0 15.502222 12.060444 28.103111 26.936889 28.103112H781.368889c14.933333 0 27.022222-12.572444 27.022222-28.103112 0-15.473778-12.088889-28.017778-27.022222-28.017777zM511.971556 535.921778H242.488889c-14.876444 0-26.936889 12.572444-26.936889 28.074666s12.060444 28.046222 26.936889 28.046223h269.454222c14.876444 0 26.936889-12.544 26.936889-28.046223s-12.032-28.074667-26.908444-28.074666z"
                fill="#575B66"></path>
            </svg>
          </div>
        </div>
        <Option @option=" addOptionClick " />
      </div>
      <Emoticon @emoticon=" addEmoticon " />
    </div>
    <div class="menu"></div>
  </template>
  <template v-else>
    <div class="defalut-wrapper">
      <img src="@/assets/images/列车.png" alt="" draggable="false" />
      <span>{{ message.list.length > 0 ? "请选择联系人" : "暂无短信" }}</span>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { getAvatar } from '@/assets/scripts/avatar'
import { input } from '@/store/input'
import { editor } from '@/store/option'
import { message } from '@/store/message'
import { setting } from '@/store/setting'
import draggable from '@marshallswain/vuedraggable'
import { computed, ref, watch } from 'vue'
import { scrollToBottom, useMessage } from './Message'
import Emoticon from './MessageEditor/Emoticon.vue'
import Option from './MessageEditor/Option.vue'

const messageListDom = ref<HTMLElement | null>(null)

const messageIndex = computed(() => {
  if (setting.index) {
    return message.list.findIndex(item => {
      return item.id === setting.index
    })
  } else {
    return -1
  }
})

watch(messageIndex, () => {
  if (messageIndex.value === -1) {
    setting.index = undefined
  }
  scrollToBottom(messageListDom, true)
})

const { title, info, getUserAvatar } = useMessage(messageIndex)

const updateTitle = (e: Event) => {
  message.list[messageIndex.value].title = (e.target as HTMLInputElement).innerText
}

const updateText = (e: Event, key: number) => {
  message.list[messageIndex.value].list[key].text = (e.target as HTMLInputElement).innerText
  message.list[messageIndex.value].time = Date.now()
}

const handelDelClick = (key: number) => {
  message.list[messageIndex.value].list.splice(key, 1)
  message.list[messageIndex.value].time = Date.now()
}

const handelSelectClick = () => {
  input.select = true
}

const handelImageClick = (key: number) => {
  const el = document.createElement('input')
  el.type = 'file'
  el.accept = 'image/*'
  el.onchange = () => {
    if (el.files?.[0]) {
      const file = new FileReader()
      file.readAsDataURL(el.files[0])
      file.onload = e => {
        delete message.list[messageIndex.value].list[key].emoticon
        message.list[messageIndex.value].list[key].img = e.target?.result as string
        message.list[messageIndex.value].time = Date.now()
      }
    }
  }
  el.click()
}

const handelAvatarClick = (key: number) => {
  input.index = [messageIndex.value, key]
  input.select = true
}

const handelImageAddClick = () => {
  const el = document.createElement('input')
  el.type = 'file'
  el.accept = 'image/*'
  el.onchange = () => {
    if (el.files?.[0]) {
      const file = new FileReader()
      file.readAsDataURL(el.files[0])
      file.onload = e => {
        message.list[messageIndex.value].list.push({
          key: input.character,
          name: input.character,
          avatar: getAvatar(input.character),
          text: '',
          img: e.target?.result as string
        })
        message.list[messageIndex.value].time = Date.now()
        scrollToBottom(messageListDom)
      }
    }
  }
  el.click()
}

const handelEmoticonClick = () => {
  input.emoticon = !input.emoticon
}

const addEmoticon = (url: string, name: string) => {
  message.list[messageIndex.value].list.push({
    key: input.character,
    name: input.character,
    avatar: getAvatar(input.character),
    text: '',
    img: url,
    emoticon: name
  })
  message.list[messageIndex.value].time = Date.now()
  input.emoticon = false
  scrollToBottom(messageListDom)
}

const handelNoticeClick = () => {
  message.list[messageIndex.value].list.push({
    key: '开拓者',
    name: '',
    avatar: '',
    text: input.input || '愿此行，终抵群星',
    notice: true
  })
  message.list[messageIndex.value].time = Date.now()
  input.input = ''
  scrollToBottom(messageListDom)
}

const handelAddClick = (img?: string) => {
  message.list[messageIndex.value].list.push({
    key: input.character,
    name: input.character,
    avatar: getAvatar(input.character),
    text: input.input || '愿此行，终抵群星',
    img
  })
  message.list[messageIndex.value].time = Date.now()
  input.input = ''
  scrollToBottom(messageListDom)
}

const showOptionText = (key: number) => {
  const item = message.list[messageIndex.value].list[key]
  editor.index = key
  editor.character = item.key
  editor.create = false
  editor.visible = true
  editor.checkbox = item.chekbox
  editor.optionArr = item.option as [string, string, string]
  for (let index = 0; index < editor.option.length; index++) {
    editor.option[index].text = editor.optionArr[index]
  }
}

const addOptionClick = () => {
  message.list[messageIndex.value].list.push({
    key: input.character,
    name: input.character,
    avatar: getAvatar(input.character),
    text: editor.text,
    option: editor.optionArr,
    chekbox: editor.checkbox
  })
  message.list[messageIndex.value].time = Date.now()
  editor.optionArr = ['', '', '']
  scrollToBottom(messageListDom)
}

const optionVisibleClick = () => {
  editor.option = [{
    text: ''
  }, {
    text: ''
  }, {
    text: ''
  }]
  editor.optionArr = ['', '', '']
  editor.checkbox = undefined
  if (input.character === '开拓者') {
    editor.checkbox = 0
  }
  editor.create = true
  editor.visible = true
}

</script>

<style lang="stylus" scoped>
@import './Message.styl'

$width = 2100px

.defalut-wrapper
  display flex
  flex-direction column
  align-items center
  justify-content center
  position absolute
  top 180px
  left 1000px
  width $width
  height 1200px
  background rgba(255, 255, 255, 0.1)
  message()
  box-shadow unset

  span
    color #b0aba5
    user-select none
    font-size 40px
    margin 100px 0 200px 0

.message-editor
  position absolute
  top 180px
  left 1000px
  width $width
  height 1200px
  message()

  .bottom
    display flex
    align-items center
    box-sizing border-box
    width $width
    height 150px
    border-top 5px solid #b3b3b3
    background #c7c8ca
    padding 0 10px

    .btn
      display flex
      align-items center
      justify-content center
      width 100px
      height 100px
      margin 0 10px
      cursor pointer
      border-radius 5px
      background #e8e8e8
      user-select none

      img
        width 100%

    .input
      flex 1
      height 100px
      margin 0 10px
      background #e8e8e8
      font-size 50px
      text-align center
      color #121212
      border none
      outline none
      box-shadow 5px 5px 15px #aaa
      border-radius 5px
</style>
