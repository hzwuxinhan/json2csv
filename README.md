# json-2-csv-ts

Converts json to csv

## How to use

Install

```bash
$ npm install json-2-csv-ts --save
```


```javascript
import { json2csv } from 'json-2-csv-ts';
const myData = {
    id:"id",
    name:"name",
    comments:[
        "first",
        "second",
        "third"
    ]
}

try {
  var result = json2csv(myData)
  console.log(result);
} catch (err) {
  console.error(err);
}
```


###  Options

- `data` - **Required** Array or Object
- `options` 
  - `expandArray` - whether u need to expand an array as new row.
    - true(default) [expandArray true example](#example-1) 
    - false [expandArray false example](#example-2)  
  - `download` - whether u need download csv.
    - false(default)
  - `fileName` - default fileName is 'default.csv'


### Example 1

```javascript
import { json2csv } from 'json-2-csv-ts';
const myData = {
    id:"id",
    name:"name",
    comments:[
        "first",
        "second",
        "third"
    ]
}

try {
  var result = json2csv(myData,{
      expandArray:true
  })
  console.log(result);
} catch (err) {
  console.error(err);
}
```

The result should be

```
id,name,comments
"id",name,"first"
,,"second"
,,"third"
```

The csvFile looks like

| id | name | comments |
| -- | ---- | -------- |
| id | name | first |
|   |      | second |
|   |      | third |

### Example 2

```javascript
import { json2csv } from 'json-2-csv-ts';
const myData = {
    id:"id",
    name:"name",
    comments:[
        "first",
        "second",
        "third"
    ]
}

try {
  var result = json2csv(myData,{
      expandArray:false
  })
  console.log(result);
} catch (err) {
  console.error(err);
}
```

The result should be

```
id,name,comments
"id",name,"first,second,third"
```

The csvFile looks like

| id | name | comments |
| -- | ---- | -------- |
| id | name | first,second,third |

### Example 3

```javascript
import { json2csv } from 'json-2-csv-ts';
const myData = [
  {
    id:"1",
    name:"test"
  },
  {
    id:"2",
    des:"desc"
  }
]
    

try {
  var result = json2csv(myData,{
      expandArray:true
  })
  console.log(result);
} catch (err) {
  console.error(err);
}
```

The result should be

```
id,name,des
"1","test",
"2",,"desc"
```

The csvFile looks like

| id | name | des |
| -- | ---- | -------- |
| 1 | test |  |
| 2 | | desc |