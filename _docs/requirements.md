Spitfire Technical Interview

What we're interested in:

- Simplicity
- Legibility

What you can ignore:

- Long term maintenance
- Theming / Aesthetics

Restrictions:

- The app should run in an online code sandbox ( flems.io, jsbin, codesandbox etc )
- You can only use a virtual dom library: 
	- React/Mithril/Preact/Cycle/Snabbdom etc are fine
	- Vue/Angular are not
- The app must be 100% client side
- Client side persistence can not use localStorage

The Problem:

- Create a UI that allows a user to create boxes of various colours and sizes.
- Create a human readable description of how many boxes there are of each colour.
- Clicking a box will remove it.
- There should be an undo/redo button with unlimited history.
- You can click and drag a box into a particular position
- You can increase / decrease the size of the box with mouse wheel scroll
- Boxes, their colour, position, size position should be persisted client side across refreshes. 
- Undo / Redo history should be persisted across browser refresh.
