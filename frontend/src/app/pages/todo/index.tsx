import React, { useState, useEffect, useRef } from 'react';
import TodoCreator from './formInput/form';
import TodoList from './todoList/todoList';
import style from './index.css';
import CustomPopup from '../../components/Modal/modal';
import { MainHeader } from '../../components/Header/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodoApiData,
  createTodo,
  deleteTodoApiData,
  editTodoApiSingleData,
  getTodoSinlgeApiData
} from 'app/redux/actions';
import toast, { Toaster } from 'react-hot-toast';
import TodoEditor from './editTodo/editTodo';

const Form = () => {
  const dispatch = useDispatch();
  const [title, setTitle]: any = useState('');
  const [status, setStatus]: any = useState('');
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [todoAllData, setTodoAllData]: any = useState([]);
  const [todoData, setTodoData]: any = useState([]);
  const [selectStatus, setSelectStatus] = useState();
  const [editId, setEditId] = useState();
  const { payload } = useSelector((data: any) => data.todoDataList);
  const toastData = useSelector((data: any) => data?.createtodoDataReducer?.payload?.todoData);
  const deletData = useSelector((data: any) => data?.deleteSingleDataReducer?.payload);
  const editData = useSelector((data: any) => data?.editTodoDataReducer?.payload?.todoData);
  const getData = useSelector((data: any) => data?.getTodoeDataReducer?.payload?.todoData?.todo);
  const [editTitle, setEditTitle] = useState('');
  const [editStatus, setEditStatus] = useState('');
  
  const handleSubmit = (e: any) => {
    dispatch(createTodo(title, status));
    dispatch(fetchTodoApiData());

  };
  useEffect(() => {
    if (getData) {
      setEditTitle(getData?.title);
      setEditStatus(getData?.status);
    }
  }, [getData]);
  useEffect(() => {
    if (toastData?.message == 'todo created successfully') {
      toast(toastData?.message);
      setShow(false);
    }
  }, [toastData]);
  useEffect(() => {
    if (editData?.title) {
      toast('todo updated successfully');
      setShowEdit(false);
      dispatch(fetchTodoApiData());
    }
  }, [editData]);
  useEffect(() => {
    if (deletData?.todoData?.message == 'todos delete succesfully') {
      toast(deletData?.todoData?.message);
      dispatch(fetchTodoApiData());
    }
  }, [deletData?.todoData]);
  useEffect(() => {
    dispatch(fetchTodoApiData());
  }, []);
  useEffect(() => {
    if (payload?.todoData?.todos) {
      setTodoData(payload?.todoData?.todos);
      setTodoAllData(payload?.todoData?.todos);
    }
  }, [payload?.todoData?.todos]);
  const editOnChange = (_id: any) => {
    setShowEdit(true);
    setEditId(_id);
    dispatch(getTodoSinlgeApiData(_id));
  };

  const editTodoAPI = () => {
    dispatch(editTodoApiSingleData(editId, editTitle, editStatus));
  };
  const deleteTodo = (_id: any) => {
    dispatch(deleteTodoApiData(_id));
  };
  useEffect(() => {
    if (selectStatus) {
      const filter_data = todoData?.filter((data: any) => {
        if (data.status == selectStatus) {
          return data.status;
        }
      });
      setTodoAllData(filter_data);
    }
  }, [selectStatus]);

  return (
    <>
      <Toaster />
      <MainHeader />
      <h1 className={style.todoList}>TODO List</h1>
      <div className={style.todomenu}>
        <div className={style.mainbtn}>
          <button type="submit" className={style.addTaskBtn} onClick={() => setShow(true)}>
            Add task
          </button>
          <select
            className={style.selectdata}
            value={selectStatus}
            onChange={(e: any) => setSelectStatus(e.target.value)}
          >
            <option value={'select'}>select option</option>
            <option value={'completed'}>completed</option>
            <option value={'uncompleted'}>uncompleted</option>
          </select>
        </div>
        <TodoList
          todoAllData={todoAllData}
          deleteTodo={deleteTodo}
          editTodoAPI={editTodoAPI}
          editOnChange={editOnChange}
        />
      </div>
      {show && (
        <CustomPopup onClose={() => setShow(false)} show={show} title="Create Task">
          <TodoCreator
            setTitle={setTitle}
            setStatus={setStatus}
            title={title}
            status={status}
            handleSubmit={handleSubmit}
          />
        </CustomPopup>
      )}
      {showEdit && (
        <CustomPopup onClose={() => setShowEdit(false)} show={showEdit} title="Edit Task">
          <TodoEditor
            setEditTitle={setEditTitle}
            setEditStatus={setEditStatus}
            editTitle={editTitle}
            editStatus={editStatus}
            handleSubmit={editTodoAPI}
            getData={getData}
          />
        </CustomPopup>
      )}
    </>
  );
};

export default Form;
