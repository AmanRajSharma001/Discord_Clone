function UserProf({user,users}) {
    const userDat = users.find(x => x.id === user);
    if (!userDat) return null;
    return (
      <div className='user-profile-data'>
        <div className='user-profile-banner' style={{ backgroundImage: `url(${userDat.banner})` }}>
          <div className='user-profile-avatar-wrapper'>
            <img className='user-profile-avatar' src={userDat.image} alt={userDat.name} />
            <div className={`user-profile-status ${userDat.status}`}></div>
          </div>
        </div>
        
        <div className='user-profile-scroll-container'>
          <div className='user-profile-info'>
            <h1 className='user-profile-name'>{userDat.name}</h1>
            <div className='user-profile-meta-row'>
              <span className='user-profile-tag'>{userDat.tag}</span>
              {userDat.pronouns && (
                <>
                  <span className='user-profile-dot-divider'>•</span>
                  <span className='user-profile-pronouns-label'>{userDat.pronouns}</span>
                </>
              )}
            </div>
            {userDat.badges && userDat.badges.length > 0 && (
              <div className='user-profile-badges-row'>
                {userDat.badges.map(badge => (
                  <img key={badge.id} src={badge.image} className='user-profile-badge-icon' alt="Badge" />
                ))}
              </div>
            )}
          </div>

          <div className='user-profile-card-divider'></div>

          <div className='user-profile-member-since'>
            <span className='user-profile-section-header'>Member Since</span>
            <span className='user-profile-date'>{userDat.memberSince}</span>
          </div>

          {userDat.gameCollection && userDat.gameCollection.length > 0 && (
            <div className='user-profile-games'>
              <span className='user-profile-section-header'>Game Collection</span>
              <div className='user-profile-games-list'>
                {userDat.gameCollection.slice(0, 3).map(game => (
                  <div key={game.id} className='user-profile-game-wrapper' title={game.name}>
                    <img src={game.image} className='user-profile-game-image' alt={game.name} />
                  </div>
                ))}
                {userDat.gameCollection.length > 3 && (
                  <div className='user-profile-game-more'>
                    +{userDat.gameCollection.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}

          {userDat.wishlist && userDat.wishlist.length > 0 && (
            <div className='user-profile-wishlist'>
              <span className='user-profile-section-header'>Wishlist</span>
              <div className='user-profile-wishlist-list'>
                {userDat.wishlist.map(item => (
                  <div key={item.id} className='user-profile-wishlist-card'>
                    <img src={item.image} className='user-profile-wishlist-image' alt={item.name} />
                    <span className='user-profile-wishlist-name'>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='user-profile-mutuals'>
            <div className='user-profile-mutual-row'>
              <span>Mutual Servers — {userDat.mutualServers ? userDat.mutualServers.length : 0}</span>
              <svg className='user-profile-arrow' width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
            <div className='user-profile-mutual-row'>
              <span>Mutual Friends — {userDat.mutualFriends ? userDat.mutualFriends.length : 0}</span>
              <svg className='user-profile-arrow' width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>

        <div className='user-profile-footer'>
          <button className='user-profile-footer-btn'>View Full Profile</button>
        </div>
      </div>
    )
}

export default UserProf
