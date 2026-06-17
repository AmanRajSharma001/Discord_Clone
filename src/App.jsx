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
    ...getRandomActivity()
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
    ...getRandomActivity()
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
    ...getRandomActivity()
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
    ...getRandomActivity()
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
    ...getRandomActivity()
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
    ...getRandomActivity()
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
    ...getRandomActivity()
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
    ...getRandomActivity()
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
    ...getRandomActivity()
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
    ...getRandomActivity()
  }
]

const initialGroups = [
  {
    id: 1000,
    name: "The Boys",
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
  
  return (
    <div className="app">
      <Navbar sliderComponent = {sliderComponent} setSliderComponent = {setSliderComponent}/>
      <div className="mainpart">
        <Sidebar servers = {servers} setServers = {setServers} selectServer = {selectServer} setSelectServer = {setSelectServer} selectedChannel = {selectedChannel} setSelectedChannel = {setSelectedChannel} user = {user} setUser = {setUser}/>
        <div className="content-area">
          {selectServer ? <Channels selectServer = {selectServer} setSelectServer = {setSelectServer} selectedChannel = {selectedChannel} setSelectedChannel = {setSelectedChannel}/> : <Slider sliderComponent = {sliderComponent} setSliderComponent = {setSliderComponent} users = {userData} setUserData = {setUserData} getRandomActivity = {getRandomActivity} selectServer = {selectServer} user = {user} setUser = {setUser} groups = {groups} selectedGroup = {selectedGroup} setSelectedGroup = {setSelectedGroup}/>}
          <Main sliderComponent = {sliderComponent} setSliderComponent = {setSliderComponent} users = {userData} setUserData = {setUserData} getRandomActivity = {getRandomActivity} messageRequests = {messageRequests} setMessageRequests = {setMessageRequests} selectServer = {selectServer} setSelectServer = {setSelectServer} selectedChannel = {selectedChannel} setSelectedChannel = {setSelectedChannel} setServers = {setServers} user = {user} setUser = {setUser} groups = {groups} setGroups = {setGroups} selectedGroup = {selectedGroup} setSelectedGroup = {setSelectedGroup}/>
        </div>
      </div>
      {/* <Player /> */}
    </div>
  )
}
