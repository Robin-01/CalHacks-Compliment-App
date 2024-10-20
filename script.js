const typingText = "Explore your achievements and reflect on your incredible journey!";
let eventCount = 0;
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

  document.getElementById('event-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTimelineNode();
    }
  });
};

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
    "You are doing a great job!", 
    "Remember all the little things you've achieved",
    "Feeling sad? Bad times come and go. Focus on the next thing",
    "Go get the next opportunity.",
    "You're doing great!",
    "Take deep breaths and feel your body."
  ]; // Example achievements
  const affirmation = `Keep your head up! ${userAchievements[Math.floor(Math.random() * userAchievements.length)]}`;
  affirmationText.textContent = affirmation;
}

function addTimelineNode() {
  const userInput = document.getElementById('event-input').value.trim();

  // Validate input
  if (userInput.length < 2) {
    alert("Please enter a more meaningful achievement.");
    return;
  }

  // Create a new timeline node element
  const newNode = document.createElement('div');
  newNode.classList.add('timeline-node');

  // Set the node content (label)
  const label = document.createElement('div');
  label.classList.add('label');
  label.textContent = userInput;
  newNode.appendChild(label);

  // Append the new node to the timeline
  document.getElementById('timeline').appendChild(newNode);

  // Clear the input field after adding the node
  document.getElementById('event-input').value = '';

  // Increment node counter
  nodeCount++;
}