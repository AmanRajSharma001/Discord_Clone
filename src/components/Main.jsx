import GroupDm from "./dm_users/GroupDm";
import UsersDm from "./dm_users/UsersDm";
import ServerChannel from "./Server_Components/ServerChannel";
import Friends from "./Slider_Components/Friends"
import MessageRequest from "./Slider_Components/MessageRequest"
import Nitro from "./Slider_Components/Nitro"

function Main({sliderComponent,users,setUserData,getRandomActivity,messageRequests,setMessageRequests,selectServer,setSelectServer,selectedChannel,setSelectedChannel,setServers,user,setUser,setSliderComponent,groups,setGroups,selectedGroup,setSelectedGroup}) {

  return (
    <div className='main'>
        {selectServer ? 
              <ServerChannel server={selectServer} channel={selectedChannel} setSelectServer = {setSelectServer} setSelectedChannel = {setSelectedChannel} setServers = {setServers}/>
        : user ? <UsersDm users = {users} setUserData = {setUserData} user = {user} setUser = {setUser}/>
        : selectedGroup ? <GroupDm groups={groups} setGroups={setGroups} selectedGroup={selectedGroup}/>
        :
        <>
          {sliderComponent == 1 && <Friends users = {users} setUserData = {setUserData} getRandomActivity = {getRandomActivity} user = {user} setUser = {setUser} sliderComponent = {sliderComponent} setSliderComponent = {setSliderComponent}/>}
          {sliderComponent == 2 && <MessageRequest users = {users} setUserData = {setUserData} getRandomActivity = {getRandomActivity} messageRequests = {messageRequests} setMessageRequests = {setMessageRequests}/>}
          {sliderComponent == 3 && <Nitro />}
        </>
        }
    </div>
  )
}

export default Main
