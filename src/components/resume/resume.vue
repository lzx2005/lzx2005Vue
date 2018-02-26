<template>
  <div class="resume-div">
    <div class="resume-info">
      请填写如下基本信息，本人会根据情况发送简历至贵司邮箱
    </div>
    <Form :model="formItem" label-position="top">
      <FormItem label="贵司名称">
        <Input v-model="formItem.name" placeholder="请输入贵司全名"/>
      </FormItem>
      <FormItem label="贵司邮箱">
        <Input v-model="formItem.email" placeholder="请输入贵司邮箱"/>
      </FormItem>
      <!--<FormItem label="工作地点">-->
        <!--<Select v-model="formItem.select">-->
          <!--<Option>杭州滨江区</Option>-->
          <!--<Option>杭州下城区</Option>-->
          <!--<Option>上海静安区</Option>-->
        <!--</Select>-->
      <!--</FormItem>-->
      <!--<FormItem label="Radio">-->
        <!--<RadioGroup v-model="formItem.radio">-->
          <!--<Radio label="male">Male</Radio>-->
          <!--<Radio label="female">Female</Radio>-->
        <!--</RadioGroup>-->
      <!--</FormItem>-->
      <!--<FormItem label="Checkbox">-->
        <!--<CheckboxGroup v-model="formItem.checkbox">-->
          <!--<Checkbox label="Eat"></Checkbox>-->
          <!--<Checkbox label="Sleep"></Checkbox>-->
          <!--<Checkbox label="Run"></Checkbox>-->
          <!--<Checkbox label="Movie"></Checkbox>-->
        <!--</CheckboxGroup>-->
      <!--</FormItem>-->
      <!--<FormItem label="Switch">-->
        <!--<i-switch v-model="formItem.switch" size="large">-->
          <!--<span slot="open">On</span>-->
          <!--<span slot="close">Off</span>-->
        <!--</i-switch>-->
      <!--</FormItem>-->
      <FormItem label="职位简介">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 10,maxRows: 100}" placeholder="请输入职位简介"/>
      </FormItem>
      <FormItem>
        <Button type="primary">获取简历</Button>
      </FormItem>
    </Form>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        formItem: {
          name: '',
          email: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      };
    }};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .resume-div
    width 70%
    margin 0px auto;
    .resume-info
      margin-bottom 10px;
</style>
