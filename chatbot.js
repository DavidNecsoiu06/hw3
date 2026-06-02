const questionBank = [
  {
    keyword: "projects",
    answer: "The website includes projects about web design, C console apps, sorting algorithms and Roblox prototypes."
  },
  {
    keyword: "skills",
    answer: "The listed skills are HTML, CSS, JavaScript basics, C, C++ and GitHub."
  },
  {
    keyword: "contact",
    answer: "You can use the contact page or write to david.necsoiu06@e-uvt.ro."
  },
  {
    keyword: "university",
    answer: "This is a first year computer science project for the Web Design course."
  }
];

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function addMessage(text, className) {
  const message = document.createElement("p");
  message.className = className;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function findAnswer(question) {
  const lowerQuestion = question.toLowerCase();

  for (let i = 0; i < questionBank.length; i++) {
    if (lowerQuestion.includes(questionBank[i].keyword)) {
      return questionBank[i].answer;
    }
  }

  return "I do not know that answer yet. Try asking about projects, skills, contact or university.";
}

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const question = chatInput.value.trim();

  if (question === "") {
    return;
  }

  addMessage(question, "user-message");
  addMessage(findAnswer(question), "bot-message");

  chatInput.value = "";
  chatInput.focus();
});
