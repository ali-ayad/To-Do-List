import React, { useEffect, useState } from 'react';
import { List, message, Popconfirm, Tooltip, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TaskAdd from "./TaskAdd"
// Move initialTasks outside the component

const TaskShow = ({fetchTasks, tasks,loading,setTasks}) => {
  
  

  

  useEffect(() => {
    fetchTasks();
  }, []);

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
   
    <List
      header={<h2>قائمة المهام</h2>}
      bordered
      style={{ maxHeight: "450px", overflowY: "auto", scrollbarWidth: "none",  }}
      dataSource={tasks}
      loading={loading}
      renderItem={item => (
        <List.Item
          actions={[
            <TaskAdd data={'edit'} item={item} fetchTasks={fetchTasks} />,
            <Tooltip placement="top" title="حذف">
            <Popconfirm
           
              title="هل تريد الحذف ؟"
              okText="نعم "
              cancelText="كلا"
              onConfirm={async () => {
                handleDelete(item.id)
              }}
            >
              <div className=" flex justify-between items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#EA1919"
                  className="cursor-pointer transition duration-300 ease-in-out"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.59097 2.37502H11.4088C11.5892 2.3749 11.7463 2.3748 11.8946 2.39849C12.4807 2.49208 12.9879 2.85762 13.262 3.38403C13.3314 3.51727 13.381 3.66634 13.4379 3.83745L13.5309 4.11654C13.5466 4.16378 13.5511 4.17715 13.5549 4.18768C13.7009 4.59111 14.0792 4.86383 14.5081 4.8747C14.5194 4.87498 14.5332 4.87503 14.5832 4.87503H17.0832C17.4284 4.87503 17.7082 5.15485 17.7082 5.50003C17.7082 5.84521 17.4284 6.12503 17.0832 6.12503H2.9165C2.57133 6.12503 2.2915 5.84521 2.2915 5.50003C2.2915 5.15485 2.57133 4.87503 2.9165 4.87503H5.41657C5.46661 4.87503 5.48042 4.87498 5.4917 4.8747C5.92057 4.86383 6.29892 4.59113 6.44486 4.1877C6.44869 4.17709 6.45311 4.16401 6.46893 4.11654L6.56194 3.83747C6.61885 3.66637 6.66844 3.51728 6.73782 3.38403C7.01195 2.85762 7.51911 2.49208 8.10519 2.39849C8.25354 2.3748 8.41064 2.3749 8.59097 2.37502ZM7.50663 4.87503C7.54955 4.79085 7.58759 4.70337 7.62032 4.6129C7.63025 4.58543 7.64 4.55619 7.65252 4.51861L7.73569 4.2691C7.81167 4.04118 7.82916 3.99469 7.84651 3.96137C7.93789 3.7859 8.10694 3.66405 8.3023 3.63285C8.33941 3.62693 8.38903 3.62503 8.62929 3.62503H11.3705C11.6108 3.62503 11.6604 3.62693 11.6975 3.63285C11.8929 3.66405 12.0619 3.7859 12.1533 3.96137C12.1707 3.99469 12.1881 4.04117 12.2641 4.2691L12.3472 4.51846L12.3795 4.61292C12.4122 4.70338 12.4503 4.79085 12.4932 4.87503H7.50663Z"
                    fill="inherit"
                    fillOpacity="inherit"
                  />
                  <path
                    d="M4.92908 7.54179C4.90612 7.19738 4.6083 6.93679 4.26389 6.95975C3.91947 6.98271 3.65889 7.28053 3.68185 7.62494L4.06805 13.4181C4.1393 14.487 4.19685 15.3505 4.33183 16.028C4.47216 16.7324 4.71084 17.3208 5.20384 17.7821C5.69684 18.2433 6.29979 18.4423 7.012 18.5355C7.69702 18.6251 8.56237 18.625 9.63367 18.625H10.3661C11.4374 18.625 12.3028 18.6251 12.9878 18.5355C13.7 18.4423 14.303 18.2433 14.796 17.7821C15.289 17.3208 15.5277 16.7324 15.668 16.028C15.803 15.3505 15.8605 14.487 15.9318 13.4181L16.318 7.62494C16.3409 7.28053 16.0803 6.98271 15.7359 6.95975C15.3915 6.93679 15.0937 7.19738 15.0707 7.54179L14.6875 13.2911C14.6126 14.4143 14.5592 15.1958 14.4421 15.7838C14.3284 16.3542 14.1698 16.6561 13.942 16.8692C13.7141 17.0824 13.4024 17.2206 12.8257 17.296C12.2312 17.3738 11.4478 17.375 10.3221 17.375H9.67767C8.55197 17.375 7.76863 17.3738 7.17413 17.296C6.59746 17.2206 6.28566 17.0824 6.05782 16.8692C5.82998 16.6561 5.67136 16.3542 5.55774 15.7838C5.4406 15.1958 5.38724 14.4143 5.31236 13.2911L4.92908 7.54179Z"
                    fill="inherit"
                    fillOpacity="inherit"
                  />
                  <path
                    d="M7.85439 9.0448C8.19785 9.01045 8.50413 9.26104 8.53848 9.60451L8.95514 13.7712C8.98949 14.1146 8.7389 14.4209 8.39544 14.4553C8.05197 14.4896 7.7457 14.239 7.71135 13.8956L7.29468 9.72889C7.26033 9.38542 7.51092 9.07915 7.85439 9.0448Z"
                    fill="inherit"
                    fillOpacity="inherit"
                  />
                  <path
                    d="M12.1454 9.0448C12.4889 9.07915 12.7395 9.38542 12.7051 9.72889L12.2885 13.8956C12.2541 14.239 11.9479 14.4896 11.6044 14.4553C11.2609 14.4209 11.0103 14.1146 11.0447 13.7712L11.4613 9.60451C11.4957 9.26104 11.802 9.01045 12.1454 9.0448Z"
                    fill="inherit"
                    fillOpacity="inherit"
                  />
                </svg>
              </div>
            </Popconfirm>
          </Tooltip>
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
