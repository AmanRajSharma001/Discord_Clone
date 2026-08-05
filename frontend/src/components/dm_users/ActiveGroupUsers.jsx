import React from 'react'

function ActiveGroupUsers({ groups, setGroups, selectedGroup,users,setUserData }) {
    const groupDat = groups.find((x)=>x.id == selectedGroup)
    return (
        <div className='active-group-users'>
            <h3>Members - {groupDat.members.length}</h3>
            {users.filter(x =>groupDat.members.includes(x.id)).map((x)=>{
                if (groupDat.members.includes(x.id)){
                    return (
                        <li key={x.id} className={`active-user-row ${x.status === "offline" ? "opaque" : ""}`}>
                            <div className="active-left">
                                <div className="active-avatar-wrapper">
                                <img className="active-avatar" src={x.image} alt={x.name} />
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
                                <div className={`active-user-info`}>
                                    <h2>{x.name}</h2>
                                </div>
                            </div>
                        </li>
                    )}
            })}
        </div>
    )
}

export default ActiveGroupUsers
