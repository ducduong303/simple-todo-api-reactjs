import React from 'react';

function TodoItem(props) {
    const { data ,removeItem,editItem} = props
    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div key={index}>
                        <h3>{item.name} 
                         <button onClick={() => removeItem(item.id)}>Xóa</button>
                         <button onClick={() => editItem (item.id)}>Sửa</button>
                         </h3>
                    </div>
                )
            })}
        </div>
    );
}

export default TodoItem;