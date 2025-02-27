// Global variables to store the user's name and todos.
let userName = "";
let todos = [];

function getReply(command) {
  const cmd = command.trim();
  const cmdLower = cmd.toLowerCase();

  // 1. "Hello my name is Benjamin"

  const greetingPhrase = "hello my name is ";
  if (cmdLower.startsWith(greetingPhrase)) {
    const name = cmd.substring(greetingPhrase.length).trim();

    if (userName && userName.toLowerCase() === name.toLowerCase()) {
      return `You've already told me your name is ${userName}`;
    } else {
      userName = name;
      return `Nice to meet you ${userName}`;
    }
  }

  // 2. "What is my name?"
  if (cmdLower.startsWith("what is my name")) {
    if (userName) {
      return `Your name is ${userName}`;
    } else {
      return "I don't know your name yet.";
    }
  }

  // 3. "Add fishing to my todo" (or similar)

  if (cmdLower.startsWith("add ") && cmdLower.indexOf(" to my todo") !== -1) {
    const startIndex = "add ".length;
    const endIndex = cmdLower.indexOf(" to my todo");
    const todoItem = cmd.substring(startIndex, endIndex).trim();
    todos.push(todoItem);
    return `${todoItem} added to your todo`;
  }

  // 4. "Remove fishing from my todo"
  if (
    cmdLower.startsWith("remove ") &&
    cmdLower.indexOf(" from my todo") !== -1
  ) {
    const startIndex = "remove ".length;
    const endIndex = cmdLower.indexOf(" from my todo");
    const todoItem = cmd.substring(startIndex, endIndex).trim();

    const index = todos.findIndex(
      (item) => item.toLowerCase() === todoItem.toLowerCase()
    );
    if (index !== -1) {
      todos.splice(index, 1);
      return `Removed ${todoItem} from your todo`;
    } else {
      return `${todoItem} is not in your todo`;
    }
  }

  // 5. "What is on my todo?"
  if (cmdLower.indexOf("what is on my todo") !== -1) {
    if (todos.length === 0) {
      return "Your todo is empty.";
    } else {
      return `You have ${todos.length} todo${
        todos.length > 1 ? "s" : ""
      } - ${todos.join(" and ")}`;
    }
  }

  // 6. "What day is it today?"
  if (cmdLower.indexOf("what day is it today") !== -1) {
    const now = new Date();
    const day = now.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    return `${day}. of ${month} ${year}`;
  }

  // 7. "What is 3 + 3?"
  if (cmdLower.startsWith("what is ")) {
    const expression = cmd.substring("what is ".length).trim();

    const parts = expression.split(" ");
    if (parts.length === 3) {
      const num1 = parseFloat(parts[0]);
      const operator = parts[1];
      const num2 = parseFloat(parts[2]);
      if (!isNaN(num1) && !isNaN(num2)) {
        let result;
        if (operator === "+") {
          result = num1 + num2;
        } else if (operator === "-") {
          result = num1 - num2;
        } else if (operator === "*") {
          result = num1 * num2;
        } else if (operator === "/") {
          result = num1 / num2;
        } else {
          return "I can't do that math.";
        }
        return `${result}`;
      }
    }
  }

  // 8. "Set a timer for 4 minutes"
  if (cmdLower.startsWith("set a timer for ")) {
    const afterTimer = cmd.substring("set a timer for ".length).trim();
    const parts = afterTimer.split(" ");
    if (parts.length >= 2) {
      const minutes = parseInt(parts[0]);
      if (!isNaN(minutes)) {
        const ms = minutes * 60 * 1000;
        setTimeout(() => {
          console.log("Timer done");
        }, ms);
        return `Timer set for ${minutes} minute${minutes > 1 ? "s" : ""}`;
      }
    }
  }

  // 9. Additional command: "Tell me a joke"
  if (cmdLower.indexOf("tell me a joke") !== -1) {
    return "Why did the chicken cross the road? To get to the other side!";
  }

  return "I'm not sure how to help with that.";
}

console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is 3 + 3"));
console.log(getReply("Set a timer for 1 minute"));
console.log(getReply("Tell me a joke"));
