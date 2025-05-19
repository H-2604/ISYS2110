// Mock data for chat messages
const channelMessages = {
  'general': [
    { sender: 'Ankit', mission: '[OS:01]', text: 'Status report?', timestamp: '10:23 AM' },
    { sender: 'User', mission: '[OS:01]', text: 'Going!', timestamp: '10:28 AM' },
    { sender: 'Ankit', mission: '[OS:01]', text: 'Great.', timestamp: '10:30 AM' }
  ],
  'mission-01': [
    { sender: 'Ankit', mission: '[OS:01]', text: 'Team Alpha, what is your position?', timestamp: '09:15 AM' },
    { sender: 'User', mission: '[OS:01]', text: 'South quadrant, all clear.', timestamp: '09:17 AM' },
    { sender: 'Ankit', mission: '[OS:01]', text: 'Proceed to checkpoint 3.', timestamp: '09:20 AM' }
  ],
  'mission-02': [
    { sender: 'Ankit', mission: '[OS:02]', text: 'Supply delivery status?', timestamp: '11:45 AM' },
    { sender: 'User', mission: '[OS:02]', text: 'Delayed by weather, ETA 2 hours.', timestamp: '11:50 AM' },
    { sender: 'Ankit', mission: '[OS:02]', text: 'Acknowledged. Keep us updated.', timestamp: '11:52 AM' }
  ],
  'mission-03': [
    { sender: 'Ankit', mission: '[OS:03]', text: 'Need assistance!', timestamp: '02:30 PM' },
    { sender: 'User', mission: '[OS:03]', text: 'Reinforcements inbound, 5 minutes.', timestamp: '02:32 PM' },
    { sender: 'Ankit', mission: '[OS:03]', text: 'Hurry, situation critical.', timestamp: '02:33 PM' }
  ]
};

// Current active channel
let currentChannel = 'general';
const username = 'User';
const missionId = '[OS:01]';

// DOM elements
let chatContainer;
let messageInput;
let sendButton;
let channelItems;
let currentUserEl;
let currentMissionEl;
let attachmentButton;
let fileInput;

// Initialize the chat application
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  chatContainer = document.getElementById('chat-container');
  messageInput = document.getElementById('message-input');
  sendButton = document.getElementById('send-button');
  channelItems = document.querySelectorAll('.channel-item');
  currentUserEl = document.getElementById('current-user');
  currentMissionEl = document.getElementById('current-mission');
  attachmentButton = document.getElementById('attachment-button');
  fileInput = document.getElementById('file-input');
  
  // Load initial messages
  loadMessages(currentChannel);
  
  // Set up event listeners
  setupEventListeners();
  
  // Create Lucide icons
  if (window.lucide) lucide.createIcons();
});

// Set up all event listeners
function setupEventListeners() {
  // Send message on button click
  sendButton.addEventListener('click', sendMessage);
  
  // Send message on Enter key press
  messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // File attachment handling
  attachmentButton.addEventListener('click', function() {
    fileInput.click(); // Trigger file input when paperclip is clicked
  });

  fileInput.addEventListener('change', function(e) {
    if (this.files && this.files.length > 0) {
      handleFileUpload(this.files[0]);
    }
  });
  
  // Channel switching
  channelItems.forEach(item => {
    item.addEventListener('click', function() {
      // Get channel from data attribute or innerText
      const channel = this.dataset.channel || 'general';
      
      // Switch channel
      switchChannel(channel);
      
      // Update active channel styling
      channelItems.forEach(el => el.classList.remove('channel-active'));
      this.classList.add('channel-active');
      
      // Update mission ID in right sidebar
      if (channel === 'mission-01') {
        currentMissionEl.textContent = '[OS:01]';
      } else if (channel === 'mission-02') {
        currentMissionEl.textContent = '[OS:02]';
      } else if (channel === 'mission-03') {
        currentMissionEl.textContent = '[OS:03]';
      } else {
        currentMissionEl.textContent = '[OS:01]';
      }
    });
  });
}

// Load messages for a specific channel
function loadMessages(channel) {
  // Clear the chat container
  chatContainer.innerHTML = '';
  
  const messages = channelMessages[channel] || [];
  
  // Create message elements
  messages.forEach(message => {
    const messageEl = createMessageElement(message);
    chatContainer.appendChild(messageEl);
  });
  
  // Scroll to bottom
  scrollToBottom();
}

// Create a message element
function createMessageElement(message) {
  const messageDiv = document.createElement('div');
  
  // Set background color based on sender
  const bgColor = message.sender === 'User' ? '#086788' : '#13950F';
  
  // Align messages based on sender
  const alignment = message.sender === 'User' ? 'justify-end' : 'justify-start';
  messageDiv.className = `flex ${alignment} mb-4`;
  
  const messageContent = document.createElement('div');
  messageContent.className = 'chat-message max-w-[70%]';
  messageContent.style.backgroundColor = bgColor;
  
  // For file messages, we can directly set the innerHTML
  if (message.isFile) {
    messageContent.innerHTML = `
      <div class="flex items-center">
        <span class="text-[#F0C808] text-sm font-bold mr-2">${message.sender}</span>
        <span class="text-[#F0C808] text-xs">${message.mission}</span>
        <div class="ml-auto flex gap-2">
          <i data-lucide="trash-2" class="w-4 h-4 text-[#F0C808] opacity-70 cursor-pointer"></i>
          <i data-lucide="edit" class="w-4 h-4 text-[#F0C808] opacity-70 cursor-pointer"></i>
        </div>
      </div>
      <div class="text-[#F0C808] text-sm mt-1">${message.text}</div>
    `;
  } else {
    // Add content to the message - ensure all text elements use the yellow color
    messageContent.innerHTML = `
      <div class="flex items-center">
        <span class="text-[#F0C808] text-sm font-bold mr-2">${message.sender}</span>
        <span class="text-[#F0C808] text-xs">${message.mission}</span>
        <div class="ml-auto flex gap-2">
          <i data-lucide="trash-2" class="w-4 h-4 text-[#F0C808] opacity-70 cursor-pointer"></i>
          <i data-lucide="edit" class="w-4 h-4 text-[#F0C808] opacity-70 cursor-pointer"></i>
        </div>
      </div>
      <div class="text-[#F0C808] text-sm mt-1">${message.text}</div>
    `;
  }
  
  messageDiv.appendChild(messageContent);
  return messageDiv;
}

