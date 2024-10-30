import { createRouter, createWebHistory } from "vue-router";

import Login from '@/components/Login.vue';
import UserList from '@/components/user/UserList.vue';
import UserAdd from '@/components/user/UserAdd.vue';
import UserEdit from '@/components/user/UserEdit.vue';
// import UserDetail from "@/components/user/UserDetail.vue";

import TypeleaveList from '@/components/typeLeave/TypeleaveList.vue';
import TypeleaveAdd from '@/components/typeLeave/TypeleaveAdd.vue';
import TypeleaveEdit from '@/components/typeLeave/TypeleaveEdit.vue';
// import TypeLeaveDetail from "@/components/typeLeave/TypeLeaveDetail.vue";

const routes = [
    {
        path: "/",
        name: 'login',
        component: Login,
    },
    {
        path: "/user",
        children: [
            {
                path: "",
                name: 'list-user',
                component: UserList,
            },
            {
                path: "new",
                name: 'ajout-user',
                component: UserAdd,
            },
            {
                path: "edit/:id",
                name: 'modifier-user',
                component: UserEdit,
            },
            // {
            //     path: "show/:id",
            //     name: 'detail-user',
            //     component: UserDetail,
            // }
        ]
    },
    {
        path: "/type-leave",
        children: [
            {
                path: "",
                name: 'list-type-leave',
                component: TypeleaveList,
            },
            {
                path: "new",
                name: 'ajout-type-leave',
                component: TypeleaveAdd,
            },
            {
                path: "edit/:id",
                name: 'modifier-type-leave',
                component: TypeleaveEdit,
            },
            // {
            //     path: "show/:id",
            //     name: 'detail-type-leave',
            //     component: TypeLeaveDetail,
            // }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
