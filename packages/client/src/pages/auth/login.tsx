import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeUrl } from "../../lib/authorized-fetch";

interface LoginResponse {
  token: string;
}

const login = async (username: string, password: string): Promise<void> => {
  const response = await fetch(await makeUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la connexion");
  }

  const data: LoginResponse = await response.json();
  const token = data.token;

  document.cookie = `token=${token}; path=/`;
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await login(username, password);
      navigate("/welcome");
    } catch (error) {
      setError("Échec de connexion, veuillez vérifier vos identifiants.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>username :</label>
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label>Mot de passe :</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Connexion</button>
      {error && <p>{error}</p>}
    </form>
  );
};
