import { useState, useContext, useCallback, useEffect } from "react";
import { AuthContext } from '../context/AuthContext'
import axios from '../axios';

export function MainPage() {
  const [text, setText] = useState('');
  const { userId } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadingData();
  }, [])

  const loadingData = useCallback(async () => {
    try {

      await axios.get('api/todo/', {
        headers: {
          'Content-Type': 'application/json',
        },
        // sa beq e gnum, ev darnum e req.query
        params: { userId }
      }).then(res => {
        setTodos(res.data);
      })


    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const createTodo = useCallback(async (e) => {
    e.preventDefault();

    if (!text) return;

    try {

      await axios.post('api/todo/add', { text, userId }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          setTodos([...todos], res.data)
          loadingData();
        })

    } catch (error) {
      console.log(error);
    }

    setText('');

  }, [text, userId, todos, loadingData]);


  const removeTodo = useCallback(async (id) => {
    try {

      await axios.delete('api/todo/delete/' + id, { id }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(() => {
        loadingData();
      })

    } catch (error) {
      console.log(error);
    }
  }, []);

  const completedTodo = async (id) => {
    try {
      await axios.put('api/todo/complete/' + id, { id }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        setTodos([...todos], res.data);
        loadingData();
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="MainPage">
      <h4>Add todo</h4>

      <form onSubmit={createTodo}>
        <input type="text" name="input" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="submit" value="add" />
      </form>


      <h3>Activnie zadachi</h3>
      <div className="todos">
        <div className="todo">
          <div className="num">1</div>
          <div className="text">text</div>

          <div className="buttons">
            <i className="fa-solid fa-check"></i>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>

        {
          todos.map((todo, index) => <div
            className={todo.completed ? "todo completed" : 'todo'}
            key={index}
          >
            <div className="num">{index + 1}</div>
            <div className="text">{todo.text}</div>

            <div className="buttons">
              <i className="fa-solid fa-check" onClick={() => completedTodo(todo._id)}></i>
              <i className="fa-solid fa-trash" onClick={() => removeTodo(todo._id)}></i>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}
