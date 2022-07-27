import React from 'react'
import './footer.css'
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md'


const Footer = () => {
  return (
      <footer>
          <a href='https://www.instagram.com/keepintouch_2022/' className='instagramIcon'><AiFillInstagram size={20}/></a>
          <a href='https://twitter.com/DrawTheLineCo' className='twitterIcon'><AiOutlineTwitter size={20}/></a>
          <a href='mailto:drawthelinecompany@gmail.com' className='emailIcon'><MdEmail size={20}/></a>
      </footer>
  )
}

export default Footer