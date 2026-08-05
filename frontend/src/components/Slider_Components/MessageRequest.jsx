import { useState,useEffect } from 'react'
import WampusSpam from "../../assets/WampusSpam.png"

function MessageRequest({users,setUserData,getRandomActivity,messageRequests,setMessageRequests}) {
    const [buttonVal,setButton] = useState(1);
    
    function handleIgnoreRequest(id){
        const updatedUsers = messageRequests.filter(
            (x)=>x.id !== id
        )
        setMessageRequests(updatedUsers)
    }
    function handleAcceptDM(id){
        const acceptedUser =messageRequests.find((x)=>x.id === id)
        const updatedUsers =messageRequests.filter((x)=>x.id !== id)
        setMessageRequests(updatedUsers)
        setUserData([...users,
            {...acceptedUser,
                has_dm: true,
                is_mssgreq: false,
                request_type: ""
            }
        ])

    }

    return (
        <div className= 'msg-req-compo'>
            <div className='message-choice'>
                <button className='gap-2'>
                    <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M1.16 5.02c-.1.28.04.58.29.74l10.27 6.85a.5.5 0 0 0 .56 0l10.27-6.85c.25-.16.38-.46.29-.74A3 3 0 0 0 20 3H4a3 3 0 0 0-2.84 2.02Z" class=""></path><path fill="currentColor" d="M23 8.8a.5.5 0 0 0-.78-.41l-9.53 6.35c-.42.28-.96.28-1.38 0L1.78 8.39A.5.5 0 0 0 1 8.8V18a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V8.8Z" class=""></path></svg>
                    Message Requests
                </button>
                <svg className="dot__9293f" aria-hidden="true" role="img" width="5" height="5" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="currentColor"></circle></svg>
                <div className='message-options'>
                    <button className = {`${buttonVal == 1 ? "active" : ""}`} onClick={()=>setButton(1)}>Requests</button>
                    <button className = {`${buttonVal == 2 ? "active" : ""}`} onClick={()=>setButton(2)}>Spam</button>
                </div>
            </div>
            <div className='message-requests-list'>
                {buttonVal == 1 ? (
                    <h1 className='pending-requests-title'>Pending Requests — {messageRequests.filter((x)=>x.is_mssgreq && x.request_type === "received").length}</h1>
                ) : (
                    <div className='spam-empty-state'>
                        <img src={WampusSpam} className='spam-empty-image'/>
                        <p>There are no spam requests. Here's Wumpus for now.</p>
                    </div>
                )}
                {buttonVal == 1 && (
                    messageRequests
                    .filter((x)=>x.is_mssgreq && x.request_type === "received")
                    .map((x)=>{
                        return (
                            <div key={x.id} className='message-request-row'>
                                <div className='message-request-left'>
                                    <img src={x.image} className='message-request-avatar'/>
                                    <div className='message-request-info'>
                                        <div className='message-request-top'>
                                            <h1>{x.name}</h1>
                                            <span>{x.tag}</span>
                                        </div>
                                        <p>{x.status === "online" ? "Online" : x.status === "dnd" ? "Do Not Disturb" : "Offline"}</p>
                                    </div>
                                </div>
                                <div className='message-request-actions'>
                                    <button className='ignore-btn' onClick={()=>handleIgnoreRequest(x.id)}>Ignore</button>
                                    <button className='accept-dm-btn' onClick={()=>handleAcceptDM(x.id)}>Accept DM</button>
                                </div>
                            </div>
                        )
                    })
                )}

            </div>
        </div>
    )
}

export default MessageRequest
