import React from 'react'
import { useRef, useEffect } from 'react'
import { useMotionValue, useSpring, useInView } from 'framer-motion'
import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Head from 'next/head'
import profilePic from '../../public/images/profile/aaa.png'
import Image from 'next/image'
import TransitionEffect from '@/components/TransitionEffect'

const AnimatedNumbers = ({value}) => {
    const ref = useRef(null)
    
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {duration: 3000});
    const isInView = useInView(ref, {once:true});

    useEffect(() => {
      if(isInView){
        motionValue.set(value);
      }
    }, [isInView, value, motionValue ])
    
    useEffect(() => {
        springValue.on("change", (latest) => {
            //console.log(latest)
            if(ref.current && latest.toFixed(0) <= value){
                ref.current.textContent = latest.toFixed(0);
            }
        })
    }, [springValue, value])
    

    return <span ref={ref}></span>
}

const about = () => {
  return (
    <>
      <Head>
        <title>Agustín Trossero | About Page</title>
        <meta name='description' content='This section is about me'/>
      </Head>
      <TransitionEffect/>
      <main className='flex w-full flex-col items-center justify-center mb-8 dark:text-light'>
        <Layout className='pt-16'>
            <AnimatedText text="Passion Fuels Purpose!" className='mb-16 !lg:text-7xl sm:!text-6xl xs:!text-4xl sm:!mb-8'/>
            <div className='grid w-full grid-cols-8 gap-16 sm:gap-8 '>
                <div className='col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8'>
                    <h2 className='mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75'>Biography</h2>
                    <p className='font-medium'>Hi, I´m Agustín, an UX/UI Designer and Frontend Developer with a passion for creating beautiful, functional digital experiences.  With +4 years of experience in the field, I specialize in turning ideas into innovative digital products.</p>
                    <p className='font-medium my-4'>Beyond design and development, I bring a unique perspective as a tattoo artist, musician and  football coach for both women´s and men´s teams. These diverse experiences fuel my creativity, adaptability and leadership skills, enabling me to approach projects with a dynamic mindset.</p>
                    <p className='font-medium'>Whether I´m working on a website, mobile app, digital product, or just learning new tools or dynamic activities I bring commitment and determination on everything that I do. I look forward to the opportunity to bring my skills and passion to your next project.</p>
                </div>
                <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light dark:bg-dark dark:border-light  xl:col-span-4 md:order-1 md:col-span-8'>
                    <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light '/>
                    <Image src={profilePic} alt="profile picture Agustin Trossero" className="w-full h-auto rounded-2xl"
                    priority
                    sizes='(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          33vw' 
                    />
                </div>
                <div className='col-span-2 flex flex-col items-end justify-around xl:col-span-8 xl:flex-row xl:items-center md:order-3'>
                    <div className='flex flex-col items-end justify-center  xl:items-center'>
                        <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl'>
                            <AnimatedNumbers value={20}/>+
                        </span>
                        <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center ms:text-lg sm:text-base xs:text-sm'>Satisfied clients</h2>
                    </div>
                    <div className='flex flex-col items-end justify-center xl:items-center'>
                        <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl'>
                        <AnimatedNumbers value={20}/>+
                        </span>
                        <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center ms:text-lg sm:text-base xs:text-sm'>Projects completed</h2>
                    </div>
                    <div className='flex flex-col items-end justify-center xl:items-center'>
                        <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl'> 
                        <AnimatedNumbers value={4}/>+
                        </span>
                        <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center ms:text-lg sm:text-base xs:text-sm'>Years of experience</h2>
                    </div>
                </div>
            </div>
        <Skills/>
        <Experience/>
        <Education/>
        </Layout>
      </main>
    </>
  )
}

export default about
