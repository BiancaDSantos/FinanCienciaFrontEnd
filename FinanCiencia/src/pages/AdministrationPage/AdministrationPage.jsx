import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import projectService from '../../services/projectService';
import AdminProjectCard from '../../components/AdminProjectCard/AdminProjectCard';
import Pagination from '../../components/Pagination/Pagination';
import styles from './AdministrationPage.module.css'; // Crie este arquivo de estilo

function AdministrationPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Estados para dados, UI e paginação
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [refetchIndex, setRefetchIndex] = useState(0); // Para forçar a recarga

    // Efeito para buscar os projetos de forma paginada
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await projectService.listProjects(currentPage, 10);
                setProjects(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                console.error("Erro ao buscar projetos:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [currentPage, refetchIndex]); // Roda quando a página muda ou quando forçamos a recarga

    const handleLogout = () => {
        logout();
        navigate('/HomePage');
    };

    const handleCreateProject = () => {
        navigate('/admin/new-project'); // Navega para uma página de criação
    };

    const handleEditProject = (id) => {
        navigate(`/admin/edit-project/${id}`); // Navega para a página de edição
    };

    const handleDeleteProject = async (id) => {
        // Usar um modal de confirmação aqui seria o ideal em uma aplicação real
        if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
            try {
                await projectService.deleteProject(id);
                // Força a recarga da lista de projetos
                setRefetchIndex(prev => prev + 1);
            } catch (err) {
                console.error("Erro ao excluir projeto:", err);
                alert("Não foi possível excluir o projeto.");
            }
        }
    };

    return (
        <div className={styles.adminPage}>
            <header className={styles.header}>
                <h1>Painel de Administração</h1>
                <div>
                    <button onClick={handleCreateProject} className={styles.createButton}>Criar Novo Projeto</button>
                    <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
                </div>
            </header>
            
            <main className={styles.mainContent}>
                {loading && <p>Carregando projetos...</p>}
                {error && <p>Ocorreu um erro ao carregar os projetos.</p>}
                
                {!loading && !error && (
                    <div className={styles.projectList}>
                        {projects.map(project => (
                            <AdminProjectCard
                                key={project.id}
                                project={project}
                                onEdit={handleEditProject}
                                onDelete={handleDeleteProject}
                            />
                        ))}
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </main>
        </div>
    );
}

export default AdministrationPage;
