# Designing Your Tests

Before we start automating, we must design our test by determining how it should run manually. Computers are excellent at following instructions, and we'll take advantage of that by writing clear steps of what it should do.

Let's use the following scenario as an example. 

You have a class that takes a bunch of data from an API endpoint, formats it so it can be viewed in a table, changes all date formats into YYYY-MM-DD, and filters which entries are viewable by the current user based on their permission settings. This is pretty complicated stuff, so we'll focus on one part for now: formatting the data to be displayed in a table.

Given the following raw data:

```javascript
let res = [
  {
    name: "Jane Doe",
    birthday: "09/09/2009",
    gender: { male: false, female: true }
  },
  {
    name: "Jason Smith",
    birthday: "January 1, 1998",
    gender: { male: true, female: false }
  },
  {
    name: "Gerald Manson",
    birthday: "10-23-1991",
    gender: { male: true, female: false }
  },
  {
    name: "Helena Trudy",
    birthday: "Tue Mar 03 1987 00:00:00 GMT+0800 (Philippine Standard Time)",
    gender: { male: false, female: true }
  },
]
```

To be used as a data table source, we have to format the data onto the following structure:

```javascript
{
  name: string,
  birthday: string (YYYY-MM-DD),
  gender: string
}
```

Let's create an interface for this format and call it ``ITableEntry``.

1. **Write a general description of what a function does** - Given an array of raw data taken from the API, the function must return an array of ``ITableEntry`` items.

2. **If a function accepts a parameter, make a list of valid input formats** - The only valid input the function requires is an array of raw data, but given how different each data is presented, we'll have to narrow down this by what data we *require*. 

Since our table will only display the columns ``Name``, ``Birthday``, and ``Gender``, we will require that each item in the array has these properties. 

| Input                                                                               	|
|-------------------------------------------------------------------------------------	|
| Array of objects that has <br> ``name``, ``birthday``, and ``gender`` properties. 	  |

3. **Following the second step, make a list of invalid input formats** - This one can be easy or difficult depending on how varied your input is. For example, in our raw data above, we have multiple date formats but they're all stringified. But what do we do if our ``birthday`` property has a ``Date`` object? Is it considered invalid?

To start with, let's reverse our first input.

| Input                                                                               	|
|-------------------------------------------------------------------------------------	|
| Array of objects that has <br> ``name``, ``birthday``, and ``gender`` properties. 	  |
| Array of objects that has no <br> ``name``, ``birthday``, or ``gender`` properties.   |

Given the following scenario, should we consider the array input invalid?
- The name is blank or just whitespace
- The name has special characters on it
- The name has numbers
- The name is any other data type aside from string
- The birthday contains numbers that is out of bounds for a date (e.g. 01/42/2020)
- The birthday contains numbers that don't form a date (e.g. 11111111)
- The gender is a stringified object
- The gender is a string of value (e.g. "Male")
- The gender object doesn't have the ``male`` or ``female`` properties
- The gender object is just an empty object
- The gender object's properties both have false values
- Any of the above properties contains a null value

Of course, these can still be handled inside the function without declaring the whole input array invalid. What if we have actual valid objects inside that array? But I want you to consider these possibilities, no matter how weird or impossible they are. We will write a test case with these possibilities in mind.

4. **Given the list of valid input, write the expected output to be returned by the function.** If it doesn't return anything, write what it modifies or any indication that the correct action has been done.

Since our function returns an array of ``ITableEntry`` objects, let's put that as our expected output.

| Input                                                                               	| Expected Output              	|
|-------------------------------------------------------------------------------------	|------------------------------	|
| Array of objects that has <br> ``name``, ``birthday``, and ``gender`` properties.   	| Array of ITableEntry objects 	|
| Array of objects that has no <br> ``name``, ``birthday``, or ``gender`` properties. 	|                              	|

5. **Given the list of invalid input, write the expected actions to be done by the function.** If it needs to throw an error, or return nothing, note it down.

Let's add more items to our input column.

