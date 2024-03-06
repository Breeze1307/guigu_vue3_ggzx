<!--
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-09 17:10:35
 * @LastEditTime: 2024-03-06 20:52:41
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

#### **5.ts检查报错(暴力解决)**  

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

#### **7.ts报错**  
(1)   
![20231201104614](https://raw.githubusercontent.com/Breeze1307/img/main/20231201104614.png)  
解决方案：`const  token  = checkUser?.token`,检查是否为undefined  
(2)  
![20231201105621](https://raw.githubusercontent.com/Breeze1307/img/main/20231201105621.png) 
当一个变量未使用又不得不包含它的时候，可以使用 _ 作为变量名前缀来表示这个变量是有意未使用的。   
解决方案：![20231201105806](https://raw.githubusercontent.com/Breeze1307/img/main/20231201105806.png)  
(3)  
```ts
// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon.vue'

const allGlobalComponent = { SvgIcon }

// 对外暴露插件对象
export default {
    // 必须为install，里面包含app应用实例，可以用于注册组件
    install(app) {
        Object.keys(allGlobalComponent).forEach(key => {
            // 注册全局组件
            app.component(key, allGlobalComponent[key])
            
        })
    }
}
```
错误一：![20231201165237](https://raw.githubusercontent.com/Breeze1307/img/main/20231201165237.png)  
解决方案：引入`vue`中的`App`作为`app`的类型  
错误二：![20231201165306](https://raw.githubusercontent.com/Breeze1307/img/main/20231201165306.png)  
解决方案：定义一个类型接口，其中键是字符串类型，值是 Component 类型或其子类型    
更改后的代码如下：
```ts
// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon.vue'
import { App,Component } from 'vue';

interface globalComponents {
  [key: string]: Component // 这是索引签名的语法，表示可以使用任意字符串键作为对象的键,值为Component类型或其子类型
}

const allGlobalComponent:globalComponents = { SvgIcon }

// 对外暴露插件对象
export default {
    // 必须为install，里面包含app应用实例，可以用于注册组件
    install(app:App) {
        Object.keys(allGlobalComponent).forEach((key:string) => {
            // 注册全局组件
            app.component(key, allGlobalComponent[key])
            
        })
    }
}
```
(4)  
![20231205171233](https://raw.githubusercontent.com/Breeze1307/img/main/20231205171233.png)   
解决方案：使用类型断言`as`,在此案例中如`(result.data.token) as string`  

思考：  
vue3表格数据中本身没有的属性，通过row可以添加，并直接更新dom在模板上展示，而vue2能添加，但是不会更新dom，不知道是不是ts类型定义的原因  
#### **8.element-plus问题记录**  
(1) 要使表单验证生效/不出错  
el-form要绑定数据，prop属性的值要与表单绑定数据里面的属性名称一致  
![20240305170931](https://raw.githubusercontent.com/Breeze1307/img/main/20240305170931.png)
#### **9.axios请求传参问题**  
get(url,config)  
get请求接收两个参数
post(url,data,config)，data作为请求体  
![20240306204732](https://raw.githubusercontent.com/Breeze1307/img/main/20240306204732.png)  
当遇到这种表单数据的post请求时
1.修改content-type
2.像get一样使用拼接
```ts
//给相应的职位下发权限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) =>
  request.post(
    '/admin/acl/permission/doAssign/?' + `roleId=${roleId}&permissionId=${permissionId}`,
  )
```
3.在将参数放在params里面，data要置为null  
```ts
// 权限分配请求
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>('/admin/acl/permission/doAssign', null, {
    params: { roleId: roleId, permissionId: permissionId.join(',') },
  })
```