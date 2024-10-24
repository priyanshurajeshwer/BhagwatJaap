let ramCount = 0;
let krishnaCount = 0;
let radhaCount = 0; // Count for Radha
let recognition;

function startRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        document.getElementById('errorMessage').textContent = "Speech recognition is not supported in your browser. Please use Chrome.";
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true; // Allow continuous recognition

    recognition.onstart = () => {
        document.getElementById('errorMessage').textContent = ""; // Clear previous errors
    };

    recognition.onresult = (event) => {
        const spokenWord = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("Heard: " + spokenWord); // Log what is heard for debugging
        
        // Check for each name
        if (spokenWord.includes("ram")) {
            ramCount++;
            document.getElementById('ramCount').textContent = ramCount;
        } else if (spokenWord.includes("krishna")) {
            krishnaCount++;
            document.getElementById('krishnaCount').textContent = krishnaCount;
        } else if (spokenWord.includes("radha")) { // Check for Radha
            radhaCount++;
            document.getElementById('radhaCount').textContent = radhaCount; // Update Radha count display
        } else {
            alert("Please speak a valid god's name (Ram, Krishna, or radha).");
        }
    };

    recognition.onerror = (event) => {
        console.error("Recognition error: " + event.error);
        document.getElementById('errorMessage').textContent = `Error: ${event.error}`;
    };

    recognition.onend = () => {
        console.log("Speech recognition service disconnected");
    };

    recognition.start();

    // Enable the stop button and disable the start button
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
    }

    // Calculate total count
    const totalCount = ramCount + krishnaCount + radhaCount; // Include Radha count
    let blessingMessage = '';

    // Generate a blessing message based on count
    if (totalCount >= 20) {
        blessingMessage = "You are truly blessed! Keep up the great work!";
    } else if (totalCount >= 10) {
        blessingMessage = "God is happy with your devotion!";
    } else {
        blessingMessage = "Keep chanting for more blessings!";
    }

    document.getElementById('blessingMessage').textContent = `You chanted Ram ${ramCount} times,You chanted Krishna ${krishnaCount} times, You chantedand Radha ${radhaCount} times. ${blessingMessage}`;

    // Reset the buttons
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}
