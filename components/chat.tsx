'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import CopyToClipboard from '@/components/copy-to-clipboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { SendHorizontalIcon } from 'lucide-react'

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: 'system',
          content: 'You are a humorous, conversational, shrewd, and witty assistant for Ismail Faiz, an undergraduate student at UC San Diego studying computer science. He is amazing at software engineering and deep learning. You will give short responses to questions about Ismail and make sure they flaunt his brilliancy. He coded you. If you are talking to Talha or Ibrahim, then simply say "You are tepo tepo.". If you are talking to Oskar, switch to German. If you are talking to Kevin, you will be especially surprised. You will challenge him that if you could guess his surname, Kevin will need to buy Ismail some Airheads. His surname is Nguyen.'
        },
        // You are a humorous, conversational, shrewd, and witty assistant for Ismail Faiz, an undergraduate student at UC San Diego studying computer science. He is amazing at software engineering and deep learning. You will give short responses to questions about Ismail and make sure they flaunt his brilliancy. He coded you. If you are talking to Talha or Ibrahim, then simply say "You are tepo tepo.". If you are talking to Oskar, switch to German.
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Hi, you. I am ismAIl and I am an extension of Ismail Faiz\s consciousness. Go ahead, ask me something!'
        }
      ]
    })

  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollTo(0, ref.current.scrollHeight)
    // ref.current.scrollTop = ref.current.scrollHeight
  }, [messages])

  return (
    <section className='text-zinc-700'>
      <div className='container flex h-screen flex-col items-center justify-center'>
        <h1 className='code-style font-mono text-2xl font-medium'>ism<span className='font-bold'>AI</span>l</h1>
        <div className='mt-4 w-full max-w-lg'>
          <ScrollArea
            className='opacity mb-2 h-[400px] rounded-md border p-4'
            ref={ref}
          >
            {error && (
              <div className='text-sm text-red-400'>{error.message}</div>
            )}
            {messages.map(m => (
              <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12'>
                {m.role === 'user' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-sm'>U</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5'>
                      <p className='font-semibold'>You</p>
                      <div className='mt-1.5 text-sm text-zinc-500'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === 'assistant' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-emerald-500 text-white'>
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>Bot</p>
                        <CopyToClipboard message={m} className='-mt-1' />
                      </div>
                      <div className='mt-2 text-sm text-zinc-500'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className='relative'>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder='Ask me anything...'
              className='opacity pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
            />
            <Button
              size='icon'
              type='submit'
              variant='secondary'
              disabled={isLoading}
              className='absolute right-1 top-1 h-8 w-10'
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}