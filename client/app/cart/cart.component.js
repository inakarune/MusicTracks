import templateUrl from './cart.html';
export const cartComponent = {
	bindings: {
		cartObj: '<'
	},
  templateUrl,
  controller: class cartComponent {
    constructor ($http) {
      'ngInject'
      this.total = 0;
      this.checkbox = [];
      this.$http = $http;
    }

    $oninit () {
    	this.items = this.cartObj.data;
    }

    $onChange (changes) {
    	if(changes.cartObj){
    		this.items = Object.assign({}, this.cartObj.data);
    	}
    }

    cb_change (e, title) {
      let checkbox = e.target;
      let action = checkbox.checked ? 'add' : 'remove';

      this.cb_update(action, title);
    }

    cb_update (action, title) {
      if (action === 'add' && this.checkbox.indexOf(title) === -1) {
        this.checkbox.push(title);
      }
      if (action === 'remove' && this.checkbox.indexOf(title) !== -1) {
        this.checkbox.splice(this.checkbox.indexOf(title), 1);
      }
    }

    cb_delete () {
      for(let i = 0; i < this.cartObj.data.length; i++){
        if (this.checkbox[0] === this.cartObj.data[i].title) {
          this.cartObj.data.splice(i, 1);
        }  
      }

      this.$http({
        method: 'DELETE',
        url: '/cart/' + this.checkbox[0],
        params: {'title': this.checkbox }
      });      
    }

    kakaopay (cb) {
		  let IMP = window.IMP;
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('accessToken');
      this.$http({
        url: '/getUserInfo',
        method: 'GET'
      })
        .success(function(userInfo){
          IMP.init('imp10130927');
          IMP.request_pay({
            pg : 'kakao',
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : cb.toString(),
            amount : cb.length,
            buyer_email : userInfo.email,
            buyer_name : userInfo.name,
            buyer_addr : '뮤직트랙 사이트에서 음원 구입',
            buyer_postcode : '123-456'
          }, function(rsp) {
            if ( rsp.success ) {
                jQuery.ajax({
                  url: "/payments/complete", //cross-domain error가 발생하지 않도록 동일한 도메인으로 전송
                  type: 'POST',
                  dataType: 'json',
                  data: {
                    imp_uid : rsp.imp_uid
                    //기타 필요한 데이터가 있으면 추가 전달
                  }
                }).done(function(data) {
                  //[2] 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
                  if ( everythings_fine ) {
                    var msg = '결제가 완료되었습니다.';
                    msg += '\n고유ID : ' + rsp.imp_uid;
                    msg += '\n상점 거래ID : ' + rsp.merchant_uid;
                    msg += '\결제 금액 : ' + rsp.paid_amount;
                    msg += '카드 승인번호 : ' + rsp.apply_num;
                    
                    alert(msg);
                  } else {
                    //[3] 아직 제대로 결제가 되지 않았습니다.
                    //[4] 결제된 금액이 요청한 금액과 달라 결제를 자동취소처리하였습니다.
                  }
                });

            } else {
                var msg = '결제에 실패하였습니다. 왜 일까요?';
                msg += '\n에러내용 : ' + rsp.error_msg.split('.')[0] + '.\n' + rsp.error_msg.split('. ')[1];
            }

            alert(msg);
          });
        })
        .error(function(){
          throw new Error('kakaopay error');
        });
		};
  }  
}
