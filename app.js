// Initialize Web Speech API for Speech-to-Text
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

const speakButton = document.getElementById('speak-btn');
const stopButton = document.getElementById('stop-btn');
const userTextDisplay = document.getElementById('user-text').querySelector('span');
const botResponseDisplay = document.getElementById('bot-response').querySelector('span');

let isListening = false;

speakButton.addEventListener('click', () => {
    if (!isListening) {
        recognition.start();
        isListening = true;
        console.log('Listening...');
    }
});

stopButton.addEventListener('click', () => {
    if (isListening) {
        recognition.stop();
        isListening = false;
        console.log('Stopped listening.');
    }
});

recognition.onresult = (event) => {
    const userText = event.results[0][0].transcript;
    userTextDisplay.textContent = userText;

    const botReply = generateBotResponse(userText);
    botResponseDisplay.textContent = botReply;

    speakOut(botReply);
};

recognition.onend = () => {
    if (isListening) {
        recognition.start();  // Continue listening if the user hasn't pressed "Off"
    }
};

// Simple chatbot logic
function generateBotResponse(userText) {
    if (userText.toLowerCase().includes("hello")) {
        return "Hello! How can I assist you today?";
    } else if (userText.toLowerCase().includes("weather")) {
        return "I can't check the weather right now, but make sure to bring an umbrella!";
    } else {
        return "I'm not sure about that. Could you ask something else?";
    }
}

// Text-to-Speech
function speakOut(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}
