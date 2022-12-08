import React from 'react';
import style from './todoList.css';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';

const TodoList = ({ todoAllData, deleteTodo, editTodoAPI ,editOnChange}: any) => {
  const authdata = localStorage.getItem('@auth');
  const authJson = authdata !== null ? JSON.parse(authdata) : '{}';
  return (
    <div className={style.line}>
      {todoAllData?.length > 0 ? (
        <>
          {todoAllData.map((todo: any, inx: any) => {
            return (
              <div className={style.todoitem}>
                <div>
                  <p>{todo?.title}</p>
                  <p>{todo?.creationDate}</p>
                  <p>{todo?.status}</p>
                </div>
                <div>
                  {authJson?.data?.role == 'admin' && (
                    <AiFillDelete className={style.iconwidth} onClick={() => deleteTodo(todo?._id)} />
                  )}
                  <AiOutlineEdit className={style.iconwidth} onClick={() => editOnChange(todo?._id)} />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p className={style.notodo}>No todos</p>
      )}
    </div>
  );
};

export default TodoList;
