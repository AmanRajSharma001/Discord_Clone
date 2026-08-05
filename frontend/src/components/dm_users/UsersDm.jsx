import { useState, useEffect, useRef } from "react"
import UserProf from "./UserProf";

function UsersDm({users,setUserData,user,setUser}) {
    const [searchVal,setSearchVal] = useState("")
    const [chatVal,setChatVal] = useState("")
    const messagesEndRef = useRef(null);
    const VITE_HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }
    const userDat = users.filter((x)=>x.id == user)[0];
    useEffect(() => {scrollToBottom();}, [userDat.messages]);
        const handleEnterKey = (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                if (chatVal.trim() === "") return;

                const userMessage = chatVal;
                const newMessage = {
                    id: Date.now(),
                    content: userMessage,
                    timestamp: new Date().toISOString(),
                    user: {
                        id: 4,
                        name: "DeezBoi",
                        tag: "deezboi",
                        image: "https://picsum.photos/seed/deezboi/200",
                    }
                };

                setUserData(prev =>
                    prev.map(u =>
                        u.id === user
                            ? {
                                ...u,
                                messages: [...u.messages, newMessage]
                            }
                            : u
                    )
                );
                setChatVal("");
                setTimeout(async () => {
                    try {
                        const response = await query({
                            messages: [
                                {
                                role: "system",
                                content: `
                                    You are ${userDat.name}.

                                    Identity:
                                    - Real Discord user.
                                    - Chats with friends online daily.

                                    Rules:
                                    - Reply like a Discord user.
                                    - Maximum 1 sentence, unless asked for.
                                    - Use lowercase naturally.
                                    - Never act like customer support.
                                    - Never act like a teacher.
                                    - Never act like an assistant.
                                    - Never offer help unless asked.
                                    - Never explain things unless asked.
                                    - Never write lists.
                                    - Never write paragraphs.
                                    - Never mention being an AI.
                                    - Never speak out your thoughts
                                    - Never act like AI or act like serving people.

                                    Examples:

                                    User: hii
                                    Reply: yoo what's up

                                    User: sup
                                    Reply: not much bro 😭

                                    User: how are you
                                    Reply: pretty good tbh

                                    User: lol
                                    Reply: 💀

                                    User: gn
                                    Reply: gn bro

                                    Output only the reply message.
                                    Respond to the message directly
                                `
                                },
                                {
                                    role: "user",
                                    content: userMessage
                                }
                            ],
                            model: "Qwen/Qwen2.5-3B-Instruct:featherless-ai",
                        });

                        if (!response?.choices) {
                            console.error("Invalid response:", response);
                            return;
                        }
                        const aiReply = response.choices[0].message.content;
                        const aiMessage = {
                            id: Date.now() + 1,
                            content: aiReply,
                            timestamp: new Date().toISOString(),
                            user: userDat
                        };

                        setUserData(prev =>
                            prev.map(u =>
                                u.id === user
                                    ? {
                                        ...u,
                                        messages: [...u.messages, aiMessage]
                                    }
                                    : u
                            )
                        );

                    } catch (error) {
                        console.error("AI ERROR:", error);
                    }
                }, 2000);
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
        <div className='user-dm'>
            <div className='user-dm-navbar'>
                <div className='user-dm-choice'>
                    <h1 className='gap-2'>
                        <img src = {userDat.image} />
                        {userDat.name}
                    </h1>
                </div>
                <div className='user-dm-options'>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2 7.4A5.4 5.4 0 0 1 7.4 2c.36 0 .7.22.83.55l1.93 4.64a1 1 0 0 1-.43 1.25L7 10a8.52 8.52 0 0 0 7 7l1.12-2.24a1 1 0 0 1 1.19-.51l5.06 1.56c.38.11.63.46.63.85C22 19.6 19.6 22 16.66 22h-.37C8.39 22 2 15.6 2 7.71V7.4ZM13 3a1 1 0 0 1 1-1 8 8 0 0 1 8 8 1 1 0 1 1-2 0 6 6 0 0 0-6-6 1 1 0 0 1-1-1Z" class=""></path><path fill="currentColor" d="M13 7a1 1 0 0 1 1-1 4 4 0 0 1 4 4 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1-1-1Z" class=""></path></svg>
                    </button>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-2.12a1 1 0 0 0 .55.9l3 1.5a1 1 0 0 0 1.45-.9V7.62a1 1 0 0 0-1.45-.9l-3 1.5a1 1 0 0 0-.55.9V7a3 3 0 0 0-3-3H4Z" class=""></path></svg>
                    </button>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M19.38 11.38a3 3 0 0 0 4.24 0l.03-.03a.5.5 0 0 0 0-.7L13.35.35a.5.5 0 0 0-.7 0l-.03.03a3 3 0 0 0 0 4.24L13 5l-2.92 2.92-3.65-.34a2 2 0 0 0-1.6.58l-.62.63a1 1 0 0 0 0 1.42l9.58 9.58a1 1 0 0 0 1.42 0l.63-.63a2 2 0 0 0 .58-1.6l-.34-3.64L19 11l.38.38ZM9.07 17.07a.5.5 0 0 1-.08.77l-5.15 3.43a.5.5 0 0 1-.63-.06l-.42-.42a.5.5 0 0 1-.06-.63L6.16 15a.5.5 0 0 1 .77-.08l2.14 2.14Z" class=""></path></svg>
                    </button>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5 5 0 0 1 2.14 3.08c.01.06.06.1.12.1ZM16.62 13.17c-.22.29-.65.37-.92.14-.34-.3-.7-.57-1.09-.82-.52-.33-.7-1.05-.47-1.63.11-.27.2-.57.26-.87.11-.54.55-1 1.1-.92 1.6.2 3.04.92 4.15 1.98.3.27-.25.95-.65.95a3 3 0 0 0-2.38 1.17ZM15.19 15.61c.13.16.02.39-.19.39a3 3 0 0 0-1.52 5.59c.2.12.26.41.02.41h-8a.5.5 0 0 1-.5-.5v-2.1c0-.25-.31-.33-.42-.1-.32.67-.67 1.58-.88 2.54a.2.2 0 0 1-.2.16A1.5 1.5 0 0 1 2 20.5a7.5 7.5 0 0 1 13.19-4.89ZM9.5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 22Z" class=""></path><path fill="currentColor" d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" class=""></path></svg>
                    </button>
                    <button>
                        <svg x="0" y="0" class="icon__9293f" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M23 12.38c-.02.38-.45.58-.78.4a6.97 6.97 0 0 0-6.27-.08.54.54 0 0 1-.44 0 8.97 8.97 0 0 0-11.16 3.55c-.1.15-.1.35 0 .5.37.58.8 1.13 1.28 1.61.24.24.64.15.8-.15.19-.38.39-.73.58-1.02.14-.21.43-.1.4.15l-.19 1.96c-.02.19.07.37.23.47A8.96 8.96 0 0 0 12 21a.4.4 0 0 1 .38.27c.1.33.25.65.4.95.18.34-.02.76-.4.77L12 23a11 11 0 1 1 11-10.62ZM15.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" class=""></path><path fill="currentColor" d="M24 19a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" class=""></path></svg>
                    </button>
                    <div className= {`user-dm-search`}>
                        <input type = 'text' placeholder={`Search ${userDat.name}`} value = {searchVal} onChange={(e)=>setSearchVal(e.target.value)}/>
                        <div>
                            <svg class="icon__0c4c4 visible__0c4c4" aria-label="Search" aria-hidden="false" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" clip-rule="evenodd" class=""></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='user-dm-data'>
                <div className="user-main-left">
                    <div className="user-scroll-area">
                        <div className="user-welcome">
                            <div className="user-welcome-icon">
                                <img src = {userDat.image}/>
                            </div>
                            <h1>{userDat.name}</h1>
                            <h3>{userDat.tag}</h3>
                            <p>{`This is the beginning of your direct message history with ${userDat.name}.`}</p>
                            <div className="user-welcome-additional">
                                <p className="text-[14px]">No servers in common</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-dot-icon lucide-dot"><circle cx="12.1" cy="12.1" r="1"/></svg>
                                <button>
                                    Remove Friend
                                </button>
                                <button>
                                    Block
                                </button>
                            </div>
                        </div>
                        <div className="user-channel-messages">
                            {userDat.messages.map(msg => (
                                <div key={msg.id} className="user-chat-message">
                                    <img
                                        className="user-chat-avatar"
                                        src={msg.user.image}
                                        alt={msg.user.name}
                                    />
                                    <div className="user-chat-content">
                                        <span className="user-chat-username">
                                            {msg.user.name}
                                        </span>
                                        <p className="user-chat-text">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="user-text-area">
                        <div className="user-text-left">
                            <button>
                                <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 0 0 2 0v-8h8a1 1 0 0 0 0-2h-8V3Z" class="attachButtonPlus__0923f"></path></svg>
                            </button>
                        </div>
                        <div className="user-text-mid">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <textarea rows="1" placeholder={`Message @${userDat.name}`} value = {chatVal} onChange={(e)=>setChatVal(e.target.value)} onKeyDown={handleEnterKey}/>
                            </form>
                        </div>
                        <div className="user-text-right">
                            <button>🎁</button>
                            <button>GIF</button>
                            <button>😀</button>
                            <button>⚙️</button>
                        </div>
                    </div>
                </div>
                <div className="server-main-right">
                    <UserProf user = {user} users = {users}/>
                </div>
            </div>
        </div>
  )
}

export default UsersDm
