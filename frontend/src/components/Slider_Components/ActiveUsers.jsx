import React from 'react'

function ActiveUsers({users,setUserData,getRandomActivity}) {
  return (
    <div className='active-people'>
      <h2>Active Now</h2>
      {users.filter((x)=>(x.status === 'dnd' || x.status === 'online') && (x.is_friend)).map((x)=>{
        return (
        <div key={x.id} className='active-list-online'>
            <div className='active-user-top'>
                <img src={x.image} className='active-user-avatar'/>
                <div className='active-user-info'>
                    <h1>{x.name}</h1>
                    <p> {x.activity_type} {x.activity} {"  "} {x.activity_time}</p>
                </div>
            </div>
            <div className='active-user-bottom'>
                <h3>{x.sub_activity}</h3>
                <p>{x.sub_members}</p>
            </div>
        </div>
        )
      })}
    </div>
  )
}

export default ActiveUsers
