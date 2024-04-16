import auth from "../middleweres/auth";

const applicationsRouter = [
    {
        name: 'ApplicationsShow',
        path: '/applications/:id(\\d+)',
        component: () => import('@/views/application/show'),
        meta: { middleware: [auth] },

    },
    {
        name: 'ApplicationsShowCode',
        path: '/applications/:id(\\d+)',
        component: () => import('@/views/application/showCode')
    },
    {
        name: 'ApplicationsIndex',
        path: 'applications',
        component: () => import('@/views/application/index'),
        meta: { middleware: [auth] },
        hidden: true

    }
    ]
export default applicationsRouter
