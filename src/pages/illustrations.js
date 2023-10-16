import React, { useRef } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import AnimatedText from '@/components/AnimatedText'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue } from 'framer-motion'
import lotas1 from "../../public/images/articles/1.jpg"
import lotas2 from "../../public/images/articles/5.jpg"
import tom1 from "../../public/images/articles/2.jpg"
import tom2 from "../../public/images/articles/3.jpg"
import tom3 from "../../public/images/articles/4.jpg"
import tom4 from "../../public/images/articles/isabella.png"
import logoAlan from "../../public/images/articles/6.jpg"
import logoCabis from "../../public/images/articles/adfsgvafdssv.png"
import lobito from "../../public/images/articles/lobito.png"
import logoPelican from "../../public/images/articles/sdvsdv.png"
import logoM from "../../public/images/articles/sdf.png"
import logoBigatti from "../../public/images/articles/sfvafvafsv.png"
import rural from "../../public/images/articles/rural.png"
import digital1 from "../../public/images/articles/11.jpg"
import bottleship from "../../public/images/articles/bottleship.png"
import beluga from "../../public/images/articles/beluga.png"
import shades from "../../public/images/articles/shades.png"
import zara from "../../public/images/articles/zara.png"
import sticker1 from "../../public/images/articles/12.jpg"
import sticker2 from "../../public/images/articles/13.jpg"
import sticker3 from "../../public/images/articles/Ilustración_sin_título.jpg"
import sticker4 from "../../public/images/articles/14.jpg"
import sticker5 from "../../public/images/articles/15.jpg"
import TransitionEffect from '@/components/TransitionEffect'

const FramerImage = motion(Image)

// const MovingImg = ({title, img, link}) => {

//     const x = useMotionValue(0);
//     const y = useMotionValue(0);
//     const imgRef = useRef(null)

//     function handleMouse(event){
//       imgRef.current.style.display = "inline-block";
//       x.set(event.pagex);
//       y.set(-10);
//     }

//     function handleMouseLeave(event){
//       imgRef.current.style.display = "none";
//       x.set(0);
//       y.set(0);
//     }

//   return(
//     <Link href={link} target="_blank"
//       onMouseMove={handleMouse}
//       onMouseLeave={handleMouseLeave}
//     >
//       <h2 className='capitalize text-xl font-semibold hover:underline'>{title}</h2>
//       <FramerImage 
//       style={{x:x, y:y}}
//       initial={{opacity: 0}}
//       whileInView={{opacity: 1, transition:{duration: 0.2}}}
//       ref={imgRef} src={img} alt={title} className='z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden'/> //
//     </Link>
//   )
// }

// const Article = ({img, title, date, link}) => {
//   return(
//     <motion.li 
//     initial={{y:200}}
//     whileInView={{y:0, transition:{duration:0.5, ease:"easeInOut"} }}
//     viewport={{once: true}}
//     className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light sm:flex-col'>
//       <MovingImg title={title} img={img} link={link}/>
//       <span className='text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 xs:text-sm'>{date}</span>
//     </motion.li>
//   )
// }

const FeaturedArticle = ({img, title, time, summary, link}) => {
  return(
    <motion.li 
    initial={{y:200}}
        whileInView={{y:0, transition:{duration:0.5, ease:"easeInOut"} }}
        viewport={{once: true}}
    className='relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl mb-4 dark:bg-dark dark:border-light'>
      <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]'/>
      <Link href={link} target='_blank' className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'>
        <FramerImage src={img} alt={title} className='w-full h-auto'
        whileHover={{scale:1.05}}
        transition={{duration:0.2}}
        priority
        sizes='(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    50vw' 
        />
      </Link>
      <Link href={link} target='_blank' className=''>
        <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg'>{title}</h2>
      </Link>
      <p className='text-sm mb-2'>{summary}</p>
      <span className='text-primary font-semibold dark:text-primaryDark'>{time}</span>
    </motion.li>
  )
}

