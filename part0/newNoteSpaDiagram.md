```mermaid
sequenceDiagram
Note right of Browser: When submit button is clicked:
Browser->>Server: Send data for data to the server in JSON format:
Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Server->>Browser: STATUS CODE 201: Created!
Note left of Server: This time, the browser neither reloads or do GET requests,
the sending of the data and how the new note is displayed in the screen is handled by the js code in the page
```
