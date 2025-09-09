# AWS Lambda Functions

```node
// index.mjs
export const handler = async (event, context) => {
	const length = event.length;
	const width = event.width;

	let area = calculateArea(length, width);
	console.log(`The area is ${area}`);

	console.log('CloudWatch log group: ', context.logGroupName);

	let data = { "area": area };

	return JSON.stringify(data);

	function calculateArea(length, width) {
		return length * width;
	}
}
```

- The Lambda handler:
	- The entry point of your code. When your function is invoked, Lambda runs this method. The function `handler` takes two arguments: `event` and `context`.
	- An `event` in Lambda is a JSON formatted document that contains data for your function to process.
	- A `context` object contains information about the function invocation and execution environment.
 
