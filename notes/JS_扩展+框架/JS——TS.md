# TypeScript

+ 作用
  + 能够给 JS 带来全新的类型检验功能


## 类型

+ 数值 ：number
+ 字面量 ：是什么就只能赋值什么
+ 字符串 ：string
+ 联合类型 ：number | string
+ 布尔值 ： boolean
+ 数组 ： `Array<any>`
+ 元组 ：`[number, string]`
+ 任意类型 ： any || unknown
  + 不声明类型，隐式就是 any
+ 枚举 ：enum
+ 空值 ：void
+ 没有值-永远不会返回结果 ：never
+ 任意对象 ：object
+ null 和 undefined
+ 断言 ：`<string>name` || `name as string`

+ 声明类型的方式也非常的简单
```ts
// 数值 二进制、八进制、十进制、十六进制都支持
let num: number = 10; 

// 字符串
let name: string = 'doge';

// 布尔值
let isDone: boolean = false;

// 数组 有两种方式，一、指定元素类型的数组，二、泛型数组
// 一、
let list: number[] = [1, 2, 3]; 
let list: Array<number> = [1, 2, 3]; 
// 二、
let list: any[] = [1, 'two', { three：3 }];

// 元组 Tuple 可以指定数组不同位置的类型
let arr: [string, number] = ['type', 2];
// 当索引超过限定的长度时，类型限定将为 (string | number)
arr[2] = 'type' || 4; // 只要是指定类型的其中之一就行

// 枚举 这是对 js 中类型的补充
enum Color { Red, Green, Blue };
let color: Color = Color.Red;
// 枚举元素可以采用编号， 默认从 0 开始
enum Color { Red = 1, Green, Blue };

// any  任何类型
// any 可以赋值给其他类型，但是可能因为其他类型从而导致报错
let type:any = false || 'type';
// unknown 是安全的 any，不允许将类型不确定的类型赋值给类型确定的赋值
let safeType:unknown = false || 'type';
// 如果想将 unknown 类型赋值给其他类型需要判断或是断言
let str: string;
if(typeof safeType === 'string'){
   str = safeType;
}
str = <string>safeType;

// 没有任何类型 一般作为作用与没有返回值的函数 - 空值或是 undefined
let empty:void = undefined;

// Null 和 Undefined , 这两个类型是所有类型的子类型，也就是说可以吧这两个值赋值给任意类型
let u: undefined = undefined;
let n: null = null;
// 指定了 --strictNullChecks 标记后， 这两个类型除了之身就只能赋值给 void

// never 可以赋值给任意类型，但是不能被任意类型赋值，表示永远不存在的值类型
// 一般存在总是会抛出异常的函数，或是根本不会有返回值的函数表达式或箭头函数
// 如： 抛出异常用的函数 或是 无限循环的函数（即不会执行完）
function error(message: string): never {
    throw new Error(message);
}

// object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined之外的类型。
// 任意的 js 对象类型
let obj:object = [{name:'啊哈哈'}];

// 类型断言 两种写法，在 JSX 语法中只能使用 as 语法
// 断言就是主动告诉编译器变量的类型
let length: number = (<string>name).length;
let length: number = (name as string).length;

let a:'a' = 'a'; // 字面量，指定的值
```