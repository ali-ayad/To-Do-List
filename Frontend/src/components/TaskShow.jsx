import React, { useState } from 'react';
import { List, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Move initialTasks outside the component
const initialTasks = [
  { id: 1, title: 'Wake up' },
  { id: 2, title: 'Have breakfast' },
  { id: 3, title: 'Go to work' },
];

const TaskShow = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Handle Edit
  const handleEdit = (id) => {
    const newTitle = prompt('Edit the task title:');
    if (newTitle) {
      setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <List
      header={<h2>قائمة المهام</h2>}
      bordered
      dataSource={tasks}
      renderItem={item => (
        <List.Item
          actions={[
            <EditOutlined key="edit" onClick={() => handleEdit(item.id)} />,
            <DeleteOutlined key="delete" onClick={() => handleDelete(item.id)} />
          ]}
        >
          <Typography.Text>{item.title}</Typography.Text>
        </List.Item>
      )}
    />
  );
};

export default TaskShow;
