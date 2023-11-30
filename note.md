<!--
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-09 17:10:35
 * @LastEditTime: 2023-11-30 15:33:33
 * @LastEditors: breeze1307
-->
#### **1.husky提交报错**

![husky提交报错](https://raw.githubusercontent.com/Breeze1307/img/main/20231109171054.png)    
解决方案：将husky文件夹下的pre-commit文件中自动生成的注释删除，`#!/usr/bin/env sh`保持在第一行  
成功执行如下图：  
![husky成功-push前自动检查格式](https://raw.githubusercontent.com/Breeze1307/img/main/20231109171308.png)  

#### **2.element-plus国际化打包失败**  

![element-plus国际化打包失败](https://raw.githubusercontent.com/Breeze1307/img/main/20231109183907.png)  
解决方案：使用`//@ts-ignore`忽略类型检查  
![20231124150034](https://raw.githubusercontent.com/Breeze1307/img/main/20231124150034.png)  

#### **3.vite--Mockjs引入使用错误** 

`const Mock = require('mockjs')`
![报错信息](https://raw.githubusercontent.com/Breeze1307/img/main/20231128153126.png) 
解决方案：  
1.将require转换为import语句  
2.在根目录下新建一个名为`.d.ts`的文件，写入`declare module 'mockjs';`声明mockjs文件  

#### **4.nodemon运行ts文件报错**  

![20231130110254](https://raw.githubusercontent.com/Breeze1307/img/main/20231130110254.png)  
解决方案：nodemon无法直接运行ts文件，需要安装`ts-node`插件，`pnpm install -D ts-node`,并在`tsconfig.json`中配置`"ts-node": { "esm": true }`

#### **5.ts检查报错**  

错误一：  
![20231130110602](https://raw.githubusercontent.com/Breeze1307/img/main/20231130110602.png)  
解决方案：设置`tsconfig.json`文件中的`strict:false`  
错误二：  
![20231130110834](https://raw.githubusercontent.com/Breeze1307/img/main/20231130110834.png)  
解决方案：设置`noUnusedParameters:false`  
注意：一般不建议这样解决。（我属实难得去一个个定义类型了/(ㄒoㄒ)/~~）  

#### **6.node-express使用res.body框架报错**  

![20231130141354](https://raw.githubusercontent.com/Breeze1307/img/main/20231130141354.png)  
解决方案：在路由定义前添加`app.use(express.json())`  
![20231130141524](https://raw.githubusercontent.com/Breeze1307/img/main/20231130141524.png)  
