# TypeScript

+ 作用
  + 能够给 JS 带来全新的类型检验功能

## 类型

+ 联合类型 
  + 且 `{ name:string } & { age:number }`
  + 或 ` number | string`
  + 当 ts 不决定联合类型的准确类型时，只能够访问共有的方法，否则会报错
  + 被赋值时也会采用类型推论进行推断
+ 别名 `type myType = string;`
  + myType 就相当于 string
  + 同时 type 关键字也可以用来进行类型的声明

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

let a:'a' = 'a'; // 字面量，指定的值
```

## 数组 & 元组 Tuple

+ 泛型数组 ： `Array<any>`
+ 类型加方括号 : `let arr: number[]` 数值类型数组
+ 接口类型数组

```ts
// 数组 有两种方式，一、指定元素类型的数组，二、泛型数组
// 一、
let list: number[] = [1, 2, 3]; 
let list: any[] = [1, 'two', { three：3 }];
// 二、
let list: Array<number> = [1, 2, 3]; 

// 元组 Tuple 可以指定数组不同位置的类型
let arr: [string, number] = ['type', 2];
// 当索引超过限定的长度时，类型限定将为联合类型 (string | number)
arr[2] = 'type' || 4; // 只要是指定类型的其中之一就行

// 表示：只要索引的类型是数字时，那么值的类型必须是数字。
interface IndexArray{
   [index: number]: number;
}
// 接口的方式可以用来描述类数组
// ts已经定义好类型 IArguments
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

## object

```ts
// object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined之外的类型。
// 任意的 js 对象类型
let obj: object = [{name:'啊哈哈'}];

// 这样的写法可以限制对象只有指定属性,且 `?:` 可以设置可选属性
let obj: { name:string, age?:number }

// [propName: string]: any 表示可以拥有任意类型的属性都可以
let obj: { name:string, [propName:string]: any }
// [propName: string | number]
// 属性签名的类型只能是 字符串或数值

// 限制为函数 指定参数和返回值类型
let fn: (a:number, b:number)=>number;
```

## 断言

+ 断言有两种不同的语法，目的是用来手动指定一个值的类型
+ 类型断言 两种写法，在 JSX 语法中只能使用 as 语法
+ 断言不会影响变量的真实类型，所以不能当做类型转换来使用
```ts
// 断言就是主动告诉编译器变量的类型
let length: number = (<string>name).length;
let length: number = (name as string).length;

// 通过断言给 Window 增加属性
(window as any).foo = 1;

// 双重断言，这可以打破很多限制，如下面第5条约束
// 将一个类型断言为 any 然后就可以进行任意类型的断言了
// 但是这样很容易出错，并不推荐
cat as any as Fish
```
+ 类可以使用 instanceof 来进行判断
+ 接口只能使用 断言，因为接口在编译时会被删除
+ 两个互相兼容的类型是可以相互断言的，反之则不行

1. 联合类型可以被断言为其中一个类型
2. 父类可以被断言为子类
3. 任何类型都可以被断言为 any
4. any 可以被断言为任何类型
5. 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可

## 类型推论

+ 主要作用就是帮助 TypeScript 在没有明确指出类型的位置会提供帮助类型
+ 如泛型就很好的使用了 类型推论
+ 如果变量未指定类型，但是有初始化操作就会进行类型推论
  + `const a = 'string'` 这就会被推论为  `String` 类型

## 类型兼容性

+ 在 ts 中想要 x 兼容 y ， y 就至少要拥有与 x 相同的属性
```ts
interface Named {
    name: string;
}

let x: Named;
let y = { name: 'Alice', location: 'Seattle' };
x = y; // 因为 y 拥有 name：string 所以 x 兼容 y

// 函数之间的兼容
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK 兼容，因为参数列表中的类型可以对应
x = y; // Error 不兼容，因为 x 没有 y 所需要的参数
```

# 签名

## 构造签名

```ts
class Name {
   constructor(public name: string) {
   }
}

// 通过构造签名，定义了构造函数的样子
interface C<T> {
   new(name: string): T
}

// 参数是一个类，返回一个类的实例
function getInstance<T extends Name>(name:C<T>): T {
   return new name('Jack');
}

getInstance<Name>(Name);
```

# 默认类型

