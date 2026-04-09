const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const classForm = document.getElementById('class-form');
const className = document.getElementById('class-name');
const classTime = document.getElementById('class-time');
const classList = document.getElementById('class-list');

const gpaForm = document.getElementById('gpa-form');
const creditHours = document.getElementById('credit-hours');
const grade = document.getElementById('grade');
const gpaList = document.getElementById('gpa-list');
const gpaResult = document.getElementById('gpa-result');

let totalPoints = 0;
let totalCredits = 0;

function createListItem(text, parent) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    parent.removeChild(li);
  });

  li.append(span, removeBtn);
  parent.appendChild(li);
  return { li, removeBtn };
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createListItem(taskInput.value.trim(), taskList);
  taskInput.value = '';
});

classForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createListItem(`${className.value.trim()} - ${classTime.value}`, classList);
  className.value = '';
  classTime.value = '';
});

gpaForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const credits = Number(creditHours.value);
  const gradePoint = Number(grade.value);
  const { removeBtn } = createListItem(`${credits} credits • Grade ${grade.options[grade.selectedIndex].text}`, gpaList);

  totalCredits += credits;
  totalPoints += credits * gradePoint;
  updateGpa();

  removeBtn.addEventListener('click', () => {
    totalCredits -= credits;
    totalPoints -= credits * gradePoint;
    updateGpa();
  });

  creditHours.value = '';
  grade.value = '';
});

function updateGpa() {
  const value = totalCredits === 0 ? 0 : totalPoints / totalCredits;
  gpaResult.textContent = value.toFixed(2);
}
