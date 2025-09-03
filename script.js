const body = document.querySelector('body');
let btn_clicked = false;
let timeout = null;
let timerInterval = null;
let just_clicked = false;
let start = null;
let lastElapsed = null; 
const onHoverList = [
    "Hey!",
    "<i>Uh oh...</i>",
    "<b>WHAT ARE YOU THINKING???</b>",
    "You'll surely regret what's <i>coming...</i>",
    "You're making a <b>MISTAKE!!!</b>"
];

const onClickList = [
    "<b>NO!!!!!!! 😭</b>",
    "<i>Shoot...</i>",
    "<b>HOW DO YOU DID <i>THAT???</i> 😱</b>",
    "<i>*cries in horror*</i>",
    "<b>%*@&$%!&@!!!!!!! 👿</b>"
];

function init() {
    // Hide all existing children
    for (const child of document.body.children) {
        child.style.display = "none";
    }

    // Create and show "Starting game..." message
    const h1 = document.createElement('h1');
    h1.textContent = "Starting game...";
    h1.style.fontSize = "1.5em";
    h1.style.textAlign = "center";
    h1.style.marginTop = "20vh";
    document.body.appendChild(h1);

    // Wait 3 seconds, then remove message and show original content
    setTimeout(() => {
        h1.remove();
        for (const child of document.body.children) {
            child.style.display = ""; // Restore original display
        }
        ask_timeout();
    }, 3000);
}

function ask_timeout() {
    while (true) {
        let temp_timeout = prompt("Enter delay in milliseconds before the alert fires: (100 🏃 to 1000 🐢)\nOr press Cancel to close the window.");
        if (temp_timeout === null) {
            let close_decision = confirm('You clicked Cancel. Close the window?');
            if (close_decision) {
                window.close();
                return;
            } else {
                continue;
            }
        }
        let input_int = parseInt(temp_timeout);

        if (!isNaN(input_int) && input_int >= 100 && input_int <= 1000) {
            timeout = input_int;
            break;
        } else if (!isNaN(input_int)) {
            alert("Hey! Your number isn't from 100ms to 1000ms!");
        } else {
            alert("Hey! That's not even a number!");
        }
    }
    document.getElementById('teleportation').innerHTML = `P.S. You have <strong>${timeout}ms</strong> before the alert fires.`
}
document.addEventListener("DOMContentLoaded", init)

