## Vuex
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

#### 使用步骤

1. 引入vue
2. 引入vuex
3. 安装插件：`Vue.use(Vuex)`
4. 创建store对象：`let store = new Vuex.Store({state, mutation, getter, action})`
    * state：存储数据。获取：this.$store.state.num，不建议直接这样使用
    * mutation：更改数据。获取：this.$store.commit("")，不建议这样做，mutation对state的操作只能是同步的，异步会丢失记录，异步处理需要调用action
    * getter：获取数据。获取：this.$store.getters.getNumber，不建议直接这样使用，结合computed使用
    * action：业务行为。获取：this.$store.dispatch("")，可以解决mutation的异步问题
    * modules：`let store = new Vuex.Store({ modules: {num: num} })`
5. 暴露store，在main.js引入

#### mapGetters 辅助函数
> mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

    import { mapGetters } from 'vuex'
    export default {
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
            ...mapGetters([
            'doneTodosCount',
            'anotherGetter',
            // ...
            ])
        }
    }


*一辈子很短，努力的做好两件事就好；第一件事是热爱生活，好好的去爱身边的人；第二件事是努力学习，在工作中取得不一样的成绩，实现自己的价值。*