<template>
  <div class="layer">
    <!-- 失效订单退回 -->
    <div class="black-div" v-if="exitBounced1">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">失效订单退回</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz">
            <div class="blzbw">
              <div class="yhdmz" style="padding-top: 20px;">银行名称：浦发银行</div>
              <div class="yhdmz">卡种名称：浦发青年信用卡</div>
              <div class="yhdmz">佣金价格：120/单</div>
            </div>
            <div class="blzbw">
              <div class="tebdshur">
                平台收益：
                <el-input class="tebd" type="primary" v-model="searchData" clearable></el-input>元
              </div>
              <div class="tebdshur">
                用户收益：
                <el-input class="tebd" type="primary" v-model="searchData" clearable></el-input>元
              </div>
              <div class="tebdshur">
                上级返佣：
                <el-input class="tebd" type="primary" v-model="searchData" clearable></el-input>元
              </div>
              <div class="tebdshur">
                越级返佣：
                <el-input class="tebd" type="primary" v-model="searchData" clearable></el-input>元
              </div>
            </div>
          </div>
          <div class="b-anntes">
            <el-button class="b-ant">取消退回</el-button>
            <el-button type="primary">确认退回</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 一键待审核 -->
    <div class="black-div" v-if="exitBounced2">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">一键待审核</div>
        </div>
        <div class="b-nr">
          <div class="tebdwz2">是否将前编号【{{number}}】条订单全部一键待审核?</div>
          <div class="b-ann" style="padding-top: 10px;">
            <el-button class="b-ant" @click="Qshe(2)">取消审核</el-button>
            <el-button type="primary" @click="Qshe(3)">确认审核</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 待查询审核 -->
    <div class="black-div" v-if="exitBounced3">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">待查询审核</div>
        </div>
        <div class="b-nr">
          <div class="tebdwz2">是否将【10】条【浦发青年信用卡】订单全部一键待审核?</div>
          <div class="b-ann" style="padding-top: 10px;">
            <el-button class="b-ant">取消审核</el-button>
            <el-button type="primary">确认审核</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 单订单审核 -->
    <div class="black-div" v-if="exitBounced4">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">订单审核</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz">
            <div class="blzbw">
              <div class="yhdmz" style="padding-top: 20px;">申请人姓名：{{xuanzdshuj.apply_username}}</div>
              <div class="yhdmz">申请人手机号：{{xuanzdshuj.apply_phone}}</div>
              <div class="yhdmz">产品名称：{{xuanzdshuj.bank_card_name}}</div>
            </div>
            <div class="blzbw">
              <div class="tebdshur">
                平台收益：
                <el-input class="tebd" type="primary" v-model="xuanzdshuj.pt_money" clearable></el-input>元
              </div>
              <div class="tebdshur">
                用户收益：
                <el-input
                  class="tebd"
                  type="primary"
                  v-model="xuanzdshuj.order_time_money"
                  clearable
                ></el-input>元
              </div>
              <div class="tebdshur">
                上级返佣：
                <el-input class="tebd" type="primary" v-model="xuanzdshuj.p_user_money" clearable></el-input>元
              </div>
              <div class="tebdshur">
                越级返佣：
                <el-input class="tebd" type="primary" v-model="xuanzdshuj.pp_user_money" clearable></el-input>元
              </div>
            </div>
          </div>
          <div class="b-anntes">
            <el-button class="b-ant" @click="Dshenh(2)">取消审核</el-button>
            <el-button type="primary" @click="Dshenh(3)">确认审核</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 单订单未通过 -->
    <div class="black-div" v-if="exitBounced5">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">订单未通过</div>
        </div>
        <div class="b-nr">
          <div class="tixdwz">
            <div class="blzbw">
              <div class="yhdmz" style="padding-top: 20px;">申请人姓名：{{xuanzdshuj.apply_username}}</div>
              <div class="yhdmz">申请人手机号：{{xuanzdshuj.apply_phone}}</div>
              <div class="yhdmz">产品名称：{{xuanzdshuj.bank_card_name}}</div>
            </div>
            <div class="blzbw">
              <div class="tebdshur">
                失效原因：
                <el-select v-model="sxyy1" placeholder="选择原因">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="b-anntes">
            <el-button class="b-ant" @click="Dwtgd(2)">取消通过</el-button>
            <el-button type="primary" @click="Dwtgd(3,xuanzdshuj)">确认通过</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 一键未通过 -->
    <div class="black-div" v-if="exitBounced6">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">一键未通过</div>
        </div>
        <div class="b-nr">
          <div
            class="tebdwz2"
            style="padding-top: 70px;padding-bottom: 40px;"
          >是否将前【{{number}}】条订单全部一键未通过?</div>
          <div class="tebdxial">
            失效原因：
            <el-select v-model="sxyy2" placeholder="选择原因">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="b-ann" style="padding-top: 10px;">
            <el-button class="b-ant" @click="Qwtg(2)">取消通过</el-button>
            <el-button type="primary" @click="Qwtg(3)">确认通过</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单撤回 -->
    <div class="black-div" v-if="exitBounced7">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">撤回订单</div>
        </div>
        <div class="b-nr">
          <div class="tebdwz2">是否撤回该用户【{{xuanzdshuj.apply_username}}】的订单?</div>
          <div class="b-ann" style="padding-top: 10px;">
            <el-button class="b-ant" @click="Chuitk(2)">取消审核</el-button>
            <el-button type="primary" @click="Chuitk(3)">确认审核</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 未通过订单撤回 -->
    <div class="black-div" v-if="exitBounced8">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">待查询审核</div>
        </div>
        <div class="b-nr">
          <div class="tebdwz2">是否撤回编号【1】未通过订单?</div>
          <div class="b-ann" style="padding-top: 10px;">
            <el-button class="b-ant">取消审核</el-button>
            <el-button type="primary">确认审核</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 失效订单撤回 -->
    <div class="black-div" v-if="exitBounced9">
      <div class="bounced">
        <div class="b-bt">
          <div class="b-wz1">待查询审核</div>
        </div>
        <div class="b-nr">
          <div class="tebdwz2">是否撤回编号【1】失效订单?</div>
          <div class="b-ann" style="padding-top: 10px;">
            <el-button class="b-ant">取消审核</el-button>
            <el-button type="primary">确认审核</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search-div">
      <div class="s-srk">
        <img class="s-tb" src="../../../assets/images/soutb.png" />
        <div class="srk">
          <el-input
            class="s-input"
            type="primary"
            placeholder="输入平台用户ID进行搜索"
            v-model="searchData"
            clearable
          ></el-input>
        </div>
        <div class="an" @click="search">搜索</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list-div">
      <div class="l-tab">
        <div class="tab-div tab-a" v-bind:class="{ choose: state==1 }" @click="tab(1)">待查询</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==2 }" @click="tab(2)">待审核</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==3 }" @click="tab(3)">已完成</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==4 }" @click="tab(4)">未通过</div>
        <div class="tab-div tab-b" v-bind:class="{ choose: state==5 }" @click="tab(5)">失效订单</div>
      </div>
      <!-- 待查询 -->
      <div class="l-nr-a" v-show="state==1">
        <!-- 选择条件 -->
        <div class="xuanxi">
          <div class="dldm">
            <div class="xiwz">银行类别：</div>
            <div class="xidiv">
              <el-select v-model="bank" placeholder="全部银行" @change="bankXL">
                <el-option
                  v-for="item in bankData"
                  :key="item.bank_id"
                  :label="item.bank_name"
                  :value="item.bank_id"
                ></el-option>
              </el-select>
            </div>
            <div class="xiwz">产品名称：</div>
            <div class="xidiv">
              <el-select v-model="card" placeholder="全部信用卡" @change="cardXL">
                <el-option
                  v-for="item in cardkaData"
                  :key="item.bank_card_id"
                  :label="item.bank_card_name"
                  :value="item.bank_card_id"
                ></el-option>
              </el-select>
            </div>
            <div class="xiteb">
              <div class="tesdind">
                输入订单数：
                <el-input class="tebddinne" type="primary" clearable></el-input>条
              </div>
            </div>
          </div>
          <div class="dldm">
            <div class="szkrq">日期：</div>
            <div class="tbdxzd">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" @change="dateKS"></el-date-picker>
              <span>至</span>
              <el-date-picker v-model="value2" type="date" placeholder="选择日期" @change="dateJS"></el-date-picker>
            </div>
            <div class="tebantg" @click="Qshe(1)">一键待审核</div>
          </div>
        </div>
        <div class="title">
          <div class="li">
            <el-button @click="setAllNo">全选/反选</el-button>
          </div>
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">申请人姓名</div>
          <div class="li">申请人手机号</div>
          <div class="li" style="flex:2;">申请人身份证</div>
          <div class="li">产品名称</div>
          <div class="li">用户返佣</div>
          <div class="li">订单号</div>
          <div class="li">提交时间</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">
            <input type="checkbox" name="love" v-model="groupData" :value="item.apply_id" />
          </div>
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.apply_username}}</div>
          <div class="li">{{item.apply_phone}}</div>
          <div class="li" style="flex:2;">{{item.apply_idcard}}</div>
          <div class="li">{{item.bank_card_name}}</div>
          <div class="li">{{item.order_time_money}}元</div>
          <div class="li">{{item.apply_id}}</div>
          <div class="li">{{item.apply_time}}</div>
          <div class="li" style="text-align: left;">
            <span class="li-abq2" style="color: #037aff;" @click="Dshenh(1,item)">审核</span>
          </div>
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="10"
            :total="totalCount"
            @current-change="jumpData"
          ></el-pagination>
        </div>
      </div>

      <!-- 待审核 -->
      <div class="l-nr-a" v-show="state==2">
        <!-- 选择条件 -->
        <div class="xuanxi">
          <div class="dldm">
            <div class="xiwz">银行类别：</div>
            <div class="xidiv">
              <el-select v-model="bank" placeholder="全部银行" @change="bankXL">
                <el-option
                  v-for="item in bankData"
                  :key="item.bank_id"
                  :label="item.bank_name"
                  :value="item.bank_id"
                ></el-option>
              </el-select>
            </div>
            <div class="xiwz">产品名称：</div>
            <div class="xidiv">
              <el-select v-model="card" placeholder="全部信用卡" @change="cardXL">
                <el-option
                  v-for="item in cardkaData"
                  :key="item.bank_card_id"
                  :label="item.bank_card_name"
                  :value="item.bank_card_id"
                ></el-option>
              </el-select>
            </div>
            <div class="xiteb">
              <div class="tesdind">
                输入订单数：
                <el-input class="tebddinne" type="primary" clearable></el-input>条
              </div>
            </div>
          </div>
          <div class="dldm">
            <div class="szkrq">日期：</div>
            <div class="tbdxzd">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" @change="dateKS"></el-date-picker>
              <span>至</span>
              <el-date-picker v-model="value2" type="date" placeholder="选择日期" @change="dateJS"></el-date-picker>
            </div>
            <div class="tebantg" @click="Qwtg(1)">一键未通过</div>
          </div>
        </div>
        <div class="title">
          <div class="li">
            <el-button @click="setAllNo">全选/反选</el-button>
          </div>
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">申请人姓名</div>
          <div class="li">申请人手机号</div>
          <div class="li" style="flex:2;">申请人身份证</div>
          <div class="li">产品名称</div>
          <div class="li">用户返佣</div>
          <div class="li">订单号</div>
          <div class="li">提交时间</div>
          <div class="li">操作</div>
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">
            <input type="checkbox" name="love" v-model="groupData" :value="item.apply_id" />
          </div>
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.apply_username}}</div>
          <div class="li">{{item.apply_phone}}</div>
          <div class="li" style="flex:2;">{{item.apply_idcard}}</div>
          <div class="li">{{item.bank_card_name}}</div>
          <div class="li">{{item.order_time_money}}元</div>
          <div class="li">{{item.apply_id}}</div>
          <div class="li">{{item.apply_time}}</div>
          <div class="li" style="text-align: left;">
            <span class="li-abq1" style="color: #037aff;">编辑</span>
            <span
              class="li-abq2"
              style="color: #037aff;margin-left: 10px;"
              @click="Dshenh(1,item)"
            >审核</span>
          </div>
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="10"
            :total="totalCount"
            @current-change="jumpData"
          ></el-pagination>
        </div>
      </div>

      <!-- 已完成 -->
      <div class="l-nr-a" v-show="state==3">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">申请人姓名</div>
          <div class="li">申请人手机号</div>
          <div class="li" style="flex:2;">申请人身份证</div>
          <div class="li">产品名称</div>
          <div class="li">订单号</div>
          <div class="li">提交时间</div>
          <!-- <div class="li">操作</div> -->
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.apply_username}}</div>
          <div class="li">{{item.apply_phone}}</div>
          <div class="li" style="flex:2;">{{item.apply_idcard}}</div>
          <div class="li">{{item.bank_card_name}}</div>
          <div class="li">暂无数据</div>
          <div class="li">{{item.apply_time}}</div>
          <!-- <div class="li" style="text-align: left;">
            <span class="li-abq2" style="margin-left: 63px;" @click="Chuitk(1,item)">撤回</span>
          </div>-->
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="10"
            :total="totalCount"
            @current-change="jumpData"
          ></el-pagination>
        </div>
      </div>
      <!-- 未通过 -->
      <div class="l-nr-a" v-show="state==4">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">申请人姓名</div>
          <div class="li">申请人手机号</div>
          <div class="li" style="flex:2;">申请人身份证</div>
          <div class="li">产品名称</div>
          <div class="li">订单号</div>
          <div class="li">提交时间</div>
          <!-- <div class="li">操作</div> -->
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.apply_username}}</div>
          <div class="li">{{item.apply_phone}}</div>
          <div class="li" style="flex:2;">{{item.apply_idcard}}</div>
          <div class="li">{{item.bank_card_name}}</div>
          <div class="li">暂无数据</div>
          <div class="li">{{item.apply_time}}</div>
          <!-- <div class="li" style="text-align: left;">
            <span class="li-abq2" style="margin-left: 63px;" @click="Chuitk(1,item)">撤回</span>
          </div>-->
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="10"
            :total="totalCount"
            @current-change="jumpData"
          ></el-pagination>
        </div>
      </div>
      <!-- 失效订单 -->
      <div class="l-nr-a" v-show="state==5">
        <div class="title">
          <div class="li">编号</div>
          <div class="li">用户头像</div>
          <div class="li">用户ID</div>
          <div class="li">申请人姓名</div>
          <div class="li">申请人手机号</div>
          <div class="li" style="flex:2;">申请人身份证</div>
          <div class="li">产品名称</div>
          <div class="li">订单号</div>
          <div class="li">提交时间</div>
          <!-- <div class="li">操作</div> -->
        </div>
        <div class="title" v-for="(item,key) in cardData" :key="key">
          <div class="li">{{key}}</div>
          <div class="li">
            <img :src="item.user_avatar" />
          </div>
          <div class="li">{{item.user_id}}</div>
          <div class="li">{{item.apply_username}}</div>
          <div class="li">{{item.apply_phone}}</div>
          <div class="li" style="flex:2;">{{item.apply_idcard}}</div>
          <div class="li">{{item.bank_card_name}}</div>
          <div class="li">暂无数据</div>
          <div class="li">{{item.apply_time}}</div>
          <!-- <div class="li" style="text-align: left;">
            <span class="li-abq2" style="margin-left: 63px;" @click="Chuitk(1,item)">撤回</span>
          </div>-->
        </div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="10"
            :total="totalCount"
            @current-change="jumpData"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      //切换状态
      state: 1,
      //条件
      conditions: 2,
      //搜索数据
      searchData: "",
      //数据
      cardData: [],
      //分页
      page: 1,
      //总数据量
      totalCount: 1,
      //失效订单弹框1
      exitBounced1: false,
      //待查询审核弹框1
      exitBounced2: false,
      //待查询审核弹框1
      exitBounced3: false,
      //订单审核弹框2
      exitBounced4: false,
      //订单编辑弹框2
      exitBounced5: false,
      //一键未通过弹框2
      exitBounced6: false,
      //已完成订单撤回弹框
      exitBounced7: false,
      //未通过订单撤回弹框
      exitBounced8: false,
      //失效订单撤回弹框
      exitBounced9: false,
      //失效原因1
      options: [
        {
          value: "二卡申请不给予结算",
          label: "二卡申请不给予结算"
        },
        {
          value: "非本平台申请",
          label: "非本平台申请"
        }
      ],
      //失效原因2
      options2: [
        {
          value: "二卡申请不给予结算",
          label: "二卡申请不给予结算"
        },
        {
          value: "非本平台申请",
          label: "非本平台申请"
        }
      ],
      //选中的失效原因1
      sxyy1: "",
      //选中的失效原因2
      sxyy2: "",
      //选中的银行数据
      bank: "",
      //银行下拉数据
      bankData: [{ bank_id: "", bank_name: "全部银行" }],
      //选中的信用卡数据
      card: "",
      //信用卡下拉数据
      cardkaData: [{ bank_card_id: "", bank_card_name: "全部信用卡" }],
      //全选数据
      checkAll: true,
      //全选-选中的数据
      groupData: [],
      //日期1
      value1: "",
      //日期2
      value2: "",
      //数据数量
      number: 1,
      //当前选中的数据
      xuanzdshuj: []
    };
  },
  //生命周期-页面初始化完成加载
  created() {
    this.loadingData();
    this.conditionsData();
  },
  methods: {
    //切换
    tab(value) {
      if (this.state == value) {
        //加载框
        let loadingInstance = Loading.service();
        setTimeout(function() {
          //关闭加载框
          loadingInstance.close();
        }, 300);
      } else {
        this.state = value;
        //初始化条件
        this.page = 1;
        this.bank = "";
        this.card = "";
        this.value1 = "";
        this.value2 = "";
        this.groupData = [];
        if (value == 1) {
          //待查询
          this.conditions = 2;
          this.loadingData();
        } else if (value == 2) {
          //待审核
          this.conditions = 3;
          this.loadingData();
        } else if (value == 3) {
          //已完成
          this.conditions = 1;
          this.loadingData2();
        } else if (value == 4) {
          //未通过
          this.conditions = 4;
          this.loadingData2();
        } else if (value == 5) {
          //失效订单
          this.conditions = 0;
          this.loadingData2();
        }
        //加载框
        let loadingInstance = Loading.service();
        setTimeout(function() {
          //关闭加载框
          loadingInstance.close();
        }, 300);
      }
    },
    //全选/全不选操作
    setAllNo() {
      //初始化数据
      this.groupData = [];
      var loves = document.getElementsByName("love");
      if (this.checkAll) {
        this.checkAll = false;
        for (var i = 0; i < loves.length; i++) {
          loves[i].checked = true;
          //数据添加
          this.groupData.push(loves[i].value);
        }
      } else {
        this.checkAll = true;
        //数据清空
        this.groupData = [];
        for (var i = 0; i < loves.length; i++) {
          loves[i].checked = false;
        }
      }
    },
    //加载条件数据
    conditionsData() {
      this.api.apiPost(
        "/applycard/querst",
        "get",
        "",
        "",
        (status, judge, res) => {
          if (status) {
            this.bankData = this.bankData.concat(res.data.bank);
            this.cardkaData = this.cardkaData.concat(res.data.bankcard);
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    //加载数据
    loadingData() {
      var params = {
        //分页
        page: this.page,
        //搜索
        search: this.searchData,
        //条件
        status: this.conditions,
        //日期开始 默认上个月1号
        starttime: this.value1,
        //日期结束 默认上个月月尾
        endtime: this.value2,
        //银行id
        bankid: this.bank,
        //银行信用卡id
        bankcardid: this.card
      };
      this.api.apiPost(
        "/applycard/index",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.result;
            //总数据量
            this.totalCount = res.page.totalCount;
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    //加载数据2
    loadingData2() {
      var params = {
        //分页
        page: this.page,
        //搜索
        search: this.searchData,
        //条件
        status: this.conditions
      };
      this.api.apiPost(
        "/applycard/completed",
        "get",
        "",
        params,
        (status, judge, res) => {
          if (status) {
            this.cardData = res.data.result;
            //总数据量
            this.totalCount = res.page.totalCount;
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    //下一页
    jumpData(val) {
      this.page = val;
      if (this.conditions == 2) {
        //待查询
        this.loadingData();
      } else if (this.conditions == 3) {
        //待审核
        this.loadingData();
      } else if (this.conditions == 1) {
        //已完成
        this.loadingData2();
      } else if (this.conditions == 4) {
        //未通过
        this.loadingData2();
      } else if (this.conditions == 0) {
        //失效订单
        this.loadingData2();
      }
    },
    //搜索
    search() {
      if (this.state == 1) {
        this.loadingData();
      } else if (this.state == 2) {
        this.loadingData();
      } else {
        this.loadingData2();
      }
    },
    //银行下拉值改变的时候
    bankXL() {
      this.loadingData();
    },
    //信用卡下拉值改变的时候
    cardXL() {
      this.loadingData();
    },
    //选择日期开始
    dateKS() {
      if (this.value2 != "" && this.value2 != null) {
        if (this.value1 != "" && this.value1 != null) {
          this.loadingData();
        }
      }
      if (this.value1 == null && this.value2 == null) {
        this.loadingData();
      }
    },
    //选择日期结束
    dateJS() {
      if (this.value1 != "" && this.value1 != null) {
        if (this.value2 != "" && this.value2 != null) {
          this.loadingData();
        }
      }
      if (this.value1 == null && this.value2 == null) {
        this.loadingData();
      }
    },
    //一键待审核的弹框
    Qshe(value) {
      if (this.groupData != "") {
        if (value == 1) {
          this.exitBounced2 = true;
          this.number = this.groupData.length;
        } else if (value == 2) {
          this.exitBounced2 = false;
        } else if (value == 3) {
          this.exitBounced2 = false;
          this.yijsh(3, "");
        }
      }
    },
    //一键未通过的弹框
    Qwtg(value) {
      if (this.groupData != "") {
        if (value == 1) {
          this.exitBounced6 = true;
          this.number = this.groupData.length;
        } else if (value == 2) {
          this.exitBounced6 = false;
        } else if (value == 3) {
          if (this.sxyy2 == "") {
            this.$message({
              showClose: true,
              message: "请选择失效原因",
              type: "error",
              position: "bottom-right"
            });
          } else {
            this.exitBounced6 = false;
            this.yijsh(4, this.sxyy2);
          }
        }
      }
    },
    //一键API
    yijsh(status, reason) {
      var data = {
        //订单ID
        shnum: this.groupData,
        //3 一键审查 4一键未通过
        status: status,
        //一键未通过 原因 必选
        reason: reason
      };
      this.api.apiPost(
        "/applycard/onekey",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.loadingData();
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    //单审核的弹框
    Dshenh(value, data) {
      if (value == 1) {
        this.xuanzdshuj = data;
        this.exitBounced4 = true;
      } else if (value == 2) {
        this.exitBounced4 = false;
      } else if (value == 3) {
        this.exitBounced4 = false;
        this.yijsh2();
      }
    },
    //单未通过的弹框
    // Dwtgd(value, data) {
    //   if (value == 1) {
    //     this.xuanzdshuj = data;
    //     this.exitBounced5 = true;
    //   } else if (value == 2) {
    //     this.exitBounced5 = false;
    //   } else if (value == 3) {
    //     if (this.sxyy1 == "") {
    //       this.$message({
    //         showClose: true,
    //         message: "请选择失效原因",
    //         type: "error",
    //         position: "bottom-right"
    //       });
    //     } else {
    //       this.exitBounced5 = false;
    //       this.yijsh2(4, this.sxyy1);
    //     }
    //   }
    // },
    //单审核API
    yijsh2(status) {
      var data = {
        //订单ID
        id: this.xuanzdshuj.apply_id
      };
      this.api.apiPost(
        "/applycard/audit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.xuanzdshuj = [];
            this.loadingData();
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    },
    //撤回的弹框
    Chuitk(value, data) {
      if (value == 1) {
        this.xuanzdshuj = data;
        this.exitBounced7 = true;
      } else if (value == 2) {
        this.exitBounced7 = false;
      } else if (value == 3) {
        this.exitBounced7 = false;
        this.chehdin();
      }
    },
    //撤回订单
    chehdin(id) {
      var data = {
        //订单ID
        apply_id: this.xuanzdshuj.apply_id
      };
      this.api.apiPost(
        "/applycard/saveedit",
        "post",
        data,
        "",
        (status, judge, res) => {
          if (status) {
            this.xuanzdshuj = [];
            this.loadingData2();
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error",
              position: "bottom-right"
            });
          }
        }
      );
    }
  }
};
</script>
<style scoped>
a {
  color: #037aff;
}
.li-abq1 {
  margin-left: 30px;
}
.li-abq2 {
  margin-left: 50px;
  color: #e52e16;
}
.li img {
  width: 50px;
  height: 50px;
  padding-top: 5px;
}
/* 选择条件 */
.xuanxi {
  width: 100%;
  height: 162px;
  border-bottom: 1px #e7e9ea solid;
}
.dldm {
  width: 100%;
  height: 81px;
  display: flex;
  line-height: 81px;
  font-size: 14px;
}
.xiwz {
  width: 128px;
  height: 100%;
  text-align: center;
}
.xidiv {
  width: 220px;
  height: 100%;
}
.xiteb {
  flex: 1;
  height: 100%;
}
.tesdind {
  width: 320px;
  height: 100%;
  float: right;
}
.tesdind .tebddinne {
  width: 190px;
  margin-right: 10px;
}
.szkrq {
  width: 128px;
  height: 100%;
  text-align: center;
}
.tbdxzd {
  flex: 1;
  height: 100%;
}
.tebantg {
  width: 110px;
  height: 40px;
  margin-right: 44px;
  background: rgba(3, 122, 255, 1);
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  cursor: pointer;
}
.tbdxzd span {
  padding-left: 10px;
  padding-right: 10px;
}
/* 弹框 */
.bounced {
  width: 650px;
  height: 380px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  top: 50%;
  margin-top: -235px;
  left: 50%;
  margin-left: -325px;
}
.b-bt {
  width: 100%;
  height: 50px;
  background: rgba(3, 122, 255, 1);
  display: flex;
  line-height: 50px;
  color: #ffffff;
  font-size: 14px;
}
.tixdwz {
  width: 100%;
  display: flex;
}
.blzbw {
  flex: 1;
}
.yhdmz {
  font-size: 14px;
  color: #404448;
  text-indent: 60px;
  line-height: 60px;
}
.tebd {
  width: 152px;
  margin-left: 10px;
  margin-right: 10px;
}
.tebdshur {
  width: 100%;
  height: 42px;
  font-size: 14px;
  color: #404448;
  line-height: 42px;
  display: flex;
  padding-top: 16px;
}
.tebdwz2 {
  color: #404448;
  font-size: 14px;
  text-align: center;
  padding-top: 130px;
  padding-bottom: 90px;
}
.tebdxial {
  width: 300px;
  height: 42px;
  font-size: 14px;
  color: #404448;
  line-height: 42px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;
}
</style>