+ TS 内置对象都在核心库中定义
+ [对象定义位置](https://github.com/Microsoft/TypeScript/tree/main/src/lib)

+ TS 默认不包含 nodejs 的部分，需要额外引入
+ `npm install @types/node --save-dev`

## ECMAScript 内置对象

+ 如 ： Boolean、Error、Date、RegExp等
+ [更多](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

## ts 内置类型

### arguments

```ts
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

## 事件对象 Event

- `ClipboardEvent<T = Element> ` 剪切板事件对象

- `DragEvent<T =Element>`  拖拽事件对象

- `ChangeEvent<T = Element>`  Change 事件对象

- `KeyboardEvent<T = Element> ` 键盘事件对象

- `MouseEvent<T = Element>`  鼠标事件对象

- `TouchEvent<T = Element>`  触摸事件对象

- `WheelEvent<T = Element>`  滚轮时间对象

- `AnimationEvent<T = Element>`  动画事件对象

- `TransitionEvent<T = Element>`  过渡事件对象

# 接口

+ 用来定义需要那些参数和参数的类型
+ 接口是用来定义一个对象的结构
  + 与抽象类不同的是，所有的方法都是抽象方法，不能有具体的实现
+ 接口是对行为的抽象，而具体的实现需要由类（class）来完成
+ 通过关键字 `interface` 来定义
  + 接口一般首字母大写
  + 多个名字相同的接口是会进行合并的
+ 通过约束的属性，在拼写错误时也会得到提示
```ts
interface FnParam {
    label: string;
    // 可选属性只需要加一个 ？ 即可
    size?: number;
    // 只读属性的创建,只能在创建的时候修改
    readonly x: number;
    // 任意数量的其他属性
    [propName: string]: any;
    // 一旦定义了任意属性，那么确定的属性和可选属性的类型都必须是它的子集
    // 如 任意类型 是 string ， 则 可选属性 size 就只能是 string 的子集， 所以 number 是会报错的
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

+ implements 使用接口的关键字，与继承不同，只继承属性类型，不会将实现的方法继承过来
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

+ 在 TS 中接口可以继承类是因为 在类声明的时候同时也会创建一个同名的类型（实例的类型）
+ 当接口继承类类型的时候，会继承类的成员，但是不会继承成员的实现
+ 不论是私有的（private）还是受保护的（protected）都会被继承
  + 不过当继承了这两种属性时，该接口只能被这个类或其子类实现（implement）
+ 静态方法和静态属性不会被继承，构造函数也是如此
```ts
class Control {
   private state: any;
   constructor(state:any){
      this.state = state;
   }
}
// 同时会创建的类型
interface ControlInstanceType {
    state: any;
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
  + 只能在当前类的内部进行修改访问
  + 当两个类有相同的私有属性时,如果是来至同一处声明,则这两个类型是兼容的(能否进行赋值操作)
+ protected 受保护的
  + 与 private 类型,但是在派生类中是可以访问的
  + 也就是说继承者可以在自己的内部访问被继承者的 protected 属性
+ readonly 只读
  + 只读关键字必须在声明或是构造函数里被初始化
  + 如果只读修饰符与其他修饰符一同出现，则需要写在后面
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

// 类与类之间的兼容性问题，决定能否相互赋值
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

+ 简洁的语法
```ts
class A{
   // 直接在 constructor 声明部分完成属性的赋值
   constructor(
      public name: string,
      public age: number
   ){}
}
// 相当于
class B{
   name: string;
   age: number;
   constructor(name: string,age: number){
      this.name = name;
      this.age = age;
   }
}
```

## 只允许继承的类

+ 通过 protected 修饰构造函数的类
```ts
class Animal {
   protected constructor(){
      // 该类只允许被继承
   }
}
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

## 继承与实现

+ 在 ts 中类实现接口一般使用 implements (实现)
+ 一个类可以实现多个接口
+ 与继承不同的是，实现并不会让类拥有接口中的任何东西，只是负责实现这个接口

+ 继承 extends ，当继承一个类或抽象类的时候
  + 就能够直接继承到类当中的属性和方法
```ts
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Door {
}
// 继承 一个类 并实现一个接口
class SecurityDoor extends Door implements Alarm {
    alert() {console.log('SecurityDoor alert');}
}

class Car implements Alarm, Light {
    alert() {console.log('Car alert');}
    lightOn() {console.log('Car light on');}
    lightOff() {console.log('Car light off');}
}
```

## abstract 抽象类或属性

+ 不同于接口,抽象类可以包含实现的细节
+ 通过 abstract 来进行定义一个抽象类或是方法
+ 抽象类不能够直接创造实例（不允许实例化）进行使用吗，而必须由派生类继承
> 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。
>
> > 两者都是定义方法签名但不包含方法体。
+ 抽象方法必须在子类中实现
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

// 通过接口来定义函数
interface SearchFunc {
    (source: string, subString: string): boolean;
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

# 泛型

+ 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
+ 泛型是用来支持多种类型的类型,组件的类型就需要利用泛型来定义
+ 泛型通过 `<Name>`(如：`<T>`) 来表示
  + 多个泛型 `<T, K>`
+ 泛型 T 会自动帮助用户捕获传入的类型,泛型可以自动适应各种类型而又不像 any 一样会丢失类型的跟踪
+ 简单讲就是既可以保持类型的准确性又能支持多种不同的类型
```ts
function get<T>(arg: T): T {
   return arg;
}

// 使用方法 一 通过 <string> 指定泛型为 string 类型并使用
let output = get<string>('myString');

// 使用方法 二 使用泛型的自动类型推论自动确认类型
let output = get('myString');

```

## 泛型函数

+ 使用了泛型的变量编译器就会要求在函数体中正确的使用这个通用类型
+ 所以直接当做数组或是其他类型调用该类型才有的方法是会报错的
```ts
function get<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

// 泛型数组 Array<T>
function get<T>(arg: T[]): T[] {
    console.log(arg.length); // 这时候就可以这样使用了
    return arg;
}

// 为泛型指定默认类型
function createArray<T = string>(length: number, value: T): Array<T> {
}
```

## 泛型类型与接口

+ 用于定义泛型的字母不一定非要用 T ，使用其他名称也是可以的
```ts
function identity<Fn>(arg: Fn): Fn {
   return;
}

// 只需要在使用时名称是对应的即可
let fn: <F>(arg: F) => F = identity;

// 通过代用签名的对象字面量来定义泛型函数
let myIdentity: {<T>(arg: T): T} = identity;

// 通过对象字面量的引导定义泛型接口
interface interIdentity {
   <T>(arg: T): T;
}

let myIdentity: interIdentity = identity;

// 不描述泛型函数，而是把非泛型函数签名作为泛型类型一部分
interface GenericIdentityFn<T> {
    (arg: T): T;
}
// 在使用时，需要指定泛型的类型进行传递
let myIdentity: interIdentity<number> = identity;
```

## 泛型类

+ 泛型类看上去和韩星接口是差不错的
+ 类只有实例部分能够使用泛型定义，而静态属性部分是无法使用泛型来定义的
```ts
class GenericType<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let Generic = new GenericType<number>();
Generic.zeroValue = 0;
Generic.add = function(x, y) { return x + y; };
```

## 泛型的约束

+ 因为泛型的类型是不被确定的，所以你直接通过泛型调用各种类型才有的属性
  + 如：数组的 length 属性是会报错的
  + 想要调用类似属性的方法除了确定泛型的类型之外，还可以进行约束
```ts
interface Lengthwise {
   length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
   console.log(arg.length); // 通过让泛型继承目标属性就可以进行调用
   return arg;
}

// 但是在继承了约束后泛型不在适用于任意类型了
loggingIdentity(3); // 这样是会报错的
loggingIdentity({length: 10, value: 3}); // 需要传入对象且拥有指定属性

// 在泛型约束中使用类型参数
function getProperty(obj: T, key: K) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// 在泛型里使用类类型 使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T>(c: { new(): T }): T {
    return new c();
}
```

# 枚举

+ 可以定义一些带名字的常量
```ts
// 默认的增长是从 0 开始的， 默认的类型也是 number
// 在枚举设定数值 1 后， 后面的会自动开始增长
enum Direction {
   UP = 1,
   Down, // 2
   Left, // 3
   Right // 4
}

// 枚举使用起来也很方便
Direction.UP; // 这样就可以轻松的访问
```

+ 字符串类型的枚举
  + 该类型的枚举每一个成员都必须进行初始化
  + 字符串枚举不会自动增长
```ts
enum Direction {
   UP = 'UP,
   Down = 'Down',
   Left = 'Left',
   Right = 'Right'
}
```

+ 异构枚举
  + 也就是混合字符串和数字成员共同构成的枚举

# 高级类型

+ 更加复杂的类型结构
+ 最简单的类型，字面量，写的是什么就只能是什么 `type name = 'Join'`

+ 联合类型 `number | string`
  + 如果是复杂的联合类型，
  + 如接口，只能使用两个类型都拥有的属性，使用单独一个接口拥有的属性就会报错
  + 此时如果需要使用对应的接口属性就需要使用相应的类型断言后在继续调用

+ 类型保护
  + 通过确认类型的方式来进行类型保护，在 if 过后确定 联合类型变量的准确类型来进行使用
  + 通过 typeof 能够识别基础类型
  + 通过 instanceof 也是可以确定类型并进行使用的，称为类型细化
  + `parameterName is Type` 来让一个变量成为你想要的属性
```ts
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
// 这样就不需要频繁的使用断言来确定类型
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```

+ 可为 null 的类型
  + ts 中拥有 null 和 undefined 两种特殊的类型
  + 这两种类型可以赋值给任意的类型
  + 通过 --strictNullChecks 标记可以让，所有类型不自动包含这两个类型
  + 当排除后如果想要使用就可以使用联合类型来从新包含他们
    + `string | null`
    + 这样的使用方式，需要通过类型保护或是断言在使用的时候去除 null
  + 去空断言 `Parson!.age` 通过在变量后加 ` ！` 来确认非 `null 和 undefined`

+ 可选参数
  + 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined
  + 可选属性也会有同样的处理

+ 类型别名 使用 type 定义
  + `type MyString = string` 现在 MyString 也是 string 类型了
  + `type Container<T> = { value: T };` 类型别名也是可以用泛型的
  + 与接口的区别
    + 接口创建了一个新的名字，可以在任何敌方使用，但类型别名并不创建新名字
    + 类型别名不能被 extends 和 implements ，同时自己也不能使用
```ts
// 同交叉类型一起使用
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```

## 交叉类型

+ 可以同时包含多个不同类型的特性
+ `Person & Info` 同时是 Person 和 Info 类
```ts
function extends<T, U>(first: T, second: U): T & U {
   let result = <T & U>{};
   for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
   }
   for (let id in second) {
      if (!result.hasOwnProperty(id)) {
         (<any>result)[id] = (<any>second)[id];
      }
   }
   return result;
}

class Person {
   constructor(public name: string) { }
}
interface Info {
   log(): void;
}
// 既拥有 Person 的属性，也拥有 Info 的属性
var jim = extends(new Person("Jim"), new Info());
var n = jim.name;
jim.log();
```

## 可辨别联合

+ 拥有类型保护的作用
+ 具有可识别的特征
+ 一个类型别名包含了多个类型
```ts
interface Square {
   kind: "square";
   size: number;
}
interface Rectangle {
   kind: "rectangle";
   width: number;
   height: number;
}
interface Circle {
   kind: "circle";
   radius: number;
}
// 在这里每个接口的 kind 就是可识别的特征
// 通过不同的字面量就可以让编译器辨识到联合类型的准确类型
type Shape = Square | Rectangle | Circle;
function area(s: Shape) {
   switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
   }
}

// 完整性检查 如果在 Shape 的基础上在添加一个类型 那么同时也需要更新 area 函数
// 方法一 启用 --strictNullChecks 并指定一个返回值类型
/*
因为 switch没有包涵所有情况，所以TypeScript认为这个函数有时候会返回 undefined。
如果你明确地指定了返回值类型为 number，
那么你会看到一个错误，因为实际上返回值的类型为 number | undefined。
然而，这种方法存在些微妙之处且 --strictNullChecks 对旧代码支持不好。
*/

// 方法二 通过 never 类型来抛出错误，提示缺少了一个 case
```

## 多态的 this 类型

+ 多态的 this类型表示的是某个包含类或接口的 子类型。
+ 这被称做 F-bounded多态性。 它能很容易的表现连贯接口间的继承

## 索引类型

+ 使用索引类型就能够检查使用了动态属性名的代码
+ `keyof T` 索引类型查询操作符
  + > 对于任何类型 T， keyof T 的结果为 T 上已知的公共属性名的联合。
+ `T[K]` 索引访问操作符
  + 如 `Person[name]` 就是访问 Person 中 name 属性的类型，在这里是 string
```ts
function pluck(o, names) {
    return names.map(n => o[n]);
}

// ts 的实现方式
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
// keyof 的作用 为 Person 所有公共属性的联合
let personProps: keyof Person; // 'name' | 'age'

let person: Person = {
    name: 'Join',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]

// 索引类型和字符串索引签名
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>['foo']; // number
```

## 映射类型

+ 讲一个已知的类型每个属性都变为可选或是只读
```ts
// Readonly<T> 和 Partial<T> 用处不小，
// 因此它们与 Pick 和 Record 一同被包含进了 TypeScript 的标准库里：
type Readonly<T> = {
    // 通过索引类型查询操作符得到 T 中的所有属性名联合
    // 然后通过索引访问操作符得到 T 所有属性的类型
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}
// 使用
// 只读
type ReadonlyPerson = Readonly<Person>;
// 可选
type PersonPartial = Partial<Person>;

// 标准库中
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}
type Record<K extends string, T> = {
    [P in K]: T;
}
// Readonly， Partial 和 Pick 是同态的，但 Record 不是。
// 因为 Record 并不需要输入类型来拷贝属性，所以它不属于同态：
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>

// 映射类型的组成
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```
+ 映射类型内部有使用了 for...in 循环，具有三个部分
  + 类型变量 K 会一次绑定到每个属性
  + 字符串联合的 Keys ， 他包含了要迭代的属性名集合
  + 属性的结果类型

## 预定义

+ `Exclude<T, U>` -- 从T中剔除可以赋值给U的类型。
+ `Extract<T, U>` -- 提取T中可以赋值给U的类型。
+ `NonNullable<T>` -- 从T中剔除null和undefined。
+ `ReturnType<T>` -- 获取函数返回值类型。
+ `InstanceType<T>` -- 获取构造函数类型的实例类型。
```ts
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
type T23 = InstanceType<string>;  // Error
type T24 = InstanceType<Function>;  // Error
```

# 模块

+ 接口和类型别名也是可以通过 export 来进行导出的
+ 大部分都和 es6 拥有一样的工作模式
```ts
export interface MyTools {
   isString(str: any): boolean;
}
```

## 其他模块方法支持

+ CommonJs 和 AMD 模块化方法中都有一个 exports 变量，这个变量包含了一个模块所有导出内容
+ 因为 es6 的 export default 并不兼容 CommonJs 和 AMD 的 exports
+ 为了支持 CommonJs 和 AMD 的 exports， ts 提供了 `export = ` 的语法
+ 若是使用 `export = ` 语法进行导出的模块就必须使用特定的方法来引入
  + `import moduleName = require('module')` 的方式来进行引入

## 模块解析

+ `import { a } from "moduleA"` 在导入一个模块后，编译器为了知道 对 a 的使用表示什么，
  + 回去检查定义它的模块 moduleA ，ModuleA 可能在某个 .ts / .tsx 亦或者 .d.ts 中
  + 编译器会通过两种(Classic/Node)不同的策略寻找该文件,如果都失败了，编译器会尝试定位一个外部声明模块
+ 这就涉及到 非相对导入
  + `相对导入是以/，./或../开头的。` 如：
    + `import Entry from "./components/Entry";`
    + `import "/mod";`
  + 非相对导入
    + `import React from "react";`
    + `import Test from "@C/Test";`

> 相对导入在解析时是相对于导入它的文件，并且不能解析为一个外部模块声明。
>
> > 一般自己书写的的模块使用相对导入，这样能确保它们在运行时的相对位置。

> 非相对模块的导入可以相对于 baseUrl 或通过下文会讲到的路径映射来进行解析。
>
> > 它们还可以被解析成 外部模块声明。 使用非相对路径来导入你的外部依赖。


+ 跟踪模块解析
  + 通过 --traceResolution 标记启用编译器的模块解析跟踪
  + 这样编译器就会告诉我们在模块解析过程中发生了什么

+ --noResolve 标记可以让编译器只编译在命令行中指定的文件

## 模块解析策略

+ 通过 --moduleResolution 标记来指定使用的解析策略
+ 若为指定在使用 --module AMD | System | Es2015 的时候默认使用 Classic
+ 其他情况使用 Node

+ Classic 对于导入的模块 moduleA
  + 相对导入会依次查找 module.ts 和 module.d.ts 文件
  + 非相对导入会当前目录到根目录开始依次查找以上两个文件

## 路径映射

+ ts 编译器通过使用 tsconfig.json 文件中的 paths 来支持声明映射关系
```json
{
   "compilerOptions":{
      "baseUrl":"./src", // 基础路径是必须指定的
      "paths":{ // 映射关系是相对于 baseUrl 开始的
         "@C":"./components",
         // 更加复杂的映射关系
         "*":["*","./pages/*"]
         // "*"： 匹配所有值,所以映射为<moduleName> => <baseUrl>/<moduleName>
         // 通配符后导入 components/Test
         // 因为 * 所以不论写什么都是可以匹配的， ./src/components/Test 找到后就不会继续找了
         // 如果没找到就会继续寻找 ./src/pages/components/Test 从数组依次往后寻找
      }
   }
}


// 例子
// tsconfig
"baseUrl": "./src",
"paths": {
    "@DOM": [
        "./auxiliary/dom.ts"
    ],
    "@utils": [
        "./auxiliary/utils.ts"
    ],
    "@Class/*": [
        "./class/*"
    ]
},
// webpack
function Src(url) {
   return path.resolve(__dirname, `./src/${url}`);
}
resolve: {
    alias: {
        '@DOM': Src('auxiliary/dom.ts'),
        '@utils': Src('auxiliary/utils.ts'),
        '@Class': Src('class')
    }
},
```

## 虚拟目录

+ 通过虚拟目录，可以让一个目录中的文件轻松的引入另一个目录中的文件
```json
{
  "compilerOptions": {
    "rootDirs": [
      "src/views",
      "generated/templates/views"
    ]
  }
}
// src/views 中的 view1 引用 generated/templates/views 下的 templates
// import './templates'

// generated/templates/views 下的 templates 引用 src/views 下的 view2
// import './view2'
```

# 命名空间

+ 命名空间就是位于全局命名空间下的一个普通带有名字的 JS 对象
  + 对模块不应该使用命名空间
+ 一种组织代码的手段，可以有效的避免在同一个模块文件中的命名冲突
+ 通过 namespace 关键字来声明 命名空间
+ 在命名空间外部需要通过 命名空间的名称打点来调用导出的选项
  + 在命名空间未导出的部分是无法在外部进行调用的
```ts
namespace Validation {
   export interface MyTools {
      isString(str: any): boolean;
   }

   export class TypeValidation implements MyTools {
      isString(s: string) {
         return typeof s === 'string';
      }
   }

   function Test() {
   }
}

// 使用方式
let Validations: { [s: string]: Validation.MyTools; } = {};
Validations['type'] = new Validation.TypeValidation();

Validation.Test(); // Error 属性不存在
```

## 三斜线指令

+ 三斜线指令是包含单个 XML 标签的单行注释
  + 注释内容会被作为编译器指令使用
+ 三斜线指令仅可放在包含它的文件最顶端
  + > 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令
  + > 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。
+ ` /// <reference path="..." /> ` 是最常见的一个指令，用于处理文件件的依赖
  + 在输出为单文件时，也能作为调整文件输出内容顺序的一种方法

+ 编译选项 -- noResolve 可以忽略三斜线指令

## 在多个文件中的命名空间

+ 尽管在多个文件中，只要使用的空间名字是一样的就被视为在同一命名空间中
```ts
// Validation.ts
namespace Validation {
   export interface MyTools {
      isString(str: any): boolean;
   }
}

// LettersOnlyValidator.ts
// 在不同文件中声明的同时也需要通过 `/// <reference path="xxx.ts" />` 指定依赖关系
/// <reference path="Validation.ts" />
namespace Validation {
   export class TypeValidation implements MyTools {
      isString(s: string) {
         return typeof s === 'string';
      }
   }
}

// 使用 , 在使用的同时也需要指定依赖引入
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />

let Validations: { [s: string]: Validation.MyTools; } = {};
Validations['type'] = new Validation.TypeValidation();

// 使用时，为了确保所有文件都被加载了，可以通过 --outFile 将其输出为一个文件
// 或是进行单独编译后按照依赖顺序进行引入
```

## 别名

+ 通过简化命名空间操作的方法使用 import name = namespace.name;
```ts
namespace Shapes{
   export namespace Polygons {
      export class Triangle { }
      export class Square { }
   }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
```

# 声明合并

+ 编译器会针对多个拥有同一个名字的声明合并为单一声明，合并后会拥有原先所有声明的特性
+ ts 会创建实体的有三种：命名空间，类型或值

+ 最常见的声明合并类型是接口，简单就是吧多个命名相同的接口合并到一个接口中
  + 如果两个接口同时声明了相同的非函数成员且类型不同，则会报错
  + 而函数类型不同就会被当成重载，按照执行循序后合并的接口优先级更高，也就是后声明的在合并后是顺序更加靠前，而本身属性的顺序不变
  + 唯一的不同是，出现函数签名时，拥有字符串字面量的函数签名会被提升到最上方
```ts
interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}

// 合并后 函数签名参数为字面量的被提升到了最前方
interface Document {
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}
```

+ 命名空间合并，接口会被提升，其他类型按照声明依赖顺序添加
  + 且只有被导出的才会被共享，如没有被导出的变量，只有声明改变了的那个命名空间才可以使用

+ 命名空间、类、函数、枚举类型都可以进行合并

+ 类不能与类或是变量进行合并
  + 但是可以自己手动合并

# JSX

+ ts 在编译阶段拥有三种不同的编译模式
  + preserve
    + 会保留 jsx 一共后续的转换操作，如 babel
  + react
    + 会生成 React.createElement 不需要进行转换
  + react-native
    + 保留 jsx 但后缀为 js

+ 在 tsx 文件中的类型断言只能使用 as 的模式，而尖括号的模式被禁用了

+ 固有元素
  + DOM 原本就存在的元素 如： div、span
+ 基于值的元素
  + 基于值的元素，如：MySpan、foo 等自定义组件或元素

## 类型检测描述接口

```tsx
declare namespace JSX {
   interface Element{
      // 表示 JSX 元素
   }

   interface IntrinsicElements {
      foo: { bar?: boolean }
   }

   interface IntrinsicAttributes {
      // 指定需要的额外属性
      bar: string;
   }
   interface IntrinsicClassAttributes<T>{
      // 与 IntrinsicAttributes 效果是一样的
   }

   interface ElementChildrenAttribute {
      children: {}; // 指定 children 要使用的，名字，与 ElementAttributesProperty 类似
   }
   interface ElementAttributesProperty {
      props; // 指定用来增加 props 描述使用的属性名
   }
}

class MyComponent {
   props: {
      foo: string
   }
}

<MyComponent foo="str" bar="string" />
```

## 利用函数重载实现无状态组件

```tsx
interface ClickableProps {
    children: JSX.Element[] | JSX.Element
}

interface HomeProps extends ClickableProps {
    home: JSX.Element;
}

interface SideProps extends ClickableProps {
    side: JSX.Element | string;
}

function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element {
    ...
}
```

## 类组件

+ 元素类的类型
  + 类类型就是类的构造函数和静态部分
  + 如果是工厂函数，类类型为这个函数
+ 元素实例的类型
  + 实例类型由类构造器或调用签名的返回值构成
  + 工厂函数，实例类型为这个函数返回值类型
```tsx
class MyComponent {
    render() {}
}

// 使用构造签名
var myComponent = new MyComponent();

// 元素类的类型 => MyComponent
// 元素实例的类型 => { render: () => void }

function MyFactoryFunction() {
    return {
    render: () => {
    }
    }
}

// 使用调用签名
var myComponent = MyFactoryFunction();

// 元素类的类型 => FactoryFunction
// 元素实例的类型 => { render: () => void }
```

## 属性类型检查

+ 属性类型检查的第一步就是确定元素类型
+ 固有元素
```tsx
declare namespace JSX {
    // 可以自定义一些原本没有的元素，且对 props 进行限制
    interface IntrinsicElements {
    foo: { bar?: boolean }
    }
}

// `foo`的元素属性类型为`{bar?: boolean}`
<foo bar />;
```
+ 基于值的元素
```tsx
// 只有通过命名空间描述了，类上的 props 限制才会生效
declare namespace JSX {
    interface ElementAttributesProperty {
    props; // 指定用来使用的属性名
    }
}

class MyComponent {
    // 在元素实例类型上指定属性
    props: {
    foo?: string;
    }
}
// `MyComponent`的元素属性类型为`{foo?: string}`
<MyComponent foo="bar" />
```

# 装饰器

+ 实验阶段，使用需要在 tsconfig 里添加 --experimentalDecorators 标记
```json
{
   "compilerOptions":{
      "target": "ES5",
      "experimentalDecorators": true,
   }
}
```

+ 装饰器是一种特殊类型的声明，它能被附加到类声明，方法吗，访问符，属性或参数上
+ 装饰器通过 `@expression` 这中形式定义
  + > expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

+ 约束，（类、方法、访问器、属性、参数）装饰器
  + 不能用在声明文件（.d.ts） 中
  + 也不能在任何外部上下文中如（declare 的类）

## 装饰器工厂

```ts
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}

// 使用 
@color;
```
+ 多个装饰器应用在同一个声明上时，
  + 会依次由上倒下对装饰器求值
  + 求值的结果会被当做函数，由上至下依次调用
```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
// 结果
f(): evaluated
g(): evaluated
g(): called
f(): called
```

## 装饰器求值

+ 类中不同声明上的装饰器将按以下规定的顺序应用
  1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
  2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
  3. 参数装饰器应用到构造函数。
  4. 类装饰器应用到类。

## 类装饰器

+ 类装饰器在了声明之前被声明
+ 类装饰器应用于类的构造函数，可以用来见识修改或替换类定义
```ts
// 通过装饰器来密封类的构造函数和原型
function sealed(constructor: Function) {
   Object.seal(constructor);
   Object.seal(constructor.prototype);
}

// 声明类装饰器
@sealed
class GreeterOne {
   greeting: string;
   constructor(message: string) {
      this.greeting = message;
   }
   greet() {
      return "Hello, " + this.greeting;
   }
}

function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
   return class extends constructor {
      newProperty = "new property";
      hello = "override";
   }
}

// 通过装饰器修改了 类的 属性值，将构造函数进行了重载
@classDecorator
class GreeterTwo {
   property = "property";
   hello: string;
   constructor(m: string) {
      this.hello = m;
   }
}

console.log(new GreeterTwo("world"));
```

## 方法装饰器

+ 声明方式与类相同，是声明在方法之前
  + 装饰器会被应用到方法的 属性描述符上，
  + 可以用来监视，修改或替换方法定义
+ 方法装饰器表达式会在运行时当做函数被调用，传入三个参数
  1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  2. 成员的名字
  3. 成员的属性描述符（小于 ES5 属性描述符不存在，所以是 undefined）
+ 如果方法装饰器返回一个值，会被用作方法的属性描述符（同样小于 ES5 会被忽略）
```ts
function enumerable(value: boolean) {
   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.enumerable = value;
   };
}

class Greeter {
   greeting: string;
   constructor(message: string) {
      this.greeting = message;
   }

   // 出现 作为表达式调用时，无法解析方法修饰器的签名。的问题
   // 需要在 tsconfig 编译选项中添加 target 标记
   @enumerable(false)
   greet() {
      return "Hello, " + this.greeting;
   }
}
```

## 访问器装饰器

+ 访问器装饰器声明在一个访问器的声明前
  + 访问器装饰器应用于访问器的属性描述符并且可以用来监视
+ TS 不允许同时装饰一个成员的 get 和 set 访问器
  + 取而代之的是，一个成员的所有装饰器必须应用在文档顺序的第一个访问器上
  + 因为，在装饰器应用于一个属性描述符时，他联合了 get 和 set 访问器，而不是分开声明的

+ 访问器装饰器表达式会在运行时当做函数被调用，传入参数与方法装饰器相同
+ 函数的返回值会被当成方法的属性描述符
```ts
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}
```

## 属性装饰器

+ 声明方式不变
+ 调用时传入的参数有两个
  + 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  + 成员的名字
```ts
function format(formatString: string) {
   return function (target, Key) {
      target[Key] = '这就离谱了'
      log(target, Key);
      log(`访问器执行成功了！${formatString}`);
   }
}

