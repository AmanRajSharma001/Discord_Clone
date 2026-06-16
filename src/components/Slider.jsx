import {useEffect, useState} from "react"

function Slider({sliderComponent,setSliderComponent,users,setUserData,selectServer,user,setUser}) {
  const [buttonCount,setButtonCount] = useState(0);
  return (
    <div className='slider'>
      <div className="slider-header">
        <div className="convo-header">
          <button>Find or start a conversation</button>
        </div>
      </div>
      <div className="slider-content">
        <div className="convo-filters">
          <button onClick = {()=>{setButtonCount(1),setSliderComponent(1),setUser(null)}} className= {`convo-button ${sliderComponent === 1 ? "active" : ""}`}>
            <svg class="linkButtonIcon__972a0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" class=""></path><path fill="currentColor" d="M3 5v-.75C3 3.56 3.56 3 4.25 3s1.24.56 1.33 1.25C6.12 8.65 9.46 12 13 12h1a8 8 0 0 1 8 8 2 2 0 0 1-2 2 .21.21 0 0 1-.2-.15 7.65 7.65 0 0 0-1.32-2.3c-.15-.2-.42-.06-.39.17l.25 2c.02.15-.1.28-.25.28H9a2 2 0 0 1-2-2v-2.22c0-1.57-.67-3.05-1.53-4.37A15.85 15.85 0 0 1 3 5Z" class=""></path></svg>
            Friends
          </button>
          <button onClick = {()=>{setButtonCount(2),setSliderComponent(2),setUser(null)}} className= {`convo-button ${sliderComponent === 2 ? "active" : ""}`}>
            <svg class="linkButtonIcon__972a0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M1.16 5.02c-.1.28.04.58.29.74l10.27 6.85a.5.5 0 0 0 .56 0l10.27-6.85c.25-.16.38-.46.29-.74A3 3 0 0 0 20 3H4a3 3 0 0 0-2.84 2.02Z" class=""></path><path fill="currentColor" d="M23 8.8a.5.5 0 0 0-.78-.41l-9.53 6.35c-.42.28-.96.28-1.38 0L1.78 8.39A.5.5 0 0 0 1 8.8V18a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V8.8Z" class=""></path></svg>
            Message Requests
          </button>
          <button onClick = {()=>{setButtonCount(3),setSliderComponent(3),setUser(null)}} className= {`convo-button ${sliderComponent === 3 ? "active" : ""}`}>
            <svg class="linkButtonIcon__972a0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M16.23 12c0 1.29-.95 2.25-2.22 2.25A2.18 2.18 0 0 1 11.8 12c0-1.29.95-2.25 2.22-2.25 1.27 0 2.22.96 2.22 2.25ZM23 12c0 5.01-4 9-8.99 9a8.93 8.93 0 0 1-8.75-6.9H3.34l-.9-4.2H5.3c.26-.96.68-1.89 1.21-2.7H1.89L1 3h12.74C19.13 3 23 6.99 23 12Zm-4.26 0c0-2.67-2.1-4.8-4.73-4.8A4.74 4.74 0 0 0 9.28 12c0 2.67 2.1 4.8 4.73 4.8a4.74 4.74 0 0 0 4.73-4.8Z" class=""></path></svg>
            Nitro
          </button>
          <button onClick = {()=>{setButtonCount(4),setSliderComponent(4),setUser(null)}} className= {`convo-button ${sliderComponent === 4 ? "active" : ""}`}>
            <svg class="linkButtonIcon__972a0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2.63 4.19A3 3 0 0 1 5.53 2H7a1 1 0 0 1 1 1v3.98a3.07 3.07 0 0 1-.3 1.35A2.97 2.97 0 0 1 4.98 10c-2 0-3.44-1.9-2.9-3.83l.55-1.98ZM10 2a1 1 0 0 0-1 1v4a3 3 0 0 0 3 3 3 3 0 0 0 3-2.97V3a1 1 0 0 0-1-1h-4ZM17 2a1 1 0 0 0-1 1v3.98a3.65 3.65 0 0 0 0 .05A2.95 2.95 0 0 0 19.02 10c2 0 3.44-1.9 2.9-3.83l-.55-1.98A3 3 0 0 0 18.47 2H17Z" class=""></path><path fill="currentColor" d="M21 11.42V19a3 3 0 0 1-3 3h-2.75a.25.25 0 0 1-.25-.25V16a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v5.75c0 .14-.11.25-.25.25H6a3 3 0 0 1-3-3v-7.58c0-.18.2-.3.37-.24a4.46 4.46 0 0 0 4.94-1.1c.1-.12.3-.12.4 0a4.49 4.49 0 0 0 6.58 0c.1-.12.3-.12.4 0a4.45 4.45 0 0 0 4.94 1.1c.17-.07.37.06.37.24Z" class=""></path></svg>
            Shop
          </button>
          <button onClick = {()=>{setButtonCount(5),setSliderComponent(5),setUser(null)}} className= {`convo-button ${sliderComponent === 5 ? "active" : ""}`}>
            <svg class="linkButtonIcon__972a0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 21.7a8.95 8.95 0 0 1 9 0 1 1 0 0 0 1-1.73c-.6-.35-1.24-.64-1.9-.87.54-.3 1.05-.65 1.52-1.07a3.98 3.98 0 0 0 5.49-1.8.77.77 0 0 0-.24-.95 3.98 3.98 0 0 0-2.02-.76A4 4 0 0 0 23 10.47a.76.76 0 0 0-.71-.71 4.06 4.06 0 0 0-1.6.22 3.99 3.99 0 0 0 .54-5.35.77.77 0 0 0-.95-.24c-.75.36-1.37.95-1.77 1.67V6a4 4 0 0 0-4.9-3.9.77.77 0 0 0-.6.72 4 4 0 0 0 3.7 4.17c.89 1.3 1.3 2.95 1.3 4.51 0 3.66-2.75 6.5-6 6.5s-6-2.84-6-6.5c0-1.56.41-3.21 1.3-4.51A4 4 0 0 0 11 2.82a.77.77 0 0 0-.6-.72 4.01 4.01 0 0 0-4.9 3.96A4.02 4.02 0 0 0 3.73 4.4a.77.77 0 0 0-.95.24 3.98 3.98 0 0 0 .55 5.35 4 4 0 0 0-1.6-.22.76.76 0 0 0-.72.71l-.01.28a4 4 0 0 0 2.65 3.77c-.75.06-1.45.33-2.02.76-.3.22-.4.62-.24.95a4 4 0 0 0 5.49 1.8c.47.42.98.78 1.53 1.07-.67.23-1.3.52-1.91.87a1 1 0 1 0 1 1.73Z" class=""></path></svg>
            Quests
          </button>
        </div>
        <div className="convo-friends">
          <div className="convo-users">
              <h2 className="add-friends"><span>Direct Messages</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
              </svg>
              </h2>
              {users.filter((x)=>x.is_friend || x.has_dm).map((x) => {
                return (
                  <li key={x.id} className={`convo-user ${user == x.id ? "active" : ""}`} onClick={() => { setUser(x.id),setButtonCount(0),setSliderComponent(0)}}>
                    <div className="user-profile">
                      <div className="avatar-wrapper">
                        <img className="w-[40px] h-[40px] rounded-[100%]" src={x.image}/>
                        {
                          x.status === "offline" &&
                          <svg className="status-icon" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8" fill="#111214"/>
                            <circle cx="8" cy="8" r="5.8" fill="#80848e"/>
                          </svg>
                        }
                        {
                          x.status === "online" &&
                          <svg className="status-icon" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8" fill="#111214"/>
                            <circle cx="8" cy="8" r="5.8" fill="#23a559"/>
                          </svg>
                        }
                        {
                          x.status === "dnd" &&
                          <svg className="status-icon" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8" fill="#111214"/>
                            <circle cx="8" cy="8" r="5.8" fill="#f23f43"/>
                            <rect x="4" y="7" width="8" height="2" rx="1" fill="#111214"/>
                          </svg>
                        }
                      </div>
                      <h2>{x.name}</h2>
                    </div>
                  </li>
                )
              })
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
