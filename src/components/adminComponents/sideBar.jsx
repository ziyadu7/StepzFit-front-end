import React, { useState } from 'react';
import {
  Card, List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import {
  PowerIcon
} from "@heroicons/react/24/solid";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../store/slice/admin';
import { TfiAngleDoubleLeft } from 'react-icons/tfi';
import { FaBars } from 'react-icons/fa';



function SideBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)


  return (
    <>
      <div className='lg:w-1/5'>
        {show ?
          <FaBars className="absolute z-50 lg:hidden ms-1 mt-5" onClick={() => setShow(false)} size={20} /> : ''}
        <div className={`${show ? '' : 'fixed w-screen h-screen '} lg:staic lg:w-0 lg:h-0`}>
          <Card style={{ position: 'fixed' }} className={`lg:flex z-auto ${show ? 'hidden' : 'flex w-screen bg-opacity-70 backdrop-blur-[2px]'}  top-4 left-4 h-screen ease-in-out duration-500 w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5`}>
            <div className=''>{show ? "" : <TfiAngleDoubleLeft className="ms-5 lg:hidden mt-5" onClick={() => setShow(true)} size={20} />}</div>

            <List>
              <ListItem className={`hover:scale-105 transition-transform`} onClick={() => navigate('/admin')} >
                Dashboard
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => navigate('/admin/messages')}>
                Messages
              </ListItem>
              
              <ListItem className='hover:scale-105 transition-transform' onClick={() => navigate('/admin/users')}>
                Trainees
              </ListItem>


              <ListItem className='hover:scale-105 transition-transform' onClick={() => {
                navigate('/admin/trainers')
              }} >
                Trainers
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => {
                navigate('/admin/plans')
              }} >
                Plans
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => {
                dispatch(adminLogout())
                navigate('/admin/login')
              }} >
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5 me-2 " />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </List>
          </Card>
        </div>
      </div>
    </>
  )
}

export default SideBar