class Greeter {
   @format("Hello, %s")
   greeting: string;

   constructor(message: string) {
      // this.greeting = message;
   }
}
log(new Greeter('').greeting) // 这就离谱了
```

## 参数装饰器

+ 参数装饰器声明在一个参数之前，需要紧靠着参数声明
+ 参数装饰器应用于类构造函数或方法声明

+ 当做函数调用时传入的参数
  1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  2. 成员的名字
  3. 参数在函数参数列表中的索引
+ 参数装饰器只能用来监视一个方法的参数是否被传入
+ 参数装饰器的返回值会被忽略
```ts
function validate(target: Object, Key: string | symbol, Index: number) {
   log(target); // {}
   log(Key); // greet
   log(Index); // 0
}

class Greeter {
   greet(@validate name: string) {
      return 'Hello ' + name + ', ';
   }
}

log(new Greeter().greet('真不错')) // Hello 真不错
```

## 元数据

+ tsconfig.json 里启用 emitDecoratorMetadata 编译器选项来支持元数据

## Mixin

+ 混入，通过预留定义实现，把类当借口使用，而非继承
```ts
// 工具类 mixin
class Disposable {
   isDisposed: boolean;
   dispose() {
      this.isDisposed = true;
   }
}

// 工具类 mixin
class Activation {
   isActive: boolean;
   activate() {
      this.isActive = true;
   }
   deactivate() {
      this.isActive = false;
   }
}

