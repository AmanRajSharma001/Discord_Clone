import React, { use } from 'react'
import ActiveUsers from "./ActiveUsers"
import discordLogo from "../../assets/DiscordLogo.png";
import { useState,useEffect } from 'react'
import FriendIcon from "../../assets/Add_Friend.svg"

function Friends({users,setUserData,getRandomActivity,user,setUser,sliderComponent,setSliderComponent}) {
    const [buttonVal,setButton] = useState(1);
    const [searchVal,setSearchVal] = useState("");
    const [filterUser,setFilterUser] = useState(users);
    const [addFriend,setAddFriend] = useState("");
    const [openExtra,setOpenExtra] = useState(null);
    const [openGroup,setOpenGroup] = useState(false);
    
    const [modalSearchVal, setModalSearchVal] = useState("");
    const [selectedFriends, setSelectedFriends] = useState([]);

    const friendsForDM = users.filter((x) => 
        x.is_friend && 
        x.name.toLowerCase().includes(modalSearchVal.toLowerCase())
    );

    const toggleFriendSelection = (id) => {
        setSelectedFriends(prev => {
            if (prev.includes(id)) {
                return prev.filter(x => x !== id);
            } else {
                if (prev.length >= 9) return prev;
                return [...prev, id];
            }
        });
    };

    const handleCloseModal = () => {
        setOpenGroup(false);
        setSelectedFriends([]);
        setModalSearchVal("");
    };

    const handleCreateMessage = () => {
        if (selectedFriends.length > 0) {
            setUser(selectedFriends[0]);
            setSliderComponent(0);
        }
        handleCloseModal();
    };

    useEffect(()=>{
        let val = users.filter((x)=>
            x.name.toLowerCase().includes(searchVal.toLowerCase())
        );
        if (buttonVal == 1){
            val = val.filter(
                (x)=>(x.status == "dnd" || x.status == "online") && (x.is_friend)
            );
        } else if (buttonVal == 2){
            val = val.filter((x)=>
                (x.name.toLowerCase().includes(searchVal.toLowerCase())) && (x.is_friend)
            );
        } else if (buttonVal == 3){
            val = val.filter((x)=> x.is_friend === false)
        }
        setFilterUser(val);

    },[users,searchVal,buttonVal])

    function handleFriendAccept(id){
        const updatedUsers = users.map((x)=>{
            if(x.id === id){
                return {...x,
                    is_friend: true,
                    request_type: ""
                }
            }
            return x
        })
        setUserData(updatedUsers)
    }

    function handleFriendReject(id){
        const updatedUsers = users.filter((x)=>x.id != id)
        setUserData(updatedUsers)
    }

    function addUserData(){
        setUserData([...users,{
            id: Date.now(),
            name:addFriend.charAt(0).toUpperCase() + addFriend.slice(1),
            tag: addFriend,
            image: `https://picsum.photos/seed/${addFriend}/200`,
            status: "online",
            is_friend: false,
            has_dm: false,
            request_type: "sent",
            ...getRandomActivity()
        }])
        setAddFriend("")
    }
    return (
        <div className='friends-bar'>
            <div className='friends-choice'>
                <button className='gap-2'>
                    <svg className="linkButtonIcon__972a0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" class=""></path><path fill="currentColor" d="M3 5v-.75C3 3.56 3.56 3 4.25 3s1.24.56 1.33 1.25C6.12 8.65 9.46 12 13 12h1a8 8 0 0 1 8 8 2 2 0 0 1-2 2 .21.21 0 0 1-.2-.15 7.65 7.65 0 0 0-1.32-2.3c-.15-.2-.42-.06-.39.17l.25 2c.02.15-.1.28-.25.28H9a2 2 0 0 1-2-2v-2.22c0-1.57-.67-3.05-1.53-4.37A15.85 15.85 0 0 1 3 5Z" class=""></path></svg>
                    Friends
                </button>
                <svg className="dot__9293f" aria-hidden="true" role="img" width="5" height="5" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="currentColor"></circle></svg>
                <div className='friend-options'>
                    <button className = {`${buttonVal == 1 ? "active" : ""}`} onClick={()=>setButton(1)}>Online</button>
                    <button className = {`${buttonVal == 2 ? "active" : ""}`} onClick={()=>setButton(2)}>All</button>
                    <button className = {`${buttonVal == 3 ? "active" : ""}`} onClick={()=>setButton(3)}>Pending</button>
                    <button className = {`${buttonVal == 4 ? "active" : ""}`} onClick={()=>setButton(4)}>Add Friend</button>
                </div>
                <button className='dm-button' onClick={()=>setOpenGroup(true)}>
                    <svg x="0" y="0" className="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" fill="currentColor" class=""></path><path d="M20.76 12.57c.4.3 1.23.13 1.24-.37V12a10 10 0 1 0-18.44 5.36c.12.19.1.44-.04.61l-2.07 2.37A1 1 0 0 0 2.2 22h10c.5-.01.67-.84.37-1.24A3 3 0 0 1 15 16h.5a.5.5 0 0 0 .5-.5V15a3 3 0 0 1 4.76-2.43Z" fill="currentColor" class=""></path></svg>
                </button>
            </div>
            <div className='switch-component-friends'>
                <div className= "compo-friends">
                    <div className= {`searchBar ${buttonVal == 4 ? "hidden-compo" : ""}`}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type = 'text' placeholder='Search' value = {searchVal} onChange={(e)=>setSearchVal(e.target.value)}/>
                    </div>
                    <div className="users-online-list">
                        {(buttonVal == 1) ? <h3>Online - {filterUser.length}</h3> : (buttonVal == 2) ? <h3>All Friends - {filterUser.length}</h3> : ""}
                        {(buttonVal == 1 || buttonVal == 2) ?
                            (filterUser.map((x)=>{
                                return (
                                    <li key={x.id} className="online-user-row">
                                        <div className="online-left">
                                            <div className="online-avatar-wrapper">
                                                <img className="online-avatar" src={x.image}/>
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
                                                {
                                                x.status === "offline" &&
                                                <svg className="status-icon" viewBox="0 0 16 16">
                                                    <circle cx="8" cy="8" r="8" fill="#111214"/>
                                                    <circle cx="8" cy="8" r="5.8" fill="#80848e"/>
                                                </svg>
                                                }
                                            </div>
                                            <div className="online-user-info">
                                                <h2>{x.name}</h2>
                                                <p>{x.status === "online" ? "Online" : x.status == "dnd" ? "Do Not Disturb" : "Offline"}</p>
                                            </div>
                                        </div>
                                        <div className="online-actions">
                                            <button className='mssg-btn' onClick={()=>{setUser(x.id),setSliderComponent(0)}}>
                                                <svg className="icon_f8fa06" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22a10 10 0 1 0-8.45-4.64c.13.19.11.44-.04.61l-2.06 2.37A1 1 0 0 0 2.2 22H12Z" class=""></path></svg>
                                            </button>
                                            <div className='extra-options-wrapper'>
                                                <button className='extra-options-btn' onClick = {()=>{setOpenExtra(openExtra === x.id ? null : x.id)}}>
                                                    <svg class="icon_f8fa06" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm2 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" clip-rule="evenodd" class=""></path></svg>
                                                </button>
                                                {
                                                    openExtra === x.id &&
                                                    <div className="user-options-menu">
                                                        <button>Start Video Call</button>
                                                        <button>Start Voice Call</button>
                                                        <button onClick = {()=>handleFriendReject(x.id)} className="remove-friend-btn">Remove Friend</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </li>
                                )
                            })) : (buttonVal === 3) ?  (
                                    <>
                                        {filterUser.filter((x)=>!x.is_friend && x.request_type === "received").length != 0 && <h3>Received - {filterUser.filter((x)=>!x.is_friend && x.request_type === "received").length}</h3>}
                                        {filterUser.filter((x)=> !x.is_friend && x.request_type === "received" ).map((x)=>{
                                                return (
                                                    <li key={x.id} className="online-user-row pending-users">
                                                        <div className="online-left">
                                                            <div className="online-avatar-wrapper">
                                                                <img className="online-avatar" src={x.image}/>
                                                            </div>
                                                            <div className="online-user-info">
                                                                <h2>{x.name}</h2>
                                                                <p>{x.username}</p>
                                                            </div>
                                                        </div>
                                                        <div className="pending-actions">
                                                            <button onClick = {()=>handleFriendAccept(x.id)} className="accept-btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="pending-icon">
                                                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd"/>
                                                                </svg>
                                                            </button>
                                                            <button onClick = {()=>handleFriendReject(x.id)} className="reject-btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="pending-icon">
                                                                    <path fillRule="evenodd"  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </li>
                                                )})
                                        }
                                        {filterUser.filter((x)=>!x.is_friend && x.request_type === "sent").length != 0 && <h3>Sent - {filterUser.filter((x)=>!x.is_friend &&x.request_type === "sent").length}</h3>}
                                        {filterUser.filter((x)=>!x.is_friend && x.request_type === "sent").map((x)=>{
                                                return (
                                                    <li key={x.id} className="online-user-row pending-users">
                                                        <div className="online-left">
                                                            <div className="online-avatar-wrapper">
                                                                <img className="online-avatar" src={x.image}/>
                                                            </div>
                                                            <div className="online-user-info">
                                                                <h2>{x.name}</h2>
                                                                <p>{x.username}</p>
                                                            </div>
                                                        </div>
                                                        <div className="pending-actions">
                                                            <button onClick = {()=>handleFriendReject(x.id)} className="reject-btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="pending-icon">
                                                                    <path fillRule="evenodd"  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </li>
                                                )})
                                        }
                                    </>
                                ) : (
                                    <div className='add-friends-component'>
                                        <div className='add-friends-btn'>
                                            <h1>Add Friend</h1>
                                            <p>You can add friends with their Discord username.</p>
                                            <img src={FriendIcon} alt="Friend_Icon" className='friend-wampus'/>
                                            <div className='friend-input-box'>
                                                <input type="text" placeholder='Enter a username' value={addFriend} onChange={(e)=>setAddFriend(e.target.value)}/>
                                                <button className = {`${addFriend == "" ? "non-active-value" : "active-value"}`} onClick={addUserData} disabled = {!addFriend}>Send Friend Request</button>
                                            </div>
                                        </div>
                                        <div className='other-options-btn'>
                                            <h2>Other Places to Make Friends</h2>
                                            <p>Don't have a username on hand? Check out our list of public servers that includes everything from gaming to cooking, music, anime and more.</p>
                                        </div>
                                        <div className='explore-options-btn'>
                                            <button className="explore-button" aria-label="Explore servers">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm3.985 5.765a.75.75 0 0 0-.825-.158l-5.989 2.395a.75.75 0 0 0-.418.418L6.358 16.41a.75.75 0 0 0 .984.984l5.989-2.395a.75.75 0 0 0 .418-.418l2.395-5.989a.75.75 0 0 0-.159-.825Zm-4.735 5.235a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <p>Explore Discoverable Servers</p>
                                        </div>
                                    </div>
                                    )
                            }
                    </div>
                </div>
                <div className='online-users'>
                    <ActiveUsers users = {users} setUserData = {setUserData} getRandomActivity = {getRandomActivity}/>
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
                            <input type='text' placeholder='Search for friends' value={modalSearchVal} onChange={(e) => setModalSearchVal(e.target.value)}/>
                        </div>
                        <div className='dm-users'>
                            {friendsForDM.length === 0 ? (
                                <div className="dm-no-results">No friends found.</div>
                            ) : (
                                friendsForDM.map((x) => {
                                    const isSelected = selectedFriends.includes(x.id);
                                    return (
                                        <li 
                                            key={x.id} 
                                            className="dm-user-row" 
                                            onClick={() => toggleFriendSelection(x.id)}
                                        >
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
                        <div className='dm-buttons'>
                            <button className="dm-cancel-btn" onClick={handleCloseModal}>
                                Cancel   
                            </button>
                            <button className="dm-create-btn" disabled={selectedFriends.length === 0} onClick={handleCreateMessage}>
                                Create Group Message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Friends
