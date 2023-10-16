import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import LiIcon from './LiIcon'


const Details = ({position, company, companyLink, time, address, work}) =>{
    const ref = useRef(null);

    return <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]'>
        <LiIcon reference={ref}/>
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type:"spring"}}
        >
            <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>{position}&nbsp; <a href={companyLink} target="_blank" className='text-primary capitalize dark:text-primaryDark'>@{company}</a></h3>
            <span className='capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm'>
                {time} | {address}
            </span>
            <p className='font-medium w-full md:text-sm'>
                {work}
            </p>
        </motion.div>
    </li>
}

const Experience = () => {
    const ref = useRef(null)
    const {scrollYProgress} = useScroll(
        {
            target: ref,
            offset: ["start end", "center start"]
        }
    )
  return (
    <>
      <div className='my-24'>
         <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16'>Experience</h2>
        <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'>
            <motion.div 
            style={{scaleY: scrollYProgress}}
            className='absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]'/>
            <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2'>
                <Details
                    position="UX/UI Designer - Frontend Developer" company="Digital Tie"
                    companyLink="www.digitaltie.com"
                    time="2021-Present" address="Buenos Aires, Argentina"
                    work="I specialize in branding and UX/UI design, where I create and maintain a strong brand identity while also crafting user-centric, visually appealing designs for web and mobile applications. Additionally, I draw from my expertise in the development and planning of functional web applications, honing my skills in research, prototyping, and ensuring seamless user experiences. My role also involves managing the deployment of web and mobile applications, integrating APIs, and effectively handling database interactions for robust data management within these applications."
                />
                <Details
                    position="Frontend Developer Internship" company="Brainnest"
                    companyLink="www.brainnest.com"
                    time="Apr 2023 - May 2023" address="Bremmen, Germany"
                    work="Gain insights into the inner workings of websites, and learn how to
                    optimize their performance to create high-quality, user-friendly websites."
                />
                <Details
                    position="Fullstack Developer" company="Larraz Store (Ecommerce)"
                    companyLink="www.larrazstore.com"
                    time="2021 - 2023" address="Buenos Aires, Argentina"
                    work="I serve as the team leader in Ecommerce development, focusing on technology products, while concurrently leading an integrator project as part of the Digital House Argentina framework."
                />
                <Details
                    position="Account Manager" company="Adminar Financial Cooperative"
                    companyLink="www.adminar.com"
                    time="2015 - 2021" address="Buenos Aires, Argentina"
                    work="My role involves investment analysis and delivering high-quality customer service. I conduct investment assessments to aid clients in making informed financial decisions and prioritize providing exceptional service to address inquiries and maintain strong member relationships, contributing to our cooperative's mission."
                />
            </ul>
        </div>
      </div>
    </>
  )
}

export default Experience
