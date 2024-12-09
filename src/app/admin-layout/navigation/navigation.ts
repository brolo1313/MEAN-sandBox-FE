import { NavigationItem } from "../dashboard/models/market.models";


export const navigation: NavigationItem[] = [
  {
    id: 'dashboard',
    link_name: 'Дошка',
    type: 'item',
    icon: 'home',
    path: '/admin/dashboard',
    sub_menu: []
  },

  {
    id: 'contacts',
    link_name: 'Про нас',
    type: 'item',
    path: null,
    icon: 'waves',
    sub_menu: [
      {
        link_name: "Користувачі",
        path: '/admin/contacts',
      },
      // {
      //   link_name: "JavaScript",
      //   link: "/javascript",
      // },
      // {
      //   link_name: "PHP & MySQL",
      //   link: "/php-n-mysql",
      // }
    ]
  },


].sort((a, b) => a.link_name.localeCompare(b.link_name)) as [];
