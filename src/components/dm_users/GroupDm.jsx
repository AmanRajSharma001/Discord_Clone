import { useState,useEffect,useRef } from "react";
import UserProf from "./UserProf";

function GroupDm({ groups, setGroups, selectedGroup,users,setUserData }) {
    const [searchVal,setSearchVal] = useState("")
    const [chatVal,setChatVal] = useState("")
    const messagesEndRef = useRef(null);
    const VITE_HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
    const scrollToBottom = () => {messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
    const groupDat = groups.find(g => g.id === selectedGroup);

    useEffect(() => {scrollToBottom();}, [groupDat.messages]);
        const handleEnterKey = (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                if (chatVal.trim() === "") return;

                const SENDER_ID = 4;
                const userMessage = chatVal;

                const currentGroupId = selectedGroup;
                const currentMembers = groupDat.members;

                const newMessage = {
                    id: Date.now(),
                    content: userMessage,
                    timestamp: new Date().toISOString(),
                    user: {
                        id: SENDER_ID,
                        name: "DeezBoi",
                        tag: "deezboi",
                        image: "https://picsum.photos/seed/deezboi/200",
                    }
                };

                setGroups(prev =>
                    prev.map(g =>
                        g.id === currentGroupId
                            ? { ...g, messages: [...g.messages, newMessage] }
                            : g
                    )
                );
                setChatVal("");

                const eligibleMembers = currentMembers.filter(id => id !== SENDER_ID);
                const shuffled = [...eligibleMembers].sort(() => Math.random() - 0.5);
                const randomCount = Math.min(Math.floor(Math.random() * 3) + 1, shuffled.length);
                const responders = shuffled.slice(0, randomCount);

                responders.forEach((memberId, index) => {
                    const member = users.find(u => u.id === memberId);
                    if (!member) return;

                    setTimeout(async () => {
                        try {
                            const response = await query({
                                messages: [
                                    {
                                        role: "system",
                                        content: `You are ${member.name}, chatting in a Discord group DM. Reply to the message in 3-10 words. Use lowercase, casual Discord slang, and emojis occasionally. Output ONLY your reply — no name prefix, no punctuation outside the reply, reply to the message with something related or similar to it.`
                                    },
                                    {
                                        role: "user",
                                        content: userMessage
                                    }
                                ],
                                model: "Qwen/Qwen2.5-3B-Instruct:featherless-ai",
                            });

                            if (!response?.choices?.[0]?.message?.content) {
                                console.error(`No response for ${member.name}:`, response);
                                return;
                            }

                            const content = response.choices[0].message.content.trim();

                            const aiMessage = {
                                id: crypto.randomUUID(),
                                content,
                                timestamp: new Date().toISOString(),
                                user: {
                                    id: member.id,
                                    name: member.name,
                                    image: member.image
                                }
                            };

                            setGroups(prev =>
                                prev.map(g =>
                                    g.id === currentGroupId
                                        ? { ...g, messages: [...g.messages, aiMessage] }
                                        : g
                                )
                            );

                        } catch (error) {
                            console.error(`AI ERROR for ${member.name}:`, error);
                        }
                    }, 1500 + index * 1500);
                });
            }
        };

        async function query(data) {
            const response = await fetch(
                "https://router.huggingface.co/v1/chat/completions",
                {
                    headers: {
                        Authorization: `Bearer ${VITE_HF_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            return result;
        }

    return (
        <div className='group-dm'>
            <div className='group-dm-navbar'>
                <div className='group-dm-choice'>
                    <h1 className='gap-2'>
                        <img src = {groupDat.image} />
                        {groupDat.name}
                    </h1>
                </div>
                <div className='group-dm-options'>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1 1 0 0 1 1.41 0l9.2 9.2a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.3.13l-9.54-6.72a1 1 0 0 1-.08-1.58l1-1L12 2.8ZM12 21.2a1 1 0 0 1 0 1.41l-.35.35a1 1 0 0 1-1.41 0l-9.2-9.19a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.3-.12l9.54 6.72a1 1 0 0 1 .07 1.58l-1 1 .35.36ZM15.66 16.8a1 1 0 0 1-1.38.28l-8.49-5.66A1 1 0 1 1 6.9 9.76l8.49 5.65a1 1 0 0 1 .27 1.39ZM17.1 14.25a1 1 0 1 0 1.11-1.66L9.73 6.93a1 1 0 0 0-1.11 1.66l8.49 5.66Z" fill="currentColor" class=""></path></svg>

                    </button>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M9.7 2.89c.18-.07.32-.24.37-.43a2 2 0 0 1 3.86 0c.05.2.19.36.38.43A7 7 0 0 1 19 9.5v2.09c0 .12.05.24.13.33l1.1 1.22a3 3 0 0 1 .77 2.01v.28c0 .67-.34 1.29-.95 1.56-1.31.6-4 1.51-8.05 1.51-4.05 0-6.74-.91-8.05-1.5-.61-.28-.95-.9-.95-1.57v-.28a3 3 0 0 1 .77-2l1.1-1.23a.5.5 0 0 0 .13-.33V9.5a7 7 0 0 1 4.7-6.61ZM9.18 19.84A.16.16 0 0 0 9 20a3 3 0 1 0 6 0c0-.1-.09-.17-.18-.16a24.86 24.86 0 0 1-5.64 0Z" class=""></path></svg>

                    </button>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M19.38 11.38a3 3 0 0 0 4.24 0l.03-.03a.5.5 0 0 0 0-.7L13.35.35a.5.5 0 0 0-.7 0l-.03.03a3 3 0 0 0 0 4.24L13 5l-2.92 2.92-3.65-.34a2 2 0 0 0-1.6.58l-.62.63a1 1 0 0 0 0 1.42l9.58 9.58a1 1 0 0 0 1.42 0l.63-.63a2 2 0 0 0 .58-1.6l-.34-3.64L19 11l.38.38ZM9.07 17.07a.5.5 0 0 1-.08.77l-5.15 3.43a.5.5 0 0 1-.63-.06l-.42-.42a.5.5 0 0 1-.06-.63L6.16 15a.5.5 0 0 1 .77-.08l2.14 2.14Z" class=""></path></svg>

                    </button>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5 5 0 0 1 2.14 3.08c.01.06.06.1.12.1ZM18.44 17.27c.15.43.54.73 1 .73h1.06c.83 0 1.5-.67 1.5-1.5a7.5 7.5 0 0 0-6.5-7.43c-.55-.08-.99.38-1.1.92-.06.3-.15.6-.26.87-.23.58-.05 1.3.47 1.63a9.53 9.53 0 0 1 3.83 4.78ZM12.5 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2 20.5a7.5 7.5 0 0 1 15 0c0 .83-.67 1.5-1.5 1.5a.2.2 0 0 1-.2-.16c-.2-.96-.56-1.87-.88-2.54-.1-.23-.42-.15-.42.1v2.1a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2.1c0-.25-.31-.33-.42-.1-.32.67-.67 1.58-.88 2.54a.2.2 0 0 1-.2.16A1.5 1.5 0 0 1 2 20.5Z" class=""></path></svg>

                    </button>
                    <div className= {`group-dm-search`}>
                        <input type = 'text' placeholder={`Search ${groupDat.name}`} value = {searchVal} onChange={(e)=>setSearchVal(e.target.value)}/>
                        <div>
                            <svg class="icon__0c4c4 visible__0c4c4" aria-label="Search" aria-hidden="false" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" clip-rule="evenodd" class=""></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='group-dm-data'>
                <div className="group-main-left">
                    <div className="group-scroll-area">
                        <div className="group-welcome">
                            <div className="group-welcome-icon">
                                <img src = {groupDat.image}/>
                            </div>
                            <h1>{groupDat.name}</h1>
                            <p>{`Welcome to the beginning of the ${groupDat.name} group.`}</p>
                            <div className="group-welcome-additional">
                                <p className="text-[14px]">{groupDat.members.length + 1} Members</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-dot-icon lucide-dot"><circle cx="12.1" cy="12.1" r="1"/></svg>
                                <button>
                                    <svg class="icon_a22cb0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5 5 0 0 1 2.14 3.08c.01.06.06.1.12.1ZM16.62 13.17c-.22.29-.65.37-.92.14-.34-.3-.7-.57-1.09-.82-.52-.33-.7-1.05-.47-1.63.11-.27.2-.57.26-.87.11-.54.55-1 1.1-.92 1.6.2 3.04.92 4.15 1.98.3.27-.25.95-.65.95a3 3 0 0 0-2.38 1.17ZM15.19 15.61c.13.16.02.39-.19.39a3 3 0 0 0-1.52 5.59c.2.12.26.41.02.41h-8a.5.5 0 0 1-.5-.5v-2.1c0-.25-.31-.33-.42-.1-.32.67-.67 1.58-.88 2.54a.2.2 0 0 1-.2.16A1.5 1.5 0 0 1 2 20.5a7.5 7.5 0 0 1 13.19-4.89ZM9.5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 22Z" class=""></path><path fill="currentColor" d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" class=""></path></svg>
                                    Invite to Group DM
                                </button>
                                <button>
                                    <svg class="icon_a22cb0" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" class=""></path></svg>
                                    Edit Group
                                </button>
                            </div>
                        </div>
                        <div className="group-channel-messages">
                            {groupDat.messages.map(msg => (
                                <div key={msg.id} className="group-chat-message">
                                    <img
                                        className="group-chat-avatar"
                                        src={msg.user.image}
                                        alt={msg.user.name}
                                    />
                                    <div className="group-chat-content">
                                        <span className="group-chat-username">
                                            {msg.user.name}
                                        </span>
                                        <p className="group-chat-text">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="group-text-area">
                        <div className="group-text-left">
                            <button>
                                <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 0 0 2 0v-8h8a1 1 0 0 0 0-2h-8V3Z" class="attachButtonPlus__0923f"></path></svg>
                            </button>
                        </div>
                        <div className="group-text-mid">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <textarea rows="1" placeholder={`Message @${groupDat.name}`} value = {chatVal} onChange={(e)=>setChatVal(e.target.value)} onKeyDown={handleEnterKey}/>
                            </form>
                        </div>
                        <div className="group-text-right">
                            <button>🎁</button>
                            <button>GIF</button>
                            <button>😀</button>
                            <button>⚙️</button>
                        </div>
                    </div>
                </div>
                <div className="group-main-right">
                    <UserProf />
                </div>
            </div>
        </div>
  )
}

export default GroupDm
