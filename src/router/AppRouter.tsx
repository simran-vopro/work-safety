// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";

import SearchPage from "../pages/SearchPage";
import NewsletterPage from "../pages/AccountPage";
import CategoriesPage from "../pages/CategoriesPage";
import ShopPage from "../pages/ShopPage";
import ProjectDetails from "../pages/products/details";
import CartPage from "../pages/cartPage";
import ContactPage from "../pages/contactPage";

const AppRouter = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/account" element={<NewsletterPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/projectDetails" element={<ProjectDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default AppRouter;
