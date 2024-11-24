import React from 'react'
import '../Body_components/CSS/Index.css'
import SideBar from '../Body_components/SideBar.js'
import Questions from './MainQue.js'

function Index() {
  return (
    <div className='index'>
        <div className="index-content">
           <SideBar/>
           <Questions/>
        </div>
    </div>
  )
}

export default Index;