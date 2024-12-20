import Head from 'next/head'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../../public/images/profile/profilePic.png'
import lightBulb from '../../public/images/svgs/miscellaneous_icons_1.svg'
import AnimatedText from '@/components/AnimatedText'
import { LinkArrow } from '@/components/Icons'
import HireMe from '@/components/HireMe'
import TransitionEffect from '@/components/TransitionEffect'

//import Container from '@mui/material/Container'

export default function Home() {
  return (
    <>
      <Head>
        <title>Agustín Trossero´s Portfolio</title>
        <meta name="description" content="home" />
        
      </Head>
      <TransitionEffect/>
      <main className='flex items-center text-dark w-full -min-h-screen dark:text-light'>
        <Layout className='pt-0 md:p-16 sm:pt-8'>
          <div className='flex items-center justify-between w-full lg:flex-col'>
            <div className='w-1/2 md:w-full'>
              <Image src={profilePic} alt="Agustin Trossero" className='w-[500px] h-auto lg:hidden md:inline-block md:w-full ml-1'
              priority
              sizes='(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    50vw' 
              />
            </div>
            <div className='w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center'>
              <AnimatedText text="Turning Vision Into Reality With Desing and Code." className='!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl'/>
              <p className='my-4 text-base font-medium md:text-sm sm:text-xs'>As a skilled UX/UI Designer and Frontend developer, I am dedicated to turning ideas into innovative web applications. 
                Beyond design and code, I bring perspective as a tattoo artist, musician, and football coach for both women's and men's teams. This diverse background reflects my creativity, adaptability, and ability to lead in dynamic enviroments.
                <br/>
                <br/>
                Explore my latest projects and illustrations, showcasing the use of tools as React.js, Figma, Framer and web development.
                </p>
                <div className='flex items-center self-start mt-2 lg:self-center'>
                  <Link href="/Agustin.Trossero.UXS.pdf" target={"_blank"} className='flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                   
                   dark:text-dark dark:bg-light dark:hover:bg-dark dark:hover:border-light dark:hover:text-light md:p-2 md:px-4 md:text-base ' download={true}>Resume <LinkArrow className={"w-6 ml-1"}/>
                  </Link>
                  <Link href="mailto:agustintrossero@gmail.com" target={"_blank"}
                  className='ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base'
                  >Contact</Link>
                </div>
            </div>
          </div>
        </Layout>
        <HireMe/>
        <div className='absolute right-8 bottom-8 inline-block w-24 md:hidden'>
          <Image src={lightBulb} alt='light image' className='w-full h-auto'/>
        </div>
      </main>
    </>
  )
}
