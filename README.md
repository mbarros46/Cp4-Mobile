# CP4 - Biblioteca Pessoal (Expo + TypeScript + Firebase)

Este pacote contém **todo o código-fonte** (TypeScript) para cumprir o enunciado do CP4:
- React Native (Expo) + Firebase (Auth + Firestore)
- React Navigation v6 (Stack + Tabs)
- Context API para estado de autenticação
- UI com **React Native Elements** + **react-native-vector-icons**
- CRUD de livros com busca, filtros e paginação
- Telas de Login/Registro/Recuperar senha; Lista/Cadastro/Edição/Exclusão de livros; Perfil

> **Observação**: Para rodar no **Expo Go**, recomendamos criar um projeto com o `create-expo-app` e então **copiar** os arquivos desta pasta para o seu projeto. Isso garante a compatibilidade com a versão do Expo que você tiver instalada.

## Passo a passo

1. Crie um app Expo (TypeScript):
```bash
npx create-expo-app@latest cp4-app --template
# escolha "Blank (TypeScript)"
cd cp4-app
```

2. Instale dependências exigidas pelo enunciado:
```bash
npm i @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npm i firebase
npm i react-native-elements react-native-vector-icons
```

3. Copie os arquivos desta pasta para dentro do seu projeto, **substituindo** os existentes quando houver (App.tsx, tsconfig, etc.).
Estrutura esperada após copiar:
```
cp4-app/
  App.tsx
  tsconfig.json
  babel.config.js
  src/
    components/
    contexts/
    hooks/
    navigation/
    screens/
    services/
    theme/
    types/
```

4. Configure o Firebase criando um projeto em https://console.firebase.google.com/ e habilitando **Authentication (Email/Password)** e **Cloud Firestore (modo produção com regras adequadas)**.

5. Preencha o arquivo `src/services/firebase.ts` com as **chaves do Firebase** (apiKey, authDomain, projectId etc.).

6. Execute o app:
```bash
npm start
# abra no Expo Go
```

## Campos do Livro (Firestore)
- `title` (string, obrigatório)
- `author` (string)
- `genre` (string: "Ficção", "Não Ficção", "Técnico", etc.)
- `status` (string: "lido" | "lendo" | "quero_ler")
- `favorite` (boolean)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)
- `userId` (string, dono do documento)

## Observações de Avaliação
- Navegação (Stack + Tabs) implementada em `src/navigation`
- Context API para autenticação em `src/contexts/AuthContext.tsx`
- CRUD e filtros/paginação em `src/hooks/useBooks.ts` e telas em `src/screens/books`
- Componentes reutilizáveis em `src/components`
- UI consistente com **React Native Elements** + ícones

Boa prova! 