class SmartObject implements Disposable, Activation {
   constructor() {
      setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
   }

   interact() {
      this.activate();
   }

   // 预留定义
   isDisposed: boolean = false;
   dispose: () => void;
   // 预留定义
   isActive: boolean = false;
   activate: () => void;
   deactivate: () => void;
}
applyMixin(SmartObject, [Disposable, Activation]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

// 运行库中
// 这个函数会帮助实现 mixin 混入操作，遍历 mixin 上的所有属性，并复制到目标上去
// 将占位属性替换成真正实现的代码
function applyMixin(derivedCtor: any, baseCtors: any[]) {
   baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
         derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
   });
}
```

# 声明文件

+ 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

+ 声明只能定义类型，切勿定义具体实现

+ `declare var` 声明全局变量
  + 同时也可以使用 let 和 const
  + let 在声明文件中与 var 并没有区别
  + const 声明的不允许更改
+ `declare function` 声明全局方法
  + 方法可以多次声明来定义函数重载
+ `declare class` 声明全局类
+ `declare enum` 声明全局枚举类型
+ `declare namespace` 声明（含有子属性的）全局对象
+ `interface` 和 `type` 声明全局类型
+ `export` 导出变量
+ `export namespace` 导出（含有子属性的）对象
+ `export default` ES6 默认导出
+ `export = commonjs` 导出模块
+ `export as namespace` UMD 库声明全局变量
+ `declare global` 扩展全局变量
+ `declare module` 扩展模块
+ `/// <reference />` 三斜线指令

