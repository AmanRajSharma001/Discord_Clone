import "./App.css"
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Slider from "./components/Slider"
import Sidebar from "./components/Sidebar"
import Wampus from "./assets/Users_Icon/User_Wampus.webp";
import Larry from "./assets/Users_Icon/Larry.webp";
import discordLogo from "./assets/DiscordLogo.png";
import Channels from "./components/Channels.jsx"
import { useState } from "react"
import CreateGroup from "./components/dm_users/CreateGroup"

const activities = [
  {
    activity_type: "Playing",
    activity: "VALORANT",
    activity_time: "2h",
    sub_activity: "Competitive: 9 - 11",
    sub_members: "Party 5/5"
  },
  
  {
    activity_type: "Listening to",
    activity: "Spotify",
    activity_time: "45m",
    sub_activity: "Blinding Lights",
    sub_members: "The Weeknd"
  },
  
  {
    activity_type: "Playing",
    activity: "Minecraft",
    activity_time: "5h",
    sub_activity: "Private Server",
    sub_members: "3 Players"
  },
  
  {
    activity_type: "Watching",
    activity: "YouTube",
    activity_time: "20m",
    sub_activity: "React Tutorial",
    sub_members: "Fireship"
  }
]

function getRandomActivity(){
  return activities[
    Math.floor(
      Math.random() * activities.length
    )
  ]
}

function getUserProfileFields(id) {
  return {
    banner: `https://picsum.photos/seed/banner-${id}/1200/400`,
    pronouns: id % 2 === 0 ? "She/Her" : "He/Him",
    memberSince: "Aug 31, 2024",
    badges: [
      { id: 1, image: `https://picsum.photos/seed/badge1-${id}/32/32` },
      { id: 2, image: `https://picsum.photos/seed/badge2-${id}/32/32` }
    ],
    gameCollection: [
      { id: 1, name: "GTA V", image: `https://picsum.photos/seed/game-gta-${id}/80/80` },
      { id: 2, name: "Hill Climb Racing", image: `https://picsum.photos/seed/game-hill-${id}/80/80` },
      { id: 3, name: "Horizon 5", image: `https://picsum.photos/seed/game-horizon-${id}/80/80` }
    ],
    wishlist: [
      { id: 1, name: "Discord Wings", image: `https://picsum.photos/seed/wish-wings-${id}/120/120` },
      { id: 2, name: "Neon Glow", image: `https://picsum.photos/seed/wish-neon-${id}/120/120` }
    ],
    mutualServers: [],
    mutualFriends: []
  };
}

const users = [
  {
    id: 1,
    name: "Wampus",
    tag: "wampus01",
    image: Wampus,
    status: "offline",
    is_friend: true,
    has_dm: true,
    request_type: "",
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(1)
  },
  {
    id: 2,
    name: "Larry_4291",
    tag: "Larry1432",
    image: Larry,
    status: "dnd",
    is_friend: true,
    has_dm: true,
    request_type: "",
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(2)
  },
  {
    id: 3,
    name: "SOLEXO",
    tag: "solexo52",
    image: discordLogo,
    status: "online",
    is_friend: true,
    has_dm: true,
    request_type: "",
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(3)
  },
  {
    id: 4,
    name: "DeezBoi",
    tag: "deezboi",
    image: `https://picsum.photos/seed/deezboi/200`,
    status: "dnd",
    is_friend: false,
    has_dm: true,
    request_type: "sent",
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(4)
  },
  {
    id: 5,
    name: "Harry#_421",
    tag: "Harry_101",
    image: `https://picsum.photos/seed/Harry_101/200`,
    status: "dnd",
    is_friend: false,
    has_dm: false,
    request_type: "received",
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(5)
  }
]

