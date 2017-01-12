import ClientIndex from './index'
import ClientList from './list'
import ClientAdd from './add'
import ClientEdit from './edit'

module.exports = {
  name: '客户管理',
  path: '/Client',
  iconCls: 'el-icon-message',
  leaf: false,
  hidden: false,
  component: ClientIndex,
  children: [{
      name: '客户列表',
      path: '/Client',
      component: ClientList,
    },
    {
      name: '新增客户',
      path: '/Client/Add',
      component: ClientAdd
    },
    {
      name: '编辑客户',
      path: '/Client/Edit/:id',
      hidden: true,
      component: ClientEdit
    }
  ]
}
