import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";
import Chatinterface from "@/components/ChatApplication";
import ChartView from "@/components/ChartView";
import PowerloomInter from "@/components/powerloomcomp";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return(
<div style={{ display: 'flex' , }}>
  <div style={{ flex: 1, width: '50%' }}>
    <PowerloomInter/>
  </div>
  <div style={{ flex: 1, width: '50%' , height : '100vh' , overflowY:'scroll'}}>
  <ChartView/> 
  </div>
</div>
    
  )
}
