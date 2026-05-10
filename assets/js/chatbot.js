
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('chatbot_trigger');
    const popup = document.getElementById('chat_popup');
    const closeBtn = document.getElementById('close_chat');
    const messagesContainer = document.getElementById('chat_popup_messages');
    const input = document.getElementById('chat_popup_input');
    const sendBtn = document.getElementById('send_chat_btn');

    if (!trigger || !popup) return;

    trigger.addEventListener('click', () => {
        popup.classList.toggle('active');
        if (popup.classList.contains('active')) {
            input?.focus();
        }
    });

    closeBtn?.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    function addMessage(text, isUser = false) {
        if (!messagesContainer) return;
        
        const msgWrapper = document.createElement('div');
        msgWrapper.className = `message-wrapper ${isUser ? 'user-wrapper' : 'bot-wrapper'}`;
        
        // Avatar Container
        const avatarContainer = document.createElement('div');
        avatarContainer.className = 'avatar-container';
        
        const avatar = document.createElement('div');
        avatar.className = isUser ? 'user-avatar' : 'bot-avatar';
        avatar.innerHTML = isUser ? '<i data-lucide="user"></i>' : '<i data-lucide="bot"></i>';
        
        const nameLabel = document.createElement('span');
        nameLabel.className = 'avatar-name';
        nameLabel.textContent = isUser ? 'Зочин' : 'MTRL AI';
        
        avatarContainer.appendChild(avatar);
        avatarContainer.appendChild(nameLabel);
        msgWrapper.appendChild(avatarContainer);
        
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        msgDiv.textContent = text;
        
        msgWrapper.appendChild(msgDiv);
        messagesContainer.appendChild(msgWrapper);
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function handleSend() {
        if (!input || !messagesContainer || !sendBtn) return;
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, true);
        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;

        const loadingWrapper = document.createElement('div');
        loadingWrapper.className = 'message-wrapper bot-wrapper loading-message';
        
        const avatarContainer = document.createElement('div');
        avatarContainer.className = 'avatar-container';
        
        const avatar = document.createElement('div');
        avatar.className = 'bot-avatar';
        avatar.innerHTML = '<i data-lucide="bot"></i>';
        
        const nameLabel = document.createElement('span');
        nameLabel.className = 'avatar-name';
        nameLabel.textContent = 'MTRL AI';
        
        avatarContainer.appendChild(avatar);
        avatarContainer.appendChild(nameLabel);
        loadingWrapper.appendChild(avatarContainer);

        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'message bot-message';
        loadingMsg.textContent = '...';
        loadingWrapper.appendChild(loadingMsg);
        
        messagesContainer.appendChild(loadingWrapper);
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            console.log("Sending message to backend...");
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            
            // Log status code for debugging as requested
            console.log(`Response status: ${response.status}`);
            if (!response.ok) {
                console.error(`Status code error detected: ${response.status}`);
                if (response.status === 401) console.error("Unauthorized (401): Check API Key");
                if (response.status === 404) console.error("Not Found (404): Check API endpoint URL");
                if (response.status === 429) console.error("Too Many Requests (429): Rate Limited");
                if (response.status === 500) console.error("Server Error (500)");
            }

            const data = await response.json();
            
            // Remove ALL loading messages just in case
            document.querySelectorAll('.loading-message').forEach(el => el.remove());
            
            if (response.ok) {
                addMessage(data.reply || 'Уучлаарай, хариу хоосон байлаа.');
            } else {
                addMessage(data.reply || 'Одоогоор AI туслахтай холбогдох боломжгүй байна. Та дараа дахин оролдоно уу.');
            }
        } catch (err) {
            console.error("Fetch/Network error:", err);
            document.querySelectorAll('.loading-message').forEach(el => el.remove());
            addMessage('Одоогоор AI туслахтай холбогдох боломжгүй байна. Та дараа дахин оролдоно уу.');
        } finally {
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }
    }

    sendBtn?.addEventListener('click', handleSend);
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
