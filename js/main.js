function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fullNames = [
    "Aliya Nurzhanova",
    "Aidana Alikhanova",
    "Aizhan Zhumabayeva",
    "Ainur Kaliyeva",
    "Alia Sabyrova",
    "Anel Kenesova",
    "Gulnur Orazbekova",
    "Dana Rakhmetova",
    "Dinara Tulegenova",
    "Zarina Kanatova",
    "Madina Iskakova",
    "Merey Talgatova",
    "Nazerke Abilova",
    "Nurjanat Zhanatova",
    "Nursulu Aruzhanova",
    "Raikhan Alikhanova",
    "Sabina Aidynova",
    "Saniya Serikova",
    "Sara Dauletova",
    "Tamara Assemova",
    "Tomiris Ardakova",
    "Tulkym Kamillayeva",
    "Shynar Marzhanova"
];
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


const usersObj = [];
for (let i = 0; i < 30; i++) {
    const fullName = fullNames[getRandomInt(0, fullNames.length - 1)];
    const email = `${fullName.toLowerCase().replace(/\s+/g, ".")}@mail.com`;
    const lab1 = getRandomInt(51, 100);
    const lab2 = getRandomInt(51, 100);
    const lab3 = getRandomInt(51, 100);
    const lab4 = getRandomInt(51, 100);
    const ass1 = getRandomInt(51, 100);
    const ass2 = getRandomInt(51, 100);
    const finalMark = getRandomInt(80, 100);

    const user = {
        fullName: fullName,
        email: email,
        lab1: lab1,
        lab2: lab2,
        lab3: lab3,
        lab4: lab4,
        ass1: ass1,
        ass2: ass2,
        finalMark: finalMark,
        group: i < 15 ? 'CS-2205' : 'CS-2206'
    };

    usersObj.push(user);
}


const students = []
class User {
    constructor(fullName, email, finalMark, registerMid, registerEnd, lab1, lab2, lab3, lab4, ass1, ass2, group) {
        this.fullName = fullName;
        this.email = email;
        this.finalMark = finalMark;
        this.registerMid = registerMid;
        this.registerEnd = registerEnd;
        this.lab1 = lab1;
        this.lab2 = lab2;
        this.lab3 = lab3;
        this.lab4 = lab4;
        this.ass1 = ass1;
        this.ass2 = ass2;
        this.group = group
    }
}

function generateUsers() {
    usersObj.forEach((user, index) => {
        let registerMid = user.ass1 * 0.5 + user.lab1 * 0.25 + user.lab2 * 0.25
        let registerEnd = user.ass2 * 0.5 + user.lab3 * 0.25 + user.lab4 * 0.25

        const userObject = new User(user.fullName, user.email, user.finalMark, registerMid, registerEnd, user.lab1, user.lab2, user.lab3, user.lab4, user.ass1, user.ass2, user.group)

        students.push(userObject)
    })
}

generateUsers()

