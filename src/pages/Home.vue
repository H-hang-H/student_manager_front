<template>
  <div>
   <el-container>
    <el-aside width="150px">

      <el-row class="tac">
        <el-col :span="20">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo">
             <!-- @open="handleOpen"
            @close="handleClose" -->

            <el-submenu v-for="item in citylist" :key="item.id" :index="item.id">
              <template slot="title">
                <span>{{item.context}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link :to="{path:'/home/student',query:{city:item.city,context:item.context}}">学生</router-link>
                  </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link :to="{path:'/home/teacher',query:{city:item.city,context:item.context}}">教师</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-col>
      </el-row>
  
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
    
  </el-container>
  </div>
</template>

<script>
export default {
    name:'home',
    provide(){
      return{
      }
    },
    data(){
      return{
        citylist:[
          {id:'0',context:'全部信息',city:'all'},
          {id:'1',context:'信息科学学院',city:'IS'},
          {id:'2',context:'外国语学院',city:'AS'},
          {id:'3',context:'金融学院',city:'BS'},
          {id:'4',context:'管理学院',city:'CS'},
          {id:'5',context:'会计学院',city:'DS'},
          {id:'6',context:'公共治理学院',city:'ES'},
        ],
      }
    },
    methods: {
      headleOpen(key,keyPath){
        console.log(key,keyPath);
      },
      headleClose(){
        console.log(key,keyPath);
      },
    },
}
</script>

<style>
 
</style>