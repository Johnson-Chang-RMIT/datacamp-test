const { useState } = React;

function Header({ onNavigate }) {
  return (
    <header>
      <nav>
        <a href="#" onClick={() => onNavigate('profile')}>Profile</a>
        <a href="#" onClick={() => onNavigate('match')}>Match</a>
        <a href="#" onClick={() => onNavigate('chat')}>Chat</a>
      </nav>
    </header>
  );
}

function Profile() {
  return (
    <div>
      <h2>Your Profile</h2>
      <div className="card">
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Skills
          <input type="text" placeholder="e.g. JavaScript, React" />
        </label>
        <label>
          Experience Level
          <select>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
            <option>Career Switcher</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function Match() {
  const [index, setIndex] = useState(0);
  const cards = [
    {id: 1, name: 'TechCorp', skills: 'Full-stack, React'},
    {id: 2, name: 'DesignCo', skills: 'UI/UX, Figma'},
    {id: 3, name: 'Productify', skills: 'Product Management'}
  ];
  const card = cards[index];

  function swipe(dir) {
    if (index < cards.length - 1) {
      setIndex(index + 1);
    } else {
      alert('No more matches');
    }
  }

  return (
    <div>
      <h2>Discover Opportunities</h2>
      {card && (
        <div className="card">
          <h3>{card.name}</h3>
          <p>{card.skills}</p>
          <div className="swipe-buttons">
            <button className="button-dislike" onClick={() => swipe('left')}>Dislike</button>
            <button className="button-like" onClick={() => swipe('right')}>Like</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  function sendMessage() {
    if (text.trim() !== '') {
      setMessages([...messages, {text}]);
      setText('');
    }
  }

  return (
    <div>
      <h2>Chat</h2>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i}>{m.text}</div>
        ))}
      </div>
      <input
        className="chat-input"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message" />
    </div>
  );
}

function App() {
  const [view, setView] = useState('profile');

  let content;
  if (view === 'profile') content = <Profile/>;
  else if (view === 'match') content = <Match/>;
  else if (view === 'chat') content = <Chat/>;

  return (
    <div>
      <Header onNavigate={setView}/>
      {content}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