function renderDom(array) {

    console.log('here', array);
    const tableBody = document.querySelector('tbody')
    const childElements = Array.from(tableBody.children).slice(3);

    console.log(childElements);
    // Remove the child elements
    childElements.forEach(childElement => {
        tableBody.removeChild(childElement);
    })


    array.forEach(user => {

        const newRow = document.createElement('tr');

        const fullNameCell = document.createElement('td');
        fullNameCell.textContent = user.fullName;

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;

        const finalMarkCell = document.createElement('td');
        finalMarkCell.textContent = user.finalMark;

        const registerMidCell = document.createElement('td');
        registerMidCell.textContent = user.registerMid;

        const registerEndCell = document.createElement('td');
        registerEndCell.textContent = user.registerEnd;

        const lab1Cell = document.createElement('td');
        lab1Cell.textContent = user.lab1;

        const lab2Cell = document.createElement('td');
        lab2Cell.textContent = user.lab2;

        const lab3Cell = document.createElement('td');
        lab3Cell.textContent = user.lab3;

        const lab4Cell = document.createElement('td');
        lab4Cell.textContent = user.lab4;

        const ass1Cell = document.createElement('td');
        ass1Cell.textContent = user.ass1;

        const ass2Cell = document.createElement('td');
        ass2Cell.textContent = user.ass2;

        newRow.appendChild(fullNameCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(finalMarkCell);
        newRow.appendChild(registerMidCell);
        newRow.appendChild(registerEndCell);
        newRow.appendChild(lab1Cell);
        newRow.appendChild(lab2Cell);
        newRow.appendChild(lab3Cell);
        newRow.appendChild(lab4Cell);
        newRow.appendChild(ass1Cell);
        newRow.appendChild(ass2Cell);

        tableBody.appendChild(newRow);

    });
}

console.log('stud', students);

function getStudentsByLetter(l, byName = true) {
    let current = [];

    students.forEach(stud => {
        let name = stud.fullName.split(' ')[0];
        let surname = stud.fullName.split(' ')[1];

        if (byName) {
            if (name[0] === l) {
                current.push(stud)
            };
        } else {
            if (surname[0] === l) current.push(stud);
        }
    });
    current = current.filter((item, index, self) => {
        return index === self.findIndex(obj => obj.fullName === item.fullName);
    });
    return current;
}

function generateLettersBlock(firstname = true) {
    let str = '';
    for (let i = 0; i < letters.length; i++) {
        if (firstname) str += `<button class="first-name-letters" id="first-name-letters-${letters[i]}">${letters[i]}</button>`;
        else str += `<button class="second-name-letters" id="second-name-letters-${letters[i]}">${letters[i]}</button>`;
    }

    return str;
}

function handleButtonClick(arr) {
    // Code to execute when the button is clicked
    renderDom(arr);
}

function start() {
    renderDom(students);
    const lettersBlockOfNames = document.querySelector('.filter-first-name');
    const block = `
      <p>First Name</p>
      <button class="first-name-all">All</button>
      <div>
          ${generateLettersBlock()}
      </div>`;
    lettersBlockOfNames.innerHTML = block;

    const lettersBlockOfSurnames = document.querySelector('.filter-second-name');
    const blockSurname = `
      <p>Surname</p>
      <button class="second-name-all">All</button>
      <div>
          ${generateLettersBlock(false)}
      </div>`;
    lettersBlockOfSurnames.innerHTML = blockSurname;
}

start();

let allByName = document.querySelector('.first-name-all')
allByName.addEventListener('click', () => {
    renderDom(students)
})

for (let i = 0; i < letters.length; i++) {
    let letter = document.querySelector(`#first-name-letters-${letters[i]}`)
    if (letter) {
        letter.addEventListener('click', () => {
            let arr = getStudentsByLetter(letters[i])
            renderDom(arr)
        })
    }
}

let allBySurname = document.querySelector('.second-name-all')
allBySurname.addEventListener('click', () => {
    renderDom(students)
})

for (let i = 0; i < letters.length; i++) {
    let letter = document.querySelector(`#second-name-letters-${letters[i]}`)
    if (letter) {
        letter.addEventListener('click', () => {
            let arr = getStudentsByLetter(letters[i], false)
            renderDom(arr)
        })
    }
}

const selectElement = document.querySelector('#sort-select')
const selectedValue = selectElement.value;

selectElement.addEventListener('change', () => {
    const arr = students.filter(stud => stud.group === selectElement.value)

    const participantsNumberElement = document.querySelector('#participants-number')
    participantsNumberElement.innerHTML = selectElement.value !== 'all' ? arr.length : students.length

    const maxParticipantsNumberElement = document.querySelector('#max-participants-number')
    maxParticipantsNumberElement.innerHTML = students.length

    renderDom(selectElement.value !== 'all' ? arr : students)
})



const teacherBtn = document.querySelector('#teacher');

teacherBtn.addEventListener('click', handleButton);

function handleButton(){
    const infoAboutTeacher = document.querySelector('.info');

    infoAboutTeacher.classList.toggle( "infoActive");
}

