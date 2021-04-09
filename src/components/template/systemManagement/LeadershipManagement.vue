<template>
  <div class="LeadershipManagement">
    <div>
      <div class="LM-signMeg-box-head">
        <span class="LM-signMeg-box-head-span">添加领导</span>
      </div>
      <div class="LM-from">
        <el-form
          label-width="100px"
          label-position="left"
          :model="formData"
          :rules="rules"
          ref="formData"
        >
          <el-form-item label="账号：" prop="account">
            <el-input
              v-model="formData.account"
              class="LM-tableName-input"
              :disabled="indexType === '0' ? false : true"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input
              v-model="formData.name"
              class="LM-tableName-input"
              :disabled="indexType === '1' ? true : false"
            ></el-input>
          </el-form-item>
          <el-form-item label="机构：" prop="depId">
            <el-select
              disabled
              v-model="formData.depId"
              placeholder="请选择"
              class="LM-tableName-input"
            >
              <el-option
                v-for="item in depListData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位：" prop="reserved">
            <el-input
              :disabled="indexType === '1' ? true : false"
              v-model="formData.reserved"
              class="LM-tableName-input"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="联系方式："
            prop="phone"
            :rules="[
              {
                required: true,
                trigger: 'blur',
                validator: (rule, value, callback) => {
                  let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
                  if (!value) {
                    callback('电话号码不能为空');
                  } else if (!Number.isInteger(+value)) {
                    callback('请输入数字值');
                  } else if (phoneReg.test(value)) {
                    callback();
                  } else {
                    callback('电话号码格式不正确');
                  }
                },
              },
            ]"
          >
            <el-input
              :disabled="indexType === '1' ? true : false"
              v-model="formData.phone"
              class="LM-tableName-input"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电子邮箱："
            prop="email"
            :rules="[
              {
                required: true,
                trigger: 'blur',
                validator: (rule, value, callback) => {
                  let mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                  if (!value) {
                    callback('邮箱不能为空');
                  } else if (mailReg.test(value)) {
                    callback();
                  } else {
                    callback('请输入正确的邮箱格式');
                  }
                },
              },
            ]"
          >
            <el-input
              :disabled="indexType === '1' ? true : false"
              v-model="formData.email"
              class="LM-tableName-input"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="indexType === '0'"
              type="primary"
              @click="addUserByDepId('formData')"
              >保存新增</el-button
            >
            <el-button
              v-if="indexType === '2'"
              type="primary"
              @click="updateUserByDepId('formData')"
              >保存修改</el-button
            >
            <el-button v-if="indexType !== '1'" @click="resetForm"
              >重 置</el-button
            >
            <el-button @click="cancelSubmit">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script src="../../js/systemManagement/LeadershipManagement.js"/>


<style>
.LeadershipManagement {
  width: 1280px;
  margin: auto;
  /* background: #ffffff; */
}
.LM-signMeg-box-head {
  width: 100%;
  background: linear-gradient(
    90deg,
    #0265ba 1%,
    rgba(255, 255, 255, 0.12) 103%
  );
  height: 50px;
  justify-content: space-between;
  position: relative;
}
.LM-signMeg-box-head-span {
  line-height: 50px;
  font-weight: 600;
  margin-left: 30px;
  color: aliceblue;
  font-size: 18px;
}
.LM-from {
  margin-top: 28px;
  padding: 18px 22px;
  background: #ffffff;
}

.LM-tableName-input {
  width: 300px !important;
}
</style>