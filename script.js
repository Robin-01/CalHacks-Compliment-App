const typingText = "Explore your achievements and reflect on your incredible journey!";
let index = 0;
const speed = 50;

function typeEffect() {
  if (index < typingText.length) {
    document.getElementById('typing-text').innerHTML += typingText.charAt(index);
    index++;
    setTimeout(typeEffect, speed); // Call the function recursively with a delay
  }
}

// Trigger the typing effect when the page loads
window.onload = function() {
  typeEffect();
  // Event listener for the Enter key
  document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      sendMessage(); 
    }
  });
};

// Handle sending messages in the chat
// function sendMessage() {
//   const userInput = document.getElementById('user-input').value;

//   // Input validation
//   if (userInput.trim().length < 2) {
//     alert("Please enter a more meaningful message.");
//     return;
//   }

//   const chatLog = document.getElementById('chat-log');
  
//   // Display the user input in the chat log
//   const userMessage = document.createElement('p');
//   userMessage.textContent = `You: ${userInput}`;
//   userMessage.classList.add('user-message'); // Add user-message class
//   chatLog.appendChild(userMessage);

//   // Clear the input field after sending
//   document.getElementById('user-input').value = '';
  
//   // Auto-scroll to the bottom of the chat
//   chatLog.scrollTop = chatLog.scrollHeight;

//   // Show loading indicator while waiting for response
//   const loadingIndicator = document.createElement('p');
//   loadingIndicator.textContent = "Thinking...";
//   loadingIndicator.classList.add('system-message'); // Optionally style loading indicator
//   chatLog.appendChild(loadingIndicator);

//   // Call the function to reply to the user after a delay
//   setTimeout(() => {
//     replyToUser();
//     chatLog.removeChild(loadingIndicator); // Remove loading indicator
//   }, 1000); // 1000ms = 1 sec
// }

// // Function to generate a reply from the system
// function replyToUser() {
//   const chatLog = document.getElementById('chat-log');

//   // Example predefined responses
//   const responses = [
//     "Hello! How can I assist you today?",
//     "I'm here to help. What would you like to know?",
//     "Feel free to ask me anything.",
//     "You are doing great in your life. Stay focused and make small increments."
//   ];

//   // Pick a random response
//   const systemReply = responses[Math.floor(Math.random() * responses.length)];
  
//   // Display the system response in the chat log
//   const systemMessage = document.createElement('p');
//   systemMessage.textContent = `Response: ${systemReply}`;
//   systemMessage.classList.add('system-message'); // Add system-message class
//   chatLog.appendChild(systemMessage);
  
//   // Auto-scroll to the bottom of the chat
//   chatLog.scrollTop = chatLog.scrollHeight;
// }


async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
  
    // Input validation
    if (userInput.trim().length < 2) {
      alert("Please enter a more meaningful message.");
      return;
    }
  
    const chatLog = document.getElementById('chat-log');
  
    // Display the user input in the chat log
    const userMessage = document.createElement('p');
    userMessage.textContent = `You: ${userInput}`;
    userMessage.classList.add('user-message'); // Add user-message class
    chatLog.appendChild(userMessage);
  
    // Clear the input field after sending
    document.getElementById('user-input').value = '';
    
    // Auto-scroll to the bottom of the chat
    chatLog.scrollTop = chatLog.scrollHeight;
  
    // Show loading indicator while waiting for response
    const loadingIndicator = document.createElement('p');
    loadingIndicator.textContent = "Thinking...";
    loadingIndicator.classList.add('system-message'); // Optionally style loading indicator
    chatLog.appendChild(loadingIndicator);
  
    // Send the user input to the Flask backend
    fetch("http://127.0.0.1:5000/api/data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput })  // Send the message in JSON format
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
      // Remove loading indicator
      chatLog.removeChild(loadingIndicator);
  
      // Display the response from the backend
      const systemMessage = document.createElement('p');
      systemMessage.textContent = `Response: ${data.Response}`;  // Use the response from Flask
      systemMessage.classList.add('system-message'); // Add system-message class
      chatLog.appendChild(systemMessage);
      
      // Auto-scroll to the bottom of the chat
      chatLog.scrollTop = chatLog.scrollHeight;
    })
    .catch(error => {
      console.error('Error:', error);
      chatLog.removeChild(loadingIndicator); // Remove loading indicator
      alert("There was an error processing your request.");
    });
}
// Handle showing affirmation based on achievements
function showAffirmation() {
  const affirmationText = document.getElementById('affirmation-text');
  const userAchievements = [
    "completed a project",
    "helped a colleague",
    "improved coding skills"
  ]; // Example achievements
  const affirmation = `Great job! You have achieved: ${userAchievements[Math.floor(Math.random() * userAchievements.length)]}`;
  affirmationText.textContent = affirmation;
}