const articles = () => {
  return (
    <>
      <Head>
        <title>Agustín Trossero | Illustration Page</title>
        <meta name='description' content='This section is Illustrations and digital art'/>
      </Head>
      <TransitionEffect/>
      <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light'>
        <Layout className='pt-16'>
            <AnimatedText text="Do more of what makes you happy!" className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl'/>
            <ul className='grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16 '>
              <FeaturedArticle
                title="Sonrisa - Felipe Videla"
                summary="Digital cover artwork for Felipe Videla´s music record"
                time="Procreate"
                link="https://open.spotify.com/intl-es/track/0K2GjUAk9z2b2nrqNPctsc"
                img={lotas1}
              />
                <FeaturedArticle
                title="Confía - Felipe Videla"
                summary="Digital cover artwork for Felipe Videla´s music record"
                time="Procreate"
                link="https://open.spotify.com/intl-es/track/7xvQHeosNH2Uy2NJaRMIM1"
                img={lotas2}
              />
                <FeaturedArticle
                title="Por Vos - Tom Huergo"
                summary="Digital cover artwork for Tom Huergo´s music record"
                time="Illustrator, Photoshop"
                link="https://open.spotify.com/intl-es/album/08HBtdPWOSHRPML9K2P1IK"
                img={tom1}
              />
                <FeaturedArticle
                title="Tiempo - Tom Huergo"
                summary="Digital cover artwork for Tom Huergo´s music record"
                time="Figma, Illustrator"
                link="https://open.spotify.com/intl-es/album/5fb2mB88BK0BzjnOlA6iRl"
                img={tom2}
              />
                <FeaturedArticle
                title="Mutantes Cuerpos - Tom Huergo"
                summary="Digital cover artwork for Tom Huergo´s music record"
                time="Illustrator, Photoshop"
                link="https://open.spotify.com/intl-es/album/0XEBFyuPC7g5Gue3dtLLOY"
                img={tom3}
              />
                <FeaturedArticle
                title="Isabella - Tom Huergo"
                summary="Digital cover artwork for Tom Huergo´s music record"
                time="Illustrator, Photoshop"
                link="https://open.spotify.com/intl-es/album/5QQ4LO6mzHj42MbyejxHoF"
                img={tom4}
              />
                <FeaturedArticle
                title="Rural House"
                summary="Flyer Invitation for Marriage Ceremony"
                time="Procreate"
                link="https://www.instagram.com/dro_illustration/"
                img={rural}
              />
                <FeaturedArticle
                title="Las Cabis"
                summary="Logo desing for Kids shop"
                time="Figma, Illustrator"
                link="https://www.instagram.com/lascabis/"
                img={logoCabis}
              />
                <FeaturedArticle
                title="El Buen Lobito"
                summary="Logo design for instagram ecommerce page"
                time="Figma, Illustrator"
                link="https://www.instagram.com/dro_illustration/"
                img={lobito}
              />
                <FeaturedArticle
                title="Alan Sarmiento Tattoo Artist"
                summary="Logo design for tattoo artist"
                time="Figma"
                link="https://www.instagram.com/dro_illustration/"
                img={logoAlan}
              />
                <FeaturedArticle
                title="Alfredo Bigatti"
                summary="Logo and brand design for Polo Player Alfredo Bigatti`s Website"
                time="Figma, Illustrator, React"
                link="https://www.alfredobigatti.com/"
                img={logoBigatti}
              />
                <FeaturedArticle
                title="Macadamia"
                summary="Logo Design for Macadamia Nuts ecommerce website"
                time="Illustrator"
                link="https://www.instagram.com/dro_illustration/"
                img={logoM}
              />
                <FeaturedArticle
                title="Shades Contest"
                summary="Influencer post"
                time="Illustrator"
                link="https://www.instagram.com/dro_illustration/"
                img={shades}
              />
                <FeaturedArticle
                title="Zara Contest"
                summary="Influencer post"
                time="Illustrator"
                link="https://www.instagram.com/dro_illustration/"
                img={zara}
              />
                <FeaturedArticle
                title="Pelicano Surfer"
                summary="Logo design for clothes brand based in Baja California, Mexico"
                time="Illustrator, Photoshop"
                link="https://www.instagram.com/dro_illustration/"
                img={logoPelican}
              />
                <FeaturedArticle
                title="Cardo"
                summary=""
                time="Procreate"
                link="https://www.instagram.com/agustrossero_tattoo/"
                img={sticker2}
              />
                <FeaturedArticle
                title="Pitbull Warrior"
                summary=""
                time="Procreate"
                link="https://www.instagram.com/agustrossero_tattoo/"
                img={sticker1}
              />
                <FeaturedArticle
                title="Medusa"
                summary=""
                time="Procreate"
                link="https://www.instagram.com/agustrossero_tattoo/"
                img={sticker3}
              />
                <FeaturedArticle
                title="Music Famili Business"
                summary=""
                time="Procreate"
                link="https://www.instagram.com/agustrossero_tattoo/"
                img={sticker4}
              />
                <FeaturedArticle
                title="Lighthouse"
                summary=""
                time="Procreate"
                link="https://www.instagram.com/agustrossero_tattoo/"
                img={sticker5}
              />
                <FeaturedArticle
                title="Tatto Flower"
                summary=""
                time="Procreate"
                link="https://www.instagram.com/agustrossero_tattoo/"
                img={digital1}
              />
                <FeaturedArticle
                title="Bottleship"
                summary=""
                time="Procreate"
                link="https://www.instagram.com/agustrossero_tattoo/"
                img={bottleship}
              />
                <FeaturedArticle
                title="Beluga Rock"
                summary=""
                time="Procreate"
                link="https://www.instagram.com/agustrossero_tattoo/"
                img={beluga}
              />
            </ul>
            {/* <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>All Articles</h2>
            <ul>
              <Article
                title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                date="October 02, 2023"
                link="/"
                img={article3} 
              />
              <Article
                title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                date="October 02, 2023"
                link="/"
                img={article3}
              />
              <Article
                title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                date="October 02, 2023"
                link="/"
                img={article3}
              />
              <Article
                title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                date="October 02, 2023"
                link="/"
                img={article3}
              />
              <Article
                title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                date="October 02, 2023"
                link="/"
                img={article3}
              />
              <Article
                title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                date="October 02, 2023"
                link="/"
                img={article3}
              />
              <Article
                title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                date="October 02, 2023"
                link="/"
                img={article3}
              />
            </ul> */}
        </Layout>
      </main>
    </>
  )
}

export default articles
