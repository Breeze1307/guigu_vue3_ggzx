<!--
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-09 17:10:35
 * @LastEditTime: 2023-11-28 15:44:26
 * @LastEditors: breeze1307
-->
**husky提交报错**

![husky提交报错](https://raw.githubusercontent.com/Breeze1307/img/main/20231109171054.png)    
解决方案：将husky文件夹下的pre-commit文件中自动生成的注释删除，`#!/usr/bin/env sh`保持在第一行  
成功执行如下图：  
![husky成功-push前自动检查格式](https://raw.githubusercontent.com/Breeze1307/img/main/20231109171308.png)  

**element-plus国际化打包失败**  

![element-plus国际化打包失败](https://raw.githubusercontent.com/Breeze1307/img/main/20231109183907.png)  
解决方案：使用`//@ts-ignore`忽略类型检查  
![20231124150034](https://raw.githubusercontent.com/Breeze1307/img/main/20231124150034.png)  

**vite--Mockjs引入使用错误**  
`const Mock = require('mockjs')`
![报错信息](https://raw.githubusercontent.com/Breeze1307/img/main/20231128153126.png) 
解决方案：  
1.将require转换为import语句  
2.在根目录下新建一个名为`.d.ts`的文件，写入`declare module 'mockjs';`声明mockjs文件  