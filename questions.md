QUESTION:

1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.

ANSWER:
The difference between React.Component and React.PureComponent is how they differently handles re-rendering.
A Component always re-render when his parent re-renders, instead a PureComponent doesn't re-render if the value
of prop or state variable remain the same.

Using Component could break the app if the child component uses a callback that trigger a re-render on the father.
That will lead to a loop.

QUESTION:

2. Context + ShouldComponentUpdate might be dangerous. Why is
   that?

ANSWER:
ShouldComponentUpdate gives the opportunity to check everytime if a component should update or not. The data that can be checked are state and props.
If a component uses a context, the changes on context doesn't appear on ShouldComponentUpdate and cannot be checked.

QUESTION:

3. Describe 3 ways to pass information from a component to its
   PARENT.

ANSWER:
A. Using a callback that is passed from parent to child, and used inside the child.
B. Using context and changing the context (passed from the hierarchy) in the child.
C. Using a reducer, dispatching an action in child and using the state in the parent.

QUESTION:

4. Give 2 ways to prevent components from re-rendering.

ANSWER:
A. Using ShouldComponentUpdate specifying some cases where re-rendering is not needed
B. Using PureComponent as stated before prevents a re-rendering of component if its state and prop remains the same

QUESTION:

5. What is a fragment and why do we need it? Give an example where it
   might break my app.

ANSWER:
A fragment is tag used by React to wrap nodes together, and is opened like this <> and closed like this </> so like an empty tag, and used like a single React node.
A fragment alone cannot break an app, but there a couple of cases that needs some attentions.
When looping an array and returning a fragment, we need to specify a key for each element returned, so we need to use <Fragment key={...}> instead of <>
Also if we are working with css classes, a fragment is not a HTML DOM Element, so if we need to style it we need to add a proper tag (<div> for example) for wrapping children

QUESTION:

6. Give 3 examples of the HOC pattern.

ANSWER:
High Order Components were used in React Components for reusing component logic in different scenarios. In general a High Order Component is a function that takes a component and returns it different component enhancing its behaviour. A few examples may be:

A. With authentication: we can wrap a component ( withAuth(SomeComponent) ), in the function withAuth we can check if the user is logged, and we can return the component only if the user is logged
B. With styles: we can apply different styles at the same component simply passing it to a HOC function that apply passed styles.
C. With data fetched asyncronously: we can pass a component to an HOC function that get some data, and we render the component with the data if ready, or a loading element if not.

QUESTION:

7. What's the difference in handling exceptions in promises,
   callbacks and async...await?

ANSWER:
Handling exceptions is different in the three cases:

A. In promises we use resolve and reject ( new Promise((resolve, reject) => { ... }) ). With resolve we handle the no error case (we pass the result to the resolve callback), instead with the reject we handle the error cases (we pass something error related to the reject callback). Then we handle the result in the catch block ( someAsyncTask.then(data => ...).catch(error => ...) )
B. With callbacks we receive the error as first parameter, so we can check if the error is present and then move on.
C. With asynchronous code we can use try{...} catch{...} blocks, and handle the error in side the catch block:

async function asyncTask() {
try {
...
} catch (error) {
...
}
}

QUESTION:

8. How many arguments does setState take and why is it async.

ANSWER:
It takes 2 parameters: the nextState parameter (the new value we are setting for the next re-render), and a callback that will be called right after the update on the state is made.

QUESTION:

9. List the steps needed to migrate a Class to Function
   Component.

A) Convert the setState to differents useState hooks
B) Handle componentDidMount and componentDidUpdate using useEffect (with or without dependencies accordingly)
C) Use memo or hooks useMemo and useCallback to avoid useless re-renders
D) Use the right syntax for functional component (e.g. remove render, etc.)

QUESTION:

10. List a few ways styles can be used with components.

ANSWER:
A)We can have style inline, for example <div style={{margin: 10px}}>
B)We can use classNames, and explicit the class and relative style inside a .css file
C)We can use modules. We add a file NameOfComponent.module.css, add the class and relative style inside, then import the style in the file, and use it: <div className={styles.classnameofcomponent}>

QUESTION:

11. How to render an HTML string coming from the server.

ANSWER:
Rendering an HTML string is dangerous and should be done with the correct approach.
The best thing is to sanitize first the HTML string, removing potential malcious JS code.
Then we can use the prop dangerouslySetInnerHTML, but It's not a good approach in my opinion
