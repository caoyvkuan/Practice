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

# class 类

+ 在 ts 中声明一个类,实际也是声明了一个 类的 实例的类型
+ 因此类可以当做接口来进行使用

+ 新增了
+ public 公共属性 -- 默认值
+ private 私有属性
  + 不能在声明类的外部访问
  + 当两个类有相同的私有属性时,如果是来至同一处声明,则这两个类型是兼容的(能否进行赋值操作)
+ protected 受保护的
  + 与 private 类型,但是在派生类中是可以访问的
  + 也就是说继承者可以在自己的内部访问被继承者的 protected 属性
+ readonly 只读
  + 只读关键字必须在声明或是构造函数里被初始化
+ static 静态属性
```ts
class Test{
  public name: string;
  private age: number;
  protected sex: number;
  // 只读属性的初始化
  readonly game: string = 'hello world';
  readonly say: string;
  constructor(string: string){
    this.say = string;
  }
}

// 相同属性兼容问题
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
class Rhino extends Animal {
    constructor() { super("Rhino"); }
}
class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
```

## 存取器

+ getters/setters
+ 只有 getters 的属性将会被推断为只读属性
```ts
class Empty {
   private _name: string;

   get name(): string {
      return this._name;
   }

   set name(newName) {
      this._name = newName;
   }
}
```

## abstract 抽象类或属性

+ 不同于接口,抽象类可以包含实现的细节
+ 通过 abstract 来进行定义一个抽象类或是方法
> 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。
>
> > 两者都是定义方法签名但不包含方法体。

```ts
abstract class Test {
  // 该函数必须在派生类中实现
   abstract move(): void;
   say() {
      console.log('哈哈哈');
   }
}

class getTest extends Test {
   move(): void {
      console.log('移动了!');
   }
   // 抽象类中不存在的方法是无效的
   send(): void {
      console.log('发送了!');
   }
}

let test: Test; // 允许引用
// 但是不允许创建实例
test = new Test(); // Error 无法创建抽象类的实例
// 可以创建子类的实例
test = new getTest();
test.move();
test.say();
test.send(); //Error 方法在抽象类中不存在
```

# function 函数

+ 为函数增加类型
  + 定义参数的类型
  + 定义返回值的类型
+ 定义类型的参数名称与实现函数的参数名称可以不一样
  + 但是对应位置上的参数类型必须一致
```ts
// 定义类型
let myAdd: (x: number, y: number) => number;
// 实现方式
myAdd = (num1, num2) => num1 + num2;
myAdd = function (x: number, y: number): number {
   return x + y;
}
```

## 参数

+ 在 ts 中每个函数的参数都是必须的
  + 函数需要多少个参数就必须要传递多少个参数
  + 通过 `name?: string` 的定义方式让参数变为可选参数
  + 可选参数的位置必须放函数参数的末尾
  + 拥有默认值的参数也是可选的
```ts
// 以下两个函数的类型是共享的
let name: (first: string, last?: string) => void;

name = function (first: string, last?: string) {}
name = function (first: string, last = "Smith") {}
```

## 剩余参数

+ 在ts 中如果不确定参数的数量就需要使用(...)扩展运算符来接取
```ts
function buildName(first: string, ...Names: string[]) {
  return first + " " + Names.join(" ");
}

let allName = buildName("window", "linux", "iPad", "Mac");
```

## this 问题

+ 如果给编译器设置了--noImplicitThis 标记。它会指出 `this.suits[pickedSuit]` 里的 this 的类型为 any。
  + 这是因为 this来自对象字面量里的函数表达式。
  + 修改的方法是提供一个显式的 this 参数
  + this 参数是个假的参数，它出现在参数列表的最前面
  + ` function fn(this: void){} `
```ts
interface Deck {
    Card(this: Deck): () => Card;
}
let deck: Deck = {
    Card: function(this: Deck) {
      // 显式的设置 this 的类型
    }
}
// 通过这样指定 this 的类型后 --noImplicitThis 就不会报错了
```
+ `this: void` 是希望函数是一个不需要 this 类型的函数

## 重载

+ 让一个函数可以接接收多种不同的传参方式
```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

// 重载一
function pickCard(x: { card: number }): number;
// 重载二
function pickCard(x: number): { card: number; };
function pickCard(x): any {
   if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.card);
      return pickedCard;
   }
   else if (typeof x == "number") {
      return { card: x % 13 };
   }
}

// 传入的参数不同会自动判断使用的重载来进行类型检查
// 没有查找到对应重载的调用将会报错
let myDeck = { card: 4 };
let pickedCard1 = myDeck[pickCard(myDeck)];
let pickedCard2 = pickCard(15);
```


# tsconfig

+ 配置信息 tsconfig.json
+ 编译的配置文件
```json

```

