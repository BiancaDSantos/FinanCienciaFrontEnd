import Header from '../components/HeaderPublicPage/HeaderPublicPage.jsx';
import Footer from '../components/FooterMain/FooterMain.jsx';

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;