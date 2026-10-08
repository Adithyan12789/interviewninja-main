import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser();

  return (
    <>
      <h2 className='text-white'>Interview Generation</h2>

      <Agent userName={user?.name ?? ''} userId={user?.id} userPhoto={user?.photoURL} type="generate"/>
    </>
  )
}

export default page