| Input                                                                               	| Expected Output                     	|
|-------------------------------------------------------------------------------------	|-------------------------------------	|
| Array of objects that has <br> ``name``, ``birthday``, and ``gender`` properties.   	| Array of ITableEntry objects        	|
| Array of objects that has no <br> ``name``, ``birthday``, or ``gender`` properties. 	| Throw ``invalid input`` error       	|
| Empty array                                                                         	| Return empty array                          	|
| Undefined parameter                                                                 	| Throw ``undefined parameter`` error 	|

Make sure to throw errors on parameters that are actually invalid and can stop the function. These will help you in the long run, and make bug fixing less of a guess work.

6. **If a function does not accept a parameter but returns something, write down what it should return** - Not related to our formatting function scenario, but something to note of. A common example here is a random number generator. This is easier to track since we don't need to make a list of valid and invalid inputs.

7. **If a function does not accept a parameter and returns nothing, write down what should change and how to track it** - This is for functions that modifies a local or global variable inside a class. 

Now, these are enough to run a unit test. But what about end-to-end tests, when the feature is actually integrated in the system? Our inputs may be different now, but the steps are similar.

## Writing a basic end-to-end test

Let's say we have a login form in our homepage that we want to test. In this form, we have a field for username, password, and a button that will submit the credentials for the API to process.

1. **Write a general description of what a feature does** - For our current scenario, the form should accept valid username and password and log us in the system.
2. **If a feature accepts input, make a list of valid input formats** - Inputs in this case can be keyboard input or mouse clicks. For our username field, let's restrict the input to alphanumeric characters. Our password field can accept alphanumeric and special characters. The submit button should not disabled so we can log in.
3. **Following the second step, make a list of invalid input formats** - Like our formatting function case, let's reverse some of our inputs to get invalid ones.
    - Username with whitespace
    - Username with special characters
    - No username

4. **Given the list of valid input, write the expected output of the feature.**
5. **Given the list of invalid input, write the expected actions of the feature.** 
6. **List down step by step on how to interact with the feature.** This may sound tedious, like teaching someone who has never touched a computer how to do the basic stuff. But remember, computers are excellent at following instructions. It just doesn't know what those instructions are. It's our job to give them clear steps to accomplish our goal.

    For our login form, let's give the following instructions as an example.
      - Check the page if it's viewing the homepage.
      - Look for the login form.
      - Type a valid username on the username field.
      - Type a valid password on the password field.
      - Click the submit button.
      - Wait for the page to load.
      - Check if you successfully logged in.

## Recap

For unit tests:
1. **Write a general description of what a function does** - e.g. This function should format an array of raw data into an array of TableEntry objects.
2. **If a function accepts a parameter, make a list of valid input formats** - e.g. This function accepts an array of objects with or without the `name` property.
3. **Following the second step, make a list of invalid input formats** - e.g. This function does not accept `null` or `undefined` parameter OR this function does not accept an array of objects without the `id` property.
4. **Given the list of valid input, write the expected output to be returned by the function.** If it doesn't return anything, write what it modifies or any indication that the correct action has been done.
5. **Given the list of invalid input, write the expected actions to be done by the function.** If it needs to throw an error, or return nothing, note it down.
6. **If a function does not accept a parameter but returns something, write down what it should return** - e.g. A random number generator function returns a number.
7. **If a function does not accept a parameter and returns nothing, write down what should change and how to track it** - e.g. A function that changes a global boolean variable from true to false and vice versa.

For end-to-end tests:
1. **Write a general description of what a feature does** - e.g. This form should accept valid email and password as input and log me in the system. 
2. **If a feature accepts input, make a list of valid input formats** - e.g. This form accepts alphanumeric characters OR This button should be clickable
3. **Following the second step, make a list of invalid input formats** - e.g. This form does not accept special characters 
4. **Given the list of valid input, write the expected output of the feature.**
5. **Given the list of invalid input, write the expected actions of the feature.** 
6. **List down step by step on how to interact with the feature.** This will greatly speed up writing automated tests.

## Record Your Test Results

Here's an example of how to track your test results. Using a table helps easily identify what went wrong so you can refine your tests faster.

For unit tests:

**Description:** This function accepts inputs and does stuff.


| Input              	| Expected Output  	| Actual Output    	|
|--------------------	|------------------	|------------------	|
| `some valid input` 	| `correct output` 	| `correct output` 	|
| null               	| throw Error      	| threw Error      	|
| undefined          	| throw Error      	| threw Error      	|
| `[]`               	| do nothing       	| did nothing      	|


