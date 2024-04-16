const citizensRouter = [

    {
    name: 'CitizensIndex',
        path: '/citizens',
    component: () => import('@/views/citizen/index'),
},
{
    name: 'CitizensCreate',
        path: '/citizens/create/',
    component: () => import('@/views/citizen/create/index'),

},
{
    name: 'CitizensShow',
        path: '/citizens/:id(\\d+)',
    component: () => import('@/views/citizen/show'),
    meta: { title: 'Роли', icon: 'role', noCache: true }
},
{
    name: 'CitizensEdit',
        path: '/citizens/:id(\\d+)/edit/',
    component: () => import('@/views/citizen/update/index'),

}]
export default citizensRouter
