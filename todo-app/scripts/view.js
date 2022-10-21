function createAppTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemElementForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';
  button.disabled = 'disabled';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');

  return list;
}

function createTodoItemElement(name, done) {
  const item = document.createElement('li');
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex',
    'justify-content-between', 'align-items-center');
  const itemText = document.createElement('span');
  itemText.textContent = name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(itemText);
  item.append(buttonGroup);

  if (done) {
    item.classList.add('list-group-item-success');
  }

  return {
    item,
    doneButton,
    deleteButton,
    itemText,
  };
}

function addEventsToButtons(todoItemElement, todoItem, keyName, { onDone, onDelete }) {
  todoItemElement.doneButton.addEventListener('click', () => {
    todoItemElement.item.classList.toggle('list-group-item-success');
    onDone(todoItem, keyName);
  });

  todoItemElement.deleteButton.addEventListener('click', () => {
    if (window.confirm('Вы уверены?')) {
      todoItemElement.item.remove();
    }
    onDelete(todoItem, keyName);
  });
}

export default async function createTodoApp(container, {
  title,
  keyName,
  itemsArray = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
}) {
  container.textContent = '';
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemElementForm();
  const todoList = createTodoList();

  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  if (itemsArray) {
    for (const todoItem of itemsArray) {
      const todoItemElement = createTodoItemElement(todoItem.name, todoItem.done);
      addEventsToButtons(todoItemElement, todoItem, keyName, handlers);
      container.append(todoItemElement.item);
    }
  }

  todoItemForm.input.addEventListener('input', () => {
    if (!todoItemForm.input.value) {
      todoItemForm.button.disabled = 'disabled';
    } else {
      todoItemForm.button.disabled = '';
    }
  });

  todoItemForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = onCreateFormSubmit({ keyName, name: todoItemForm.input.value.trim() });

    const todoItemElement = createTodoItemElement(todoItem.name, todoItem.done);
    addEventsToButtons(todoItemElement, todoItem, keyName, handlers);
    todoList.append(todoItemElement.item);

    todoItemForm.input.value = '';
    todoItemForm.button.disabled = 'disabled';
  });
}