For end-to-end tests:

**Description:** Log in page.


| Repro Steps                                                                             	| Expected Output                          	| Actual Output                           	|
|-----------------------------------------------------------------------------------------	|------------------------------------------	|-----------------------------------------	|
| 1.Clicked Log In button.<br><br>2.Typed in valid credentials.<br><br>3.Clicked Submit button.   	| Should log in                            	| Logged in                               	|
| 1.Clicked Log In button.<br><br>2.Typed in invalid credentials.<br><br>3.Clicked Submit button. 	| Should not log in, <br>display error message 	| Did not log in, <br>error message displayed 	|

## Do you need to write a test for it?

A good rule is if you think it's complicated enough and you have a gut feeling that it would fail given a specific circumstance, write a test for it.

Another one is if it's an important part of a bigger feature, and you'll be testing it manually repeatedly anyway, write a test for it.

# Automated Testing with Jasmine

Let's say we have an array of forms with the following interface:

```typescript
interface IForm {
  id: string,
  name: string,
  category?: string
}
```

And we have an array of categories with this structure:

```typescript
interface ICategory{
  name: string,
  forms: IForm[]
}
```

What we're testing will be a function that sorts forms into categories. But since ``category`` is an optional property, forms without it will be classified as ``Uncategorized``.

Given the following categories and forms, what should the function do?

```typescript
let categories = [
  {
    name: "Finance",
    forms: []
  },
  {
    name: "HR",
    forms: []
  },
  {
    name: "Uncategorized",
    forms: []
  }
]

let forms = [
  {
    id: "3fbc1a15-7f78-485e-bada-8445bfed12f1",
    name: "Invoice form",
    category: "Finance"
  },
  {
    id: "4fecb435-b978-408c-b187-d80f65af00ee",
    name: "Guestbook sign in form"
  }
]
```

