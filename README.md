> **Note**: NodeJS is awesome.
> **DB Access** node-my-events/Dx52EcDQNea7WhTb
> Feel free to use it.

## The node.js MyEvents app

Running the Node Server
### Windows
```
> cd my-events
> npm install
> set DEBUG=my-events:* & npm start
```
### Linux
```
$ cd my-events
$ npm install
$ DEBUG=my-events:* npm start
```
## Requirements
1. **Event List**: List or table of events sorted by creation date descending with pagination every 10 items.
    - Each event should display:
        - Title,
        - Event status (draft if not published, upcoming if there is at least a future session, past if all event sessions are in the past),
        - The date of the event,
        - Avatars and names of the event hosts,
    - Include a "Load more" button to load the next 10 events.
    - A select or buttons that can switch between displaying all events or filter them for a specific status.
2. **Event Creation**: A simple form to create a new event (the title is enough, the rest can be hardcoded). The added events must be received in real time if the app is opened in another tab/window.

### **Tech Stack**

- Frontend: Next.js/React
- Backend: Node.js, Express
- Database: MongoDB