// Switch to a different channel
function switchChannel(channel) {
  currentChannel = channel;
  loadMessages(channel);
}

// Send a new message
function sendMessage() {
  const text = messageInput.value.trim();
  
  if (text) {
    // Get the mission ID for the current channel
    let mission = missionId;
    if (currentChannel === 'mission-02') {
      mission = '[OS:02]';
    } else if (currentChannel === 'mission-03') {
      mission = '[OS:03]';
    }
    
    // Create new message object
    const newMessage = {
      sender: username,
      mission: mission,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Add to message list
    channelMessages[currentChannel].push(newMessage);
    
    // Add to DOM
    const messageEl = createMessageElement(newMessage);
    chatContainer.appendChild(messageEl);
    
    // Clear input field
    messageInput.value = '';
    
    // Scroll to bottom
    scrollToBottom();
    
    // Create any new Lucide icons
    if (window.lucide) lucide.createIcons();
    
    // Auto response for demo purposes (after 1 second)
    setTimeout(() => {
      const responses = {
        'general': 'Acknowledged.',
        'mission-01': 'Copy that.',
        'mission-02': 'Understood.',
        'mission-03': 'Thanks for the update.'
      };
      
      const responseText = responses[currentChannel] || 'Received.';
      
      const responseMessage = {
        sender: 'Ankit',
        mission: mission,
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      channelMessages[currentChannel].push(responseMessage);
      const responseEl = createMessageElement(responseMessage);
      chatContainer.appendChild(responseEl);
      scrollToBottom();
      
      // Create any new Lucide icons
      if (window.lucide) lucide.createIcons();
    }, 1000);
  }
}

// Handle file upload
function handleFileUpload(file) {
  // Get the mission ID for the current channel
  let mission = missionId;
  if (currentChannel === 'mission-02') {
    mission = '[OS:02]';
  } else if (currentChannel === 'mission-03') {
    mission = '[OS:03]';
  }
  
  // Create a new message with the file
  sendFileMessage(file, mission);
}

// Send a file message
function sendFileMessage(file, mission) {
  // Create file preview message
  const fileType = file.type.split('/')[0]; // image, application, etc.
  let filePreview = '';
  
  if (fileType === 'image') {
    // For images, create a thumbnail preview
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileMessage = {
        sender: username,
        mission: mission,
        text: `<div class="file-message">
                <div class="file-preview mb-2">
                  <img src="${e.target.result}" alt="Image" class="max-h-32 rounded-lg">
                </div>
                <div class="file-info flex items-center">
                  <i data-lucide="file" class="w-4 h-4 mr-2"></i>
                  <span>${file.name}</span>
                </div>
              </div>`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFile: true
      };
      
      // Add to message list
      channelMessages[currentChannel].push(fileMessage);
      
      // Add to DOM
      const messageEl = createMessageElement(fileMessage);
      chatContainer.appendChild(messageEl);
      
      // Scroll to bottom
      scrollToBottom();
      
      // Create any new Lucide icons
      if (window.lucide) lucide.createIcons();
      
      // Auto response for demo purposes
      setTimeout(() => {
        const responseMessage = {
          sender: 'Ankit',
          mission: mission,
          text: 'Thanks for the file!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        channelMessages[currentChannel].push(responseMessage);
        const responseEl = createMessageElement(responseMessage);
        chatContainer.appendChild(responseEl);
        scrollToBottom();
        
        if (window.lucide) lucide.createIcons();
      }, 1000);
    };
    reader.readAsDataURL(file);
  } else {
    // For other file types, just show the name
    const fileMessage = {
      sender: username,
      mission: mission,
      text: `<div class="file-message">
              <div class="file-info flex items-center">
                <i data-lucide="file" class="w-4 h-4 mr-2"></i>
                <span>${file.name}</span>
              </div>
            </div>`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFile: true
    };
    
    // Add to message list
    channelMessages[currentChannel].push(fileMessage);
    
    // Add to DOM
    const messageEl = createMessageElement(fileMessage);
    chatContainer.appendChild(messageEl);
    
    // Scroll to bottom
    scrollToBottom();
    
    // Create any new Lucide icons
    if (window.lucide) lucide.createIcons();
    
    // Auto response for demo purposes
    setTimeout(() => {
      const responseMessage = {
        sender: 'Ankit',
        mission: mission,
        text: 'Thanks for the file!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      channelMessages[currentChannel].push(responseMessage);
      const responseEl = createMessageElement(responseMessage);
      chatContainer.appendChild(responseEl);
      scrollToBottom();
      
      if (window.lucide) lucide.createIcons();
    }, 1000);
  }
}

// Scroll chat to bottom
function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
