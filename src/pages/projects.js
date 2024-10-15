import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import AnimatedText from '@/components/AnimatedText'
import Project from '@/components/Project'
import FeaturedProject from '@/components/FeaturedProject'
import project1 from "../../public/images/projects/crypto-screener-cover-image.jpg"
import goodNews from "../../public/images/projects/goodNews.png"
import sicily from "../../public/images/projects/SM_Brandbook_2022_page-0001.jpg"
import bh from "../../public/images/projects/Hero.png"
import gnl from "../../public/images/projects/GNL.jpg"
import toffeeBoutique from "../../public/images/projects/toffeeBoutique.png"
import mascoters from "../../public/images/projects/mascoters.png"
import cryptoQuote from "../../public/images/projects/cryptoQuote.png"
import calculator from "../../public/images/projects/calculator.png"
import crmPet from "../../public/images/projects/crmPet.png"
import karma from "../../public/images/projects/PSKarma.png"
import stats from "../../public/images/projects/Stats.png"

import TransitionEffect from '@/components/TransitionEffect'

const projects = () => {
  return (
    <>
        <Head>
            <title>Agustín Trossero | Projects</title>
            <meta name='description' content='This is the Agustin Trossero´s project seccion'/>
        </Head>
        <TransitionEffect/>
        <main className='w-full mb-16 flex flex-col items-center justify-center dark:text-light'>
          <Layout className='pt-16'>
            <AnimatedText text="Imagination Trumps Knowledge!" className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl'/>
            <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
              <div className='col-span-6 sm:col-span-12'>
              <Project
                  type="Featured Project"
                  title="Karma - UX/UI for PlayStation"
                  summary="In this project, we propose to optimize the experience for PlayStation gamers by implementing a voting system based on the concept of “Karma.” This system will allow players to rate each other’s behavior, promoting positivity and discouraging toxic conduct. Our goal is to create a friendlier and more collaborative community where players feel valued and motivated to contribute constructively."
                  img={karma}
                  link="https://www.behance.net/gallery/200975479/PlayStation-Karma"
                  github=""
                  figma="https://www.figma.com/design/ZLUHzCThXRz3BxzvHJN4zM/Karma?node-id=0-1&t=jWM1iXnK6QoVxIeB-1"
                  behance=""
                  showIcons={{ github: false, figma: true, behance: false }}
                />
          
              </div>
              <div className='col-span-6 sm:col-span-12'>
              <Project
                  type="Featured Project"
                  title="Karma - UX/UI Report"
                  summary="In this project, we propose to optimize the experience for PlayStation gamers by implementing a voting system based on the concept of “Karma.” This system will allow players to rate each other’s behavior, promoting positivity and discouraging toxic conduct. Our goal is to create a friendlier and more collaborative community where players feel valued and motivated to contribute constructively."
                  img={stats}
                  link="https://medium.com/@agustintrossero/change-the-game-fd9db29e6ac8"
                  github=""
                  figma="https://www.figma.com/design/ZLUHzCThXRz3BxzvHJN4zM/Karma?node-id=0-1&t=jWM1iXnK6QoVxIeB-1"
                  behance=""
                  showIcons={{ github: false, figma: false, behance: true }}
                />
              </div>
              <div className='col-span-12'>
                <FeaturedProject
                  type="Featured Project"
                  title="Sicily B&B"
                  summary="From the initial concept to the final stages of rebranding the Siciliamia site, which focuses on renting homes, selling self-made Sicilian products, and promoting local tourism, every step reflected thoughtful refinement. Through branding, logo design, UX research, and UI development, a clear vision emerged, enhancing the platform to offer an inviting and seamless experience. This ensures users can effortlessly explore authentic Sicilian products and unique accommodations, enriching their connection with the vibrant culture and natural beauty of Sicily."
                  img={sicily}
                  link="https://www.behance.net/gallery/210122213/Brand-Design-Sicily-B-B"
                  github=""
                  figma="https://www.figma.com/design/6ccZhXqT531pTwP8IrXn20/My-Siciliamia?node-id=355-16887&t=jWM1iXnK6QoVxIeB-1"
                  behance=""
                  showIcons={{ github: false, figma: true, behance: false }}
                />
              </div>
              <div className='col-span-6 sm:col-span-12'>
              <Project
                  type="Featured Project"
                  title="Grotta Northern Lights B&B"
                  summary="In this project, we propose to optimize the experience for PlayStation gamers by implementing a voting system based on the concept of “Karma.” This system will allow players to rate each other’s behavior, promoting positivity and discouraging toxic conduct. Our goal is to create a friendlier and more collaborative community where players feel valued and motivated to contribute constructively."
                  img={gnl}
                  link="https://www.behance.net/gallery/209834605/Grotta-Northern-Lights-Branding"
                  github=""
                  figma="https://www.figma.com/design/0q8YoNMAyYIJBgUIuw5u5b/My-Blue-House?node-id=1-111253&node-type=canvas&t=jWM1iXnK6QoVxIeB-0"
                  behance=""
                  showIcons={{ github: false, figma: true, behance: false }}
                />
              </div>
              <div className='col-span-6 sm:col-span-12'>
              <Project
                  type="Featured Project"
                  title="Blue House B&B"
                  summary="In this project, we propose to optimize the experience for PlayStation gamers by implementing a voting system based on the concept of “Karma.” This system will allow players to rate each other’s behavior, promoting positivity and discouraging toxic conduct. Our goal is to create a friendlier and more collaborative community where players feel valued and motivated to contribute constructively."
                  img={bh}
                  link="https://www.behance.net/gallery/209828671/Blue-House-B-B"
                  github=""
                  figma="https://www.figma.com/design/0q8YoNMAyYIJBgUIuw5u5b/My-Blue-House?node-id=1-2&t=jWM1iXnK6QoVxIeB-1"
                  behance="https://www.behance.net/gallery/209828671/Blue-House-B-B"
                  showIcons={{ github: false, figma: true, behance: false }}
                />
              </div>
              <div className='col-span-12'>
                <FeaturedProject
                  type="Featured Project"
                  title="Good News App"
                  summary="Throughout the entire process of creation, structuring, reasearch, testing, interviews to achieve the final presentation of Good News App, a clear improvement can be seen, iterating, investigating and finding the best path to provide the user with a satisfactory search for positive news so that users can have happier days."
                  img={goodNews}
                  link="https://www.behance.net/gallery/166999259/Good-News-Informe"
                  github=""
                  figma="https://www.figma.com/proto/EgqW1EltvpNFh4XWLA5C2k/Untitled?type=design&node-id=294-5166&t=h410SXnwbRL2kD5L-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=294%3A5103&show-proto-sidebar=1&mode=design"
                  behance=""
                  showIcons={{ github: false, figma:  true, behance: true }}
                />
              </div>
              <div className='col-span-6 sm:col-span-12'>
                <Project
                  type="Featured Project"
                  title="Toffee Boutique, Baby & Mom"
                  summary="Baby & Mom Online shop. We only look for the best products on the market. Nordic-European design, because we have never stopped being cool, and the utmost attention to materials: natural, certified and produced as much as possible from eco-sustainable sources."
                  img={toffeeBoutique}
                  link="https://toffee.boutique/"
                  github="/"
                  showIcons={{ github: false, figma: false }}
                />
              </div>
              <div className='col-span-6 sm:col-span-12'>
              <Project
                  type="Featured Project"
                  title="Calculator Web App"
                  img={calculator}
                  link="https://agustintrossero.github.io/calculator/"
                  github="https://github.com/agustintrossero/calculator"
                  showIcons={{ github: true, figma: false }}
                />
              </div>
              <div className='col-span-12'>
                <FeaturedProject
                    type="Featured Project"
                    title="Mascoters, pet care"
                    summary="Enter the app and see all the MASCOTERS available in your area. Select the date range in which you need the service, see all the MASCOTERS available near you. Look at their complete profile, once you find the person you are looking for send them a request."
                    img={mascoters}
                    link="https://mascoters.com.ar/"
                    github="/"
                  figma=""
                  behance=""
                  showIcons={{ github: false, figma: false, behance: false }}
                  />
              </div>
              <div className='col-span-6 sm:col-span-12'>
                <Project
                  type="Featured Project"
                  title="CRM Pet appointment Web App"
                  img={crmPet}
                  link="https://storied-empanada-a00374.netlify.app/"
                  github="https://github.com/agustintrossero/citas-react-app"
                  showIcons={{ github: true, figma: false }}
                />
              </div>
              <div className='col-span-6 sm:col-span-12'>
                <Project
                  type="Featured Project"
                  title="Crypto Screener Application"
                  img={cryptoQuote}
                  link="https://cotizadorcrypto33.netlify.app/"
                  github="https://github.com/agustintrossero/cotizador-crypto-react"
                  showIcons={{ github: true, figma: false }}
                />
              </div>
            </div>
          </Layout>
        </main>
    </>
  )
}

export default projects;
