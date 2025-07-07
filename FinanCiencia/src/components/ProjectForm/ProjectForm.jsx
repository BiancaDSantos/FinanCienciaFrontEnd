import React, { useState, useEffect } from 'react';
import styles from './ProjectForm.module.css';

// Importando os serviços para buscar as listas de cidades e universidades
import cityService from '../../services/cityRequests';
import universityService from '../../services/universityRequest';

function ProjectForm({ project, onSubmit, onCancel }) {
  // O estado agora armazena os objetos completos para cidade e universidade
  const [formData, setFormData] = useState({
    tituloProjeto: '',
    descricaoProjeto: '',
    alunos: '',
    email: '',
    cidade: { id: '' },
    universidade: { id: '' }
  });

  // Novos estados para guardar as opções dos menus suspensos
  const [cities, setCities] = useState([]);
  const [universities, setUniversities] = useState([]);

  // Efeito para buscar os dados das cidades e universidades quando o componente é montado
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const citiesResponse = await cityService.listCities();
        setCities(citiesResponse.data);
        const universitiesResponse = await universityService.listUniversities();
        setUniversities(universitiesResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados para o formulário:", error);
      }
    };
    fetchDropdownData();
  }, []);

  // Efeito para preencher o formulário com os dados do projeto para edição
  useEffect(() => {
    if (project) {
      setFormData({
        tituloProjeto: project.tituloProjeto || '',
        descricaoProjeto: project.descricaoProjeto || '',
        alunos: project.alunos || '',
        email: project.email || '',
        cidade: { id: project.cidade?.id || '' },
        universidade: { id: project.universidade?.id || '' }
      });
    } else {
      // Limpa o formulário para criação de um novo projeto
      setFormData({
        tituloProjeto: '',
        descricaoProjeto: '',
        alunos: '',
        email: '',
        cidade: { id: '' },
        universidade: { id: '' }
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Lógica para atualizar os objetos aninhados de cidade e universidade
    if (name === 'cidadeId') {
      setFormData(prev => ({ ...prev, cidade: { id: value } }));
    } else if (name === 'universidadeId') {
      setFormData(prev => ({ ...prev, universidade: { id: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // O formData já está no formato que o backend espera
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="tituloProjeto">Título do Projeto</label>
        <input type="text" id="tituloProjeto" name="tituloProjeto" value={formData.tituloProjeto} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="descricaoProjeto">Descrição</label>
        <textarea id="descricaoProjeto" name="descricaoProjeto" value={formData.descricaoProjeto} onChange={handleChange} rows="4" required></textarea>
      </div>
       <div className={styles.formGroup}>
        <label htmlFor="alunos">Alunos Envolvidos</label>
        <input type="text" id="alunos" name="alunos" value={formData.alunos} onChange={handleChange} placeholder="Ex: João Silva, Maria Souza" required />
      </div>
       <div className={styles.formGroup}>
        <label htmlFor="email">Email de Contato</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="contato@email.com" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="cidadeId">Cidade</label>
        <select id="cidadeId" name="cidadeId" value={formData.cidade.id} onChange={handleChange} required>
            <option value="" disabled>Selecione uma cidade</option>
            {cities.map(city => (
                <option key={city.id} value={city.id}>{city.nome}</option>
            ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="universidadeId">Universidade</label>
        <select id="universidadeId" name="universidadeId" value={formData.universidade.id} onChange={handleChange} required>
            <option value="" disabled>Selecione uma universidade</option>
            {universities.map(uni => (
                <option key={uni.id} value={uni.id}>{uni.nome}</option>
            ))}
        </select>
      </div>
      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancelar</button>
        <button type="submit" className={styles.submitButton}>Salvar</button>
      </div>
    </form>
  );
}

export default ProjectForm;
