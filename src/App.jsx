import React, { useState, useEffect } from "react";
import "./style.css";
import StoryList from "./StoryList";
import StoryViewer from "./StoryViewer";
import AddStoryForm from "./AddStoryForm";

const STORIES = [
  { id: 1, author: "doora", avatar: "https://cs18.pikabu.ru/s/2025/08/29/13/ukgbc5kb.jpg", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVAdXv3JjBLtuHd4USM1ioYsTbLk61t9U9NpO-JWqIDXjwx8ay5tOn-UQ&s=10", viewed: false },
  { id: 2, author: "kussia", avatar: "https://images.hiwaifu.com/uploads/Api/robot_avatar/202410/12a63111610ef1f1d0c90180969efb31.webp?image_process=resize,w_200", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0on7i0lrzrNhvddaTIJ69AJcz-IZEIrqNJA8mQ6AMf4phPBmWQE4__dLu&s=10", viewed: false },
  { id: 3, author: "qwery", avatar: "https://media.2x2tv.ru/content/images/size/w1440h1080/2026/04/Image-24.jpg", 
    image: "https://1ps.ru/files/blog/2021/13-stories/1_foto_dlya_budushchej_storis.jpg", viewed: false },
];

const loadUsers = () => {
  try {
    const saved = localStorage.getItem("story-users");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadCurrentUser = () => {
  return localStorage.getItem("story-current-user") || null;
};

export default function App() {
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadCurrentUser);
  const [stories, setStories] = useState(STORIES);
  const [activeStory, setActiveStory] = useState(null);

  useEffect(() => {
    localStorage.setItem("story-users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("story-current-user", currentUser);
    } else {
      localStorage.removeItem("story-current-user");
    }
  }, [currentUser]);

  const handleAuth = (name, password, isRegistering) => {
    const cleanName = name.trim();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanPassword) {
      alert("Введите имя и пароль");
      return;
    }

    const existingUser = users.find((u) => u.name === cleanName);

    if (isRegistering) {
      if (existingUser) {
        alert("Пользователь уже существует");
        return;
      }
      const newUser = { name: cleanName, password: cleanPassword };
      setUsers([...users, newUser]);
      setCurrentUser(cleanName);
    } else {
      if (!existingUser || existingUser.password !== cleanPassword) {
        alert("Неверное имя или пароль");
        return;
      }
      setCurrentUser(cleanName);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddStory = (image, author) => {
    const newStory = {
      id: Date.now(),
      author: author,
      avatar: "https://www.perunica.ru/uploads/posts/2011-10/1319832745_0_6065c_b70de565_l.jpg",
      image: image,
      viewed: false,
    };
    setStories([newStory, ...stories]);
  };

  const handleViewStory = (story) => {
    setActiveStory(story);
    setStories((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, viewed: true } : s))
    );
  };

  const handleCloseStory = () => {
    setActiveStory(null);
  };

  return (
    <div className="app-container">
      {!currentUser ? (
        <AuthForm onAuth={handleAuth} />
      ) : (
        <div>
          <div className="user-header">
            <h3>Привет, {currentUser}!</h3>
            <button onClick={handleLogout}>Выйти</button>
          </div>
          
          <AddStoryForm onAdd={handleAddStory} author={currentUser} />
          <StoryList stories={stories} onView={handleViewStory} />
        </div>
      )}

      {activeStory && (
        <StoryViewer story={activeStory} onClose={handleCloseStory} />
      )}
    </div>
  );
}

function AuthForm({ onAuth }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(name, password, isRegistering);
    setName("");
    setPassword("");
  };

  return (
    <div className="auth-block">
      <h3 className="auth-title">
        {isRegistering ? "Регистрация" : "Вход в аккаунт"}
      </h3>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isRegistering ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
      
      <button 
        type="button" 
        className="auth-switch" 
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? "Войти" : "Зарегистрироваться"}
      </button>
    </div>
  );
}