import './App.css'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <MainLayout>
      <Header onSearch={handleHeaderSearch} />
      <div>
        {/* Altere de ProjectTable para ProjectList */}
        <ProjectList projects={projects} onVisualize={handleVisualizeProject} />

        {/* Modais existentes */}
        {selectedProject && (
          <ProjectDetailsDialog
            isOpen={isDetailsModalOpen}
            onClose={handleCloseDetailsModal}
            project={selectedProject}
            onSupport={handleApoiarProjeto}
          />
        )}

        <SupporterFormDialog
          isOpen={isSupporterFormDialogOpen}
          onClose={() => setIsSupporterFormDialogOpen(false)}
          onSend={handleSendSupporterForm}
        />

        <AlertDialog
          isOpen={isAlertDialogOpen}
          onClose={handleCloseAlertDialog}
          title={alertMessage.title}
          body={alertMessage.body}
        />
      </div>
    </MainLayout>
  );
}

export default App