+ 声明并不会正真的定义一个变量，只是定义了一个类型
+ 会在编译结果中被删除
+ `.d.ts` 就是一个声明文件

## 在使用第三方库时

+ 因为编译器无法得知第三方库的类型
+ 如 Jquery , ts 并不知道 Jquery 是什么东西
```ts
// 通过这样声明后，才能够正常使用
declare var jQuery: (selector: string) => any;
// 在没有定义声明前，这样使用是会报错的
jQuery('#foo');
```

## 声明命名空间

+ 随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而使用 ES6 的模块化代替
+ 在声明文件中 命名空间还是比较常用的，可以用来表示全局变量是一个对象，包含很多子属性
```ts
// 声明一个拥有很多个子属性的全局变量
declare namespace jQuery {
   // 在命名空间中，定义可以不需要添加 declare 关键字
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
}
```

# tsconfig

+ 配置信息 tsconfig.json
+ 编译的配置文件
+ [参考](https://www.tslang.cn/docs/handbook/compiler-options.html)
```json
{
   // 需要编译的文件路径
   "include": [
      //    "./src/**/*"
      "./**/*"
   ],
   "exclude": [
      // 需要忽略的文件
   ],
   // 继承的配置文件
   // "extends": "./tsconfig.json",
   // 需要编译的文件,用于少数文件的情况
   // "files": [],
   // 编译选项
   "compilerOptions": {
      // 编译输出目标,也就是 输出的 js 版本
      "target": "ES6",
      // 编译后模块化的的方案
      "jsx": "preserve",
      "experimentalDecorators": true,
      "module": "ES6",
      // 用来指定项目中使用的库
      // 一般不写,默认是在浏览器的运行环境中使用的运行环境
      // "lib": [
      //    "DOM",
      //    "ESNext"
      // ],
      "baseUrl": "./src", // 基础路径是必须指定的
      "paths": { // 映射关系是相对于 baseUrl 开始的
         // "@C": "./components",
         // 更加复杂的映射关系
         "*": [
            "*",
            "./pages/*"
         ]
         // "*"： 匹配所有值,所以映射为<moduleName> => <baseUrl>/<moduleName>
         // 通配符后导入 components/Test
         // 因为 * 所以不论写什么都是可以匹配的， ./src/components/Test 找到后就不会继续找了
         // 如果没找到就会继续寻找 ./src/pages/components/Test 从数组依次往后寻找
      },
      // 编译后的输出目录
      "outDir": "./dist",
      // 输出的文件,将全局作用域代码合并为一个文件,模块化只支持 amd 和 system 模块化方案
      // "outFile": "./dist/main.js"
      // 是否会编译 JS 文件
      "allowJs": false,
      // 是否检查 JS 文件类型
      "checkJs": false,
      // 是否移除注释
      "removeComments": true,
      // 不生成编译后的文件
      "noEmit": false,
      // 当有错误的时候不生成编译后的文件
      "noEmitOnError": true,
      // 所有严格检查的总开关
      "strict": false,
      // 编译后使用严格模式
      "alwaysStrict": true,
      // 不允许隐式的 any 类型
      "noImplicitAny": true,
      // 不允许隐式类型的 this
      "noImplicitThis": true,
      // 严格检查类型的空值
      "strictNullChecks": true,
   }
}
```

