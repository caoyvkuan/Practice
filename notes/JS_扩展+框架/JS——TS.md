# TypeScript

+ 作用
  + 能够给 JS 带来全新的类型检验功能


## 类型

+ 联合类型 
  + 且 `{ name:string } & { age:number }`
  + 或 ` number | string`
  + 别名 `type myType = string;`
    + myType 就相当于 string

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

### object

```ts
// 这样的写法可以限制对象只有指定属性,且 `?:` 可以设置可选属性
let obj: { name:string, age?:number }

// [propName: string]: any 表示可以拥有任意类型的属性都可以
let obj: { name:string, [propName:string]: any }
// [propName: string | number]
// 属性签名的类型只能是 字符串或数值

// 限制为函数 指定参数和返回值类型
let fn: (a:number, b:number)=>number;
```

# 接口

+ 用来定义需要那些参数和参数的类型
+ 通过关键字 `interface` 来定义
+ 通过约束的属性，在拼写错误时也会得到提示
```ts
interface fnParam {
    label: string;
    // 可选属性只需要加一个 ？ 即可
    size?: number;
    // 只读属性的创建,只能在创建的时候修改
    readonly x: number;
    // 任意数量的其他属性
    [propName: string]: any;
}
// 只读属性不仅仅是用在对象属性中
// ReadonlyArray<T>
// 这种方式约束的数组也是无法修改的 ， 如何需要赋值给 普通的数组 还需要利用断言来进行重写
let arr: ReadonlyArray<number> = [1, 2, 3, 4];
let a: number[];
a = <number[]>arr

// 绕开报错
interface SquareConfig {
   color?: string;
   width?: number;
}
function createSquare(config: SquareConfig) {
   // ...
}
// 这样的拼写错误是会引发错误的，尽管你是想传输该属性
let mySquare = createSquare({ colour: "red", width: 100 });
// 通过类型断言来绕开错误
let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
```

## 函数类型

+ 接口出了描述普通对象外，还能够描述函数类型
```ts
interface SearchFunc {
   (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
// 函数的类型限制，只要求对应位置上的 值 类型相同，而变量名可以不同
mySearch = (source: string, subString: string) => true;
```

## 可索引的类型

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

## 类类型

```ts
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

## 继承接口

+ 和类一样接口也是可以继承的
```ts
interface Info{
  color: string;
}

interface ColorInfo extends Info{
  text: string;
}

let article = <ColorInfo>{};
article.color = 'white';
article.test = 'pink';

// 并且一个接口可以继承多个不同的接口
interface Header{
  width: number;
}

interface Content extends Info,Header{
  height: number;
}
```

## 混合类型

+ 就是让一个对象可以同时作为函数和对象进行使用
```ts
interface GetNumber {
   (start: number): boolean;
   interval: number;
   reset(init: number): void;
}

function setNumber(interval: number): GetNumber {
  // 直接调用由于没有调用者，所以 this 是无法指向自身的，需要通过 给函数命名来实现
  // 直接调用 this 因为类型原因会报错，通过断言就可以解决问题
   let getNumber = <GetNumber>function self(start) {
      return start > ((self as GetNumber).interval || 10);
   }
   // 给函数添加属性
   getNumber.interval = interval;
   getNumber.reset = function (init) {
      (this as GetNumber).interval = init;
   }
   return getNumber;
}

let s = setNumber(5);
log(s(6));
log(s.reset(15));
log(s.interval);
```

## 继承类

+ 当接口继承类类型的时候，会继承类的成员，但是不会继承成员的实现
+ 不论是私有的（private）还是受保护的（protected）都会被继承
  + 不过当继承了这两种属性时，该接口只能被这个类或其子类实现（implement）
```ts
class Control {
   private state: any;
}

interface SelectableControl extends Control {
   select(): void;
}

class Button extends Control implements SelectableControl {
   select() { }
}

// 这里会报错， GetImage 缺少属性 state , 但 SelectableControl 需要该属性
class GetImage implements SelectableControl{
   select(){}
}
```

# tsconfig

+ 配置信息 tsconfig.json
+ 编译的配置文件
```json

```

