# 📝 React Blog Platform - Interface Moderna

## 🎯 Objetivo de Aprendizado
Interface web desenvolvida para estudar **React moderno** e **design responsivo**. Implementa frontend completo para plataforma de blog com **Tailwind CSS**, **React Router** e **integração com API**, aplicando boas práticas de desenvolvimento frontend e UX/UI.

## 🛠️ Tecnologias Utilizadas
- **Framework:** React 18, Vite
- **Estilização:** Tailwind CSS
- **Roteamento:** React Router DOM
- **HTTP Client:** Axios
- **State Management:** React Hooks (useState, useEffect)
- **Build Tool:** Vite
- **Deploy:** AWS Amplify

## 🚀 Demonstração
```jsx
// Componente de Post
const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
          {post.titulo}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.texto}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {formatDate(post.data)}
          </span>
          <Link 
            to={`/posts/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    </div>
  );
};
```

## 📁 Estrutura do Projeto
```
react-blog-plataform/
├── src/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── Header/              # Cabeçalho da aplicação
│   │   ├── Footer/              # Rodapé
│   │   ├── PostCard/            # Card de post
│   │   └── Loading/             # Componente de loading
│   ├── pages/                   # Páginas da aplicação
│   │   ├── Home/                # Página inicial
│   │   ├── PostDetail/          # Detalhes do post
│   │   ├── CreatePost/          # Criar novo post
│   │   └── Login/               # Página de login
│   ├── services/                # Serviços de API
│   │   └── api.js               # Configuração do Axios
│   ├── hooks/                   # Custom hooks
│   ├── utils/                   # Funções utilitárias
│   ├── styles/                  # Estilos globais
│   └── App.jsx                  # Componente raiz
├── public/                      # Arquivos públicos
└── package.json                 # Dependências
```

## 💡 Principais Aprendizados

### ⚛️ React Modern Patterns
- **Functional components:** Componentes funcionais com hooks
- **Custom hooks:** Lógica reutilizável encapsulada
- **Component composition:** Composição de componentes
- **Props drilling:** Gerenciamento de props entre componentes
- **Conditional rendering:** Renderização condicional

### 🎨 Responsive Design
- **Mobile-first:** Abordagem mobile-first
- **Tailwind utilities:** Classes utilitárias para estilização
- **Flexbox/Grid:** Layouts flexíveis
- **Breakpoints:** Responsividade para diferentes telas
- **Dark mode:** Suporte a tema escuro (planejado)

### 🔌 API Integration
- **Axios configuration:** Configuração centralizada
- **Error handling:** Tratamento de erros de API
- **Loading states:** Estados de carregamento
- **Data fetching:** Busca de dados assíncrona
- **Authentication:** Integração com sistema de auth

## 🧠 Conceitos Técnicos Estudados

### 1. **Custom Hooks**
```jsx
// Hook para gerenciar posts
const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts');
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar posts');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
};
```

### 2. **API Service Layer**
```jsx
// Configuração do Axios
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. **Component Architecture**
```jsx
// Página Home com composição de componentes
const Home = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Blog Pessoal
          </h1>
          <p className="text-xl text-gray-600">
            Compartilhando conhecimento e experiências
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};
```

## 🚧 Desafios Enfrentados
1. **State management:** Gerenciamento de estado complexo
2. **Performance:** Otimização de re-renders
3. **Responsive design:** Adaptação para múltiplos dispositivos
4. **API integration:** Sincronização com backend
5. **User experience:** Interface intuitiva e fluida

## 📚 Recursos Utilizados
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Generation Brasil Bootcamp](https://brazil.generation.org/) - Bootcamp onde o projeto foi desenvolvido

## 📈 Próximos Passos
- [ ] Implementar sistema de comentários
- [ ] Adicionar editor de texto rico
- [ ] Criar sistema de tags
- [ ] Implementar busca avançada
- [ ] Adicionar sistema de likes
- [ ] Criar dashboard administrativo

## 🔗 Projetos Relacionados
- [Spring Blog Platform](../spring-blog-platform/) - Backend da aplicação
- [React E-commerce TT](../react-ecommerce-tt/) - E-commerce em React
- [React TaskManager App](../react-taskmanager-app/) - Gerenciador de tarefas

---

**Desenvolvido por:** Felipe Macedo  
**Contato:** contato.dev.macedo@gmail.com  
**GitHub:** [FelipeMacedo](https://github.com/felipemacedo1)  
**LinkedIn:** [felipemacedo1](https://linkedin.com/in/felipemacedo1)

> 💡 **Reflexão:** Este projeto consolidou conhecimentos em React moderno e design responsivo. A experiência com Tailwind CSS e integração de APIs proporcionou base sólida para desenvolvimento de interfaces web profissionais.