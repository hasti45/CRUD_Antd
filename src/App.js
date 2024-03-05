import './App.css';
import { useState } from 'react';
import {
  Button,
 
  Select,
 
  Form,
  Input,
} from 'antd';



function App() {

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


  const [inputData, setInputData] = useState({ fname: "", lname: "", add: "", email: "", phone: "" });
  const [mainData, setMainData] = useState(JSON.parse(localStorage.getItem("localdata")) || []);
  const [isEdit, setIsEdit] = useState(-1)


  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width:70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );



  
    // eidt buton 

  
  console.log(inputData);

  // deletebutton

  const handledelte = (index) => {
    const deletedata = mainData.filter((item, i) => i !== index);
    setMainData(deletedata);
    localStorage.setItem("localdata", JSON.stringify(deletedata));
  }




  // edit button 

  const handleEdit = (id, record) => {
    setIsEdit(id);
    setInputData(record);
  }



  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    if (isEdit !== -1) {
      const updatee = mainData.map((item, index) => {
        if (isEdit === index) {
          return values;
        } return item;
      }
      )
      setMainData(updatee)
    }

    else {
      setMainData([...mainData, values]);
      localStorage.setItem("localdata", JSON.stringify([...mainData, values]));
    }
  };

  return (
    <>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}> FORM</h1>
      <div style={{ width: '250px', margin: 'auto' }}>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"



          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="First name"
            name="fname"


            rules={[{
              required: true,
              message: 'first name',
            }]}  >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lname"


            rules={[{
              required: true,
              message: 'last name',
            }]}  >
            <Input />
          </Form.Item>


          <Form.Item
            label="Address"
            name="add"


            rules={[{
              required: true,
              message: 'Address',
            }]}  >
            <Input />
          </Form.Item>



          <Form.Item
            name='email'
            label="Email"

            rules={[{
              type: 'email',
            },]} >
            <Input />
          </Form.Item>


          <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

        </Form>
      </div>



      <div style={{ width: '800px', margin: 'auto' }}>
        <table>
          <thead>
            <th>first name</th>
            <th>last name</th>
            <th>address</th>
            <th>email</th>
            <th>phone</th>
            <th>delete</th>
            <th>Edit</th>


          </thead>
          <tbody>
            {mainData?.map((item, index) => {
              return (
                <tr>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.add}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td><button type='button' onClick={() => handledelte(index)}>delete</button></td>
                  <td><button type='button' onClick={() => handleEdit(index, item)}>Edit</button></td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </>
  );
}


export default App;