function block() {
    if (!timeout) return;

    document.getElementById("header").innerHTML = onHoverList[Math.floor(Math.random() * onHoverList.length)];

    start = performance.now(); // <-- Store start time
    const display = document.getElementById("timer");

    stopTimer();

    timerInterval = setInterval(() => {
        let now = performance.now();
        let elapsed = Math.floor(now - start);
        lastElapsed = elapsed;

        display.textContent = `${elapsed}ms / ${timeout}ms`;
        const alertMsgs = [
            "Told Ya!",
            "Too Slow!",
            "Ha Ha!",
            "Gotcha!",
            "CAUGHT YOU TRYING TO PRESS THAT BUTTON",
            "Nice reflexes... still not enough.",
            "You missed. Again.",
            "This button is faster than you.",
            "Try harder, human.",
            "You clicked nothing. Congrats.",
            "The button dodged you.",
            "You blinked, didn’t you?",
            "Almost... but nope.",
            "This button has trust issues.",
            "You activated disappointment.",
            "Your click has been denied.",
            "You pressed air.",
            "The button laughed at you.",
            "You’ve been juked.",
            "This is a trap. You fell for it.",
            "You clicked. The button vanished.",
            "You vs. Button: 0–1",
            "Better luck next click.",
            "You summoned sarcasm.",
            "This button is a ninja.",
            "You touched the void.",
            "Denied by design.",
            "The button says: 'Not today.'",
            "You clicked. Reality disagreed.",
            "You’ve been click-blocked.",
            "You clicked... and nothing happened. Just like your dreams."
        ];

        const alertMsg = alertMsgs[Math.floor(Math.random() * alertMsgs.length)];
        if (elapsed >= timeout) {
            stopTimer();
            if (!btn_clicked) alert(alertMsg);
        }
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    if (just_clicked) {
        just_clicked = false;
        return;
    }
}

function clearTimerOnMouseLeave() {
    if (!btn_clicked) {
        stopTimer();
        document.getElementById("timer").textContent = "";
        // Only reset header if button hasn't been clicked
        document.getElementById("header").innerHTML = "Betcha can't click the button!";
    }
}

function after_click() {
    const dramaticMsgs = [
        "<b><i>THE BUTTON HAS BEEN VIOLATED!</i></b>",
        "<b><i>YOU JUST UNLEASHED THE UNTHINKABLE!</i></b>",
        "<b><i>THE SACRED CLICK HAS BEEN MADE... CONSEQUENCES WILL FOLLOW.</i></b>",
        "<b><i>REALITY IS COLLAPSING. NICE JOB.</i></b>",
        "<b><i>THE LEGENDS WARNED US ABOUT THIS DAY.</i></b>",
        "<b><i>YOU'VE AWAKENED THE BUTTON'S WRATH!</i></b>",
        "<b><i>THE SYSTEM IS SHOOK. THE BUTTON IS BETRAYED.</i></b>",
        "<b><i>YOU CLICKED. THE COSMOS BLINKED.</i></b>",
        "<b><i>THE BUTTON CRIED OUT IN AGONY!</i></b>",
        "<b><i>YOU HAVE SUMMONED THE FINAL PROTOCOL.</i></b>",
        "<b><i>THE CLICK ECHOES THROUGH TIME.</i></b>",
        "<b><i>THE BUTTON HAS BEEN DEFILED. REPENT.</i></b>",
        "<b><i>THE UNIVERSE JUST FILED A COMPLAINT.</i></b>",
        "<b><i>YOU BROKE THE UNWRITTEN RULE.</i></b>",
        "<b><i>THE BUTTON IS DISAPPOINTED IN YOU.</i></b>",
        "<b><i>THE CLICK... IT WASN’T SUPPOSED TO HAPPEN.</i></b>",
        "<b><i>YOU’VE TRIGGERED THE APOCALYPSE SEQUENCE.</i></b>",
        "<b><i>THE BUTTON HAS ENTERED EMERGENCY MODE.</i></b>",
        "<b><i>YOU’VE BEEN LOGGED... FOR ETERNAL JUDGMENT.</i></b>",
        "<b><i>THE CLICK HAS BEEN RECORDED IN THE BOOK OF SHAME.</i></b>"
    ];

    document.getElementById("header").innerHTML = onClickList[Math.floor(Math.random() * onClickList.length)];

    // 🧹 Clear previous dramatic messages only (not buttons)
    document.querySelectorAll('.dynamic-msg').forEach(el => el.remove());

    // clear reset buttons
    document.querySelectorAll('.reset-btn').forEach(el => el.remove());

    // ✅ Reset state
    btn_clicked = true;
    just_clicked = true;

    stopTimer(); // Stop timer immediately

    // 🧪 Safety check
    if (!timeout || lastElapsed === null) {
        console.warn("Missing timeout or elapsed time.");
        return;
    }

    // 🎭 Create dramatic message
    const msg = document.createElement('p');
    msg.className = "dynamic-msg";
    const dramaticMsg = dramaticMsgs[Math.floor(Math.random() * dramaticMsgs.length)];
    msg.innerHTML = `<b><i>WHAT????????? YOU ACTUALLY CLICKED ON THAT BUTTON?</i></b><br><i>${dramaticMsg}</i>`;
    body.appendChild(msg);

    // 🕒 Show score
    const score = document.createElement('p');
    score.className = "dynamic-msg";
    score.innerHTML = `<span style="color:yellow">Your score: ${lastElapsed}ms / ${timeout}ms</span>`;
    body.appendChild(score);

    // 🔁 Add reset button (with a different class so it doesn't get wiped)
    const resetBtn = document.createElement('button');
    resetBtn.textContent = "Reset";
    resetBtn.className = "reset-btn";
    resetBtn.onclick = reset;
    body.appendChild(resetBtn);

    setTimeout(() => {
        btn_clicked = false;
    }, 1000); // 1 second cooldown
}

function dark_mode() {
    const label = document.querySelector("#dark-mode-box label");
    const box = document.getElementById("dark-mode-box");
    const scoreText = document.querySelector('.dynamic-msg span');

    const isLight = body.style.backgroundColor === "white";

    // 🌗 Background and text
    body.style.backgroundColor = isLight ? "black" : "white";
    body.style.color = isLight ? "white" : "black";
    label.style.color = isLight ? "white" : "black";
    box.style.backgroundColor = isLight ? "#222" : "#eee";
    box.style.borderColor = isLight ? "#888" : "#aaa";

    // 🎯 Score color
    if (scoreText) scoreText.style.color = isLight ? "yellow" : "#003366";

    // 🧱 HR color
    document.querySelectorAll('hr').forEach(hr => {
        hr.style.borderColor = isLight ? "white" : "#000";
    });
}

function reset() {
    btn_clicked = false;
    document.getElementById("header").innerHTML = "Betcha can't click the button!";
    document.querySelectorAll('.dynamic-msg').forEach(el => el.remove());
    document.querySelectorAll('button:not(:first-of-type)').forEach(el => el.remove());
}