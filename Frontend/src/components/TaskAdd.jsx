import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Tooltip,
} from "antd";

function AddOrEdit({ data,fetchTasks,item  }) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen && data !== "add") {
      initialValues();
    }
  }, [isModalOpen]);

  const handleOk = (e) => {
    form
      .validateFields()
      .then((val) => {
        handleFinish(val);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFinish = async (values) => {
    try {
      const updatedValues = {
        ...values,
      };

      let response;
      if (data === "add") {
        response = await fetch("http://localhost:8000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        });
      } else {
        response = await fetch(`http://localhost:8000/tasks/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        });
      }

      if (response.status == 201 || 200) {
     
        setIsModalOpen(false);
        notification.success({
          message: data === "add" ? "تمت الإضافة بنجاح" : "تم التعديل بنجاح",
          placement: "bottomLeft",
        });
        fetchTasks();
      
        form.resetFields();

        
      } else {
        message.error("فشل في العملية. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
    }
  };

  const initialValues = () => {
    form.setFieldsValue({
      title: item.title,
    });
  };

  const Info = () => {
    return (
      <Form form={form} layout="vertical" name="addOrganizationForm">
        <Form.Item
          name="title"
          label=" المهمة"
          rules={[{ required: true, message: "يرجى ادخال الاسم" }]}
        >
          <Input
            placeholder="ادخل المهمة"
            className="h-[45px] rounded-[11px]"
          />
        </Form.Item>

        <div className="flex justify-center gap-6 py-5">
          <Button
            className="py-6 px-[5.5rem] rounded-lg"
            onClick={handleCancel}
          >
            الغاء
          </Button>
          <Button
            type="primary"
            className="font-bold py-6 px-[5.5rem] rounded-lg"
            onClick={handleOk}
          >
            حفظ
          </Button>
        </div>
      </Form>
    );
  };

  if (!isModalOpen) {
    return (
      <>
        {data === "add" ? (
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center"
          >
            اضافة
          </Button>
        ) : data === "edit" ? ( // Else if condition
          <Tooltip placement="top" title="تعديل">
            <div
              onClick={() => setIsModalOpen(true)}
           
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#199DEA"
                className=" cursor-pointer transition duration-300 ease-in-out"
              >
                <path
                  d="M17.7594 6.23209L14.268 2.74146C14.1519 2.62536 14.0141 2.53326 13.8624 2.47042C13.7107 2.40759 13.5482 2.37524 13.384 2.37524C13.2198 2.37524 13.0572 2.40759 12.9056 2.47042C12.7539 2.53326 12.6161 2.62536 12.5 2.74146L2.86641 12.3751C2.74983 12.4907 2.65741 12.6284 2.59451 12.7801C2.5316 12.9318 2.49948 13.0944 2.50001 13.2586V16.7501C2.50001 17.0816 2.6317 17.3995 2.86612 17.6339C3.10054 17.8684 3.41849 18.0001 3.75001 18.0001H16.875C17.0408 18.0001 17.1997 17.9342 17.3169 17.817C17.4342 17.6998 17.5 17.5408 17.5 17.3751C17.5 17.2093 17.4342 17.0503 17.3169 16.9331C17.1997 16.8159 17.0408 16.7501 16.875 16.7501H9.00938L17.7594 8.00006C17.8755 7.88398 17.9676 7.74617 18.0304 7.59449C18.0933 7.44282 18.1256 7.28025 18.1256 7.11607C18.1256 6.95189 18.0933 6.78933 18.0304 6.63765C17.9676 6.48597 17.8755 6.34816 17.7594 6.23209ZM7.24141 16.7501H3.75001V13.2586L10.625 6.38365L14.1164 9.87506L7.24141 16.7501ZM15 8.99146L11.5094 5.50006L13.3844 3.62506L16.875 7.11646L15 8.99146Z"
                  fill="inherit"
                  fillOpacity="inherit"
                />
              </svg>
            </div>
          </Tooltip>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <div>
      <Modal
        title={
          <div
            style={{ textAlign: "center", padding: "15px", color: "#7D7D7D" }}
          >
            {data === "add" ? "اضافة فريق" : "تعديل الفريق"}
          </div>
        }
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        style={{ top: 20 }}
        closable={false}
        className="rounded-lg text-center"
      >
        <Info />
      </Modal>
    </div>
  );
}

export default AddOrEdit;
