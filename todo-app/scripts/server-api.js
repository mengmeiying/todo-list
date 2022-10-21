export async function getTodoList(keyName) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${keyName}`);
  return response.json();
}

export async function createTodoItem({ keyName, name }) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name,
      owner: keyName,
      done: false,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export function switchTodoItemDone(todoItem) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      done: !todoItem.done,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function deleteTodoItem(todoItem) {
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
  });
}
