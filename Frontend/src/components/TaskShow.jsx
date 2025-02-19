import React, { useEffect, useState } from 'react';
import { List, message, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TaskAdd from "./TaskAdd"
// Move initialTasks outside the component

const TaskShow = () => {
  const [tasks, setTasks] = useState();

  

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
  
      const data = await response.json();
      setTasks(data)
      console.log("Tasks:", data); // Handle the fetched data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  // Call the function
  
  

  // Handle Edit
  const handleEdit = (id) => {
    const newTitle = prompt('Edit the task title:');
    if (newTitle) {
      setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id)); // Update UI after successful delete
        message.success("تم حذف المهمة بنجاح"); // Show success message
      } else {
        message.error("فشل في حذف المهمة"); // Show error if deletion fails
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("حدث خطأ أثناء الحذف"); // Show error message
    }
  };
  

  return (
    <>
    <TaskAdd onfetch={setTasks} />
    <List
      header={<h2>قائمة المهام</h2>}
      bordered
      style={{ maxHeight: "450px", overflowY: "auto", scrollbarWidth: "none",  }}
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
    </>
  );
};

export default TaskShow;
