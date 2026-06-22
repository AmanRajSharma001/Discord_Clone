import React from 'react'

function UserProf({user,users}) {
    const userDat = users.filter((x)=>x.id == user)[0];
    return (
      <div className='user-profile-data'>
        <div className='user-profile-banner'>
          <div className='user-profile-friend'></div>
          <div className='user-profile-more'>
            <div></div>
          </div>
        </div>
        <div className='user-profie-main'>
          <div className='user-profile-icon'>
            <img src = {userDat.image} alt = {userDat.name} />
          </div>
          <div>
            <h1>{userDat.name}</h1>
            <div>
              <h3>{userDat.tag}</h3>
              <h3>He/Him</h3>
            </div>
          </div>

          <div className='user-profile-info'>
            <div>
              <h2>Bio</h2>
              <p>Its For Me To Know And You To Find Out...</p>
            </div>
            <div>
              <h2>Member Since</h2>
              <p>Aug 31, 2024</p>
            </div>
          </div>
          <div className='user-profile-collection'>
            <h2>Game Collection</h2>
            <div></div>
          </div>
          <div className='user-profile-wishlist'>
            <h2>Wishlist</h2>
            <div></div>
          </div>
          <div className='user-profile-data'>
            <div className='user-servers'>
              <h2>Mutual Servers</h2>
            </div>
            <div className='user-friends'>
              <h2>Mutual Friends</h2>
            </div>
          </div>
        </div>
        <div className='user-full-profile'>
          <h2>View Full Profile</h2>
        </div>
      </div>
    )
  }

export default UserProf