const messages = [
  {
    id: 101,
    name: "Nova",
    tag: "nova.exe",
    image: `https://picsum.photos/seed/nova/200`,
    status: "online",
    is_friend: false,
    has_dm: false,
    request_type: "received",
    is_mssgreq: true,
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(101)
  },

  {
    id: 102,
    name: "Pixel",
    tag: "pixelwave",
    image: `https://picsum.photos/seed/pixel/200`,
    status: "dnd",
    is_friend: true,
    has_dm: false,
    request_type: "received",
    is_mssgreq: true,
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(102)
  },

  {
    id: 103,
    name: "Miku",
    tag: "miku_star",
    image: `https://picsum.photos/seed/miku/200`,
    status: "online",
    is_friend: true,
    has_dm: false,
    request_type: "sent",
    is_mssgreq: true,
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(103)
  },

  {
    id: 104,
    name: "Blaze",
    tag: "blazeOP",
    image: `https://picsum.photos/seed/blaze/200`,
    status: "offline",
    is_friend: false,
    has_dm: false,
    request_type: "received",
    is_mssgreq: true,
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(104)
  },

  {
    id: 105,
    name: "Zen",
    tag: "zen404",
    image: `https://picsum.photos/seed/zen/200`,
    status: "online",
    is_friend: false,
    has_dm: false,
    request_type: "received",
    is_mssgreq: true,
    messages: [],
    ...getRandomActivity(),
    ...getUserProfileFields(105)
  }
]

const initialGroups = [
  {
    id: 1000,
    name: "Game Night",
    image: "https://picsum.photos/seed/group1/200",

    members: [1, 2, 3, 4],

    messages: [
      {
        id: 1,
        content: "yo guys",
        timestamp: new Date().toISOString(),
        user: {
          id: 1,
          name: "Wampus",
          image: Wampus
        }
      },
      {
        id: 2,
        content: "sup 😭",
        timestamp: new Date().toISOString(),
        user: {
          id: 2,
          name: "Larry_4291",
          image: Larry
        }
      }
    ]
  }
];

