function CreateGroup({selectedFriends,groupImage,handleCloseModal,handleCreateMessage,handleImageChange,groupName,setGroupName,users}) {
  return (
    <>
        {selectedFriends.length >= 2 && (
            <div className="dm-group-preview">
                <div className="dm-group-avatar-upload">
                    <label htmlFor="group-avatar-input" className="dm-group-avatar-label">
                        {groupImage ? (
                            <img src={groupImage} alt="Group avatar" className="dm-group-avatar-img" />
                        ) : (
                            <div className="dm-group-avatar-placeholder">
                                <svg width="24" height="24" viewBox="0 0 640 512" fill="currentColor">
                                    <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-96c-53 0-96 43-96 96v48c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32v-48c0-53-43-96-96-96zm-184-13.4c-11.6-11.5-27.5-18.6-45.1-18.6h-64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h66c6.2-47.4 34.8-87.3 75.1-109.4z" />
                                </svg>
                            </div>
                        )}
                        <div className="dm-group-avatar-edit-badge">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                        </div>
                    </label>
                    <input type="file" id="group-avatar-input" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange}/>
                </div>
                <div className="dm-group-info">
                    <h4>Group Name (optional)</h4>
                    <input type="text" placeholder={ selectedFriends .map(id => users.find(u => u.id === id)?.name).join(", ")} value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
                </div>
            </div>
        )}
        <div className="dm-buttons">
            <button className="dm-cancel-btn" onClick={handleCloseModal}>
                Cancel
            </button>
            <button className="dm-create-btn" disabled={selectedFriends.length === 0} onClick={handleCreateMessage}>
                {selectedFriends.length < 2 ? "Create Message" : "Create Group Message"}
            </button>
        </div>
    </>
  )
}

export default CreateGroup
