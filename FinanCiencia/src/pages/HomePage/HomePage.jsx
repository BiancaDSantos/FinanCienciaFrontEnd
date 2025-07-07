import React, { useState, useEffect } from 'react';

// O service agora é usado para buscar páginas específicas ou por termo
import projectService from '../../services/projectService';

// Importando os componentes que montam a página
import HeaderPublicPage from '../../components/HeaderPublicPage/HeaderPublicPage';
import ProjectList from '../../components/ProjectList/ProjectList';
import Pagination from '../../components/Pagination/Pagination'; 
import styles from './HomePage.module.css'; // Supondo que o CSS esteja em uma pasta HomePag
import Footer from '../../components/FooterMain/FooterMain';

function HomePage() {
  // Estados para controlar os dados e a UI
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para paginação e busca
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // NOVO: Estado para o termo de busca

  // Efeito que busca os dados quando a página ou o termo de busca mudam
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        // Se não há termo de busca, busca a lista paginada
        if (searchTerm.trim() === '') {
          response = await projectService.listProjects(currentPage, 9);
          setProjects(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          // Se há um termo de busca, chama o endpoint de busca
          response = await projectService.searchProjects(searchTerm);
          setProjects(response.data);
          setTotalPages(0); // Esconde a paginação durante a busca
        }
      } catch (err) {
        setError(err);
        setProjects([]); // Limpa os projetos em caso de erro
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchTerm]); // Depende da página atual E do termo de busca

  // Função que será passada para o Header. Agora ela atualiza o estado.
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(0); // Reseta para a primeira página ao fazer uma nova busca
  };

  // Função que será passada para o componente de Paginação
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.homePage}>
      <HeaderPublicPage onSearch={handleSearch} />
      
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>
            {/* Muda o título se estiver mostrando resultados de busca */}
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Projetos em Destaque'}
        </h1>
        
        <ProjectList projects={projects} loading={loading} error={error} />
        
        {/* Renderiza a paginação apenas se não houver termo de busca */}
        {!searchTerm && totalPages > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
        )}
      </main>
      <Footer/>
    </div>
  );
}

export default HomePage;
