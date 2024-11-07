import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/user/HomeView.vue";
import TourDetails from "../views/user/TourDetails.vue";
import CategoryTours from "@/views/user/CategoryTours.vue";
import BookedTours from "@/views/user/BookedTours.vue";
import UserLayout from "@/views/UserLayout.vue";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import AccountView from "@/views/user/AccountView.vue";
import TablePar from "@/views/user/TablePar.vue";
import AdminLayout from "@/views/AdminLayout.vue";
import IndexView from "@/views/admin/IndexView.vue";
import AddNewTour from "@/views/admin/AddNewTour.vue";
import AdvisingView from "@/views/admin/AdvisingView.vue";
import AdvisingDetailView from "@/views/admin/AdvisingDetailView.vue";
import ConfirmationComponent from "@/components/admin/components/add_tour/ComfirmationComponent.vue";
import tourService from "@/services/tour.service";
import categoriesService from "@/services/categories.service";
import bookingService from "@/services/booking.service";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: UserLayout,
      children: [
        { path: "", component: HomeView, meta: { title: "Trang chủ" } },
        {
          path: "/tour/:id",
          name: "tourDetails",
          component: TourDetails,
          props: true,
          meta: { title: "" },
          beforeEnter: async (to, from, next) => {
            const tourId = to.params.id;
            try {
              const tour = await tourService.getTourById(tourId);
              to.meta.title = tour.name; 
              next();
            } catch (error) {
              console.error("Lỗi khi lấy thông tin tour:", error);
              next(); 
            }
          },
        },
        {
          path: "/category/:id",
          name: "category",
          component: CategoryTours,
          meta: { title: "" },
          beforeEnter: async (to, from, next) => {
            const categoryId = to.params.id;
            try {
              const category = await categoriesService.getCategoryById(categoryId);
              to.meta.title = category.name;
              next();
            } catch(error) {
              console.error("Lỗi khi lấy thông tin tour:", error);
              next(); 
            }
          }
        },
        {
          path: "/login",
          name: "login",
          component: LoginView,
          meta: { title: "Đăng nhập" },
        },
        {
          path: "/register",
          name: "register",
          component: RegisterView,
          meta: { title: "Đăng ký" },
        },
        {
          path: "/account",
          name: "account",
          component: AccountView,
          meta: { requiresAuth: true, title: "Tài khoản" },
        },
        { path: "/table", name: "table", component: TablePar },
        { path: "/booked", name: "bookedTours", component: BookedTours },
      ],
    },
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAdmin: true },
      children: [
        { path: "", component: IndexView, meta: { title: "Admin Dashboard" } },
        {
          path: "/add-new-tour",
          component: AddNewTour,
          meta: { title: "Thêm tour mới" },
        },
        {
          path: "/confirmation",
          component: ConfirmationComponent,
          meta: { title: "Xác nhận thông tin tour" },
        },
        {
          path: "/advising-requests",
          component: AdvisingView,
          meta: { title: "Yêu cầu tư vấn" },
        },
        {
          path: "/advising-requests/:id",
          name: "advisingDetailView",
          component: AdvisingDetailView,
          props: true,
          meta: { title: "" },
          beforeEnter: async (to, from, next) => {
            const requestsId = to.params.id;
            try {
              const requests = await bookingService.getAdvisingRequestById(requestsId);
              to.meta.title = "Yâu cầu tư vấn " + requests.id;
              next();
            } catch(error) {
              console.error("Lỗi khi lấy thông tin tour:", error);
              next(); 
            }
          }
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
router.afterEach((to) => {
  document.title = to.meta.title || "Tour travel";
});
export default router;
