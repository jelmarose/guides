# NgRx - Reactive State Management for Angular

## Concepts

- Store - The storage of the app's state. Can only be accessed by selector and can only be modified by reducer.
- Action - Events called by the components and services, and calls the reducer to make changes to the state.
- Reducer - Functions that take the current state and change it based on the requirements given by the action.
- Selector - Functions that take the current state and give whatever data a component requests in whatever format in needs.
- Effect - Handles the logic that happens after an action is executed.
- Facade - Easy to access observables and functions that can be reused throughout the app without exposing the state management's logic.

Explanation of Effect:

For example, we have the following actions: **login**, **loginSuccess**, and **loginFailed**. Each action has the following responsibilities:
- login - set state.isLoading to true and state.error to null, <ins>send the user credentials to the API service for validation</ins>
- loginSuccess - set state.isLoading to false and state.error to null, <ins>store the user details in the state and automatically navigate the user to the dashboard</ins>
- loginFailed - set state.isLoading to false and state.error to whatever error the service returns, <ins>displays a warning to the user</ins>

An effect is a list of steps that you want the action to do after the state is modified. It is everything underlined. Effects are only executed after the reducer is done modifying the state.

![Life Cycle](https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png "Life Cycle")

Flow - Modifying the State
1. Component calls action
2. Action calls reducer
3. Reducer modifies state
4. Action calls effect, if it has any

Flow - Getting the State Values
1. Component calls selector
2. Selector returns specific data

## File structure
```
- module
  - components                  // all components are declared here
  - services                    // all services are declared here
  - store                       // all files for the module's state management are here
      - module.actions.ts       // actions
      - module.reducer.ts       // reducers and state
      - module.selectors.ts     // selectors
      - module.effects.ts       // effects
      - module.facade.ts        // facade. this is what will interact with the components the most.
```
