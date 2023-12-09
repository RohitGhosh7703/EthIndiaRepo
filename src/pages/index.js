import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }

  const sendMessage = (message) => {
    const url = '/api/chat';

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };

    setIsLoading(true);

    axios.post(url, data).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }

  return (
    <div className="container mx-auto max-w-[700px] scroll-none ">
      <div className="flex flex-col h-screen bg-white overflow-y-auto ">
        <div  className="bg-slate-200  px-6">
        <h1 className=" text-slate-700  bg-clip-text text-left py-3 font-bold text-xl">Blockchain chatty</h1>
        </div>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
          {/* {
        chatLog.map((message, index) => (
          <div key={index} className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
            <div className={`${
              message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'
            } rounded-lg p-4 text-white max-w-sm`}>
            {message.message}
            </div>
            </div>
        ))
            } */}
{
  chatLog.map((message, index) => (
    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`${message.type === 'user' ? 'bg-black  text-white' : 'bg-purple-200 text-black' } rounded-lg p-4  max-w-sm whitespace-pre-line`}>
        {message.message}
      </div>
    </div>
  ))
}

            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
              </div>
            }
      </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className=" rounded border   bg-slate-100  fixed bottom-1 w-11/12     md:w-5/12   flex justify-between items-center">  
        <input type="text" className="px-4 py-2 bg-transparent text-black focus:outline-none     w-4/5" placeholder="Type your query..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-black rounded px-4 py-2 text-white font-semibold focus:outline-none transition-colors duration-300">Send</button>
            </div>
        </form>
        </div>
    </div>
  )
}
