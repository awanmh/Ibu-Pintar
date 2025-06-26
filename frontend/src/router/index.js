// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Impor komponen View Anda
const HomeView = () => import('@/views/home/HomeView.vue');
const ArticlesView = () => import('@/views/article/ArticlesView.vue'); // Assuming this is the correct name for article list view
const ArticleDetailView = () => import('@/views/article/ArticleDetailView.vue');
const AboutView = () => import('@/views/about/AboutView.vue');
const NotFoundView = () => import('@/views/error/NotFoundView.vue');
const ServicesView = () => import('@/views/service/ServicesView.vue');
const ServiceDetailView = () => import('@/views/service/ServiceDetailView.vue');
const ReservationView = () => import('@/views/reservation/ReservationView.vue');

// --- PASTIKAN VIEW BARU DI-IMPOR DI SINI ---
const ForumView = () => import('@/views/QnA/ForumView.vue');
const QuestionDetailView = () => import('@/views/QnA/QuestionDetailView.vue');
const AskQuestionView = () => import('@/views/QnA/AskQuestionView.vue');

const routes = [
  { path: '/', name: 'Home', component: HomeView },

  // Articles Routes - Combined and corrected
  { path: '/articles', name: 'Articles', component: ArticlesView },
  {
    path: '/articles/:id', // Here, ':id' will capture the slug for ArticleDetailView
    name: 'ArticleDetail',
    component: ArticleDetailView,
    props: true // Passes route params as props. Keep this if your ArticleDetailView uses props for 'id'/'slug'
  },

  { path: '/layanan', name: 'Services', component: ServicesView },
  { path: '/layanan/:slug', name: 'ServiceDetail', component: ServiceDetailView },
  { path: '/reservasi', name: 'Reservation', component: ReservationView },
  { path: '/about', name: 'About', component: AboutView },

  // Forum (Tanya Bidan) Routes
  {
    path: '/tanya-bidan',
    name: 'Forum',
    component: ForumView,
  },
  {
    path: '/tanya-bidan/tanya', // Rute untuk form bertanya
    name: 'AskQuestion',
    component: AskQuestionView,
  },
  {
    path: '/tanya-bidan/:id', // Rute untuk detail pertanyaan, assuming 'id' captures the question ID/slug
    name: 'QuestionDetail',
    component: QuestionDetailView,
  },

  // Catch-all 404 route - should always be the last route
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;