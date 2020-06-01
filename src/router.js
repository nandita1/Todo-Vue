import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Todo from "./components/Todo.vue"

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/todo/:id",
            name: "todo",
            component: Todo
        }
    ],
    mode: 'history'
});