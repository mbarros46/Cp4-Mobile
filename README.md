

# CP4 - Biblioteca Pessoal

## 👥 Integrantes

- João Victor RM554727
- Miguel Barros RM556652
- Pedro Valentim RM556826
- Thomas Rodrigues RM558042

Sistema de Gerenciamento de Biblioteca Pessoal desenvolvido em **React Native (Expo)** com integração ao **Firebase**. Permite ao usuário autenticar-se, gerenciar sua coleção de livros, buscar, filtrar, favoritar e acompanhar seu progresso de leitura.

---

## ✨ Funcionalidades

- **Autenticação:** Cadastro, login, logout, recuperação de senha (Firebase Auth)
- **CRUD de Livros:** Adicionar, listar, editar, excluir livros (Firestore)
- **Busca e Filtros:** Busca por título/autor, filtros por gênero/status/favoritos, ordenação
- **Paginação:** Carregamento incremental dos livros
- **Perfil do Usuário:** Visualização e edição de dados, estatísticas de leitura
- **Favoritos e Status:** Marcar livros como favoritos, definir status de leitura
- **UI Responsiva:** Componentes reutilizáveis, feedback visual, loading e erros
- **Navegação:** Stack e Tab Navigators, navegação condicional

---

## 🗂️ Estrutura de Pastas

```
src/
  components/      # Componentes reutilizáveis (BookCard, SearchBar, etc)
  contexts/        # Contextos globais (AuthContext)
  hooks/           # Hooks customizados (useBooks)
  navigation/      # Navegação (RootNavigator, Stacks, Tabs)
  screens/         # Telas (Login, Register, BookList, BookForm, Profile, etc)
  services/        # Integração com Firebase
  types/           # Tipos TypeScript
App.tsx           # Entry point
```

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**
  ```bash
  git clone https://github.com/SEU_USUARIO/Cp4-Mobile.git
  cd Cp4-Mobile
  ```

2. **Instale as dependências:**
  ```bash
  npm install
  ```

3. **Configure o Firebase:**
  - Crie um projeto em https://console.firebase.google.com/
  - Habilite **Authentication (Email/Password)** e **Cloud Firestore**
  - Copie as chaves do Firebase para `src/services/firebase.ts`
  - (Opcional) Use variáveis de ambiente para proteger as chaves

4. **Rode o app:**
  ```bash
  npm start
  # ou
  npx expo start
  ```
  - Escaneie o QR code com o Expo Go ou rode em um emulador.

---

## 🔑 Variáveis de Ambiente

Para maior segurança, utilize um arquivo `.env` para armazenar as chaves do Firebase. O Expo já lê variáveis do `.env` automaticamente via `app.config.js`.

1. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (exemplo):
   ```env
   FIREBASE_API_KEY=xxxxxx
   FIREBASE_AUTH_DOMAIN=xxxxxx
   FIREBASE_PROJECT_ID=xxxxxx
   FIREBASE_STORAGE_BUCKET=xxxxxx
   FIREBASE_MESSAGING_SENDER_ID=xxxxxx
   FIREBASE_APP_ID=xxxxxx
   FIREBASE_MEASUREMENT_ID=xxxxxx
   ```

2. No arquivo `app.config.js`, adicione:
   ```js
   import 'dotenv/config';
   export default {
     expo: {
       // ...outros campos
       extra: {
         firebaseApiKey: process.env.FIREBASE_API_KEY,
         firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
         firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
         firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
         firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
         firebaseAppId: process.env.FIREBASE_APP_ID,
         firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
       },
     },
   };
   ```

3. No arquivo `src/services/firebase.ts`, acesse as variáveis usando:
   ```ts
   import Constants from 'expo-constants';
   const { firebaseApiKey, firebaseAuthDomain, firebaseProjectId, firebaseStorageBucket, firebaseMessagingSenderId, firebaseAppId, firebaseMeasurementId } = Constants.expoConfig?.extra || {};
   ```

4. Use essas variáveis para montar o objeto de configuração do Firebase.

**Nunca suba seu arquivo `.env` para o GitHub!**

---

## 📱 Telas Principais

- Login, Registro, Recuperação de Senha
- Lista de Livros (com busca, filtros, paginação)
- Cadastro/Edição de Livro
- Detalhe do Livro
- Favoritos
- Perfil do Usuário

---

## 🛠️ Tecnologias Utilizadas

- React Native (Expo)
- TypeScript
- Firebase (Auth, Firestore)
- React Navigation v6+
- Context API
- React Native Elements
- react-native-vector-icons
- Styled Components (ou alternativa)
- Git + GitHub

---

## 📋 Estrutura do Documento Livro (Firestore)

- `title` (string, obrigatório)
- `author` (string)
- `genre` (string)
- `status` (string: "lido" | "lendo" | "quero_ler")
- `favorite` (boolean)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)
- `userId` (string)

---

## 🧪 Testes

- Teste em emulador ou dispositivo físico
- Verifique todos os fluxos: autenticação, CRUD, busca, filtros, favoritos, perfil


## 📝 Observações

- Código organizado, comentado e com tratamento de erros
- Componentes reutilizáveis e UI consistente
- README completo e atualizado




