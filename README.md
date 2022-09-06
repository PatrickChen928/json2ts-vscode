# json2ts-vsc

convert `JSON` or `JS object` to ts type

* [Online Link](https://chpshy.github.io/json2ts/index.html)
* [GitHub](https://github.com/ChpShy/json2ts)

## Features

- support `level nesting`
- support `array` parse
- support `comment` parse
- more flexible. support `key` with `double quotes` or `single quotes` or `no quotes`

## Usage

### JSON / JS object

json2ts converts a JSON from clipboard to TypeScript interfaces with `cmd+alt+V` or `ctrl+alt+V`.  
**In mac, `^ + ⌥ + V`**

```javascript
// copy content below
{ 
  // This is a name key
  name: "bengbeng", // His name is bengbeng
  age: 20, // This is his age
  interest: [ 'swim', 'football', 22, {a: 1, b:2}, {a: 1} ]
  girlfriend: {
  	name: "qiaqia",
    age: 18,
    "exboyfriend": [
      {
    	name: "uzzz",
        age: 40
      }
    ]
  }
}

// paste, then get this 👇
type Interest$1Type = {
  a: number
  b?: number
}

type Exboyfriend$2Type = {
  name: string
  age: number
}

type Girlfriend$3Type = {
  name: string
  age: number
  exboyfriend: Array< Exboyfriend$2Type >
}

type Result$0Type = {
  // This is a name key; 
  // His name is bengbeng
  name: string
  // This is his age
  age: number
  interest: Array< string | number | Interest$1Type >
  girlfriend: Girlfriend$3Type
}

```

### REST-Service
Copy a REST-Service URL to clipboard and insert TypeScript interfaces with `cmd+alt+X` or `ctrl+alt+X`.  
**In mac, `^ + ⌥ + X`**

## Thanks

Inspire by [VSCode-json2ts](https://github.com/GregorBiswanger/VSCode-json2ts)

**Enjoy!**
