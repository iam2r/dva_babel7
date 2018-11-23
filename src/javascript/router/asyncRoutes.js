const asyncRoutes =  [
    {
        path: '/home',
        exact: true,
        models: () => [
            import('../pages/Home/model')
        ],
        component: () => import('../pages/Home')
    }
]

export default asyncRoutes;
