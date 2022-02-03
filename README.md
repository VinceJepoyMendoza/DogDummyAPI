# DogDummyAPI

**Dummy rest API about dogs perfect for beginners learning APIs**

[DogDummyAPI](https://dogdummyapi.netlify.app/get-started) is a free rest API about dogs with the goal of providing students or experince developer a simple rest API that everyone can access and use for their placeholder or dummy website anytime, anywhere free of charges

You can visits [DogDummyAPI](https://dogdummyapi.netlify.app/get-started) for more information <br><br>

## Why

**Free** and **simple** rest API made for **beginners** in mind. [DogDummyAPI](https://dogdummyapi.netlify.app/get-started) provides you with beginner friendly rest API with its varieties of properties that covers most of data types including Strings, Number, Array, Object and even Nested Object.<br><br>

## Main Routes

There are 4 main routes presents as of now:

- Dogs: [https://dogdummyapi.herokuapp.com/dogs](https://dogdummyapi.herokuapp.com/dogs)
- Categories: [https://dogdummyapi.herokuapp.com/categories](https://dogdummyapi.herokuapp.com/categories)
- Colors: [https://dogdummyapi.herokuapp.com/colors](https://dogdummyapi.herokuapp.com/colors)
- Images: [https://dogdummyapi.herokuapp.com/images](https://dogdummyapi.herokuapp.com/images)<br><br>

## How to

[DogDummyAPI](https://dogdummyapi.netlify.app/get-started) only accept **GET** requests and filter routes only works if given atleast 1 query. Check [All Queries](#all-queries) for available queries.

### **Get all dogs**

```js
fetch('https://dogdummyapi.herokuapp.com/dogs')
  .then((res) => res.json())
  .then((json) => console.log(json))
```

### **Search dogs by name**

```js
fetch('https://dogdummyapi.herokuapp.com/dogs/filter?search=te')
  .then((res) => res.json())
  .then((json) => console.log(json))
```

Note: This will return dogs that include "te" in their name. Filter route will only work if given atleast 1 query. Check [All Queries](#all-queries)<br>

### **Get all categories**

```js
fetch('https://dogdummyapi.herokuapp.com/categories')
  .then((res) => res.json())
  .then((json) => console.log(json))
```

### **Get all colors**

```js
fetch('https://dogdummyapi.herokuapp.com/colors')
  .then((res) => res.json())
  .then((json) => console.log(json))
```

### **Get all images**

```js
fetch('https://dogdummyapi.herokuapp.com/images')
  .then((res) => res.json())
  .then((json) => console.log(json))
```

## All available routes

**Dogs:**

- **/dogs** (get all dogs)
  - ?sort=asc|desc
- **/dogs/filter?** (get all filtered dogs)
  - this route includes all available queries. see [All Queries](#all-queries)

**Dog:**

- **/dog/id/1** (get single dog with id)
- **/dog/name/Labrador Retriever** (get single dog with specific name)

**Categories**

- **/categories** (get all categories)
  - ?sort=asc|desc
- **/categories/hound** (get all dogs with the specific category)
- **/categories/hound/filter?** (get all filtered dogs with the specific category)
  - this route includes all available queries. see [All Queries](#all-queries)

**Color**

- **/colors** (get all available colors)
  - ?sort=asc|desc
- **/colors/filter?** (get all filtered available colors.)
  - ?sort=asc|desc
  - ?limit
  - ?search

**Images**

- **/images** (get all of dog's image)

**Image**

- **/image/Border_Collies.jpg** (get single dog's image)
  <br><br>

## All queries

All filter routes have all the queries except the **/colors/filter?** route. queries can stack. check individual route for their available queries

<!-- Query Table -->

| Query             | Description                                                                                                                                                                                           |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit             | limits the results. if limit is bigger than the result, this query will be negated and just return all result                                                                                         |
| sort              | filter result in ascending or descending alphabetical order.                                                                                                                                          |
| search            | filter all values that includes or match the query's value                                                                                                                                            |
| color             | filter all dogs by colors that includes or matched the query's value. space ' ' is converted to underscore "\_" and "&" to dash/minus sign "-". Example: "Black_Brown-White" to "Black Brown & White" |
| minLifeExpectancy | filter all dogs that has minimum life expectancy of >= query's value                                                                                                                                  |
| maxLifeExpectancy | filter all dogs that has maximum life expectancy of <= query's value                                                                                                                                  |
| maleMinHeight     | filter all dogs that minimun male height are >= to query's value                                                                                                                                      |
| maleMaxHeight     | filter all dogs that maximun male height are <= to query's value                                                                                                                                      |
| femaleMinHeight   | filter all dogs that minimun female height are >= to query's value                                                                                                                                    |
| femaleMaxHeight   | filter all dogs that maximun female height are <= to query's value                                                                                                                                    |
| maleMinWeight     | filter all dogs that minimun male weight are >= to query's value                                                                                                                                      |
| maleMaxWeight     | filter all dogs that maximum male weight are <= to query's value                                                                                                                                      |
| femaleMinWeight   | filter all dogs that minimun female weight are >= to query's value                                                                                                                                    |
| femaleMaxWeight   | filter all dogs that maximum female weight are <= to query's value                                                                                                                                    |

<br>

## **Todo:**

- Add more dogs
- Add "trivia" property for all dogs

<br>

[DogDummyAPI](https://dogdummyapi.netlify.app/get-started) by [Vince Jepoy Mendoza](https://www.linkedin.com/in/vince-jepoy-mendoza-5b93a6223/)
