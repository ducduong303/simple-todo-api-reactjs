import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import apiCall from '../utils/apiCall';
function Todo(props) {

    const [data, setData] = useState([]);
    const [newItem, setNewItem] = useState({
        id: "",
        name: ""
    })
    useEffect(() => {
        apiCall('users', "GET", null)
            .then(res => setData(res.data))
    }, [])

    const onChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        })
    }

    const onCreate = (e) => {
        e.preventDefault()
        if (newItem.name === "") {
            alert("chưa nhập dữ liệu ")
            return;
        }

        // Đây là lúc update khi có ID 
        if (newItem.id) {
            apiCall(`users/${newItem.id}`, "PUT", {
                name: newItem.name
            }).then(res => {
                apiCall('users', "GET", null)
                    .then(res => setData(res.data))
                    setNewItem({
                        id: "",
                        name: ""
                    })
            })

        // Đây là khi id ="" là trường hợp thêm mới 
        } else {
            apiCall("users", "POST", {
                name: newItem.name
            }).then(res => setData([...data, res.data]))
            setNewItem({
                id: "",
                name: ""
            })
        }
    }
    const removeItem = (id) => {
        apiCall(`users/${id}`, "DELETE", null)
            .then(res => {
                if (res.status === 200) {
                    const cloneData = [...data]
                    const newData = cloneData.filter((item) => item.id !== id);
                    setData(newData)
                }
            })
    }

    const editItem = (id) => {
        apiCall(`users/${id}`, "GET", null)
            .then(res => {
                var dataApi = res.data;
                setNewItem({
                    id: dataApi.id,
                    name: dataApi.name
                })
            })

    }

    return (
        <div>
            <form onSubmit={onCreate}>
                <input type="text" value={newItem.name} name="name" onChange={onChange} placeholder="Nhập..." />
                <button type="submit">sumit</button>
            </form>
            <TodoItem data={data} removeItem={removeItem} editItem={editItem}></TodoItem>
        </div>
    );
}

export default Todo;