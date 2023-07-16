import { useEffect, useState } from 'react';
import { Container, Navbar, Form } from 'react-bootstrap';

import emojiList from './emojiList.json';
import './App.css';

function App() {
  const [emojis, setEmojis] = useState(emojiList.slice(0, 15));
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const setData = setTimeout(() => {
        setEmojis((emojis) => {
          return emojiList.filter((emoji) => {
            return (
              emoji.description.toLowerCase().includes(searchText) || 
              emoji.tags.includes(searchText) ||
              emoji.aliases.includes(searchText) ||
              emoji.category.toLowerCase().includes(searchText)
              )
            }).slice(0, 15)
          })
        }, 300);
      return () => clearTimeout(setData);
  }, [searchText])

  const handleChange = (e) => {
    setSearchText(searchText => searchText = e.target.value.toLowerCase());
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="justify-content-center" fluid>
          <Navbar.Brand>Emoji Search</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Form.Control className='my-4' size="lg" type="text" placeholder="Search emojis..." value={searchText} onChange={handleChange} />
        <ul className='p-0'>
          {emojis.map((emoji, index) => (
            <li className='card border border-1 rounded-0 p-2' key={index}>
              {emoji.emoji}{" "}|{" "}
              {emoji.description}{" "}|{" "}
              {emoji.tags.map((tag) => `#${tag}`)}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export default App;
