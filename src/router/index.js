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
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: UserLayout,
      children: [
        { path: "", component: HomeView },
        {
          path: "/tour/:id",
          name: "tourDetails",
          component: TourDetails,
          props: true,
        },
        { path: "/category/:id", name: "category", component: CategoryTours },
        { path: "/login", name: "login", component: LoginView },
        { path: "/register", name: "register", component: RegisterView },
        {
          path: "/account",
          name: "account",
          component: AccountView,
          meta: { requiresAuth: true },
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
        { path: "", component: IndexView },
        { path: "/add-new-tour", component: AddNewTour },
        { path: "/confirmation", component: ConfirmationComponent },
        { path: "/advising-requests", component: AdvisingView },
        {
          path: "/advising-requests/:id",
          name: "advisingDetailView",
          component: AdvisingDetailView,
          props: true,
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;
