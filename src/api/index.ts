import type {AxiosProgressEvent, GenericAbortSignal} from 'axios'
import {getLocalState} from '@/store/modules/user/helper'
import {post} from '@/utils/request'
import {useSettingStore} from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  const gptKey = getLocalState().userInfo.gptKey
  return post<T>({
    url: '/chat',
    data: { prompt, gptKey, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    gptKey: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const settingStore = useSettingStore()

  return post<T>({
    url: '/chat-process',
    data: { prompt: params.prompt, key: params.gptKey, options: params.options, systemMessage: settingStore.systemMessage },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}
