import { useState } from "react";
import Card from "react-bootstrap/Card";

export function UserSearch() {
  const [users, setUser] = useState([]);
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    if (event.target.value === "") {
      setUser([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/search/users?q=${text}`)
      .then((response) => {
        if (response.status === 422) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data.items);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search user..."
          type="text"
          onChange={handleChange}
        />
      </form>
      <div className="container">
        {users.map((user) => {
          return (
            <Card bg="dark" className="card" key={user.id}>
              <Card.Body>
                <div className="content">
                  <Card.Link className="link" href={user.html_url}>
                    {user.login}
                  </Card.Link>
                  <Card.Text style={{ width: "80%" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec id tempus elit, vitae sollicitudin dui. Etiam ut magna
                    sed nibh tincidunt bibendum et sed odio. Praesent vitae erat
                    tellus.
                  </Card.Text>
                </div>
                <Card.Img
                  className="card-img"
                  variant="left"
                  src={user.avatar_url}
                />
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}
