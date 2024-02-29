import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import LiIcon from './LiIcon'


const Details = ({type, time, place, info}) =>{
    const ref = useRef(null);

    return <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]'>
        <LiIcon reference={ref}/>
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type:"spring"}}
        >
            <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>{type}</h3>
            <span className='capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm'>
                {time} | {place}
            </span>
            <p className='font-medium w-full md:text-sm'>
                {info}
            </p>
        </motion.div>
    </li>
}

const Education = () => {
    const ref = useRef(null)
    const {scrollYProgress} = useScroll(
        {
            target: ref,
            offset: ["start end", "center start"]
        }
    )
  return (
    <>
      <div className='mt-24 mb-64'>
         <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16'>Education</h2>
        <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'>
            <motion.div 
            style={{scaleY: scrollYProgress}}
            className='absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]'/>
            <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2'>
                <Details
                    type="Google UX Design Certification"
                    time="Sep 2023 - Feb 2024" place="Google & Coursera"
                    info="Those who earn the Google UX Design Professional Certificate have
                    completed seven courses, developed by Google, that include handson, practice-based assessments and are designed to prepare them for
                    introductory-level roles in UX design. They can complete the design
                    process from beginning to end: empathizing with users, defining their
                    pain points, coming up with ideas for design solutions, creating
                    wireframes and prototypes, and testing designs to get feedback."
                />
                <Details
                    type="Figma & Adobe XD Course"
                    time="Feb 2024 - Present" place="Coderhouse"
                    info="This course delves deep into the myriad possibilities offered by Figma for web prototyping and Adobe XD for mobile applications. Students will gain comprehensive knowledge of how to utilize these tools effectively to create prototypes that meet the specific requirements of web and mobile projects."
                />
                <Details
                    type="Advanced UX/UI Design Course"
                    time="Feb 2024 - Present" place="Coderhouse"
                    info="This advanced UX/UI Design course covers advanced principles and techniques in UX and UI design, including prototyping, user research, and interaction design, preparing students to tackle complex design challenges effectively."
                />
                <Details
                    type="ReactJS Course"
                    time="Jun 2023 - Aug 2023" place="Coderhouse"
                    info="Completed coursework in advanced topics such as utilizing JavaScript (JS) with ES6, programming by components, breaking down complex applications into reusable elements. Data flow management, Firebase, routing in single-page applications (SPAs). React JS, virtual DOM, learn to create highly responsive and efficient user interfaces.  Develop your own SPAs to provide a seamless and user-friendly experience."
                />
                <Details
                    type="ReactJS / Redux Online Coursework"
                    time="2022-2023" place="Coursera And EdX"
                    info="In this React course, I learned to create React projects, integrate the MERN stack (MongoDB, Express, Node.js), manage application state with useReducer and useContext, develop projects with Next.js for server-side rendering, deploy applications on Netlify, Heroku, and Vercel, consume APIs using Fetch API and Axios, enhance state management with Redux and Hooks, and use Styled Components for styling, along with Context for global state management in React applications."
                />
                <Details
                    type="UX/UI Design Course"
                    time="Nov 2022 - Mar 2023" place="Coderhouse"
                    info="Bring an idea to life, do research, and investigate a problem and turn it into an app or website idea. Design and create a mobile first app or website prototype.
                    Capture your idea by defining its main functionalities (MVP) and definition of a target audience or user, for the development of the prototype with Figma and Framer."
                />
                <Details
                    type="Fullstack  Developer Course"
                    time="2021 - 2022" place="Digital House"
                    info="Completed coursework in advanced topics such as skills and languages necessary to start your path in Front End and Back End.
                    Front End, focused on the visual, aesthetic and interaction part.
                    Back End, aimed at the logic to connect databases and create the various functionalities that a site may need."
                />
                <Details
                    type="Degree in Musical Composition"
                    time="2010 - 2013" place="Pontificia Universidad Católica Argentina (UCA)"
                    info="Solid training in technical subjects where the theoretical foundations and characteristics of the language that corresponds to Western music are studied, from its origins to the present. Realization of original compositions, orchestrations, adaptations and arrangements that correspond to the theoretical foundations and characteristics of the musical languages studied."
                />
                <Details
                    type="Degree in Advertising"
                    time="2005 - 2009" place="Universidad de Ciencias Empresariales y Sociales (UCES)"
                    info="Capable of producing strategies and business models in the field of advertising, institutional, political and digital communication. Trained in holistic, creative and innovative thinking, with a comprehensive communication approach and solid knowledge in market research."
                />
            </ul>
        </div>
      </div>
    </>
  )
}

export default Education
