import Mock from 'mockjs';  //导入mock模块
let Todos = []; //定义需要的数据
const Count = [1,2,3,4,5]; //定义需要的数量
for(let i=1;i<=Count.length;i++){
  Todos.push(Mock.mock({//根据数据模板生成随机数据
    id: Mock.Random.guid(),         //随机id
    title: Mock.Random.first(),     //随机标题
    isDelete: false,                //是否删除
    locked: Mock.Random.boolean(),  //是否锁定
    record: Count.map(()=> {        //待办单项
      return {
        text: Mock.Random.cparagraph(2),   //随机内容
        isDelete:false,                    //是否删除
        checked:Mock.Random.boolean(),     //是否完成
      };
    })
  }));
}
export { //导出数据列表
  Todos
};
