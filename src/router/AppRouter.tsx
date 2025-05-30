// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/contact";
import SearchPage from "../pages/SearchPage";
import NewsletterPage from "../pages/AccountPage";
import CategoriesPage from "../pages/CategoriesPage";
import ShopPage from "../pages/ShopPage";
import ProjectDetails from "../pages/products/details";

const AppRouter = () => (
    <BrowserRouter>
        <MainLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/account" element={<NewsletterPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/projectDetails" element={<ProjectDetails />} />
            </Routes>
        </MainLayout>
    </BrowserRouter>
);

export default AppRouter;
