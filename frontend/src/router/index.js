// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// Import views via lazy loading
const HomeView = () => import('@/views/home/HomeView.vue');
const AboutView = () => import('@/views/about/AboutView.vue');
const RegisterView = () => import('@/views/auth/RegisterView.vue');
const LoginView = () => import('@/views/auth/LoginView.vue');
const NotFoundView = () => import('@/views/error/NotFoundView.vue');
const ArticlesView = () => import('@/views/article/ArticlesView.vue');
const ArticleDetailView = () => import('@/views/article/ArticleDetailView.vue');
const ServicesView = () => import('@/views/service/ServicesView.vue');
const ServiceDetailView = () => import('@/views/service/ServiceDetailView.vue');
const ReservationView = () => import('@/views/reservation/ReservationView.vue');
const ForumView = () => import('@/views/QnA/ForumView.vue');
const AskQuestionView = () => import('@/views/QnA/AskQuestionView.vue');
const QuestionDetailView = () => import('@/views/QnA/QuestionDetailView.vue');

// Admin views
const AdminLayout = () => import('@/views/admin/AdminLayout.vue');
const DashboardView = () => import('@/views/admin/DashboardView.vue');
const ManageArticles = () => import('@/views/admin/ManageArticles.vue');
const ArticleForm = () => import('@/views/admin/ArticleForm.vue');
const ManageForum = () => import('@/views/admin/ManageForum.vue');
const ManageServices = () => import('@/views/admin/ManageServices.vue');
const ManageTreatments = () => import('@/views/admin/ManageTreatments.vue');
const TreatmentForm = () => import('@/views/admin/TreatmentForm.vue');

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/login', name: 'Login', component: LoginView },

  { path: '/articles', name: 'Articles', component: ArticlesView },
  { path: '/articles/:id', name: 'ArticleDetail', component: ArticleDetailView, props: true },

  { path: '/layanan', name: 'Services', component: ServicesView },
  { path: '/layanan/:slug', name: 'ServiceDetail', component: ServiceDetailView },
  { path: '/reservasi', name: 'Reservation', component: ReservationView },

  { path: '/tanya-bidan', name: 'Forum', component: ForumView },
  { path: '/tanya-bidan/tanya', name: 'AskQuestion', component: AskQuestionView },
  { path: '/tanya-bidan/:id', name: 'QuestionDetail', component: QuestionDetailView },

  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'AdminDashboard', component: DashboardView },
      { path: 'articles', name: 'ManageArticles', component: ManageArticles },
      { path: 'articles/new', name: 'NewArticle', component: ArticleForm },
      { path: 'articles/edit/:id', name: 'EditArticle', component: ArticleForm, props: true },
      { path: 'forum', name: 'ManageForum', component: ManageForum },
      { path: 'services', name: 'ManageServices', component: ManageServices },
      { path: 'treatments', name: 'ManageTreatments', component: ManageTreatments },
      { path: 'treatments/new', name: 'NewTreatment', component: TreatmentForm },
      { path: 'treatments/edit/:id', name: 'EditTreatment', component: TreatmentForm, props: true },
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn'];
  const isAdmin = store.getters['auth/isAdmin'];

  // Blok login/register jika sudah login
  if ((to.name === 'Login' || to.name === 'Register') && isLoggedIn) {
    if (isAdmin) {
      return next({ name: 'AdminDashboard' });
    } else {
      return next({ name: 'Home' });
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      return next({ name: 'Login' });
    }
    if (to.meta.requiresAdmin && !isAdmin) {
      return next({ name: 'Home' });
    }
  }

  return next();
});

export default router;
