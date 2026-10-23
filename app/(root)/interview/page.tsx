import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser();

  return (
    <>
      <h2 className='text-4xl font-bold gradient-text-primary mb-8 animate-slide-up'>Interview Generation</h2>

      <div className="glass-card p-8 bg-gradient-to-br from-white/5 to-white/[0.02] animate-scale-in">
        <Agent userName={user?.name ?? ''} userId={user?.id} userPhoto={user?.photoURL} type="generate"/>
      </div>
    </>
  )
}

export default page
