import React from 'react'
import Nav from '../components/Nav'

const Footer = () => {
  return (
      <div className='mt-4 flex flex-col items-center'>
          <hr  className='w-3xl'/>
          <Nav className='flex justify-center items-center gap-6 w-full'>
              <div className='flex gap-1'>
                  <p>All rights reserved</p>
                  <p>&copy; 2025</p>
              </div>
              <div className='flex gap-1 border-l-2 pl-2'>
                  <p><a href="#">Facebook</a></p>
                  <p><a href="#">Facebook</a></p>
                  <p><a href="#">Facebook</a></p>
              </div>
      </Nav>
    </div>
  )
}

export default Footer
