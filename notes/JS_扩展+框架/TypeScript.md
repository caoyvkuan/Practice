# TypeScript

+ 可以做到类型限制,且拥有很多不同的变量类型
+ `let variable: number` ,规定 variable 变量为 number 类型
+ 同时对函数的参数和数量也是可以做出限制的
```ts
function(a:number,b:number):number{
   /*
      这个函数接受两个参数,多一个或少一个都会报错
      且传入的参数必须是数字
      返回值也需要是一个数字,不然就会报错
   */
   return a + b;
}
```
