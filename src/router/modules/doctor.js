import citizensRouter from "@/router/modules/citizen";

const doctorsRouter = [

    {
    path:'/doctors',
        name:'DoctorsIndex',
    component:()=>import('@/views/doctors/Index.vue')
},
{
    path: '/show',
        name:'DoctorShow',
    component:()=>import('@/views/doctors/show.vue'),

},
{
    path:'/create',
        name:'DoctorsCreate',
    component:()=>import('@/views/doctors/create/index.vue')
},
{
    name: 'DoctorsEdit',
        path: '/:id/edit/',
    component: () => import('@/views/doctors/update/index'),
},]
export default doctorsRouter
