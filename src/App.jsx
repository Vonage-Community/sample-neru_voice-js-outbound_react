import * as React from "react";

function App() {
  const [number, setNumber] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { "number": `${number}` };

    fetch(`call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  return (
    <div>
      <h1> Enter a phone number to receive a call from NeRu </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number:
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;