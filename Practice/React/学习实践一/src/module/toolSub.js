import './CSS/toolSub.css';
import { Checkbox, Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';




// 展示的信息
function ShowSpan(props) {

  return (
    <>
      <label htmlFor={props.id}> {props.name}： </label>
      <span> {props.count} </span>
      <Checkbox
        checked={props.checked}
        id={props.id}
        onChange={props.onChange}
        className="checkbox"
      />
    </>
  );
}

// 下拉菜单
function DropList(props) {

  return (
    <Dropdown overlay={props.menu}>
      <Button className="but">
        {props.name}<DownOutlined />
      </Button>
    </Dropdown>
  );
}

// 按钮
function MyButton(props) {
  let { className, onClick, children } = props;
  if (!className) {
    className = '';
  }
  if (typeof onClick !== 'function') {
    onClick = () => { }
  }
  if (!children) {
    children = 'MyButton';
  }
  
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  )
}

export {
  ShowSpan,
  DropList,
  MyButton as Button
}