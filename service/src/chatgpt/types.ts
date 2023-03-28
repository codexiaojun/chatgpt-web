import type {ChatMessage} from 'chatgpt'

export interface RequestOptions {
  message: string
  gptKey: string
  lastContext?: { conversationId?: string; parentMessageId?: string }
  process?: (chat: ChatMessage) => void
  systemMessage?: string
}
