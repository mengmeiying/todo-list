export function getTodoListLocal(keyName) {
  return JSON.parse(localStorage.getItem(keyName));
}

export function createTodoItemLocal({ keyName, name }) {
  const itemsArray = JSON.parse(localStorage.getItem(keyName)) || [];
  itemsArray.push({ name, done: false });
  localStorage.setItem(keyName, JSON.stringify(itemsArray));
  return { name, done: false };
}

export function switchTodoItemDoneLocal(todoItem, keyName) {
  const itemsArray = JSON.parse(localStorage.getItem(keyName)) || [];

  for (const i of itemsArray) {
    if (i.name === todoItem.name) {
      i.done = !i.done;
    }
  }
  localStorage.setItem(keyName, JSON.stringify(itemsArray));
}

export function deleteTodoItemLocal(todoItem, keyName) {
  const itemsArray = JSON.parse(localStorage.getItem(keyName)) || [];
  const array = [];

  for (const i of itemsArray) {
    if (i.name !== todoItem.name) {
      array.push(i);
    }
  }
  localStorage.setItem(keyName, JSON.stringify(array));
}
