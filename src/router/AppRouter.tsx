// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/contact";
import SearchPage from "../pages/SearchPage";
import NewsletterPage from "../pages/AccountPage";

const AppRouter = () => (
    <BrowserRouter>
        <MainLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/search" element={<SearchPage />} />
                 <Route path="/account" element={<NewsletterPage />} />
            </Routes>
        </MainLayout>
    </BrowserRouter>
);

export default AppRouter;