export default function App(){
  const [user,setUser] = useState(null)
  const [sliderComponent,setSliderComponent] = useState(1);
  const [userData,setUserData] = useState(users);
  const [messageRequests,setMessageRequests] = useState(messages);
  const [servers,setServers] = useState([]);
  const [selectServer,setSelectServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState({id: "general",name: "general",type: "text",messages: []});
  const [selectedGroup,setSelectedGroup] = useState(null)
  const [groups, setGroups] = useState(initialGroups);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [openGroup, setOpenGroup] = useState(false);
  const [modalSearchVal, setModalSearchVal] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupName, setGroupName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const friendsForDM = userData.filter((x) => 
    x.is_friend && 
    x.name.toLowerCase().includes(modalSearchVal.toLowerCase())
  );

  const handletoggleFriendExit = (id) => {
    setSelectedFriends(prev => {
      return prev.filter((x) => x !== id);
    });
  };

  const toggleFriendSelection = (id) => {
    setSelectedFriends(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      } else {
        if (prev.length >= 9) return prev;
        return [...prev, id];
      }
    });
    setModalSearchVal("");
  };

  const handleCloseModal = () => {
    setOpenGroup(false);
    setSelectedFriends([]);
    setModalSearchVal("");
    setGroupImage(null);
  };

  const handleCreateMessage = () => {
    if (selectedFriends.length === 1) {
      setUser(selectedFriends[0]);
      setSliderComponent(0);
      handleCloseModal();
    } else {
      const finalGroupName = groupName.trim() || selectedFriends.map(id => userData.find(u => u.id === id)?.name).join(", ");        
      const newGroup = {
        id: Date.now(),
        name: finalGroupName,
        image: groupImage ? groupImage : discordLogo,
        members: selectedFriends,
        messages: []
      };

      setGroups(prev => [
        ...prev,
        newGroup
      ]);

      setSelectedGroup(newGroup.id);    
      setSliderComponent(0);
      handleCloseModal();
    }
  };

  return (
    <div className="app">
      <Navbar sliderComponent = {sliderComponent} setSliderComponent = {setSliderComponent}/>
      <div className="mainpart">
        <Sidebar servers = {servers} setServers = {setServers} selectServer = {selectServer} setSelectServer = {setSelectServer} selectedChannel = {selectedChannel} setSelectedChannel = {setSelectedChannel} user = {user} setUser = {setUser}/>
        <div className="content-area">
          {selectServer ? <Channels selectServer = {selectServer} setSelectServer = {setSelectServer} selectedChannel = {selectedChannel} setSelectedChannel = {setSelectedChannel}/> : <Slider sliderComponent = {sliderComponent} setSliderComponent = {setSliderComponent} users = {userData} setUserData = {setUserData} getRandomActivity = {getRandomActivity} selectServer = {selectServer} user = {user} setUser = {setUser} groups = {groups} selectedGroup = {selectedGroup} setSelectedGroup = {setSelectedGroup} setOpenGroup = {setOpenGroup}/>}
          <Main sliderComponent = {sliderComponent} setSliderComponent = {setSliderComponent} users = {userData} setUserData = {setUserData} getRandomActivity = {getRandomActivity} messageRequests = {messageRequests} setMessageRequests = {setMessageRequests} selectServer = {selectServer} setSelectServer = {setSelectServer} selectedChannel = {selectedChannel} setSelectedChannel = {setSelectedChannel} setServers = {setServers} user = {user} setUser = {setUser} groups = {groups} setGroups = {setGroups} selectedGroup = {selectedGroup} setOpenGroup = {setOpenGroup}/>
        </div>
      </div>
      {openGroup && (
        <div className='create-group-dms' onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <div className='dm-data'>
            <div className='dm-heading'>
              <button className="dm-close-btn" onClick={handleCloseModal} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <h1>New Message</h1>
              <p>You can add {9 - selectedFriends.length} more friend{9 - selectedFriends.length === 1 ? "" : "s"}.</p>
              <div className='search-data'>
                {selectedFriends.map((x)=>{
                  const friend = userData.find(u => u.id == x);
                  return (
                    <div key = {x} className='friend-fill'>
                      {friend.tag}
                      <button onClick={()=>handletoggleFriendExit(x)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )
                })}
                <input type='text' placeholder={`${selectedFriends.length>0 ? "" : "Search for friends"}`} value={modalSearchVal} onChange={(e) => setModalSearchVal(e.target.value)}/>
              </div>
            </div>
            <div className='dm-users'>
              {friendsForDM.length === 0 ? (
                <div className="dm-no-results">No results found.</div>
              ) : (
                friendsForDM.map((x) => {
                  const isSelected = selectedFriends.includes(x.id);
                  return (
                    <li key={x.id} className="dm-user-row" onClick={() => toggleFriendSelection(x.id)}>
                      <div className="dm-left">
                        <div className="dm-avatar-wrapper">
                          <img className="dm-avatar" src={x.image} alt={x.name} />
                          {
                            x.status === "online" &&
                            <svg className="status-icon" viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8" fill="#313338"/>
                              <circle cx="8" cy="8" r="5.8" fill="#23a559"/>
                            </svg>
                          }
                          {
                            x.status === "dnd" &&
                            <svg className="status-icon" viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8" fill="#313338"/>
                              <circle cx="8" cy="8" r="5.8" fill="#f23f43"/>
                              <rect x="4" y="7" width="8" height="2" rx="1" fill="#313338"/>
                            </svg>
                          }
                          {
                            x.status === "offline" &&
                            <svg className="status-icon" viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8" fill="#313338"/>
                              <circle cx="8" cy="8" r="5.8" fill="#80848e"/>
                            </svg>
                          }
                        </div>
                        <div className="dm-user-info">
                          <h2>{x.name}</h2>
                          <p>{x.tag}</p>
                        </div>
                      </div>
                      <div className="dm-checkbox-wrapper">
                        <div className={`dm-checkbox ${isSelected ? 'checked' : ''}`}>
                          {isSelected && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </div>
            <div className="dm-buttons-feature">
              <CreateGroup selectedFriends = {selectedFriends} groupImage = {groupImage} handleCloseModal = {handleCloseModal} handleCreateMessage = {handleCreateMessage} handleImageChange = {handleImageChange} groupName = {groupName} setGroupName = {setGroupName} users = {userData}/>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
