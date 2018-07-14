import * as types from './mutations_types'

module.exports = {
    [types.PUSHTOBAIDU](state){
        console.log('state.id='+state.id);
        // 百度推送收录
        var bp = document.createElement('script')
        var curProtocol = window.location.protocol.split(':')[0]
        if (curProtocol === 'https') {
          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
        } else {
          bp.src = 'http://push.zhanzhang.baidu.com/push.js'
        }
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(bp, s)
    }
};