Using our last [guide in designing tests](https://jelmarose.com/post/automated-testing-design/), let's write a list of test cases for this function.

First, let's write a general description of what the function does:
- Function should accept an array of forms and sort them into categories.

If a function accepts a parameter, make a list of valid input formats:
- Function should accept form with category and sort into proper category
- Function should accept form without category and sort into Uncategorized

Following the second step, make a list of invalid input formats:
- Function should not accept null or undefined parameter
- Function should not accept form that doesn't follow the IForm interface

And since it's one of our requirements:
- Function should add a new category if a form's category does not exist yet

Now we have these test cases, let's get to writing our tests.

## Should you use Jasmine?

Jasmine is a good option you want to do a black box test at code level. This testing doesn't care about how the function resolves the problem, just that it returns the expected output given a certain input.

## Setting up Jasmine

In an Angular project, Jasmine is used with Karma and spec files are created along with the component when you use Angular's generate command.

However, I wanted to use it on own since setting it up with Karma can be tedious (especially when used with services). Installing ``jasmine-core`` is enough for this project, and since Jasmine is not dependent on frameworks, you can use this on vanilla Javascript.

Here's a basic set up of tests. Let's say we generate a component using `ng g c my-component`, Angular creates the following folder for us.
```
  my-component
    - my-component.component.html
    - my-component.component.css
    - my-component.component.ts
    - my-component.component.spec.ts
```
What I will do is navigate to ``my-component`` in the command line (in Visual Studio Code, right click the ``my-component`` folder and select ``Open in Integrated Terminal``) and type ``npx jasmine init``. This will add files to our component folder, which will look like this:
```
  my-component
    - spec
      - support
        - jasmine.json
    - my-component.component.html
    - my-component.component.css
    - my-component.component.ts
    - my-component.component.spec.ts
```
You can modify ``jasmine.json`` to fit to your needs, but for now I'll leave it alone.

Next, I'll create two new files under ``spec``:
```
  my-component
    - spec
      - my-component.js
      - my-component-spec.js
      - support
        - jasmine.json
    - my-component.component.html
    - my-component.component.css
    - my-component.component.ts
    - my-component.component.spec.ts
```
You might be wondering, why create a separate folder when there's already a ``my-component.component.spec.ts``? Isn't it the same? Yes it is! But this file needs to be run with Karma, a Javascript Test Runner. For now, I don't want to depend on it and just needs the bare bones testing to be done with Jasmine alone. (Also when I try to run Karma in our project it throws all sorts of errors that I don't want to touch in fear of ruining my teammates' work).

Remember the test cases we wrote back then for our sorting function? Now we'll actually write those. But first, let me explain why we need two separate files.

``spec/my-component.js`` will contain the code we need to test. This is essentially a plain Javascript mirror of the ``my-component.component.ts`` file. All the functions you want to test in your ``ts`` file, copy them to the ``js`` file for testing.

Let's say you have the following content of ``my-component.component.ts``:
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //This will be our sorting function
  sortByCategory(forms){

  }

}
```
In our ``spec/my-component.js`` file, we will write the following:
```javascript
class MyComponent{
  constructor(){

  }
  sortByCategory(forms){

  }
}
module.exports = MyComponent; 
// Don't change to export default MyComponent, results to Unexpected token export error   
```
Pretty simple, right?

Now let's go to ``spec/my-component-spec.js``. This will contain our Jasmine tests.

Just to recap, here's the test cases we wrote:

- Function should accept an array of forms and sort them into categories.
- Function should accept form with category and sort into proper category
- Function should accept form without category and sort into Uncategorized
- Function should not accept null or undefined parameter
- Function should not accept form that doesn't follow the IForm interface
- Function should add a new category if a form's category does not exist yet

Let's start with the simplest test case: not accepting a parameter with falsy (null or undefined) value.

## Writing our tests with Jasmine

Here's how I format my Jasmine tests.

```javascript
describe("my-component", ()=> {
  var MyComponent = require("./my-component.js");
  var myComponent;

  beforeEach(()=> {
    myComponent = new MyComponent();
  })

  describe("sortByCategory", function(){
      it("should not accept undefined forms parameter", ()=> {
          expect(()=>{
              myComponent.sortByCategory(undefined);
          }).toThrowError("Forms can't be undefined");
      });
  });
})
```

Let's break it down:

**The``describe`` function groups related specs**, and we want all test specs for ``my-component`` in one place. The string parameter names this collection of tests, which you will see once a spec fails.

**``beforeEach`` is a function that runs before each test spec.** In this case, we will initialize a new ``myComponent`` instance before each test. There's a similar function called ``beforeAll``, which is called only once before all the specs are run. Make sure to read the tutorial I linked on top of this guide for more information!

Now here's another ``describe`` function to group all the test specs for our ``sortByCategory`` function. **The ``it`` function is used to define a test spec, and accepts the same parameters as ``describe``.** The string parameter explains what the test is about. 

**``expect`` is used to define the test expectations, and takes a parameter called actual.** This actual can be anything, and for this example we're passing a callback function. ``expect`` is chained with a matcher function by appending a dot at the end followed by the matcher.

**``toThrowError`` is a matcher function that detects any error thrown by the callback function we passed on ``expect``, and takes a string parameter for the error message.** Pretty straightforward stuff.

Let's run the test with ``npx jasmine``.

```
Started
.F

Failures:
1) myComponent sortByCategory should not accept undefined forms parameter
  Message:
    Expected function to throw an Error.
  Stack:
    Error: Expected function to throw an Error.
        at UserContext.it

1 spec, 1 failure
Finished in 0.021 seconds
```

This is expected, since the ``sortByCategory`` function doesn't have any logic yet.

Let's update ``"spec/my-component.js``:
```javascript
  sortByCategory(forms){
    if(forms == undefined){
      throw new Error("Forms can't be undefined")
    }
  }
```

Again, let's run the test.
```
Started
..


1 spec, 0 failures
Finished in 0.011 seconds
```

This cycle of writing tests, testing, updating our code so it passes the test, and testing again, is called **red-green-refactor** in the context of test driven development. Refactor comes in when you have to think of ways to improve the function and still pass the tests you've written.

Hopefully this gave you a good introduction on how to test with Jasmine. In the next guide I will use Jasmine with Karma, the test runner for Angular.

## References

[Here's the official guide for setting it up in a Node project.](https://jasmine.github.io/setup/nodejs.html)

[And here's a tutorial for writing your first test suite in Jasmine.](https://jasmine.github.io/tutorials/your_first_suite)

