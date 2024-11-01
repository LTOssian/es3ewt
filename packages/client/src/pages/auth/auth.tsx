import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeUrl } from "../../lib/authorized-fetch";

interface AuthFormProps {
  isRegister: boolean; // true pour l'inscription et false pour la connexion
}

interface LoginResponse {
  token: string;
}

const authenticate = async (
  username: string,
  password: string,
  isRegister: boolean,
): Promise<void> => {
  const endpoint = isRegister ? "/auth/register" : "/auth/login";
  const response = await fetch(await makeUrl(endpoint), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la connexion ou de l'inscription");
  }

  if (!isRegister) {
    const data: LoginResponse = await response.json();
    const token = data.token;
    document.cookie = `token=${token}; path=/`;
  }
};

export const AuthForm: React.FC<AuthFormProps> = ({ isRegister }) => {
  console.log("isRegister", isRegister);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await authenticate(username, password, isRegister);
      if (isRegister) {
        navigate("/auth/login");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(
        "Échec de connexion ou d'inscription, veuillez vérifier vos identifiants.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username :</label>
      <input
        type="text"
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
      <button type="submit">{isRegister ? "S'inscrire" : "Connexion"}</button>
      {error && <p>{error}</p>}
    </form>
  );
};
