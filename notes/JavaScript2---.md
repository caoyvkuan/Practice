# JavaScript

## 函数与方法 ##

### 本地储存

+ ```javascript
  ☞  localStorage：
  1. 永久生效
  2. 多窗口共享
  3. 容量大约为20M
  
  ◆window.localStorage.setItem(key,value)  设置存储内容
  ◆window.localStorage.getItem(key)  		 获取内容
  ◆window.localStorage.key(0)
  ◆window.localStorage.key
  ◆window.localStorage.removeItem(key)	 删除内容
  ◆window.localStorage.clear()			清空内容
  
  ☞ sessionStorage：
  1. 生命周期为关闭当前浏览器窗口
  2. 可以在同一个窗口下访问
  3. 数据大小为5M左右
  
  ◆window.sessionStorage.setItem(key,value)
  ◆window.sessionStorage.getItem(key)
  ◆window.sessionStorage.removeItem(key)
  ◆window.sessionStorage.clear()
  
  window.sessionStorage.setItem("name","123");
  
  var list=
  '[{"name":"zhans","age":"18","gender":"男"},
  {"name":"lis","age":"23","gender": "女"}]';
  window.sessionStorage.setItem("list",list);
  ```


#### 获取网络状态

+ ```javascript
    ☞ 获取当前网络状态
    		 window.navigator.onLine 返回一个布尔值
    
    ☞ 网络状态事件
    		 1. window.ononline		网络链接时触发
    		 2. window.onoffline	网络断开是触发
  ```

#### 获取当前位置

+ ```javascript
    ☞  获取一次当前位置
    	  window.navigator.geolocation.getCurrentPosition(success,error);
    
    1. coords.latitude   维度
        2. coords.longitude   经度
    
    ☞  实时获取当前位置
    	  window.navigator.geolocation.watchPosition(success,error);
  ```



